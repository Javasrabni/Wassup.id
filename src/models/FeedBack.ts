import mongoose from "mongoose";

const FeedBackPost = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.models.FeedBackPost || mongoose.model("FeedBackPost", FeedBackPost)