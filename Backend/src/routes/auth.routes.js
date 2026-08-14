import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { googleLoginValidator, loginValidator, signupValidator } from "../validators/auth.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import { DEFAULT_RATE } from "../config/config.js";

const router = Router();
router.get("/rate-limit-test", rateLimiter(DEFAULT_RATE), (req, res) => {
    res.status(200).json({
        success: true,
        message: "lalalalla",
    })
});

router.post(
    "/signup",
    signupValidator,
    validate,
    authController.signup
);

router.post(
    "/verifyOtp",
    authController.verifyOtp
);

router.post(
    "/login",
    loginValidator,
    validate,
    authController.login
);

router.post(
    "/logout",
    verifyJWT,
    authController.logout
);

router.post(
    "/refresh-token",
    authController.refreshAccessToken
);

router.get(
    "/me",
    verifyJWT,
    authController.getCurrentUser
);

router.post(
    "/google",
    googleLoginValidator,
    validate,
    authController.googleLogin
);

export default router;