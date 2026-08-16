import { User } from "../models/user.model.js";
import { Comic } from "../models/comic.model.js";
import { Chapter } from "../models/chapter.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { extractImages } from "../utils/pdfHandler.js";

const getComicChapters = async function ({ userId, comicId }) {
    const comic = await Comic.findById(comicId);
    if (!comic)
        throw new Error(400, "Comic does not exist");
    if (comic.owner.toString() !== userId.toString())
        throw new Error(403, "Comic is private");

    const comicChapters = await Chapter.find({ comic: comicId });
    return comicChapters;
};

const uploadSingle = async function ({ userId, file, comicId, title, uploadDir }) {
    if (!file) {
        throw new ApiError(400, "Upload a single pdf file");
    }

    extractImages(file.path, file.destination);

    // const cloudinaryResponse = uploadOnCloudinary(file.path);

    // if (!cloudinaryResponse) {
    //     throw new ApiError(500, "Failed to upload PDF to Cloudinary");
    // }

    
    return [];
    // return cloudinaryResponse.secure_url
}

export { getComicChapters, uploadSingle };