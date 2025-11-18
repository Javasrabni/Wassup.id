import UserAccount from "@/models/UserAccount";
import { connectDB } from "../db/mongodb";
import { notFound } from "next/navigation";
import { Types } from "mongoose";
import CreateArticle from "@/models/CreateArticle";
export async function GetDetailUsersProfile({slug, id}: {slug?:string, id?: string}) {
    await connectDB()
    const filter =  {username: slug, _id: new Types.ObjectId(id)}
    const data = await UserAccount.findOne(filter).select("-password")
    if(!data) {
        return notFound()
    }
    return JSON.parse(JSON.stringify(data))
}