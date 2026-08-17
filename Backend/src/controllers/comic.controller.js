import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as comicService from "../services/comic.service.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getUserComics = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userComics = await comicService.getUserComics({ userId });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                userComics,
                "User comics fetched successfully"
            )
        );
});

const createComic = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const comicData = req.body;

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(
            req.file.path
        );
        if (!cloudinaryResponse?.secure_url) {
            throw new ApiError(500, "Failed to upload cover image");
        }
        comicData.coverImg = cloudinaryResponse.secure_url;
    }

    const new_comic = await comicService.createComic({
        userId,
        comicData
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                new_comic,
                "Comic created successfully"
            )
        );
});

const addToStarred = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { comicId } = req.params;

    const user = await comicService.addToStarred({
        userId,
        comicId
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            user.starred,
            "Comic added to starred"
        )
    );
});

export { getUserComics, createComic, addToStarred };