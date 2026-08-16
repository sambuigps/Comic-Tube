import multer from "multer";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uuid = crypto.randomUUID();
        const uploadDir = path.join(process.cwd(), "public", "temp", uuid);

        fs.mkdir(uploadDir, { recursive: true })
            .then(() => {
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

export const upload = multer({ storage });
