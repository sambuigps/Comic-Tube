import generateHash from "../utils/hash.js";
import crypto from "crypto";

export default function generateOtp() {
    const otp = crypto.randomInt(100000, 1000000).toString();
    return otp;
}