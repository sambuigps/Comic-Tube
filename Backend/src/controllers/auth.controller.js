import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    accessTokenOptions,
    refreshTokenOptions,
} from "../utils/cookieOptions.js";

const signup = asyncHandler(async (req, res) => {
    const { platformType ,username, email, password } = req.body;

    await authService.signup({
        username,
        email,
        password,
    });

    return;
    // if(platformType === "web") {
    //     return res
    //     .status(201)
    //     .cookie("accessToken", accessToken, accessTokenOptions)
    //     .cookie("refreshToken", refreshToken, refreshTokenOptions)
    //     .json(
    //         new ApiResponse(
    //             201,
    //             user,
    //             "User registered successfully"
    //         )
    //     );
    // }
    // else{
    //     return res
    //     .status(201)
    //     .json(
    //         new ApiResponse(
    //             201,
    //             { user, accessToken, refreshToken },
    //             "User registered successfully"
    //         )
    //     );
    // }
});

const login = asyncHandler(async (req, res) => {
    const { platformType, emailOrUsername, password } = req.body;
    const { user, accessToken, refreshToken } =
        await authService.login({
            emailOrUsername,
            password,
        });

    if(platformType === "web") {
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
    else{
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

    if(req.platformType === "web") {
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
    }else{
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
    const { idToken } = req.body;
    const {
        user,
        accessToken,
        refreshToken,
    } = await authService.googleLogin({ idToken });

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "Google login successful"
            )
        );
});

export {
    signup,
    login,
    logout,
    refreshAccessToken,
    getCurrentUser,
    googleLogin
};