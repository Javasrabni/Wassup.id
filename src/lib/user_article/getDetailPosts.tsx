import CreateArticle from "@/models/CreateArticle";
import { connectDB } from "../db/mongodb";
import { Types } from "mongoose";
import UserAccount from "@/models/UserAccount";
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
  komentarField: string;
  authorID: string;
  isUpdated: boolean;
}



export async function GetArticleDetail({slug, id} : {slug?:string; id?: string}): Promise<ArticleType | null> {
  await connectDB();
  const article = await CreateArticle.findById(id).lean<ArticleType>();
  const user = await UserAccount.findOne({username: article?.author});
  if (!article) return null;
  return {
    ...article,
    authorID: user?._id.toString(),
    _id: article._id.toString(),
    updatedAt: article.updatedAt.toString(),
    createdAt: article.createdAt.toString()
  };
}
