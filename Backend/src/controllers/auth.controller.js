import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    accessTokenOptions,
    refreshTokenOptions,
} from "../utils/cookieOptions.js";
import { PendingUser } from "../models/pendingUser.model.js";

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    await authService.signup({
        username,
        email,
        password,
    });

    return res
        .status(200, "Otp sent successfully")
        .json(
            new ApiResponse(
                200,
                null,
                "Otp sent successfully"
            )
        );
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { platformType, email, otp } = req.body;
    const { user, refreshToken, accessToken } = await authService.verifyOtp({
        email,
        otp
    });

    if (platformType === "web") {
        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "User registered successfully"
                )
            );
    }
    else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { user, accessToken, refreshToken },
                    "User registered successfully"
                )
            );
    }
});

const login = asyncHandler(async (req, res) => {
    const { platformType, emailOrUsername, password } = req.body;
    const { user, accessToken, refreshToken } =
        await authService.login({
            emailOrUsername,
            password,
        });

    if (platformType === "web") {
        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "User logged in successfully"
                )
            );
    }
    else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { user, accessToken, refreshToken },
                    "User logged in successfully"
                )
            );
    }
});

const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user._id);

    if (req.platformType === "web") {
        return res
            .status(200)
            .clearCookie("accessToken", accessTokenOptions)
            .clearCookie("refreshToken", refreshTokenOptions)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Logged out successfully"
                )
            );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Logged out successfully"
                )
            );
    }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken ||
        req.body.refreshToken;

    const { accessToken, refreshToken } =
        await authService.refreshAccessToken(
            incomingRefreshToken
        );

    if (req.platformType === "web") {
        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(new ApiResponse(200, {}, "Access token refreshed successfully"));
    } else {
        return res
            .status(200)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed successfully"));
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user);
    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Current user fetched successfully"
        )
    );
});

const googleLogin = asyncHandler(async (req, res) => {
    const { platformType, idToken } = req.body;
    const {
        user,
        accessToken,
        refreshToken,
    } = await authService.googleLogin({ platformType, idToken });

    if (platformType === "web") {
        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "User logged in successfully"
                )
            );
    }
    else {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { user, accessToken, refreshToken },
                    "User logged in successfully"
                )
            );
    }
});

export {
    signup,
    verifyOtp,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    googleLogin
};