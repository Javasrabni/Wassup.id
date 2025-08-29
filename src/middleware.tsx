import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const isLogin = req.cookies.get('isLogged')?.value
    
    if (!isLogin || isLogin !== "true") {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*']
}