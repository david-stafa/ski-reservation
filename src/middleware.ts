import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { JWTPayload } from "jose";
import { DateTime } from "luxon";
import { COUNTDOWN_END } from "@/lib/constants";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin"];
// const publicRoutes = ['/login', '/register', '/', '/reservation']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;

  // Centralized countdown redirect prior to opening
  const isProduction = process.env.NODE_ENV === "production";
  const now = DateTime.local({zone: "Europe/Prague"});
  const isBeforeOpen = now <= COUNTDOWN_END;
  const isCountdownPage = path === "/countdown";
  const isAdmin = path.startsWith("/admin");
  const isLoginPage = path === "/login";

  if (
    isProduction &&
    isBeforeOpen &&
    !isCountdownPage &&
    !isAdmin &&
    !isLoginPage
  ) {
    return NextResponse.redirect(new URL("/countdown", req.nextUrl));
  }

  // Dev-only logging; skip Chrome DevTools and favicon
  if (
    process.env.NODE_ENV !== "production" &&
    !path.includes(".well-known") &&
    !path.includes("favicon")
  ) {
    console.log(`🔒 Middleware running for path: ${path}`);
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  //   const isPublicRoute = publicRoutes.some(route => path === route)

  // 3. Get the session cookie and decrypt it
  const sessionCookie = req.cookies.get("session")?.value;
  let session: JWTPayload | null = null;

  if (sessionCookie) {
    try {
      session = await decrypt(sessionCookie);
    } catch {
      // Session is invalid or expired, treat as unauthenticated
      console.log("Invalid session, treating as unauthenticated");
    }
  }

  // 4. Redirect to /login if the user is not authenticated and trying to access protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
