import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "./utils/auth";

const protectedRoutes = ["/villas"];

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("auth-token");

    console.log(token);

    // If no token, redirect to login page
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Here you can add more logic to validate the token if needed
  }

  // Continue to the requested page if authenticated or not a protected route
  return NextResponse.next();
}

export const config = {
  matcher: ["/villas/:path*"],
};
