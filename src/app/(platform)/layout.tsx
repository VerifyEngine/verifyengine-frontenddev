import type { ReactNode } from "react";
import { ThemeScript } from "@/components/platform/ThemeScript";

/*
 * Root of the platform route group (Milestones 5-8): just the theme script,
 * shared by both the (auth) screens and the (app) shell underneath it.
 */
export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeScript />
      {children}
    </>
  );
}
