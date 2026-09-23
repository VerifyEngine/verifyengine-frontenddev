"use client";

import { useState, type ReactNode } from "react";
import { TONE_VAR, type ChartSeries } from "./tones";

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
 *
 * The lower cards vary the same shell in four ways, each opted into:
 * a different set of pills (the map's Volume / Fraud % / Avg TAT / Escalation
 * Time, 540px wide), a centred title, the legend stacked top-right beside the
 * title instead of under the plot, and a second pill group under the plot
 * (Human Override Rate).
 */

export const CHART_RANGES = ["Weekly", "Monthly", "Yearly"] as const;
export type ChartRange = (typeof CHART_RANGES)[number];

export type PillGroup = {
  label: string;
  options: readonly string[];
  defaultOption: string;
  /**
   * The design's 540px group whose pills share the width equally, rather than
   * the 90px-per-pill range toggle. Scaled with the type so the labels fit.
   */
  wide?: boolean;
};

function PillToggle({ group }: { group: PillGroup }) {
  const [value, setValue] = useState(group.defaultOption);

  return (
    <div
      role="group"
      aria-label={group.label}
      className={`flex shrink-0 rounded-app-4xl border-w-2xs border-app-line bg-app-brand2-tertiary p-0.5 ${
        group.wide ? "w-full sm:w-[calc(540px*var(--ve-type-scale))] sm:max-w-full" : ""
      }`}
    >
      {group.options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => setValue(option)}
            className={`flex items-center justify-center rounded-app-4xl py-3 text-label-xs transition-colors ${group.wide ? "" : "px-4"} ${
              group.wide
                ? "min-w-px flex-1 px-2 text-center sm:px-4 sm:whitespace-nowrap"
                : "sm:w-[90px]"
            } ${
              isActive
                ? "border-w-2xs border-app-line bg-app-brand1 text-white"
                : "bg-app-brand2-tertiary text-app-text opacity-50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function LegendDot({ tone, sizeClass }: { tone: ChartSeries["tone"]; sizeClass: string }) {
  return (
    <span
      aria-hidden
      className={`shrink-0 rounded-app-12xl ${sizeClass}`}
      style={{ backgroundColor: TONE_VAR[tone] }}
    />
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
  toggle,
  footerToggle,
  titleAlign = "start",
  legendPosition = "bottom",
  legendGapClass = "gap-4",
  legendDotClass = "size-2.5",
  className = "",
  children,
}: {
  title: string;
  /** Rendered as the legend; omit for charts that label in place. */
  series?: readonly ChartSeries[];
  showRange?: boolean;
  defaultRange?: ChartRange;
  scopes?: readonly string[];
  defaultScope?: string;
  /** Replaces the Weekly / Monthly / Yearly group with another one. */
  toggle?: PillGroup;
  /** A pill group under the plot, in place of a legend. */
  footerToggle?: PillGroup;
  titleAlign?: "start" | "center";
  /** "header" stacks the legend top-right, value first, as the donuts do. */
  legendPosition?: "bottom" | "header";
  legendGapClass?: string;
  legendDotClass?: string;
  className?: string;
  children: ReactNode;
}) {
  const headerToggle =
    toggle ??
    (showRange
      ? { label: "Date range", options: CHART_RANGES, defaultOption: defaultRange }
      : undefined);

  return (
    <section
      className={`flex h-full flex-col overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-fade-48 backdrop-blur-[12px] ${className}`}
    >
      <div
        className={`flex flex-col gap-4 p-5 sm:flex-row ${
          legendPosition === "header" ? "sm:items-start" : "sm:items-center"
        }`}
      >
        <h2
          className={`min-w-px flex-1 text-heading-m text-app-text ${
            titleAlign === "center" ? "text-center" : ""
          }`}
        >
          {title}
        </h2>
        {headerToggle ? <PillToggle group={headerToggle} /> : null}
        {scopes ? (
          <PillToggle
            group={{ label: "Grouping", options: scopes, defaultOption: defaultScope ?? scopes[0] }}
          />
        ) : null}
        {series && legendPosition === "header" ? (
          // Figma keeps this group 24px tall and lets the rows run down over the
          // plot's empty corner; below sm it takes its own height instead.
          <ul className="relative z-10 flex shrink-0 flex-col items-end gap-2 sm:h-6">
            {series.map((item) => (
              <li key={item.label} className="flex items-center gap-1">
                <span className="whitespace-nowrap text-label-2xs font-bold text-app-text-secondary">
                  {item.label}
                </span>
                <LegendDot tone={item.tone} sizeClass="size-3" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="min-h-px flex-1">{children}</div>

      {series && legendPosition === "bottom" ? (
        <div className={`flex flex-wrap items-center justify-center p-5 ${legendGapClass}`}>
          {series.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <LegendDot tone={item.tone} sizeClass={legendDotClass} />
              <span className="whitespace-nowrap text-label-2xs text-app-text-secondary">
                {item.label}
              </span>
            </span>
          ))}
        </div>
      ) : null}

      {footerToggle ? (
        <div className="flex justify-center p-5">
          <PillToggle group={footerToggle} />
        </div>
      ) : null}
    </section>
  );
}
