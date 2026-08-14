import { DEFAULT_RATE } from "../config/rates.js";
import { redis } from "../config/redis.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const rateLimiter = ({ Limit, WindowSeconds } = DEFAULT_RATE) => {
    return asyncHandler(async (req, res, next) => {
        const ip = req.ip;
        const userId = req.user?._id;

        const key = userId ? `userId:${userId}` : `ip:${ip}`;

        const count = await redis.incr(key);

        const ttl = await redis.ttl(key);

        if (ttl === -1) {
            await redis.expire(key, WindowSeconds);
        }
        // console.log("TTL:", ttl);

        if (count > Limit) {
            return res.status(429).json({
                success: false,
                message: "Too many requests, please try again later"
            })
        }

        next();
    });
}

export default rateLimiter;