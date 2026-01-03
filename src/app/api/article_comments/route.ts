import Comment from "@/models/Comment";
import { connectDB } from "@/lib/db/mongodb";
import { Types } from "mongoose";
// POST
export async function POST(request: Request) {
  try {
    await connectDB();
    const { articleSlug, articleId, comment, commentaredBy, IdCommentaredBy} = await request.json();

    if (!articleSlug || !comment || !articleId) {
      return Response.json(
        {
          success: false,
          message: "Terjadi kesalahan server atau komentar tidak boleh kosong.",
        },
        { status: 400 }
      );
    }
    await Comment.create({ articleId, articleSlug, comment, commentaredBy, IdCommentaredBy });
    return Response.json({ success: true });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      // error dari mongoose (misalnya melebihi maxlength)
      return Response.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    console.error("Error posting comment:", error);
    return Response.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// GET
export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const articleSlug = searchParams.get("articleSlug");
  const articleId = searchParams.get("articleId");

  if (!articleSlug || !articleId) {
    return Response.json([])
  }
  const comments = await Comment.find({ articleSlug, articleId }).sort({ createdAt: -1 });

  // Return only comment text array (sesuai kebutuhan komponen kamu)
  return Response.json(
    comments.map((c) => ({ comment: c.comment, date: c.createdAt, commentaredBy: c.commentaredBy }))
  );
}
