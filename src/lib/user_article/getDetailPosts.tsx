import CreateArticle from "@/models/CreateArticle";
import { connectDB } from "../db/mongodb";

interface ArticleType {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  featured_article: boolean;
  view: number;
  visibility: string;
}

export async function GetArticleDetail(slug: string): Promise<ArticleType | null> {
  await connectDB();
  const article = await CreateArticle.findOne({ slug }).lean<ArticleType>();
  if (!article) return null;
  return {
    ...article,
    _id: article._id.toString(),
    updatedAt: article.updatedAt.toString(),
    createdAt: article.createdAt.toString()
  };
}
