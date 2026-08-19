import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import * as rates from "../config/rates.js";

const router = Router();

router.get(
    "/recommendation",
    verifyJWT,
    rateLimiter(rates.STRICT_RATE),
    dashboardController.getRecommendations
);

export default router;