import { createClient } from "redis";
import { UPSTASH_REDIS_REST_URL } from "./config.js";

export const redis = createClient({
    url: UPSTASH_REDIS_REST_URL,
})

redis.on("error", (error) => {
    console.error("Redis Client Issue", error);
})

export const connectRedis = async () => {
    try {
        if (!redis.isOpen) {
            await redis.connect();
        }
        console.log("Redis connected");
    } catch (err) {
        console.error("Error in connection with Redis", error);
        throw error;
    }
}