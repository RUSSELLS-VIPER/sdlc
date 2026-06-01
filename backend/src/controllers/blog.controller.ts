import { Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/blog.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { logError, toErrorResponse } from "../utils/error";

const toSafeBlogResponse = (blog: any) => {
    const obj = blog.toObject ? blog.toObject() : blog;
    const rawImageData = obj?.image?.data;
    let imageBuffer: Buffer | null = null;

    if (Buffer.isBuffer(rawImageData)) {
        imageBuffer = rawImageData;
    } else if (rawImageData?.buffer && Buffer.isBuffer(rawImageData.buffer)) {
        imageBuffer = rawImageData.buffer;
    } else if (rawImageData instanceof Uint8Array) {
        imageBuffer = Buffer.from(rawImageData);
    }

    return {
        ...obj,
        image: imageBuffer && obj?.image?.contentType
            ? `data:${obj.image.contentType};base64,${imageBuffer.toString("base64")}`
            : null
    };
};

export const createBlogPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ message: "Invalid user id in token" });
        }

        const title = String(req.body.title || "").trim();
        const subtitle = String(req.body.subtitle || "").trim();
        const content = String(req.body.content || "").trim();

        if (!title || !subtitle || !content) {
            return res.status(400).json({ message: "title, subtitle, and content are required" });
        }

        const blog = await Blog.create({
            title,
            subtitle,
            content,
            createdBy: new mongoose.Types.ObjectId(req.user.id),
            image: req.file
                ? {
                      data: req.file.buffer,
                      contentType: req.file.mimetype
                  }
                : undefined
        });

        return res.status(201).json({
            message: "Blog post created successfully",
            blog: toSafeBlogResponse(blog)
        });
    } catch (error) {
        logError("createBlogPost", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

export const getBlogPosts = async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const blogPosts = await Blog.find().sort({ createdAt: -1 }).populate("createdBy", "name email role");
        return res.status(200).json(blogPosts.map((blogPost) => toSafeBlogResponse(blogPost)));
    } catch (error) {
        logError("getBlogPosts", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

export const getBlogPostById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const blogPost = await Blog.findById(req.params.id).populate("createdBy", "name email role");

        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        return res.status(200).json(toSafeBlogResponse(blogPost));
    } catch (error) {
        logError("getBlogPostById", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

export const updateBlogPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const blogPost = await Blog.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        const title = req.body.title !== undefined ? String(req.body.title).trim() : undefined;
        const subtitle = req.body.subtitle !== undefined ? String(req.body.subtitle).trim() : undefined;
        const content = req.body.content !== undefined ? String(req.body.content).trim() : undefined;

        if (title !== undefined) {
            if (!title) {
                return res.status(400).json({ message: "title cannot be empty" });
            }
            blogPost.title = title;
        }

        if (subtitle !== undefined) {
            if (!subtitle) {
                return res.status(400).json({ message: "subtitle cannot be empty" });
            }
            blogPost.subtitle = subtitle;
        }

        if (content !== undefined) {
            if (!content) {
                return res.status(400).json({ message: "content cannot be empty" });
            }
            blogPost.content = content;
        }

        if (req.file) {
            blogPost.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        await blogPost.save();

        return res.status(200).json({
            message: "Blog post updated successfully",
            blog: toSafeBlogResponse(blogPost)
        });
    } catch (error) {
        logError("updateBlogPost", error);
        return res.status(500).json(toErrorResponse(error));
    }
};

export const deleteBlogPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const blogPost = await Blog.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        await blogPost.deleteOne();

        return res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
        logError("deleteBlogPost", error);
        return res.status(500).json(toErrorResponse(error));
    }
};
