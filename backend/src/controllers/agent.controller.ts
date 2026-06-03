import { Response } from "express";
import mongoose from "mongoose";
import Property from "../models/property.model";
import Notification, { NotificationType } from "../models/notification.model";
import ContactSubmission, { RequestAction } from "../models/contactSubmissions.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logError, toErrorResponse } from "../utils/error";


export const getAgentDashboardMetrics = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const agentId = req.user?.id;
        if (!agentId) {
            return res.status(401).json({ message: "Unauthorized: Missing agent context mapping" });
        }

        const agentMongoId = new mongoose.Types.ObjectId(agentId);

        // 1. Core KPIs & Pie Chart Data via aggregation pipeline
        const propertyMetrics = await Property.aggregate([
            { $match: { createdBy: agentMongoId } },
            {
                $group: {
                    _id: null,
                    totalProperties: { $sum: 1 },
                    availableCount: {
                        $sum: { $cond: [{ $eq: ["$status", "Available"] }, 1, 0] }
                    },
                    soldCount: {
                        $sum: { $cond: [{ $eq: ["$status", "Sold"] }, 1, 0] }
                    }
                }
            }
        ]);

        // Extract values from aggregation results (default to 0 if no properties exist yet)
        const metrics = propertyMetrics[0] || { totalProperties: 0, availableCount: 0, soldCount: 0 };

        // 2. Total Inquiries Count (excluding soft-deleted leads)
        const totalInquiries = await ContactSubmission.countDocuments({
            agentId: agentMongoId,
            isDeleted: false
        });

        // 3. Complete List of Properties (Removed .select() to return full schema details)
        const myPropertiesList = await Property.find({ createdBy: agentMongoId })
            .sort({ createdAt: -1 });

        // 4. Construct Response Payload
        return res.status(200).json({
            success: true,
            dashboardKPIs: {
                totalInquiries,
                propertiesSold: metrics.soldCount,
                propertiesAvailable: metrics.availableCount,
                totalInventoryCount: metrics.totalProperties
            },
            pieChartData: {
                labels: ["Available Properties", "Sold Properties"],
                datasets: [metrics.availableCount, metrics.soldCount]
            },
            propertiesList: myPropertiesList
        });

    } catch (error) {
        logError("getAgentDashboardMetrics", error);
        return res.status(500).json(toErrorResponse(error));
    }
};


export const getAgentInquiryLeads = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const agentId = req.user?.id;

        // Parse search query and pagination values from query parameters
        const searchName = req.query.search as string;
        const page = parseInt(req.query.page as string) || 1;
        const limit = 16;
        const skip = (page - 1) * limit;

        // Base query filter matrix
        const queryFilter: any = { agentId, isDeleted: false };

        // If a search term is provided, apply a case-insensitive regex match against the name field
        if (searchName && searchName.trim() !== "") {
            queryFilter.name = { $regex: searchName.trim(), $options: "i" };
        }

        // Get total count of matching documents matching our filter criteria
        const totalLeads = await ContactSubmission.countDocuments(queryFilter);

        // Fetch the paginated and filtered slice from the collection
        const activeLeads = await ContactSubmission.find(queryFilter)
            .populate("propertyId", "title price address propertyType")
            .populate("buyerId", "name email phoneNo")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Handle out-of-bounds page errors cleanly
        if (!activeLeads || (activeLeads.length === 0 && page > 1)) {
            return res.status(404).json({ 
                message: "No inquiry records found on this page slice." 
            });
        }

        return res.status(200).json({
            success: true,
            pagination: {
                totalLeads,
                totalPages: Math.ceil(totalLeads / limit),
                currentPage: page,
                limit
            },
            count: activeLeads.length,
            leads: activeLeads
        });
    } catch (error) {
        logError("getAgentInquiryLeads", error);
        return res.status(500).json(toErrorResponse(error));
    }
};



// ==========================================
// 3. HANDLE INQUIRY ACTION (Approve / Disapprove)
// ==========================================
export const handleInquiryAction = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { inquiryId } = req.params;
        const { action } = req.body; // Expects "approved" or "disapproved"
        const agentId = req.user?.id;

        if (!Object.values(RequestAction).includes(action)) {
            return res.status(400).json({ message: "Invalid inquiry action parameter value." });
        }

        const inquiry = await ContactSubmission.findOne({ _id: inquiryId, agentId, isDeleted: false });
        if (!inquiry) {
            return res.status(404).json({ message: "Active property inquiry not found." });
        }

        inquiry.requestAction = action as RequestAction;
        await inquiry.save();

        const property = await Property.findById(inquiry.propertyId);
        
        if (action === RequestAction.APPROVED) {
            if (property) {
                // Flip operational availability states and pass asset ownership matching
                property.status = "Sold";
                property.ownerId = inquiry.buyerId; 
                await property.save();

                // NOTIFICATION TYPE 4: Sent to User verifying purchase approval
                await Notification.create({
                    recipientId: inquiry.buyerId,
                    senderId: agentId,
                    type: NotificationType.PROPERTY_APPROVED,
                    title: "🎉 Inquiry Approved & Property Assigned!",
                    messageText: `Great news! The agent approved your inquiry for "${property.title}". The asset is now marked as Sold to you.`,
                    relatedPropertyId: property._id
                });
            }
        } else if (action === RequestAction.DISAPPROVED) {
            if (property) {
                // Notify user that their inquiry was declined, keeping the property available
                await Notification.create({
                    recipientId: inquiry.buyerId,
                    senderId: agentId,
                    type: NotificationType.BUY_REQUEST_PENDING, // Re-uses pending schema or a standard alert variant
                    title: "❌ Inquiry Request Declined",
                    messageText: `Your inquiry submission request for "${property.title}" was declined by the agent.`,
                    relatedPropertyId: property._id
                });
            }
        }

        return res.status(200).json({
            message: `Inquiry status successfully marked as ${action}.`,
            inquiry
        });
    } catch (error) {
        logError("handleInquiryAction", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

// ==========================================
// 4. SOFT DELETE INQUIRY
// ==========================================
export const softDeleteInquiry = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { inquiryId } = req.params;
        const userId = req.user?.id;

        // Find inquiry where current authenticated operator is either the sender or receiver
        const inquiry = await ContactSubmission.findOne({
            _id: inquiryId,
            $or: [{ buyerId: userId }, { agentId: userId }]
        });

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry tracking record reference not found." });
        }

        inquiry.isDeleted = true;
        await inquiry.save();

        return res.status(200).json({ message: "Inquiry row removed from view frames successfully." });
    } catch (error) {
        logError("softDeleteInquiry", error);
        return res.status(500).json(toErrorResponse(error));
    }
};