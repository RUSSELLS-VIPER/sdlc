import express from "express";
import {
    getUserProfile,
    updateUserProfile,
    toggleFavoriteProperty,
    getUserFavorites,
     searchChatContacts,
    getChatHistory,
    userSendMessage,
    getMyNotifications
} from "../controllers/user.controller";


import { authenticate, authorize } from "../middleware/auth.middleware";
import { Role } from "../models/user.model";
import { uploadCheck } from "../middleware/uploadCheck.middleware"; // For profile picture

const router = express.Router();

// --- Public Routes ---
// Note: Signup/Login are usually handled in an auth.route.ts, 
// but you can include profile viewing here if public.
router.get("/profile/:id", getUserProfile);

// --- Protected Routes (Requires Login) ---

// 1. Profile Management
// Uses .single('image') to handle the profile picture upload via Multer
router.put(
    "/profile/update", 
    authenticate, 
    uploadCheck.single('image'), 
    updateUserProfile
);


// 2. Favorites / "Like" System
// This allows a user to "like" a property to save it to their list
router.post("/favorites/:propertyId", authenticate, toggleFavoriteProperty);

// Get all properties liked by the current user
router.get("/favorites/my-list", authenticate, getUserFavorites);


// Allow ADMIN, USER, and AGENT roles to hit the sidebar route smoothly
router.get("/search-user-to-chat", authenticate, authorize(Role.ADMIN, Role.USER, Role.AGENT), searchChatContacts);

router.get("/history/:userId", authenticate, authorize(Role.ADMIN, Role.USER, Role.AGENT), getChatHistory);

router.post("/chat/send", authenticate, authorize(Role.ADMIN, Role.USER, Role.AGENT),userSendMessage);

router.get("/my-notifications", authenticate,authorize(Role.ADMIN, Role.USER, Role.AGENT), getMyNotifications);


export default router;