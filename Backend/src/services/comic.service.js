import { User } from "../models/user.model.js";
import { Comic } from "../models/comic.model.js";

const getUserComics = async function ({ userId }) {
    const userComics = await Comic.find({ owner: userId });
    return userComics;
};

export { getUserComics };