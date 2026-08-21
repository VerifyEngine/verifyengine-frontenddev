import type { ReactNode } from "react";
import { ThemeToggleButton } from "@/components/platform/ThemeToggleButton";

const TOGGLE_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 text-app-text transition-colors hover:bg-app-fade-40";

/*
 * Chrome for login/forgot/reset password: just the canvas and the theme
 * toggle, no Top Nav or Side Menu — those only make sense once a session
 * exists. `bg-[var(--ve-canvas)]` is used directly here rather than the
 * `ve-canvas` class PlatformShell uses, because that class has no matching
 * CSS rule anywhere in the project and resolves to nothing.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-app relative flex min-h-screen items-center justify-center bg-[var(--ve-canvas)] p-4">
      <ThemeToggleButton className={`${TOGGLE_BUTTON} absolute right-4 top-4`} />
      {children}
    </div>
  );
}
