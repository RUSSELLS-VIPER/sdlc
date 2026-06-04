import { Response } from "express";
import mongoose from "mongoose";
import User, { Role } from "../models/user.model";
import Property from "../models/property.model";
import Message from "../models/message.model";
import Notification from "../models/notification.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logError, toErrorResponse } from "../utils/error";
// Helper to transform raw Mongoose image buffers into web-safe base64 data URLs
const convertBufferToBase64 = (profilePic: any): string | null => {
    if (profilePic && profilePic.data && profilePic.contentType) {
        const base64String = profilePic.data.toString("base64");
        return `data:${profilePic.contentType};base64,${base64String}`;
    }
    return null;
};



/**
 * @desc Get User Profile
 * @route GET /api/users/profile/:id
 */
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select("-password -otp -otpExpiry");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        logError("getUserProfile", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

/**
 * @desc Update Profile (Name, Email, and Profile Picture)
 * @route PUT /api/users/profile/update
 */
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { name, email, city, district, locality, phoneNo } = req.body;

        if (req.file) {
            console.log("[updateUserProfile] received profile image upload:", {
                fieldname: req.file.fieldname,
                mimetype: req.file.mimetype,
                size: req.file.size
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (city) user.city = city;
        if (district) user.district = district;
        if (locality) user.locality = locality;
        if (phoneNo) user.phoneNo = phoneNo;
        // If a file was uploaded via uploadCheck middleware
        if (req.file) {
            user.profilePic = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        await user.save();

        return res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                city: user.city,
                district: user.district,
                locality: user.locality,
                phoneNo: user.phoneNo,
                profilePic: convertBufferToBase64(user.profilePic)
            }
        });
    } catch (error) {
        logError("updateUserProfile", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

/**
 * @desc Toggle Property Favorite (Like System)
 * @route POST /api/users/favorites/:propertyId
 */
export const toggleFavoriteProperty = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { propertyId } = req.params;
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        const isLiked = property.likes.includes(userId);

        if (!isLiked) {
            property.likes.push(userId);
            await property.save();
            return res.json({ message: "Property added to favorites", isLiked: true });
        } else {
            property.likes = property.likes.filter(id => id.toString() !== userId.toString());
            await property.save();
            return res.json({ message: "Property removed from favorites", isLiked: false });
        }
    } catch (error) {
        logError("toggleFavoriteProperty", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

/**
 * @desc Get Logged-in User's Favorite Listings
 * @route GET /api/users/favorites/my-list
 */
export const getUserFavorites = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Fetch properties where this user is in the likes array
        const favorites = await Property.find({ likes: userId })
            .select("-images.data") // Don't send raw buffers in lists
            .populate("createdBy", "name email");

        return res.json(favorites);
    } catch (error) {
        logError("getUserFavorites", error);
        return res.status(500).json(toErrorResponse(error));
    }
};



export const searchChatContacts = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const currentUserId = req.user?.id;
        const currentUserRole = req.user?.role;
        const searchQuery = (req.query.search as string) || "";

        if (!currentUserId || !currentUserRole) {
            return res.status(401).json({ message: "Unauthorized: Missing authentication context" });
        }

        // Determine target visibility based on who is logged in
        let targetRoles: Role[] = [];
        if (currentUserRole === Role.USER) {
            // Regular users need to see Admins and Agents to chat with support
            targetRoles = [Role.ADMIN, Role.AGENT];
        } else {
            // Admins and Agents need to see regular customers/users
            targetRoles = [Role.USER, Role.ADMIN, Role.AGENT];
        }

        // Dynamic filtering match stage
        const matchStage: any = {
            role: { $in: targetRoles },
            name: { $regex: searchQuery, $options: "i" }
        };

        const sidebarUsers = await User.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: "messages",
                    let: { participantId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        {
                                            $and: [
                                                { $eq: ["$senderId", "$$participantId"] },
                                                { $eq: ["$receiverId", new mongoose.Types.ObjectId(currentUserId)] }
                                            ]
                                        },
                                        {
                                            $and: [
                                                { $eq: ["$senderId", new mongoose.Types.ObjectId(currentUserId)] },
                                                { $eq: ["$receiverId", "$$participantId"] }
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 }
                    ],
                    as: "lastMessageArray"
                }
            },
            {
                $addFields: {
                    lastMessage: { $arrayElemAt: ["$lastMessageArray", 0] }
                }
            },
            {
                $project: {
                    name: 1,
                    profilePic: 1,
                    locality: 1,
                    district: 1,
                    role: 1, // Included so frontend knows if they are speaking to an Agent vs Admin
                    latestMessageText: { $ifNull: ["$lastMessage.messageText", "No chats yet"] },
                    latestMessageTime: { $ifNull: ["$lastMessage.createdAt", new Date(0)] }
                }
            },
            { $sort: { latestMessageTime: -1 } }
        ]);


        // FIX: Map over the aggregation results to format the profile pictures safely
        const formattedSidebarUsers = sidebarUsers.map(user => ({
            ...user,
            profilePic: convertBufferToBase64(user.profilePic)
        }));

        return res.status(200).json(formattedSidebarUsers);
    } catch (error) {
         logError("userSearchChat", error);
       return res.status(500).json(toErrorResponse(error));
    }
};




export const getChatHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const currentUserId = req.user?.id;

        // Cast the param to string during destructuring safely
        const targetUserId = req.params.userId as string;

        if (!currentUserId) {
            return res.status(401).json({ message: "Unauthorized: Missing authentication context" });
        }

        // Clean validation execution without type casting tricks on this line
        if (!targetUserId || !mongoose.Types.ObjectId.isValid(targetUserId)) {
            return res.status(400).json({ message: "Bad Request: Invalid or missing target User ID parameter" });
        }

        // 1. Fetch metadata context of the person you are chatting with
        const targetUserContext = await User.findById(targetUserId).select("name profilePic locality district role");
        if (!targetUserContext) {
            return res.status(404).json({ message: "Not Found: Target user profile does not exist" });
        }

        // 2. Fetch all bidirectional messages between the two accounts
        const databaseMessages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: targetUserId },
                { senderId: targetUserId, receiverId: currentUserId }
            ]
        }).sort({ createdAt: 1 }); // Sorted oldest to newest for chronological timeline rendering

        // 3. Post-Process message stream into a formatted timeline array structure
        const structuredTimeline: Record<string, any[]> = {};

        const todayDateString = new Date().toDateString();
        const yesterdayDateString = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

        databaseMessages.forEach((msg) => {
            const messageDate = new Date(msg.createdAt);
            const messageDateString = messageDate.toDateString();

            // Establish clear localized time indicators (e.g., "10:15 AM")
            const formattedTimeLabel = messageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            // Categorize chronological header labels
            let chronologicalHeader = messageDateString;
            if (messageDateString === todayDateString) {
                chronologicalHeader = "Today";
            } else if (messageDateString === yesterdayDateString) {
                chronologicalHeader = "Yesterday";
            } else {
                // Formatting fallback for older periods (e.g., "May 31, 2026")
                chronologicalHeader = messageDate.toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
            }

            // Initialize structural bucket if it doesn't exist yet
            if (!structuredTimeline[chronologicalHeader]) {
                structuredTimeline[chronologicalHeader] = [];
            }

            // Append transformed data package object to timeline group
            structuredTimeline[chronologicalHeader].push({
                _id: msg._id,
                senderId: msg.senderId,
                receiverId: msg.receiverId,
                messageText: msg.messageText,
                isRead: msg.isRead,
                createdAt: msg.createdAt,
                timeLabel: formattedTimeLabel
            });
        });

        // 4. Return clean context payload to populate the UI panel layout instantly
        return res.status(200).json({
            userContext: {
                _id: targetUserContext._id,
                name: targetUserContext.name,
                role: targetUserContext.role,
                locality: targetUserContext.locality || "Not Provided",
                district: targetUserContext.district || "Not Provided",
                profilePic: convertBufferToBase64(targetUserContext.profilePic)
            },
            timeline: structuredTimeline
        });

    } catch (error) {
        logError("getChatHistory", error);
        return res.status(500).json(toErrorResponse(error));
    }
};



export const userSendMessage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const senderId = req.user?.id;
        const { receiverId, messageText } = req.body;

        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized: Missing authentication context" });
        }

        // 1. Strict Request Body Structural Validations
        if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId as string)) {
            return res.status(400).json({ message: "Bad Request: Invalid or missing receiverId" });
        }

        if (!messageText || typeof messageText !== "string" || !messageText.trim()) {
            return res.status(400).json({ message: "Bad Request: messageText content string cannot be blank" });
        }

        // 2. Prevent messaging oneself
        if (senderId === receiverId) {
            return res.status(400).json({ message: "Bad Request: Transmission payload collision. You cannot send a message to yourself" });
        }

        // 3. Verify recipient account profile state in the collection mapping system
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Not Found: The target recipient user does not exist" });
        }

        // 4. Instantiate and save the new transactional message entity
        const newMessage = await Message.create({
            senderId: new mongoose.Types.ObjectId(senderId),
            receiverId: new mongoose.Types.ObjectId(receiverId as string),
            messageText: messageText.trim(),
            isRead: false
        });

        // 5. Return success structure along with localized timestamp markers
        return res.status(201).json({
            message: "Message processed and dispatched successfully",
            data: {
                _id: newMessage._id,
                senderId: newMessage.senderId,
                receiverId: newMessage.receiverId,
                messageText: newMessage.messageText,
                isRead: newMessage.isRead,
                createdAt: newMessage.createdAt,
                timeLabel: new Date(newMessage.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }
        });

    } catch (error) {
        logError("userSendMessage", error);
       return res.status(500).json(toErrorResponse(error));
    }
};



export const getMyNotifications = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: Missing session context" });
        }

        // Fetch user notifications using high-performance indexed compound boundary rules
        const alertCollectionLogs = await Notification.find({ recipientId: req.user.id })
            .populate("senderId", "name email role") // Optional join utility metadata mapping
            .sort({ createdAt: -1 }) // Newest alerts show up first
            .limit(50); // Sensible query ceiling to maximize responsive feedback

        return res.status(200).json({
            success: true,
            count: alertCollectionLogs.length,
            notifications: alertCollectionLogs
        });
    } catch (error) {
        logError("getMyNotifications", error);
        return res.status(500).json(toErrorResponse(error));
    }
};
