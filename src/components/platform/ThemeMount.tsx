"use client";

import { useEffect, useLayoutEffect } from "react";
import { THEME_STORAGE_KEY } from "./theme-storage";

/**
 * Companion to ThemeScript, for the times the script cannot run.
 *
 * ThemeScript is a plain <script> tag, so it only executes when the browser
 * parses the document — that is, on a full page load. Arriving at the platform
 * from the public site (signing in at /login, which lives in the site route
 * group, then being redirected) is a client-side navigation instead: React
 * mounts this layout without ever executing that tag, so <html data-ve-theme>
 * stays unset and every --ve-* token resolves to nothing. The platform renders,
 * but with no colours at all — a blank white page.
 *
 * Applying the attribute on mount closes that gap, and removing it on unmount
 * keeps the public site's <html> exactly as it was before.
 */

// The attribute must land before the browser paints, or the platform flashes
// white for a frame. useLayoutEffect does that but warns when rendered on the
// server, where there is nothing to lay out — so pick per environment.
const useApplyTheme = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ThemeMount() {
  useApplyTheme(() => {
    const root = document.documentElement;

    if (!root.dataset.veTheme) {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        // Private mode or blocked storage — light is the documented fallback.
      }
      root.dataset.veTheme = stored === "dark" ? "dark" : "light";
    }

    return () => {
      delete root.dataset.veTheme;
    };
  }, []);

  return null;
}
