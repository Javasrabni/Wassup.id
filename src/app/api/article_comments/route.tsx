import { NextResponse } from "next/server";

let comments: string[] = [];

export async function GET() {
  return NextResponse.json({ comments });
}

export async function POST(req: Request) {
  const { text } = await req.json();
  if (!text || text.trim() == "") {
    return NextResponse.json({ error: "Komentar kosong!" }, { status: 400 });
  }

  comments.unshift(text);
  return NextResponse.json({ success: true });
}
