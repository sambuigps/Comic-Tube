import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { OAuth2Client } from "google-auth-library";
import { generateUniqueUsername } from "../utils/generateUsername.js";
import jwt from "jsonwebtoken";
import { PendingUser } from "../models/pendingUser.model.js";
import generateOtp from "../Factories/otp.factory.js";
import sendMail from "../utils/mailer.js";
import signUpOtpEmail from "../Factories/signUpOtpEmail.factory.js";
import { AUTH_OTP_EXPIRY, GOOGLE_CLIENT_ID, REFRESH_TOKEN_SECRET } from "../config/config.js";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleLogin = async ({ idToken }) => {
    if (!idToken) {
        throw new ApiError(400, "Google ID token is required");
    }

    const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
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
        throw new ApiError(409, "Username/Email already exists");
    }

    const existingPendingEmail = await PendingUser.findOne({ email });

    const existingPendingUsername = await PendingUser.findOne({ username });

    if (existingPendingEmail) {
        const samePendingUser =
            existingPendingUsername &&
            existingPendingEmail._id.equals(existingPendingUsername._id);

        if (!existingPendingUsername || samePendingUser) {
            await PendingUser.deleteOne({ _id: existingPendingEmail._id });
        } else {
            throw new ApiError(409, "Username/Email already exists");
        }
    } else if (existingPendingUsername) {
        throw new ApiError(409, "Username/Email already exists");
    }

    const otp = generateOtp();

    const user = await PendingUser.create({
        username,
        email,
        password,
        otp,
        expiresAt: new Date(Date.now() + 1000 * AUTH_OTP_EXPIRY)
    });

    if (!user) {
        throw new ApiError(500, "Failed to sign up");
    }

    const { body, subject } = signUpOtpEmail(otp, username);

    sendMail(email, subject, body);

    return;
};

const verifyOtp = async ({ email, otp }) => {

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
        throw new ApiError(404, "Otp expired");
    }

    const isOtpCorrect = await pendingUser.isOtpCorrect(otp);

    if (!isOtpCorrect) {
        throw new ApiError(400, "Entered otp was not correct.");
    }

    const existingUser = await User.findOne({
        $or: [
            { username: pendingUser.username },
            { email: pendingUser.email },
        ],
    });

    if (existingUser) {
        throw new ApiError(409, "Username/Email already exists");
    }

    const user = await User.create({
        username: pendingUser.username,
        email: pendingUser.email,
        password: pendingUser.password,
    });

    if (!user) {
        throw new ApiError(500, "Failed to sign up");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user);

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    await PendingUser.deleteOne({ _id: pendingUser._id });

    return {
        user: createdUser,
        accessToken,
        refreshToken,
    };
}

const login = async ({ emailOrUsername, password }) => {
    const user = await User.findOne({
        $or: [
            { email: emailOrUsername.toLowerCase() },
            { username: emailOrUsername.toLowerCase() }
        ]
    });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
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

const refreshAccessToken = async (incomingRefreshToken) => {

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            REFRESH_TOKEN_SECRET
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
    verifyOtp,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    googleLogin
};