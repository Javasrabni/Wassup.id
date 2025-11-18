import { connectDB } from "@/lib/db/mongodb";
import CreateArticle from "@/models/CreateArticle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      author,
      email,
      title,
      content,
      thumbnail,
      slug, //Edit title
      // description,
      // featured_article,
      // view,
      category,
      visibility,
      komentarField
    } = body;

    if (!author || !email || !title || !content ) {
      return NextResponse.json(
        { success: false, message: "Field wajib tidak boleh kosong." },
        { status: 400 }
      );
    }

    const newArticle = new CreateArticle({
      author,
      email,
      title,
      content,
      thumbnail,
      slug: (slug || title).trim().replaceAll(" ", "-").toLowerCase(),
      description: typeof content === "string" ? content.slice(0, 150) : "",
      category,
      visibility,
      komentarField
    });
    await newArticle.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Gagal mempublikasikan tulisan.",
    });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const {searchParams} = new URL(req.url)
    const username = searchParams.get("username")
    const query = searchParams.get("search")

    let filter = {}

    if(username) {
      filter = {author: username}
    } else if (query) {
      filter = {
        $or: [
          {title: {$regex: query, $options: "i"}},
          {content: {$regex: query, $options: "i"}}
        ]
      }
    }

    const findUser = await CreateArticle.find(filter);
    
    if (!findUser)
      return NextResponse.json(
        { success: false, message: "Gagal memuat data" },
        { status: 400 }
      );
    return NextResponse.json({
        success: true,
        count: findUser.length,
        data: findUser
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Gagal memuat tulisan.",
    });
  }
}
