import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import * as chapterService from "../services/chapter.service.js";

const getComicChapters = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const comicChapters = await chapterService.getComicChapters({ userId, comicId });

    return res
        .status(200, "User comics fetched successfully")
        .json(
            new ApiResponse(
                200,
                comicChapters,
                "Comic chapters fetched successfully"
            )
        );
});

export { getComicChapters };