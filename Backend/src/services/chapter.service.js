import { User } from "../models/user.model.js";
import { Comic } from "../models/comic.model.js";
import { Chapter } from "../models/chapter.model.js";

const getComicChapters = async function ({ userId, comicId }) {
    const comic = await Comic.findById(comicId);
    if (!comic)
        throw new Error(400, "Comic does not exist");
    if (comic.owner.toString() !== userId.toString())
        throw new Error(403, "Comic is private");

    const comicChapters = await Chapter.find({ comic: comicId });
    return comicChapters;
};

export { getComicChapters };