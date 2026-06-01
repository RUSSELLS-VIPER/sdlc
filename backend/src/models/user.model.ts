import mongoose from "mongoose";

export enum Role {
    USER = "user",
    AGENT = "agent",
    ADMIN = "admin"
}

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    city: string;       // New field
    district: string;   // New field
    locality: string;   // New field
    phoneNo:number;     // New field
    isVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    profilePic?: {
        data: Buffer;
        contentType: string;
    };
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER
        },
        city: { type: String, default: "" },       // Default empty string
        district: { type: String, default: "" },   // Default empty string
        locality: { type: String, default: "" },   // Default empty string
        phoneNo: { type: Number, default: 9999999999},   // Default empty string
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: { type: String },
        otpExpiry: { type: Date },
        profilePic: {
            data: { type: Buffer },
            contentType: { type: String }
        }
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
