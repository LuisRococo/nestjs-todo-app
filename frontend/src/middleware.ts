import { InvalidTokenError, jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, privateRoutes } from "./utils/routes";

export function middleware(request: NextRequest) {
  let validToken = false;
  const requestRoute = request.nextUrl.pathname;

  try {
    const token = request.cookies.get("token")?.value;

    if (token) {
      const decoded = jwtDecode(token) as any;

      if (Date.now() > decoded.exp * 1000) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
      } else {
        validToken = true;
      }
    }

    if (!validToken && privateRoutes.includes(requestRoute)) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      return response;
    }

    if (validToken && authRoutes.includes(requestRoute)) {
      const response = NextResponse.redirect(new URL("/", request.url));
      return response;
    }
  } catch (e) {
    if (e instanceof InvalidTokenError) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }
}
