import { connectDB } from "@/lib/db/mongodb";
import UserAccount from "@/models/UserAccount";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await UserAccount.find().select("-password");
    return NextResponse.json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    console.error("GET Users Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data user." },
      { status: 500 }
    );
  }
}
