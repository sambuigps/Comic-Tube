import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import comicRouter from "./routes/comic.routes.js";
import chapterRouter from "./routes/chapter.routes.js";
import { CORS_ORIGIN } from "./config/config.js";
import { cleanupMiddleware } from "./middlewares/cleanup.middleware.js";

const app = express();
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cleanupMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/comic", comicRouter);
app.use("/api/chapter", chapterRouter);

export { app };