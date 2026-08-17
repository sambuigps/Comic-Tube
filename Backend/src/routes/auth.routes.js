import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { googleLoginValidator, loginValidator, signupValidator } from "../validators/auth.validator.js";
import { resolveGoogleIdToken, verifyJWT } from "../middlewares/auth.middleware.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import * as rates from "../config/rates.js";
import validatePlatform from "../middlewares/validatePlatform.middleware.js";


const router = Router();
router.get("/rate-limit-test", rateLimiter(), (req, res) => {
    res.status(200).json({
        success: true,
        message: "rate limiter has not reached its limit yet!",
    })
});

router.post(
    "/signup",
    rateLimiter(rates.STRICT_RATE),
    signupValidator,
    validate,
    authController.signup
);

router.post(
    "/verifyOtp",
    validatePlatform,
    rateLimiter(rates.STRICT_RATE),
    authController.verifyOtp
);

router.post(
    "/login",
    validatePlatform,
    rateLimiter(rates.LENIENT_RATE),
    loginValidator,
    validate,
    authController.login
);

router.post(
    "/logout",
    validatePlatform,
    verifyJWT,
    rateLimiter(rates.LENIENT_RATE),
    authController.logout
);

router.post(
    "/refresh-token",
    validatePlatform,
    rateLimiter(rates.STRICT_RATE),
    authController.refreshAccessToken
);

router.get(
    "/me",
    verifyJWT,
    rateLimiter(rates.STRICT_RATE),
    authController.getCurrentUser
);

router.post(
    "/google",
    validatePlatform,
    rateLimiter(rates.STRICT_RATE),
    resolveGoogleIdToken,
    googleLoginValidator,
    validate,
    authController.googleLogin
);

export default router;