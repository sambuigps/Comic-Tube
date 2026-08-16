import { body } from "express-validator";

export const createComicValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 1, max: 200 })
        .withMessage("Title must be between 1 and 200 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 5000 })
        .withMessage("Description cannot exceed 5000 characters"),

    body("status")
        .optional()
        .isIn(["ongoing", "completed"])
        .withMessage("Status must be either ongoing or completed"),

    body("visibility")
        .optional()
        .isIn(["public", "unlisted", "private"])
        .withMessage(
            "Visibility must be public, unlisted, or private"
        )
];