import dashboardService from "../services/dashboard.service.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const getRecommendations = asyncHandler(async (req, res) => {
    const recommendations = await dashboardService.getRecommendations();

    return res
        .status(200, "Recommendations fetched successfully")
        .json(
            new ApiResponse(
                200,
                recommendations,
                "Recommendations fetched successfully"
            )
        );
})

export { getRecommendations };