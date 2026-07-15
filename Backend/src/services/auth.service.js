import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { OAuth2Client } from "google-auth-library";
import { generateUniqueUsername } from "../utils/generateUsername.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async ({ idToken }) => {
    if (!idToken) {
        throw new ApiError(400, "Google ID token is required");
    }

    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
        throw new ApiError(401, "Invalid Google token");
    }

    const {
        sub,
        email,
        name,
        picture,
        email_verified,
    } = payload;

    if (!email_verified) {
        throw new ApiError(401, "Google account email is not verified");
    }

    let user = await User.findOne({
        $or: [
            { googleId: sub },
            { email },
        ],
    });

    if (!user) {
        const username = await generateUniqueUsername(name, email);

        user = await User.create({
            username,
            email,
            avatar: picture || "/avatars/avatar.webp",
            provider: "google",
            googleId: sub,
        });
    } else if (!user.googleId) {
        user.googleId = sub;

        if (!user.avatar || user.avatar === "/avatars/avatar.webp") {
            user.avatar = picture || user.avatar;
        }

        await user.save({
            validateBeforeSave: false,
        });
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user);

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: loggedInUser,
        accessToken,
        refreshToken,
    };
};

const generateAccessAndRefreshTokens = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken,
        refreshToken,
    };
};

const signup = async ({ username, email, password }) => {
    const existingUser = await User.findOne({
        $or: [
            { username },
            { email },
        ],
    });

    if (existingUser) {
        if (existingUser.username === username) {
            throw new ApiError(409, "Username already exists");
        }

        throw new ApiError(409, "Email already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user);

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: createdUser,
        accessToken,
        refreshToken,
    };
};

const login = async ({ emailOrUsername, password }) => {
    const user = await User.findOne({
        $or: [
            { email: emailOrUsername.toLowerCase() },
            { username: emailOrUsername.toLowerCase() }
        ]
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user);

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: loggedInUser,
        accessToken,
        refreshToken,
    };
};

const logout = async (userId) => {
    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );
};

import jwt from "jsonwebtoken";

const refreshAccessToken = async (incomingRefreshToken) => {

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token expired or used");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user);

        return {
            accessToken,
            refreshToken,
        };

    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");
    }
};

const getCurrentUser = async (user) => {
    return user;
};

export {
    signup,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    googleLogin
};