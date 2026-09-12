import type { BarRow } from "@/components/platform/charts/BarCharts";
import type { ChartSeries } from "@/components/platform/charts/ChartCard";
import type { LineSeries } from "@/components/platform/charts/AreaLineChart";
import type { FunnelStage } from "@/components/platform/charts/FunnelChart";

/*
 * Reports — Figma node 18176:36360.
 *
 * The figures are read off the drawn bars: Figma pins each segment to a pixel
 * width against a labelled axis, so the value is the width scaled back to that
 * axis. They are placeholders for the analytics endpoint, which will return the
 * same shapes.
 */

export const VOLUME_SERIES: readonly ChartSeries[] = [
  { label: "Pending", tone: "accent" },
  { label: "In Progress", tone: "neutral" },
  { label: "Verified", tone: "success" },
  { label: "Unverified", tone: "warning" },
  { label: "Escalated", tone: "information" },
];

/** Monthly Volume, newest first, against a 400k axis. */
export const MONTHLY_VOLUME: readonly BarRow[] = [
  { label: "Jun", values: [11000, 60000, 33000, 11000, 19000] },
  { label: "May", values: [11000, 79000, 33000, 11000, 19000] },
  { label: "Abr", values: [24000, 81000, 38000, 24000, 17000] },
  { label: "Mar", values: [9000, 77000, 41000, 9000, 19000] },
  { label: "Feb", values: [14000, 92000, 34000, 14000, 13000] },
  { label: "Jan", values: [23000, 70000, 33000, 23000, 6000] },
];

export const BILLING_SERIES: readonly LineSeries[] = [
  {
    label: "AI Credits Used",
    tone: "neutral",
    fill: true,
    values: [5, 62, 58, 71, 66, 78, 60, 55, 48, 52, 44, 58, 40, 46, 38, 50, 42, 36, 44, 30, 48, 34, 52, 38],
  },
  {
    label: "Billing Tier Threshold",
    tone: "accent",
    values: [78, 80, 76, 84, 79, 88, 82, 77, 81, 75, 79, 74, 72, 76, 70, 73, 68, 71, 66, 69, 64, 70, 78, 92],
  },
];

export const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export const WORKLOAD_SERIES: readonly ChartSeries[] = [
  { label: "12,094 Submitted", tone: "neutral" },
  { label: "2,469 Escalated", tone: "accent" },
  { label: "841 Completed", tone: "success" },
  { label: "841 Failed", tone: "warning" },
];

/** Operational Workload, against a $100k axis. */
export const OPERATIONAL_WORKLOAD: readonly BarRow[] = [
  { label: "2026", values: [58000, 86000, 62000, 79000] },
  { label: "2025", values: [17000, 27000, 24000, 19000] },
  { label: "2024", values: [86000, 99000, 80000, 92000] },
  { label: "2023", values: [41000, 61000, 55000, 43000] },
];

export const VERIFICATION_FUNNEL: readonly FunnelStage[] = [
  { label: "Orders Submitted", value: "40", percent: 5, tone: "warning" },
  { label: "Consent Received", value: "2850", percent: 35, tone: "neutral" },
  { label: "Landlord Conacted", value: "2110", percent: 30, tone: "information" },
  { label: "Response Received", value: "930", percent: 20, tone: "accent" },
  { label: "AI Verified", value: "240", percent: 16, tone: "success" },
  { label: "Human Verified", value: "40", percent: 7, tone: "highlight" },
  { label: "Completed", value: "250", percent: 10, tone: "success" },
];

export const FUNNEL_TOTAL = "2,373";

export const formatThousands = (value: number) =>
  value === 0 ? "0" : `${Math.round(value / 1000)}k`;

export const formatDollars = (value: number) =>
  value === 0 ? "$0" : `$${Math.round(value / 1000)}k`;
