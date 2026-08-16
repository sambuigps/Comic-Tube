import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as chapterController from "../controllers/chapter.controller.js";
import * as rates from "../config/rates.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get(
    "/comicChapters",
    verifyJWT,
    rateLimiter(rates.STRICT_RATE),
    chapterController.getComicChapters
);

router.post(
    "/uploadSingle",
    verifyJWT,
    rateLimiter(rates.STRICT_RATE),
    upload.single("chapterPDF"),
    chapterController.uploadSingle,
);

export default router;