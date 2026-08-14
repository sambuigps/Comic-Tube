import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as comicController from "../controllers/comic.controller.js";

const router = Router();

router.get(
    "/userComics",
    verifyJWT,
    comicController.getUserComics
);

export default router;