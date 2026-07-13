import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    accessTokenOptions,
    refreshTokenOptions,
} from "../utils/cookieOptions.js";

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const { user, accessToken, refreshToken } =
        await authService.signup({
            username,
            email,
            password,
        });

    return res
        .status(201)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(
            new ApiResponse(
                201,
                user,
                "User registered successfully"
            )
        );
});

const login = asyncHandler(async (req, res) => {
    const { emailOrUsername, password } = req.body;
    const { user, accessToken, refreshToken } =
        await authService.login({
            emailOrUsername,
            password,
        });

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "Logged in successfully"
            )
        );
});

export {
    signup,
    login,
};