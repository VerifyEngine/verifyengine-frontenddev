"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-storage";

export type VeTheme = "light" | "dark";

const THEME_EVENT = "ve-theme-change";

/**
 * The theme lives on <html data-ve-theme>, not in React state.
 *
 * Putting it in the DOM lets a tiny inline script apply the stored preference
 * before the first paint, so the platform never flashes light before turning
 * dark. React then *reads* that attribute through useSyncExternalStore rather
 * than owning it, which keeps server and client renders consistent without
 * writing state from an effect.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): VeTheme {
  return document.documentElement.dataset.veTheme === "dark" ? "dark" : "light";
}

// The server has no DOM to read, and the inline script has not run yet, so
// both render light and the client corrects in the same commit if needed.
function getServerSnapshot(): VeTheme {
  return "light";
}

export function useVeTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: VeTheme = getSnapshot() === "light" ? "dark" : "light";
    document.documentElement.dataset.veTheme = next;
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { theme, toggleTheme };
}
