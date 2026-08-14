import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as chapterController from "../controllers/chapter.controller.js";

const router = Router();

router.get(
    "/comicChapters",
    verifyJWT,
    chapterController.getComicChapters
);

export default router;