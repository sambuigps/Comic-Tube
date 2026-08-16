import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export default asyncHandler((req, res, next) => {
    const { platformType } = req.body;
    if (!["web", "app"].includes(platformType))
        throw new ApiError(400, "Platform type is required");
    next();
});