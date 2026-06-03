import { Response } from "express";
import mongoose from "mongoose";
import User, { Role } from "../models/user.model";
import Property from "../models/property.model";
import ContactSubmission, { RequestAction } from "../models/contactSubmissions.model";
import Notification, { NotificationType } from "../models/notification.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logError, toErrorResponse } from "../utils/error";

export const submitPropertyInquiry = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { propertyId } = req.params;
        const { messageText } = req.body;
        const buyerId = req.user?.id;

        const userData = await User.findById(buyerId);
        if(!userData)return res.status(400).json({ message: "Not valid buyer" });

        if ( !messageText) {
            return res.status(400).json({ message: "Your inquiry/proposal is required." });
        }

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        if (property.status !== "Available") {
            return res.status(400).json({ message: "Property is no longer available." });
        }

        // ==========================================
        // ANTI-SPAM GUARD CHECK
        // ==========================================
        // Check if this user already has an active 'pending' inquiry for this exact property
        const existingPendingInquiry = await ContactSubmission.findOne({
            propertyId: property._id,
            buyerId: buyerId,
            requestAction: RequestAction.PENDING,
            isDeleted: false
        });

        if (existingPendingInquiry) {
            return res.status(400).json({ 
                message: "You have already submitted an inquiry for this property. Please wait for the agent to review your pending request." 
            });
        }
        // ==========================================

        // Create the clean Inquiry Record entry
        const inquiryDoc = await ContactSubmission.create({
            propertyId: property._id,
            buyerId,
            agentId: property.createdBy,
            name:userData.name,
            email:userData.email,
            messageText
        });

        // NOTIFICATION TYPE 2: Sent to User
        await Notification.create({
            recipientId: buyerId,
            senderId: buyerId,
            type: NotificationType.BUY_REQUEST_PENDING,
            title: "⏳ Inquiry Request Lodged",
            messageText: `Your inquiry for "${property.title}" has been sent. Waiting for agent review approval.`,
            relatedPropertyId: property._id
        });

        // NOTIFICATION TYPE 3: Sent to Agent
        await Notification.create({
            recipientId: property.createdBy,
            senderId: buyerId,
            type: NotificationType.BUY_REQUEST_RECEIVED,
            title: "🔔 New Property Inquiry",
            messageText: `${userData.name} has sent an inquiry request for your property listing: "${property.title}".`,
            relatedPropertyId: property._id
        });

        return res.status(201).json({
            message: "Inquiry submitted successfully to the property agent.",
            inquiry: inquiryDoc
        });
    } catch (error) {
        logError("submitPropertyInquiry", error);
        return res.status(500).json(toErrorResponse(error));
    }
};



