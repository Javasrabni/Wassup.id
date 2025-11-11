import UserAccount from "@/models/UserAccount";
import { connectDB } from "../db/mongodb";

export async function GetDetailUsersProfile(slug?:string) {
    await connectDB()
    const filter = slug ? {username: slug} : {}
    const data = await UserAccount.findOne(filter).select("-password")
    return JSON.parse(JSON.stringify(data))
}