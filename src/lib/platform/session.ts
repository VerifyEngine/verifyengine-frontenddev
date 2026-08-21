"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "./session-cookie";

/**
 * The mock login/reset calls in auth.ts resolve like a real API response
 * would; persisting that as a session is a separate step, and in the App
 * Router that means a server action (middleware.ts needs an httpOnly cookie
 * it can read, which client-side JS cannot set).
 *
 * Swapping the mock in auth.ts for a real backend call does not touch this
 * file — it keeps setting the cookie from whatever email the caller passed.
 */
export async function createSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
