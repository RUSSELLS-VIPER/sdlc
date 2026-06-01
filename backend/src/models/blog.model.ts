import mongoose from "mongoose";

export interface IBlog extends mongoose.Document {
    title: string;
    subtitle: string;
    content: string;
    image?: {
        data: Buffer;
        contentType: string;
    };
    createdBy: mongoose.Types.ObjectId;
}

const blogSchema = new mongoose.Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, required: true, trim: true },
        content: { type: String, trim: true, default: "" },
        image: {
            data: Buffer,
            contentType: String
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
