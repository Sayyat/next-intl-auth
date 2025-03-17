import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";
import type {NextRequest} from "next/server";
import {env} from "@/core/data/env/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: env.NEXTAUTH_SECRET});
    const {pathname} = req.nextUrl;
    if (!token && !["/login", "/register"].includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && ["/login", "/register"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/register", "/",],
};
