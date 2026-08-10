import crypto from "crypto";

export default function generateHash(n) {
    return crypto
        .createHash("sha256")
        .update(n)
        .digest("hex");
}