import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password } = await req.json()

    if (username === process.env.USN_ADM || password === process.env.PASS_ADM) {
        const res = NextResponse.json({ succes: true })
        res.cookies.set('isLogged', 'true')
        return res
    }

    return NextResponse.json({ success: false }, { status: 401 })
}