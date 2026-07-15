import { User } from "../models/user.model.js";

export const generateUniqueUsername = async (name, email) => {
    let baseUsername = (
        name || email.split("@")[0]
    )
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9_]/g, "");

    if (!baseUsername) {
        baseUsername = "user";
    }

    let username = baseUsername;

    while (await User.findOne({ username })) {
        username = `${baseUsername}${Math.floor(
            1000 + Math.random() * 9000
        )}`;
    }

    return username;
};