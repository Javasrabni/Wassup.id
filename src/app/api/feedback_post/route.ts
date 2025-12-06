import { connectDB } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import FeedBack from "@/models/FeedBack";

export async function POST(req: Request){
    try {
        await connectDB()
        const {value} = await req.json()
        if(!value) {
            return NextResponse.json({success: false, message: "Tidak boleh kosong"})
        }

        if(value.length > 350 || value.length < 20) {
            return NextResponse.json({success: false, message: "Melebihi batas/terlalu sedikit"})
        }

        const postFeedback = new FeedBack({value: value})
        await postFeedback.save()

        return NextResponse.json({success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: "Gagal mengirim FeedBack.", error})
    }
}