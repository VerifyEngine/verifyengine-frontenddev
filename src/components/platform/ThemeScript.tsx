import { THEME_STORAGE_KEY } from "./theme-storage";

/**
 * Applies the stored theme to <html> before the platform paints. Runs inline
 * and synchronously on purpose — anything async would let the wrong theme show
 * for a frame. Falls back to light if storage is unavailable (private mode).
 */
const script = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});document.documentElement.dataset.veTheme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.veTheme="light"}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
