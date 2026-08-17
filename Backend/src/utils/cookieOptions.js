import ms from "ms";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/config.js";

export const accessTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ms(ACCESS_TOKEN_EXPIRY), 
};

export const refreshTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ms(REFRESH_TOKEN_EXPIRY), 
};