import type { ReactNode } from "react";
import { ThemeScript } from "@/components/platform/ThemeScript";
import { ThemeMount } from "@/components/platform/ThemeMount";

/*
 * Root of the platform route group (Milestones 5-8): just the theme, shared
 * by both the (auth) screens and the (app) shell underneath it. Two pieces,
 * because a full page load and a client-side navigation into the platform need
 * different mechanisms — see ThemeMount for why.
 */
export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeScript />
      <ThemeMount />
      {children}
    </>
  );
}
