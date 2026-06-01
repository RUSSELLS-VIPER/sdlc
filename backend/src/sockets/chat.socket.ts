import { Server, Socket } from "socket.io";
import Message from "../models/message.model";

// In-memory mapping of active users to handle private routing pipelines
const activeUserSockets = new Map<string, string>(); // Key: UserId, Value: SocketId

export const initializeChatSockets = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        const userId = socket.handshake.query.userId as string;
        
        if (userId) {
            activeUserSockets.set(userId, socket.id);
        }

        // Real-Time Delivery Trigger Execution Block
        socket.on("sendMessage", async (payload: { senderId: string; receiverId: string; messageText: string }) => {
            const { senderId, receiverId, messageText } = payload;
            try {
                // 1. Persist directly into the database
                const freshMessage = await Message.create({
                    senderId,
                    receiverId,
                    messageText
                });

                const formattedResponse = {
                    _id: freshMessage._id,
                    senderId,
                    receiverId,
                    messageText,
                    createdAt: freshMessage.createdAt,
                    timeLabel: new Date(freshMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                // 2. Transmit packet to receiver immediately if online
                const receiverSocketId = activeUserSockets.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", formattedResponse);
                }

                // 3. Reflect block back to the sender's UI window instance
                socket.emit("messageSentAck", formattedResponse);

            } catch (error) {
                socket.emit("error", { message: "Failed to dispatch message packet cleanly." });
            }
        });

        // Handle client connection clean-up
        socket.on("disconnect", () => {
            if (userId) {
                activeUserSockets.delete(userId);
            }
        });
    });
};