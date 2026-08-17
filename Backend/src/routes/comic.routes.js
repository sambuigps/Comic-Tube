import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as comicController from "../controllers/comic.controller.js";
import * as rates from "../config/rates.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";
import { uploadImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.get(
    "/userComics",
    verifyJWT,
    rateLimiter(rates.STRICT_RATE),
    comicController.getUserComics
);

router.post(
    "/newComic",
    verifyJWT,
    uploadImage.single("coverImg"),
    comicController.createComic
)

router.post(
    "/addToStarred/:comicId",
    verifyJWT,
    rateLimiter(rates.STRICT_RATE),
    comicController.addToStarred
)

export default router;

