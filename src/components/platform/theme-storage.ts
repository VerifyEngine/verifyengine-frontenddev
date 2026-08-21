/**
 * Shared between the client theme hook and the inline script that runs before
 * paint. It lives in its own module with no "use client" directive so both a
 * Server Component and a Client Component can import it.
 */
export const THEME_STORAGE_KEY = "ve-theme";
