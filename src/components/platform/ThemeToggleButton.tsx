"use client";

import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { iconProps } from "./icon";
import { useVeTheme } from "./theme";

/**
 * The moon button in the Top Nav switches the whole platform between the two
 * Figma sections. It shows the theme you would move *to*, which is why the
 * light theme renders a moon.
 *
 * The icons are imported here rather than handed in as props: icon components
 * must not travel as props in this codebase.
 */
export function ThemeToggleButton({ className }: { className: string }) {
  const { theme, toggleTheme } = useVeTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={className}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <IconMoonStars {...iconProps(20)} />
      ) : (
        <IconSun {...iconProps(20)} />
      )}
    </button>
  );
}
