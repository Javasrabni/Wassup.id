import { NextResponse } from "next/server";
import ArticleView from "@/models/ArticleView";
import { connectDB } from "@/lib/mongodb";

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get("slug");
  if (!articleSlug) return NextResponse.json({ error: "slug missing" }, { status: 400 });

  const article = await ArticleView.findOne({ articleSlug });
  return NextResponse.json({ views: article?.view || 0 });
}

export async function POST(request: Request) {
  await connectDB();
  const { articleSlug } = await request.json();

  if (!articleSlug) return NextResponse.json({ error: "slug missing" }, { status: 400 });

  const cookieHeader = request.headers.get("cookie") || "";
  const viewed = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("viewed_articles="))
    ?.split("=")[1] || "";

  const viewedSet = new Set(viewed.split(",").filter(Boolean));

  if (!viewedSet.has(articleSlug)) {
    await ArticleView.findOneAndUpdate(
      { articleSlug },
      { $inc: { view: 1 } },
      { new: true, upsert: true }
    );
    viewedSet.add(articleSlug);
  }

  const article = await ArticleView.findOne({ articleSlug });
  const resp = NextResponse.json({ views: article?.view || 0 });

  resp.cookies.set("viewed_articles", Array.from(viewedSet).join(","), {
    path: "/",
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 30,
  });

  return resp;
}
