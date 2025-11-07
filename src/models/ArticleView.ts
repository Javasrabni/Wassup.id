import mongoose, { Schema, Document, model } from "mongoose";

export interface IArticleView extends Document {
  articleSlug: string;
  view: number;
}

const ArticleViewSchema: Schema = new Schema({
  articleSlug: { type: String, required: true},
  view: { type: Number, required: true, default: 0 }
});

export default mongoose.models.ArticleView || model<IArticleView>("ArticleView", ArticleViewSchema);
