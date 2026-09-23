"use client";

import type { ReactNode } from "react";
import { TONE_VAR, type ChartTone } from "./tones";

/*
 * Shared pieces for the Recharts-based Reports charts.
 *
 * The charts are Client Components (Recharts measures the DOM), so the page —
 * a Server Component — cannot hand them formatter functions. Formats travel
 * as names and resolve here instead.
 *
 * Colours stay on the platform tokens: Recharts writes fills and strokes as
 * SVG attributes, and var(--ve-*) resolves there like anywhere else, so every
 * chart follows the theme with no JavaScript.
 */

export type ValueFormat = "thousands" | "dollars" | "millions" | "units" | "plain";

export const FORMATS: Record<ValueFormat, (value: number) => string> = {
  thousands: (v) => (v === 0 ? "0" : `${Math.round(v / 1000)}k`),
  dollars: (v) => (v === 0 ? "$0" : `$${Math.round(v / 1000)}k`),
  millions: (v) => (v === 0 ? "0" : `${Math.round(v * 10) / 10}m`),
  units: (v) => `${Math.round(v)}u`,
  plain: (v) => v.toLocaleString("en-US"),
};

/**
 * Axis tick text: Body/2XS in Text/Secondary, scaled like all platform type.
 * Applied as classes — CSS outranks the fill and font-size attributes Recharts
 * writes on each <text>, and the utilities carry the type scale.
 */
export const AXIS_TICK = { className: "fill-app-text-secondary text-body-2xs font-app" } as const;

/** Grid: the design's 0.6px Border/Primary hairline, dashed 4 / 7. */
export const GRID_PROPS = {
  stroke: "var(--ve-border-line)",
  strokeWidth: 0.6,
  strokeDasharray: "4 7",
} as const;

export const toneVar = (tone: ChartTone) => TONE_VAR[tone];

type TooltipEntry = {
  name?: string | number;
  value?: number | string | readonly (number | string)[];
  color?: string;
  payload?: { fill?: string };
};

/**
 * The hover card: a glass panel in the platform's own style rather than
 * Recharts' default white box, so it reads correctly in both themes.
 */
export function ChartTooltip({
  active,
  payload,
  label,
  format = "plain",
  labelFor,
}: {
  active?: boolean;
  payload?: readonly TooltipEntry[];
  label?: string | number;
  format?: ValueFormat;
  /** Turns the raw x value into the text shown as the tooltip's title. */
  labelFor?: (label: string | number) => ReactNode;
}) {
  if (!active || !payload?.length) return null;
  const title = label === undefined ? null : labelFor ? labelFor(label) : label;

  return (
    <div className="flex min-w-36 flex-col gap-2 rounded-app-m border-w-2xs border-app-line bg-app-surface p-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
      {title !== null && title !== "" ? (
        <p className="text-label-2xs text-app-text">{title}</p>
      ) : null}
      <ul className="flex flex-col gap-1.5">
        {payload.map((entry, index) => {
          const value = typeof entry.value === "number" ? FORMATS[format](entry.value) : String(entry.value ?? "");
          return (
            <li key={`${entry.name}-${index}`} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-app-12xl"
                style={{ backgroundColor: entry.color ?? entry.payload?.fill }}
              />
              <span className="min-w-px flex-1 text-body-2xs text-app-text-secondary">{entry.name}</span>
              <span className="text-label-2xs text-app-text">{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The navy value pill the design pins on a chart (the "203" marker). */
export function ValuePill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-app-l bg-app-brand1 p-2 text-label-2xs text-white">{children}</span>
  );
}
