import { NextResponse } from "next/server";
import UserAccount from "@/models/UserAccount";
import { connectDB } from "@/lib/db/mongodb";

type Params = {
  slug: string;
};

export async function GET(
  request: Request,
  context: { params: Params }
) {
  try {
    await connectDB();

    const slug = decodeURIComponent(context.params.slug);

    const user = await UserAccount
      .findOne({ username: slug })
      .select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
