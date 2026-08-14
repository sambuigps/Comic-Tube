import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { googleLoginValidator, loginValidator, signupValidator } from "../validators/auth.validator.js";
import { resolveGoogleIdToken, verifyJWT } from "../middlewares/auth.middleware.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import { DEFAULT_RATE } from "../config/rates.js";


const router = Router();
router.get("/rate-limit-test", rateLimiter(), (req, res) => {
    res.status(200).json({
        success: true,
        message: "rate limiter has not reached its limit yet!",
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
    resolveGoogleIdToken,
    googleLoginValidator,
    validate,
    authController.googleLogin
);

export default router;