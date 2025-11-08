import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

// POST
export async function POST(request: Request) {
  try {
    await connectDB();
    const { articleSlug, comment } = await request.json();

    if (!articleSlug || !comment) {
      return Response.json(
        {
          success: false,
          message: "Terjadi kesalahan server atau komentar tidak boleh kosong.",
        },
        { status: 400 }
      );
    }
    await Comment.create({ articleSlug, comment });
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

  const comments = await Comment.find({ articleSlug }).sort({ createdAt: -1 });

  // Return only comment text array (sesuai kebutuhan komponen kamu)
  return Response.json(
    comments.map((c) => ({ comment: c.comment, date: c.createdAt }))
  );
}
