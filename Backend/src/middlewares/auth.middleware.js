import jwt from "jsonwebtoken";
import axios from "axios";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ACCESS_TOKEN_SECRET, GOOGLE_CLIENT } from "../config/config.js";
import { GoogleOAuthURL } from "../constants.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    // console.log(req.cookies);
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            token,
            ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(401, "Access token is invalid or expired");
    }
});

export const resolveGoogleIdToken = asyncHandler(async (req, res, next) => {
    const { platformType } = req.body;

    if (platformType === "web") return next();

    const { code, codeVerifier, redirectUri } = req.body;
    if (!code || !codeVerifier || !redirectUri)
        throw new ApiError(400, "code is required");

    const tokenRes = await axios.post(
        GoogleOAuthURL,
        null,
        {
            params: {
                client_id: GOOGLE_CLIENT.APP.ID,
                client_secret: GOOGLE_CLIENT.APP.SECRET,
                code,
                code_verifier: codeVerifier,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
            },
        }
    );

    const idToken = tokenRes.data.id_token;

    if (!idToken) {
        throw new ApiError(401, "Failed to obtain Google ID token");
    }

    req.body.idToken = idToken;
    next();
});