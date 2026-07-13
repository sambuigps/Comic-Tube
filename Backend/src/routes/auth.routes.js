import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupValidator } from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/signup",
    signupValidator,
    validate,
    authController.signup
);

export default router;