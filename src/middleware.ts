import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { JWTPayload } from "jose";
import { DateTime } from "luxon";
import { SEASONAL_COUNTDOWN_END } from "@/lib/constants";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin"];
// const publicRoutes = ['/login', '/register', '/', '/reservation']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;

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

  // Countdown redirect logic
  const isProduction = process.env.NODE_ENV === "production";
  const now = DateTime.local({ zone: "Europe/Prague" });
  const isBeforeOpen = now <= SEASONAL_COUNTDOWN_END;
  const isCountdownPage = path === "/countdown";
  const isLoginPage = path === "/login";

  //Redirect if:
  // - only in production
  // - it's before countdown end
  // - not on countdown page and not on login page
  // - not authenticated
  if (
    isProduction &&
    isBeforeOpen &&
    !isCountdownPage &&
    !isLoginPage &&
    !session?.userId
  ) {
    return NextResponse.redirect(new URL("/countdown", req.nextUrl));
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
