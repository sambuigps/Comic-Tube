export const PORT = process.env.PORT;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const MONGODB_URI = process.env.MONGODB_URI;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_CLOUD_SECRET = process.env.CLOUDINARY_CLOUD_SECRET;

export const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;
export const BUSINESS_EMAIL_PASSWORD = process.env.BUSINESS_EMAIL_PASSWORD;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const AUTH_OTP_EXPIRY = Number(process.env.AUTH_OTP_EXPIRY);

export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;

export const DEFAULT_RATE = {
    LIMIT : Number(process.env.DEFAULT_RATE_LIMIT),
    WINDOW : Number(process.env.DEFAULT_RATE_WINDOW)
}