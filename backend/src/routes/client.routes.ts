import express from "express";
import {
submitPropertyInquiry,
} from "../controllers/client.controller";


import { authenticate, authorize } from "../middleware/auth.middleware";
import { Role } from "../models/user.model";
import { uploadCheck } from "../middleware/uploadCheck.middleware"; // For profile picture

const router = express.Router();


// 1. User Action: Submit inquiry contact form for a specific property
router.post("/property/:propertyId/inquiry", authenticate, authorize(Role.USER), submitPropertyInquiry);

export default router;