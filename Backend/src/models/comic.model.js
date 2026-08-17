import mongoose, { Schema } from "mongoose";

const comicSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
    },
    chapterCount: {
        type: Number,
        default: 0
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
    coverImg:{
        type: String,
        default: null
    }
},
    {
        timestamps: true
    });

comicSchema.index({ owner: 1 });
comicSchema.index({ visibility: 1, starCnt: -1, viewCnt: -1 });
comicSchema.index({ visibility: 1, createdAt: -1 });

export const Comic = mongoose.model("Comic", comicSchema);