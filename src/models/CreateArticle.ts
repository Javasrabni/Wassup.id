import mongoose from "mongoose";

const CreateArticle = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true
  }, 
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured_article: {
    type: Boolean,
    default: false
  },
  view: {
    type: Number,
    default: 1
  },
  category: {
    type: String,
  },
  visibility: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});

export default mongoose.models.CreateArticle || mongoose.model("CreateArticle", CreateArticle)
