import { redis } from "../config/redis.js";

const rateLimiter = ({LIMIT, WINDOW}) => {
    return async (req, res, next) => {
        try {
            const ip = req.ip;
            const unique_id = req.headers["x-client-id"];

            if (!unique_id) {
                return res.status(400).json({
                    success: false,
                    message: "Unique Id is not found in request header"
                })
            }

            const key = `rate_limit:${ip}:${unique_id}`;

            const count = await redis.incr(key);

            const ttl = await redis.ttl(key);

            if (ttl === -1) {
                await redis.expire(key, WINDOW);
            }
            // console.log("TTL:", ttl);

            if (count > LIMIT) {
                return res.status(429).json({
                    success: false,
                    message: "Too many requests, please try again later"
                })
            }

            next();

        } catch (err) {
            console.error("Rate limiter error", err);
            next();
        }
    }
}

export default rateLimiter;