import mongoose, {Schema} from "mongoose";

const effectSchema = new Schema({
    type: {
        type: String,
        enum: [
            "vfxButton", "sfxButton",
            "vfxPage", "sfxPage",
            "bgMusic"
        ],
        required: true
    },
    pageNo: Number,
    startPage: Number,
    endPage: Number,
    x: Number,
    y: Number,
    url: {
        type: String,
        required: true,
        trim: true,
    },
    volume: Number,
    duration: Number,
    loop: {
        type: Boolean,
        required: true
    }
});

const chapterSchema = new Schema({
    comic: {
        type: Schema.Types.ObjectId,
        ref: "Comic",
        required: true
    },
    chapterNumber: {
        type: Number,
        required:true,
    },
    title:{
        type: String,
        required: true,
    },
    pages: [{
        type: String,
        required: true
    }],
    effects: [effectSchema]
},
{
    timestamps: true
});

chapterSchema.index(
    { comic: 1, chapterNumber: 1 },
    { unique: true }
);

chapterSchema.index({ comic: 1 });

export const Chapter = mongoose.model("Chapter", chapterSchema);