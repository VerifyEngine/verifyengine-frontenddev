import type { ReactNode } from "react";
import { PlatformShell } from "@/components/platform/PlatformShell";

/*
 * Shell for the signed-in screens only (Milestones 6-8): Top Nav, Side Menu,
 * everything behind the session gate in middleware.ts. The (auth) group next
 * to this one renders login/forgot/reset password without this chrome.
 *
 * Organisation and user are hard-coded to the values in the design while the
 * backend is pending; they are already isolated as props so wiring the real
 * session later touches this file only.
 */
export default function PlatformAppLayout({ children }: { children: ReactNode }) {
  return (
    <PlatformShell
      organizationName="CutRite Lawn Care"
      userName="Account"
      avatarSrc="/images/platform-avatar.png"
    >
      {children}
    </PlatformShell>
  );
}
