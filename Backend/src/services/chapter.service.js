import { User } from "../models/user.model.js";
import { Comic } from "../models/comic.model.js";
import { Chapter } from "../models/chapter.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { extractImages, getImageCount } from "../utils/pdfHandler.js";
import path from "path";
import fs from "fs/promises";

const getComicChapters = async function ({ userId, comicId }) {
    const comic = await Comic.findById(comicId);
    if (!comic)
        throw new Error(400, "Comic does not exist");
    if (comic.owner.toString() !== userId.toString())
        throw new Error(403, "Comic is private");

    const comicChapters = await Chapter.find({ comic: comicId });
    return comicChapters;
};

const uploadSingle = async function ({ userId, comicId, file, title }) {
    if (!file || !file.path || !file.destination) {
        throw new ApiError(400, "Upload a single pdf file");
    }

    const comic = await Comic.findById(comicId);
    if (!comic) {
        throw new ApiError(400, "Comic not found");
    }
    if (comic.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You cannot modify this comic");
    }

    let pages;
    try {
        const images = await extractImages(file.path, file.destination);
        pages = await Promise.all(
            images.map(async (image) => {
                try {
                    const result = await uploadOnCloudinary(image);
                    return result.secure_url;
                } catch (err) {
                    throw new ApiError(500, "Failed to upload page to Cloudinary");
                }
            })
        );
    } catch (err) {
        if (err instanceof ApiError)
            throw err;
        
        console.error(err)
        throw new ApiError(500, "Internal Server Error");
    } finally {
        await fs.rm(file.destination, {
            recursive: true,
            force: true
        });
    }

    const chapterCount = comic.chapterCount;
    const chapter = await Chapter.create({
        comic: comicId,
        chapterNumber: chapterCount + 1,
        title,
        pages,
    });
    comic.chapterCount++;
    await comic.save();

    return chapter;
}

export { getComicChapters, uploadSingle };