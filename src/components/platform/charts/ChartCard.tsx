"use client";

import { useState, type ReactNode } from "react";

/*
 * The shell every chart on the Reports screen sits in — Figma node 18176:36378.
 *
 * Surface/Fade 48% behind a hairline at Radius/XL, with no padding of its own:
 * the header, the plot and the legend each carry their own 20px inset so the
 * plot can run edge to edge between them.
 *
 * The range toggle is real state. Figma draws each card with one of Weekly /
 * Monthly / Yearly selected and gives no other frames, so switching cannot
 * change the numbers yet — but a pill group that does not respond to a click
 * reads as broken, and the selection is what the backend query will key off.
 */

export const CHART_RANGES = ["Weekly", "Monthly", "Yearly"] as const;
export type ChartRange = (typeof CHART_RANGES)[number];

export type ChartSeries = {
  label: string;
  /** A functional token name; the chart resolves it to var(--ve-*). */
  tone: "accent" | "neutral" | "success" | "warning" | "information" | "highlight";
};

export const TONE_VAR: Record<ChartSeries["tone"], string> = {
  accent: "var(--ve-accent)",
  neutral: "var(--ve-neutral)",
  success: "var(--ve-success)",
  warning: "var(--ve-warning)",
  information: "var(--ve-information)",
  highlight: "var(--ve-highlight)",
};

function PillToggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (option: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex shrink-0 rounded-app-4xl border-w-2xs border-app-line bg-app-brand2-tertiary p-0.5"
    >
      {options.map((range) => {
        const isActive = range === value;
        return (
          <button
            key={range}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(range)}
            className={`flex items-center justify-center rounded-app-4xl px-4 py-3 text-label-xs transition-colors sm:w-[90px] ${
              isActive
                ? "border-w-2xs border-app-line bg-app-brand1 text-white"
                : "bg-app-brand2-tertiary text-app-text opacity-50"
            }`}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
}

export function ChartCard({
  title,
  series,
  showRange = true,
  defaultRange = "Monthly",
  /** Second pill group, as on SLA Risk Monitor's Client / Team / Region. */
  scopes,
  defaultScope,
  children,
}: {
  title: string;
  /** Rendered as the legend beneath the plot; omit for charts that label in place. */
  series?: readonly ChartSeries[];
  showRange?: boolean;
  defaultRange?: ChartRange;
  scopes?: readonly string[];
  defaultScope?: string;
  children: ReactNode;
}) {
  const [range, setRange] = useState<ChartRange>(defaultRange);
  const [scope, setScope] = useState(defaultScope ?? scopes?.[0] ?? "");

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-fade-48 backdrop-blur-[12px]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <h2 className="min-w-px flex-1 text-heading-m text-app-text">{title}</h2>
        {showRange ? (
          <PillToggle
            label="Date range"
            options={CHART_RANGES}
            value={range}
            onChange={(next) => setRange(next as ChartRange)}
          />
        ) : null}
        {scopes ? (
          <PillToggle label="Grouping" options={scopes} value={scope} onChange={setScope} />
        ) : null}
      </div>

      <div className="min-h-px flex-1">{children}</div>

      {series ? (
        <div className="flex flex-wrap items-center justify-center gap-4 p-5">
          {series.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-app-12xl"
                style={{ backgroundColor: TONE_VAR[item.tone] }}
              />
              <span className="whitespace-nowrap text-label-2xs text-app-text-secondary">
                {item.label}
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
