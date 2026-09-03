"use client";

import {
  IconChartBar,
  IconFileAnalytics,
  IconHome,
  IconSettings,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
  MockBadge,
  MockBar,
  MockCheck,
  MockPanel,
  MockRail,
  MockShell,
  MockTile,
  MockTopBar,
} from "@/components/marketing/PlatformMock";
import { platformChecks, type PlatformTarget } from "@/lib/platform-features";

/*
 * The central Verify Engine dashboard visualisation.
 *
 * Built from the shared platform mock primitives, so it is the signed-in
 * product's own surface — app canvas, glass panels, Satoshi, Tabler icons —
 * rather than a generic card. Markup and inline SVG only: no image, video or
 * animation library, and the whole composition scales as one to whatever width
 * the middle column gives it.
 *
 * `active` is the capability card the visitor is pointing at or has focused.
 * The region that capability produces stays lit while the rest of the
 * dashboard fades back, which is what makes the connection legible. Nothing
 * moves on its own: with no card engaged everything sits at full strength.
 *
 * Nothing stands in for applicant data — the panel shows outcomes and statuses
 * only, and the report body is drawn as neutral rules.
 */

const railIcons = [
  IconHome,
  IconUser,
  IconShieldCheck,
  IconFileAnalytics,
  IconChartBar,
  IconSettings,
];

/**
 * A region of the dashboard that a capability card can light up.
 *
 * `data-platform-target` is also how the connector line finds where to draw —
 * see PlatformShowcase.
 */
function Region({
  target,
  active,
  className = "",
  children,
}: {
  target: PlatformTarget;
  active: PlatformTarget | null;
  className?: string;
  children: ReactNode;
}) {
  const engaged = active === target;
  const dimmed = active !== null && !engaged;
  return (
    <div
      data-platform-target={target}
      className={`relative transition-all duration-200 motion-reduce:transition-none ${
        engaged
          ? "ring-2 ring-app-line-brand2 ring-offset-2 ring-offset-[var(--ve-canvas)]"
          : ""
      } ${dimmed ? "opacity-40" : "opacity-100"} ${className}`}
    >
      {children}
    </div>
  );
}

/** Everything the active card does not claim simply steps back. */
function faded(active: PlatformTarget | null) {
  return `transition-opacity duration-200 motion-reduce:transition-none ${
    active ? "opacity-40" : "opacity-100"
  }`;
}

export function PlatformVisual({
  active = null,
}: {
  active?: PlatformTarget | null;
}) {
  return (
    <div className="relative">
      {/* The soft mint field the concept art puts behind the product. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 bottom-0 left-0 rounded-[45%] bg-mint-200/55 blur-3xl sm:-right-10 sm:-left-10"
      />
      <div className="relative">
        <MockShell nativeWidth={480} nativeHeight={360} maxZoom={1.45}>
          <Region target="topbar" active={active} className="rounded-app-xl">
            <MockTopBar
              right={<MockBadge tone="success">Verified</MockBadge>}
            />
          </Region>

          <div className="flex gap-2">
            {/* The rail is the platform's shell signature, but on a phone it
                eats an eighth of the width the panels need to say anything,
                and six dimmed icons is not what this section is selling. It
                steps out below sm — the same call MockAppFrame makes. */}
            <Region
              target="rail"
              active={active}
              className="hidden rounded-app-xl sm:block"
            >
              <MockRail icons={railIcons} />
            </Region>

            <div className="flex min-w-px flex-1 flex-col gap-2 sm:flex-row">
              <MockPanel
                title="Verification Complete"
                className="min-w-px flex-[1.3]"
              >
                <p
                  className={`text-body-2xs text-app-text-secondary sm:text-app-text-tertiary ${faded(active)}`}
                >
                  All checks passed. Report is ready.
                </p>
                <ul className="flex flex-1 flex-col justify-center gap-2">
                  {platformChecks.map((check) =>
                    check.target ? (
                      <Region
                        key={check.label}
                        target={check.target}
                        active={active}
                        className="-mx-1.5 rounded-app-m px-1.5 py-0.5"
                      >
                        <MockCheck label={check.label} />
                      </Region>
                    ) : (
                      <div
                        key={check.label}
                        className={`px-1.5 py-0.5 ${faded(active)}`}
                      >
                        <MockCheck label={check.label} />
                      </div>
                    ),
                  )}
                </ul>
              </MockPanel>

              <MockPanel
                title="Report"
                className={`min-w-px flex-1 ${faded(active)}`}
                badge={<MockBadge tone="brand">PDF</MockBadge>}
              >
                <div className="flex flex-1 flex-col justify-center gap-1.5">
                  <MockBar />
                  <MockBar width="w-4/5" />
                  <MockBar />
                  <MockBar width="w-2/3" />
                  <MockBar width="w-3/4" />
                </div>
                <MockTile className="mt-auto flex items-center justify-center gap-1.5">
                  <IconShieldCheck
                    size={15}
                    stroke={1.8}
                    className="text-app-success"
                    aria-hidden
                  />
                  <span className="text-label-2xs text-app-success">
                    Approved
                  </span>
                </MockTile>
              </MockPanel>
            </div>
          </div>

          <MockTile className={`flex items-center gap-2.5 ${faded(active)}`}>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse">
              <IconShieldCheck size={15} stroke={1.8} aria-hidden />
            </span>
            <span className="min-w-px flex-1">
              <span className="block text-label-2xs text-app-text">
                Automated. Accurate. Trusted.
              </span>
              <span className="block text-body-2xs text-app-text-secondary sm:text-app-text-tertiary">
                Every verification, human reviewed
              </span>
            </span>
          </MockTile>
        </MockShell>
      </div>
    </div>
  );
}
