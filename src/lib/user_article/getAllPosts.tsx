import CreateArticle from "@/models/CreateArticle";
import { connectDB } from "../db/mongodb";

export async function GetUserArticlePosts(username?: string) {
    await connectDB()
    const filter = username ? {author: username} : {}
    const data = await CreateArticle.find(filter).sort({createdAt: -1})
    return JSON.parse(JSON.stringify(data))
}