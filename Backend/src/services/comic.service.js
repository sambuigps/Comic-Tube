import { User } from "../models/user.model.js";
import { Comic } from "../models/comic.model.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

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

const addToStarred = async ({ userId, comicId }) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const comic = await Comic.findById(comicId).session(session);

        if (!comic) {
            throw new ApiError(404, "Comic does not exist");
        }

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                starred: { $ne: comicId }
            },
            {
                $addToSet: {
                    starred: comicId
                }
            },
            {
                new: true,
                session
            }
        );

        if (!user) {
            throw new ApiError(400, "Comic already starred");
        }

        await Comic.findByIdAndUpdate(
            comicId,
            {
                $inc: {
                    starCnt: 1
                }
            },
            {
                session
            }
        );

        await session.commitTransaction();
        return user;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

export { getUserComics, createComic, addToStarred };