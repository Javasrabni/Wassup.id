import { connectDB } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import CreateArticle from "@/models/CreateArticle";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { articleId } = await req.json();
    if (!articleId) {
      return NextResponse.json({
        success: false,
        message: "ID tidak ditemukan",
      });
    }

    await CreateArticle.findByIdAndUpdate(articleId, { $inc: { view: 1 } });
    return NextResponse.json({success: true})
  } catch (error) {
    return NextResponse.json({ success: false, message: "Gagal update view" });
  }
}
