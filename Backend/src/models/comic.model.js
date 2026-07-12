import mongoose, {Schema} from "mongoose";

const comicSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description:{
        type: String,
    },
    status: {
        type: String,
        enum: ["ongoing", "completed"],
        default: "ongoing"
    },
    visibility: {
        type: String,
        enum: ["public", "unlisted", "private"],
        default: "public"
    },
    starCnt: {
        type: Number,
        default: 0
    },
    viewCnt: {
        type: Number,
        default: 0
    },
},
{
    timestamps: true
});

comicSchema.index({ owner: 1 });

export const Comic = mongoose.model("Comic", comicSchema);