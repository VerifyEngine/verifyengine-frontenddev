import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/platform/session-cookie";

/**
 * Gates the signed-in platform behind the session cookie session.ts sets.
 *
 * Named `proxy` (not `middleware`) because this Next.js version renamed the
 * file convention — see AGENTS.md. The matcher is the single source of truth
 * for which platform paths are protected — add a new platform screen's path
 * here when it ships, or it stays reachable without logging in.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE_NAME)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/clients/:path*"],
};
