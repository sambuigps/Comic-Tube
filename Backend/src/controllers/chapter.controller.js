import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import * as chapterService from "../services/chapter.service.js";

const getComicChapters = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const comicChapters = await chapterService.getComicChapters({ userId, comicId });

    return res
        .status(200, "Comic chapters fetched successfully")
        .json(
            new ApiResponse(
                200,
                comicChapters,
                "Comic chapters fetched successfully"
            )
        );
});

const uploadSingle = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const file = req.file;
    const uploadDir = req.uploadDir;
    const { comicId } = req.body;

    const cloudinaryURL = await chapterService.uploadSingle({ userId, file, comicId, uploadDir });

    return res
        .status(200, "Chapter uploaded successfully")
        .json(
            new ApiResponse(
                200,
                cloudinaryURL,
                "Chapter uploaded successfully"
            )
        );
});

export { getComicChapters, uploadSingle };