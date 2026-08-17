import { body } from "express-validator";

export const getComicChaptersValidator = [
    body("comicId")
        .trim()
        .notEmpty()
        .withMessage("Comic ID is required")
        .isMongoId()
        .withMessage("Invalid comic ID"),
];

export const uploadSingleValidator = [
    body("comicId")
        .trim()
        .notEmpty()
        .withMessage("Comic ID is required")
        .isMongoId()
        .withMessage("Invalid comic ID"),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Chapter title is required")
        .isLength({ min: 1, max: 100 })
        .withMessage("Chapter title must be between 1 and 100 characters"),
];
