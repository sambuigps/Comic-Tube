import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

        otp: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true
        },
    }
);

pendingUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

pendingUserSchema.pre("save", async function () {
    if (this.isModified("password") && this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    if (this.isModified("otp") && this.otp) {
        this.otp = await bcrypt.hash(this.otp, 10);
    }
});

pendingUserSchema.methods.isOtpCorrect = async function (otp) {
    if (!this.otp) return false;

    return bcrypt.compare(otp, this.otp);
};

export const PendingUser = mongoose.model("PendingUser", pendingUserSchema);