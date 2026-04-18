import { NextResponse, type NextRequest } from "next/server";
import "dayjs/locale/ko";
import dayjs from "@constants/dayjs";
import { DateFormat1 } from "@/constants/Date";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname === "/" || pathname === "/read" || pathname === "/read/") {
        const url = req.nextUrl.clone();
        url.pathname = `/read/${dayjs().format(DateFormat1)}/0`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
