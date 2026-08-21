/**
 * Shared between the server actions in session.ts (which set/clear this
 * cookie) and middleware.ts (which only checks whether it exists). Kept in
 * its own module because a "use server" file may only export async
 * functions, not a plain constant.
 */
export const SESSION_COOKIE_NAME = "ve_session";
