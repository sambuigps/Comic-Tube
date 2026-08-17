import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import * as comicService from "../services/comic.service.js";

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

export { getUserComics };