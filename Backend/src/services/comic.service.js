import { User } from "../models/user.model.js";
import { Comic } from "../models/comic.model.js";
import { ApiError } from "../utils/ApiError.js";

const getUserComics = async function ({ userId }) {
    const userComics = await Comic.find({ owner: userId });
    return userComics;
};

const createComic = async function ({ userId, comicData }) {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const comic = await Comic.findOne({title: comicData.title});

    if(comic){
        throw new ApiError(400, "Comic already exists");
    }

    const new_comic = await Comic.create({
        owner: userId, ...comicData
    });
    return new_comic;
}

export { getUserComics, createComic };