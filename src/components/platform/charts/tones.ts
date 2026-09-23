/*
 * The functional colours every Reports chart draws with.
 *
 * Kept in a module of its own, with no "use client", because the charts are
 * Server Components: a constant imported from a client module arrives on the
 * server as a client reference rather than the object, so every lookup in it
 * came back undefined and the bars, slices and lines rendered colourless.
 */

export type ChartTone =
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "information"
  | "highlight"
  | "brand1"
  /** Navy in light mode, white in dark — Brand 1 would vanish on the dark canvas. */
  | "ink";

export type ChartSeries = {
  label: string;
  /** A functional token name; the chart resolves it to var(--ve-*). */
  tone: ChartTone;
};

export const TONE_VAR: Record<ChartTone, string> = {
  accent: "var(--ve-accent)",
  neutral: "var(--ve-neutral)",
  success: "var(--ve-success)",
  warning: "var(--ve-warning)",
  information: "var(--ve-information)",
  highlight: "var(--ve-highlight)",
  brand1: "var(--ve-surface-brand1)",
  ink: "var(--ve-text-heading)",
};
