import { NextResponse } from "next/server";
import UserAccount from "@/models/UserAccount";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib disi." },
        { status: 400 }
      );
    }
    // Cek user
    const user = await UserAccount.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email tidak terdaftar." },
        { status: 400 }
      );
    }
    // Cek Password
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return NextResponse.json({ message: "Password salah." }, { status: 401 });
    }
    // JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

    const token = await new SignJWT({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      avatar: user.avatar
    }).setProtectedHeader({alg: "HS256"}).setExpirationTime("2d").sign(secret)

    // Validasi login
    const res = NextResponse.json({
      success: true,
      message: "Login berhasil",
    });
    res.cookies.set("token", token, {
      maxAge: 60 * 60 * 24 * 2,
      httpOnly: true, 
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
