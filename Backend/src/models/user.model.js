import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
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

        password: {
            type: String,
            required: function () {
                return this.provider === "local";
            },
        },

        avatar: {
            type: String,
            default: "/avatars/avatar.webp",
        },

        provider: {
            type: String,
            enum: ["local", "google", "github", "guest"],
            default: "local",
        },

        isGuest: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
            default: null,
        },

        resetPasswordToken: {
            type: String,
            default: null,
        },

        resetPasswordExpire: {
            type: Date,
            default: null,
        },

        starred: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comic",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    if (!this.password) return false;

    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; 

    return resetToken;
};

export const User = mongoose.model("User", userSchema);