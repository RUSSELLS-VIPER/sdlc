import express from "express";
import {
   getAdminDashboard,
   getAdminCustomerList
} from "../controllers/admin.controller";


import { authenticate, authorize } from "../middleware/auth.middleware";
import { Role } from "../models/user.model";
import { uploadCheck } from "../middleware/uploadCheck.middleware"; // For profile picture

const router = express.Router();

// Aggregated analytical route with pagination for part 7
router.get(
    "/dashboard", 
    authenticate, 
    authorize(Role.ADMIN), 
    getAdminDashboard
);

// Mounts onto your administration root pipeline panel
router.get("/customers-list", authenticate, authorize(Role.ADMIN), getAdminCustomerList);

export default router;