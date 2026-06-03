import express from "express";
import {
getAgentInquiryLeads,
handleInquiryAction,
softDeleteInquiry,
getAgentDashboardMetrics
} from "../controllers/agent.controller";


import { authenticate, authorize } from "../middleware/auth.middleware";
import { Role } from "../models/user.model";
import { uploadCheck } from "../middleware/uploadCheck.middleware"; // For profile picture

const router = express.Router();


// Fetch comprehensive performance metrics for the agent landing page screen
router.get(
    "/dashboard-summary", 
    authenticate, 
    authorize(Role.AGENT), 
    getAgentDashboardMetrics
);
// 2. Agent Action: Fetch incoming user inquiries for their properties
router.get("/agent/leads", authenticate, authorize(Role.AGENT), getAgentInquiryLeads);
// 3. Agent Action: Process inquiry request (approve / disapprove)
router.patch("/inquiry/:inquiryId/action", authenticate, authorize(Role.AGENT), handleInquiryAction);

// 4. Multi-Role Action: Soft delete an inquiry record from view screens
router.delete("/inquiry/:inquiryId", authenticate, authorize(Role.USER, Role.AGENT), softDeleteInquiry);

export default router;