import {NextRequest, NextResponse} from "next/server";

const AUTH_COOKIE = process.env.AUTH_COOKIE ?? "jira-auth-session";

const publicRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const isLoggedIn = !!request.cookies.get(AUTH_COOKIE)?.value;
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)"],
};
