import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    articleSlug: { type: String, required: true},
    comment: { type: String, required: true, maxlength: [500, "Maksimal 500 kata, jangan memanipulasi dengan Inspect Element."]}
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
