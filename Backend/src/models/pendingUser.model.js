import mongoose, { Schema } from "mongoose";

const pendingUserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        otpHash: {
            type: String,
            required: true,
            trim: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            expires: process.env.AUTH_OTP_EXPIRY
        },
    }
);

export const PendingUser = mongoose.model("PendingUser", pendingUserSchema);