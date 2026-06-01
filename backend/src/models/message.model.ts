import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    messageText: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>(
    {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        messageText: { type: String, required: true, trim: true },
        isRead: { type: Boolean, default: false }
    },
    { timestamps: true }
);

// High-performance indexing for rapid message retrieval and layout updates
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;