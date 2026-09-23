import type { ReactNode } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { iconProps } from "../icon";
import type { BillingStat } from "@/lib/platform/client-profile";

/*
 * Pieces the Client Profile tabs share.
 *
 * Inside the tab panel the design sets its content on solid cards —
 * Surface/Default with a Brand 2 hairline and a 14px corner — rather than the
 * glass of the panels around them, so rows and figures read cleanly against
 * the tinted panel. In dark mode Surface/Default is the near-black canvas, so
 * the same cards hold in both themes.
 */

export const CARD = "rounded-app-l border-w-2xs border-app-line-brand2 bg-app-surface";

/** A row inside a card list: the same card, one per line, two pixels apart. */
export const ROW_CARD = `${CARD} px-4 py-3`;

/** The small uppercase eyebrow that heads each block, with room for an action. */
export function Eyebrow({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="min-w-px flex-1 text-nav-heading tracking-[0.1em] text-app-text-tertiary uppercase">
        {children}
      </h3>
      {action}
    </div>
  );
}

/** A text action beside an eyebrow — Add Member, Export All, Generate New Key. */
export function EyebrowAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex shrink-0 items-center gap-1 text-label-2xs text-app-heading transition-opacity hover:opacity-70"
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

/**
 * Figure cards along the top of Billing & Revenue and Portfolio Analytics.
 * A favourable change is green either way; the arrow follows its sign, so a
 * falling fraud rate points down rather than up as the design draws it.
 */
export function StatCard({ stat }: { stat: BillingStat }) {
  return (
    <div className={`flex flex-col gap-1 p-4 ${CARD}`}>
      <p className="text-nav-heading tracking-[0.05em] text-app-text-tertiary uppercase">{stat.label}</p>
      <p className="text-heading-m text-app-heading">{stat.value}</p>
      {stat.trend === "up" ? (
        <p className="flex items-center gap-1 text-label-2xs text-app-success">
          {stat.note.startsWith("-") ? <IconTrendingDown {...iconProps(12)} /> : <IconTrendingUp {...iconProps(12)} />}
          {stat.note}
        </p>
      ) : (
        <p className="text-body-2xs text-app-text-tertiary">{stat.note}</p>
      )}
    </div>
  );
}

/** Two-letter monogram, as the contact and team rows draw them. */
export function Initials({ name, size = "m" }: { name: string; size?: "s" | "m" }) {
  const letters = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-app-brand2-tertiary font-bold text-app-text-brand1 ${
        size === "s" ? "size-8 text-body-2xs" : "size-10 text-label-2xs"
      }`}
    >
      {letters}
    </span>
  );
}

const PILL_TONE = {
  success: "bg-app-brand2-40 text-app-success",
  neutral: "bg-app-brand1-quaternary text-app-text-secondary",
  warning: "text-app-warning",
} as const;

/** Small rounded status tag — Paid, Active, Reviewer. */
export function Pill({ children, tone }: { children: ReactNode; tone: keyof typeof PILL_TONE }) {
  return (
    <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-body-2xs font-semibold ${PILL_TONE[tone]}`}>
      {children}
    </span>
  );
}
