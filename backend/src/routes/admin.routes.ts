import express from "express";
import {
   getAdminDashboard,
   getAdminCustomerList,
   adminUpgradeRole
} from "../controllers/admin.controller";
import {
   createBlogPost,
   deleteBlogPost,
   getBlogPostById,
   getBlogPosts,
   updateBlogPost
} from "../controllers/blog.controller";


import { authenticate, authorize } from "../middleware/auth.middleware";
import { Role } from "../models/user.model";
import { uploadCheck } from "../middleware/uploadCheck.middleware";

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

router.get("/blogs", authenticate, authorize(Role.ADMIN), getBlogPosts);
router.get("/blogs/:id", authenticate, authorize(Role.ADMIN), getBlogPostById);
router.post("/blogs", authenticate, authorize(Role.ADMIN), uploadCheck.single("image"), createBlogPost);
router.put("/blogs/:id", authenticate, authorize(Role.ADMIN), uploadCheck.single("image"), updateBlogPost);
router.delete("/blogs/:id", authenticate, authorize(Role.ADMIN), deleteBlogPost);
router.patch("/admin-update-role/:userId", authenticate, authorize(Role.ADMIN), adminUpgradeRole);

export default router;
