import { Response } from "express";
import mongoose from "mongoose";
import User, { Role } from "../models/user.model";
import Property from "../models/property.model";
import Notification, { NotificationType } from "../models/notification.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logError, toErrorResponse } from "../utils/error";

export const getAdminDashboard = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const timeframe = (req.query.timeframe as string) || "month";
        const currentYear = new Date().getFullYear();

        const totalCustomers = await User.countDocuments({ role: Role.USER });
        const propertyMetrics = await Property.aggregate([
            {
                $facet: {
                    totalProps: [{ $count: "count" }],
                    closed: [{ $match: { status: { $in: ["Sold", "Rented"] } } }, { $count: "count" }],
                    active: [{ $match: { status: "Available" } }, { $count: "count" }]
                }
            }
        ]);

        const listedProperties = propertyMetrics[0].totalProps[0]?.count || 0;
        const closedDeals = propertyMetrics[0].closed[0]?.count || 0;
        const activeDeals = propertyMetrics[0].active[0]?.count || 0;
        const pendingDeals = Math.max(0, listedProperties - (closedDeals + activeDeals));
        const customerVisits = totalCustomers * 4;

        const dashboardAggregation = await User.aggregate([
            {
                $facet: {
                    activeCustomers: [
                        { $match: { role: Role.USER } },
                        { $sort: { updatedAt: -1 } },
                        { $limit: 3 },
                        {
                            $project: {
                                name: 1,
                                profilePic: 1,
                                locality: { $cond: [{ $eq: ["$locality", ""] }, "Not Provided", "$locality"] },
                                district: { $cond: [{ $eq: ["$district", ""] }, "Not Provided", "$district"] }
                            }
                        }
                    ],

                    rawGrowthData: [
                        { 
                            $match: { 
                                role: Role.USER,
                                createdAt: { 
                                    $gte: new Date(`${currentYear}-01-01`), 
                                    $lte: new Date(`${currentYear}-12-31`) 
                                }
                            } 
                        },
                        {
                            $group: {
                                _id: {
                                    type: timeframe,
                                    value: timeframe === "week" 
                                        ? { $week: "$createdAt" } 
                                        : timeframe === "year" 
                                            ? { $year: "$createdAt" } 
                                            : { $month: "$createdAt" }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { "_id.value": 1 } }
                    ],

                    verificationStatusData: [
                        {
                            $group: {
                                _id: null,
                                newUserUnverified: { $sum: { $cond: [{ $eq: ["$isVerified", false] }, 1, 0] } },
                                verifiedUser: { $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] } },
                                returningUser: { $sum: { $cond: [{ $eq: ["$role", Role.AGENT] }, 1, 0] } }
                            }
                        },
                        { $project: { _id: 0 } }
                    ],

                    customerDistributionByRegion: [
                        { $match: { role: Role.USER } },
                        {
                            $group: {
                                _id: { $cond: [{ $eq: ["$district", ""] }, "Unassigned Region", "$district"] },
                                userCount: { $sum: 1 }
                            }
                        },
                        { $sort: { userCount: -1 } },
                        { $limit: 5 },
                        { $project: { _id: 0, districtName: "$_id", userCount: 1 } }
                    ]
                }
            }
        ]);

        const facets = dashboardAggregation[0];

        let chronologicalGrowthGraph = [];
        const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (timeframe === "month") {
            chronologicalGrowthGraph = monthlyLabels.map((label, index) => {
                const monthNum = index + 1;
                const match = facets.rawGrowthData.find((d: any) => d._id.value === monthNum);
                return {
                    name: label,
                    enquiries: match ? match.count : 0
                };
            });
        } else if (timeframe === "week") {
            for (let w = 1; w <= 52; w++) {
                const match = facets.rawGrowthData.find((d: any) => d._id.value === w);
                chronologicalGrowthGraph.push({
                    name: `Wk ${w}`,
                    enquiries: match ? match.count : 0
                });
            }
        } else {
            const match = facets.rawGrowthData.find((d: any) => d._id.value === currentYear);
            chronologicalGrowthGraph.push({
                name: String(currentYear),
                enquiries: match ? match.count : 0
            });
        }

        return res.status(200).json({
            overviewMetrics: { totalCustomers, listedProperties, closedDeals, pendingDeals, activeDeals, customerVisits },
            recentActiveCustomers: facets.activeCustomers || [],
            timelineGrowthGraph: chronologicalGrowthGraph, 
            verificationMetrics: facets.verificationStatusData[0] || { newUserUnverified: 0, verifiedUser: 0, returningUser: 0 },
            regionalDistribution: facets.customerDistributionByRegion || []
        });

    } catch (error) {
        logError("getAdminDashboard", error);
        return res.status(500).json(toErrorResponse(error));
    }
};



export const getAdminCustomerList = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // 1. Establish strict pagination offsets (Enforce fallback defaults if params are missing)
        const targetPage = Math.max(1, parseInt(req.query.page as string) || 1);
        const recordLimit = 16; 
        const skipOffset = (targetPage - 1) * recordLimit;

        // 2. Extract operational search parameters
        const searchInput = (req.query.search as string) || "";

        // 3. Construct dynamic matching constraints map
        const matchCriteria: any = {
            role: Role.USER // Lock isolation exclusively to regular platform customers
        };

        // If the admin provides a search string, append regex match filters across multiple paths
        if (searchInput.trim()) {
            matchCriteria.$or = [
                { name: { $regex: searchInput.trim(), $options: "i" } },
                { email: { $regex: searchInput.trim(), $options: "i" } }
            ];
        }

        // 4. Run the multi-faceted data aggregation pipeline matrix
        const aggregationResult = await User.aggregate([
            { $match: matchCriteria },
            { $sort: { createdAt: -1 } }, // Newest registrations bubble to the top

            {
                $facet: {
                    // Bucket A: Compute global total records matching target criteria
                    metadataContext: [{ $count: "totalCount" }],

                    // Bucket B: Stream matching item subsets down the pagination slice
                    customerDataset: [
                        { $skip: skipOffset },
                        { $limit: recordLimit },
                        {
                            // Correlate owned properties by connecting users collection to properties index
                            $lookup: {
                                from: "properties",
                                localField: "_id",
                                foreignField: "ownerId", 
                                as: "associatedProperties"
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                                phoneNo: { $ifNull: ["$phoneNo", "N/A"] }, 
                                isVerified: 1, 
                                createdAt: 1,
                                profilePic:1,
                                propertyTypesArray: "$associatedProperties.propertyType"
                            }
                        }
                    ]
                }
            }
        ]);

        // 5. Deconstruct raw lookup array buckets
        const totalRecords = aggregationResult[0]?.metadataContext[0]?.totalCount || 0;
        const rawCustomers = aggregationResult[0]?.customerDataset || [];
        const absoluteTotalPages = Math.ceil(totalRecords / recordLimit);

        // 6. Map and transform dataset documents into clean row rows mappings
        const formattedCustomers = rawCustomers.map((customer: any) => {
            // Deduplicate same-type real estate allocations gracefully
            const uniqueTypes = [...new Set(customer.propertyTypesArray || [])] as string[];
            
            // Format arrays into neat strings (e.g., "Apartment, Rental")
            const separatedPropertyTypesString = uniqueTypes.length > 0 
                ? uniqueTypes.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(", ") 
                : "No Properties";

            return {
                customerId: customer._id,
                customerName: customer.name,
                propertyType: separatedPropertyTypesString,
                email: customer.email,
                phoneNo: customer.phoneNo,
                profilePic:customer.profilePic,
                status: customer.isVerified ? "Verified" : "Unverified",
                registrationDate: new Date(customer.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })
            };
        });

        // 7. Dispatch structured dataset response matrix payload
        return res.status(200).json({
            pagination: {
                totalUsersCount: totalRecords,
                currentPage: targetPage,
                totalPages: absoluteTotalPages,
                itemsPerPageLimit: recordLimit,
                hasNextPage: targetPage < absoluteTotalPages,
                hasPreviousPage: targetPage > 1
            },
            customers: formattedCustomers
        });

    } catch (error) {
        logError("getAdminCustomerList", error);
        return res.status(500).json(toErrorResponse(error));
    }
};


export const adminUpgradeRole = async (req: AuthenticatedRequest, res: Response) => {
    try {


        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }


        const adminId = req.user?.id;

        const { userId } = req.params;
        const {
            //comment if need 
            name, email, city, district, locality, phoneNo,
            role } = req.body; // Expects "agent" or "user"

        if (!role || !Object.values(Role).includes(role)) {
            return res.status(400).json({ message: "Invalid role type supplied" });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        //comment if need 
        if (name) targetUser.name = name;
        if (email) targetUser.email = email;
        if (city) targetUser.city = city;
        if (district) targetUser.district = district;
        if (locality) targetUser.locality = locality;
        if (phoneNo) targetUser.phoneNo = phoneNo;
        // If a file was uploaded via uploadCheck middleware
        if (req.file) {
            targetUser.profilePic = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }


        const oldRole = targetUser.role;

        targetUser.role = role as Role;

        if (oldRole === role) {
            return res.status(400).json({ message: `Already role - ${oldRole} can't upgrade`});
        }
        await targetUser.save();

        // Trigger Notification Type 1: Role Upgraded/Changed
        if (oldRole !== role) {
            
            await Notification.create({
                recipientId: targetUser._id,
                senderId: req.user?.id, // The Admin's User ID from auth middleware
                type: NotificationType.ROLE_CHANGED,
                title: "💼 Account Role Updated",
                messageText: `An administrator has updated your profile role authorization to: ${role.toUpperCase()}.`
            });
           
        }

         await Notification.create({
            recipientId: adminId,
            senderId: adminId,
            type: NotificationType.USER_ROLE_CHANGED,
            title: `Success admin converted the role`,
            messageText: `${targetUser.name} ( ${oldRole} ) ,Role is updated to ${targetUser.role}`,
        });

        return res.status(200).json({
            message: "User role updated successfully by admin",
            user: {
                id: targetUser._id,
                name: targetUser.name,
                 email: targetUser.email,
                city: targetUser.city,
                district: targetUser.district,
                locality: targetUser.locality,
                phoneNo: targetUser.phoneNo,
                role: targetUser.role
            }
        });
    } catch (error) {
        logError("adminUpgradeRole", error);
        return res.status(500).json(toErrorResponse(error));
    }
};