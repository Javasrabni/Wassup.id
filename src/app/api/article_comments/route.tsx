import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

// POST
export async function POST(request: Request) {
  await connectDB();
  const { articleSlug, comment } = await request.json();
  await Comment.create({ articleSlug, comment });
  return Response.json({ success: true });
}

// GET
export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get("articleSlug");

  const comments = await Comment.find({ articleSlug }).sort({ createdAt: -1 });

  // Return only comment text array (sesuai kebutuhan komponen kamu)
  return Response.json(comments.map((c) => ({comment: c.comment, date: c.createdAt})));
}
