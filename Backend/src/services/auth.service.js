import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshTokens = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken,
        refreshToken,
    };
};

const signup = async ({ username, email, password }) => {
    const existingUser = await User.findOne({
        $or: [
            { username },
            { email },
        ],
    });

    if (existingUser) {
        if (existingUser.username === username) {
            throw new ApiError(409, "Username already exists");
        }

        throw new ApiError(409, "Email already exists");
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    if (!user) {
        throw new ApiError(500, "Failed to create user");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user);

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: createdUser,
        accessToken,
        refreshToken,
    };
};

export {
    signup,
};