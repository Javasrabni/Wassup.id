import { NextResponse } from "next/server";
import ArticleView from "@/models/ArticleView";
import { connectDB } from "./mongodb";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  await connectDB();

  const cookieHeader = request.headers.get("cookie") || "";
  const viewed = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("viewed_articles="))
    ?.split("=")[1] || "";

  const viewedSet = new Set(viewed.split(",").filter(Boolean));
  const slug = params.slug;

  let viewCount = 0;

  if (!viewedSet.has(slug)) {
    await ArticleView.findOneAndUpdate(
      { articleSlug: slug },
      { $inc: { view: 1 } },
      { new: true, upsert: true }
    );
    viewedSet.add(slug);
  }

  const article = await ArticleView.findOne({ articleSlug: slug });
  viewCount = article?.view || 0;

  const response = NextResponse.json({ view: viewCount });
  response.cookies.set("viewed_articles", Array.from(viewedSet).join(","), {
    path: "/",
    httpOnly: false,
  });

  return response;
}
