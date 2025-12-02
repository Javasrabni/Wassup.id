import CreateArticle from "@/models/CreateArticle";
import { connectDB } from "../db/mongodb";

export async function GetUserArticlePosts(options?: {username?: string; pengecualian?:string[]}) {
    await connectDB()
    const filter:any = {}

    if(options?.username) {
        filter.author = options.username
    }

    if(options?.pengecualian && options.pengecualian.length > 0) {
        filter._id = {$ne: options.pengecualian}
    }

    const data = await CreateArticle.find(filter).sort({createdAt: -1})
    return JSON.parse(JSON.stringify(data))
}