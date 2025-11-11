import { NextResponse } from "next/server";
import UserAccount from "@/models/UserAccount";
import { connectDB } from "@/lib/db/mongodb";

export async function GET(request: Request, {params}: {params: {slug: string}}) {
    try {
        await connectDB()
        const slug = decodeURIComponent(params.slug)

        const user = await UserAccount.findOne({username: slug}).select("-password")
        if(!user) {
            return NextResponse.json({message: "Pengguna tidak ditemukan."}, {status: 400})
        }

        return NextResponse.json({user})
    } catch (err) {
            return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
    }
}