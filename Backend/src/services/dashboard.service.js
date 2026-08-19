import { RECOMMENDATION_COUNT } from "../config/recommendation_count.js";
import { Comic } from "../models/comic.model.js";

const RECOMMENDATION_LIMIT = RECOMMENDATION_COUNT;
const getRecommendations = async () => {
    // popular comics
    const getPopular = await Comic.find({ visibility: "public" })
        .sort({
            starCnt: -1,
            viewCnt: -1
        })
        .limit(RECOMMENDATION_LIMIT)
        .lean();

    //Latest Comics
    const getLatest = await Comic.find({ visibility: "public" })
        .sort({
            createdAt: -1,
        })
        .limit(RECOMMENDATION_LIMIT)
        .lean();

    //Random Comics
    const getRandom = await Comic.aggregate([
        {
            $match: {
                visibility: "public"
            }
        },
        {
            $sample: {
                size: RECOMMENDATION_COUNT
            }
        }
    ]);

    return {
        popular_comics: getPopular,
        latest_comics: getLatest,
        random_comics: getRandom
    }
}


export default { getRecommendations };