import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const authRoutes = ["/login", "/signup"];

    const isAuthRoute = authRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    if (!token && !isAuthRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};