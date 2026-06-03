import mongoose, { Schema, Document } from "mongoose";

export enum NotificationType {
    ROLE_CHANGED = "ROLE_CHANGED",             // Type 1: User upgraded to Agent by Admin
    USER_ROLE_CHANGED = "USER_ROLE_CHANGED",   // Type 2: Sent to Admin (User profile updated)
    BUY_REQUEST_PENDING = "BUY_REQUEST_PENDING", // Type 3: Sent to User (Waiting for Agent approval)
    BUY_REQUEST_RECEIVED = "BUY_REQUEST_RECEIVED",// Type 4: Sent to Agent (User wants to buy)
    PROPERTY_APPROVED = "PROPERTY_APPROVED"     // Type 5: Sent to User (Agent approved, status Sold)
}

export interface INotification extends Document {
    recipientId: mongoose.Types.ObjectId; // Who sees this notification
    senderId?: mongoose.Types.ObjectId;    // Who triggered it (Admin/Agent/User)
    type: NotificationType;
    title: string;
    messageText: string;
    relatedPropertyId?: mongoose.Types.ObjectId; // Reference to property if applicable
    isRead: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
    {
        recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: { type: String, enum: Object.values(NotificationType), required: true },
        title: { type: String, required: true },
        messageText: { type: String, required: true },
        relatedPropertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
        isRead: { type: Boolean, default: false }
    },
    { timestamps: true }
);

// High-performance index for fast sidebar loading
notificationSchema.index({ recipientId: 1, createdAt: -1 });

export default mongoose.model<INotification>("Notification", notificationSchema);