"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { SideMenu } from "./SideMenu";
import { TopNav } from "./TopNav";

/*
 * Responsive frame for the platform.
 *
 * The Figma frames only exist at 1920x1080, so that width is reproduced
 * exactly and everything below it is a derived adaptation:
 *
 *   >= 1280 (xl)  the design as drawn — 160px gaps in the Top Nav, the
 *                 240px Side Menu docked beside the content
 *   >= 1024 (lg)  same two-column shell, Top Nav gaps tightened so the search
 *                 field keeps a usable width
 *   <  1024       the Side Menu leaves the flow and becomes a drawer opened
 *                 from the Top Nav, so the content gets the full width
 *
 * The drawer's open state lives here because both the Top Nav button and the
 * menu need it.
 */
export function PlatformShell({
  organizationName,
  userName,
  avatarSrc,
  children,
}: {
  organizationName: string;
  userName: string;
  avatarSrc: string;
  children: ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="ve-canvas font-app relative isolate flex h-screen flex-col gap-2 overflow-hidden p-2 print:h-auto print:overflow-visible print:bg-white print:p-0">
      {/* PlatformBackground is deliberately not rendered: the blended layer
          cannot be composed correctly until the frame fill is known, and
          leaving it in washed colour through every translucent panel. The
          component and its assets stay in place for when that is resolved. */}
      <div className="contents print:hidden">
        <TopNav
          organizationName={organizationName}
          userName={userName}
          avatarSrc={avatarSrc}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      </div>

      <div className="flex min-h-px flex-1 gap-2">
        <div className="contents print:hidden">
          <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
        <main className="min-w-px flex-1 overflow-y-auto print:overflow-visible">{children}</main>
      </div>
    </div>
  );
}
