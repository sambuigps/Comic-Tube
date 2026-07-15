import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { googleLoginValidator, loginValidator, signupValidator } from "../validators/auth.validator.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/signup",
    signupValidator,
    validate,
    authController.signup
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