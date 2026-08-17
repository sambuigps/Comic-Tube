import multer from "multer";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { fileSizeLimit } from "../constants.js";
import { removeDirectory } from "../utils/fileHandler.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uuid = crypto.randomUUID();
        const uploadDir = path.join(process.cwd(), "public", "temp", uuid);

        fs.mkdir(uploadDir, { recursive: true })
            .then(() => {
                req.addCleanup(() => removeDirectory(uploadDir));
                cb(null, uploadDir);
            })
            .catch((err) => {
                cb(err);
            });
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage,
    limits: {
        fileSize: fileSizeLimit,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new ApiError(400, "Only PDF files are allowed"));
        }

        cb(null, true);
    }
});

export const uploadImage = multer({
    storage,
    limits: {
        fileSize: fileSizeLimit,
    },
    fileFilter: (req, file, cb) => {
        const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            return cb(
                new ApiError(
                    400,
                    "Only JPG, JPEG, PNG and WEBP files are allowed"
                )
            );
        }

        cb(null, true);
    }
});