import { NextResponse } from "next/server";
import UserRegister from "@/models/UserAccount";
import { connectDB } from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";

    export async function POST(request) {
        try {
            await connectDB()
            const { username, email, password } = await request.json()
            if (!username || !email || !password) {
                return NextResponse.json({ message: "Data tidak lengkap atau tidak valid." }, { status: 400 })
            }

            const CheckUser = await UserRegister.findOne({ email });
            if (CheckUser) {
                return NextResponse.json(
                    { message: "Email sudah terdaftar." },
                    { status: 400 }
                )
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new UserRegister({ username, email, password: hashedPassword })
            await newUser.save();

            return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }

}