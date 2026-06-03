import mongoose, { Schema, Document } from "mongoose";

export enum RequestAction {
    PENDING = "pending",
    APPROVED = "approved",
    DISAPPROVED = "disapproved"
}

export interface IContactSubmission extends Document {
    propertyId: mongoose.Types.ObjectId;
    buyerId: mongoose.Types.ObjectId;
    agentId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    messageText: string;
    requestAction: RequestAction;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
    {
        propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
        buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        messageText: { type: String, required: true },
        requestAction: {
            type: String,
            enum: Object.values(RequestAction),
            default: RequestAction.PENDING
        },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

// High-speed index mappings for quick dashboard lookups
contactSubmissionSchema.index({ agentId: 1, isDeleted: 1, requestAction: 1 });
contactSubmissionSchema.index({ buyerId: 1, isDeleted: 1 });

export default mongoose.model<IContactSubmission>("ContactSubmission", contactSubmissionSchema);