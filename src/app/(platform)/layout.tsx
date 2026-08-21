import type { ReactNode } from "react";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { ThemeScript } from "@/components/platform/ThemeScript";

/*
 * Shell for the signed-in platform (Milestones 5-8).
 *
 * Organisation and user are hard-coded to the values in the design while the
 * backend is pending; they are already isolated as props so wiring the real
 * session later touches this file only.
 */
export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeScript />
      <PlatformShell
        organizationName="CutRite Lawn Care"
        userName="Account"
        avatarSrc="/images/platform-avatar.png"
      >
        {children}
      </PlatformShell>
    </>
  );
}
