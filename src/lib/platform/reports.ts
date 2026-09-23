import type { BarRow } from "@/components/platform/charts/BarCharts";
import type { ChartSeries } from "@/components/platform/charts/tones";
import type { LineSeries } from "@/components/platform/charts/AreaLineChart";
import type { FunnelStage } from "@/components/platform/charts/FunnelChart";
import type { PieSlice } from "@/components/platform/charts/PieChart";
import type { RadarPoint } from "@/components/platform/charts/RadarChart";
import type { DonutSlice } from "@/components/platform/charts/DonutChart";
import type { RingProgress } from "@/components/platform/charts/RingProgressChart";
import type { StateCount, StateRank } from "@/components/platform/charts/StateActivityMap";
import type { TopClientRow } from "@/components/platform/charts/TopClientsTable";

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

export const QUEUE_DISTRIBUTION: readonly PieSlice[] = [
  { label: "Pending", tone: "accent", percent: 15 },
  { label: "In Progress", tone: "highlight", percent: 7 },
  { label: "Awaiting", tone: "warning", percent: 8 },
  { label: "Escalated", tone: "neutral", percent: 7 },
  { label: "Completed", tone: "success", percent: 70 },
];

export const QUEUE_TOTAL = "38,420";

export const SLA_SERIES: readonly ChartSeries[] = [
  { label: "12,094 - Within SLA", tone: "neutral" },
  { label: "2,469 - Near Breach", tone: "accent" },
  { label: "841 - Error", tone: "warning" },
  { label: "841 - Breached", tone: "success" },
];

/*
 * SLA Risk Monitor. Figma labels this axis 0, 50k, 100k, 250k, 400k, 500k, 1M —
 * the steps are not even, so the drawn bar heights cannot be read back as
 * values on a linear scale. These are the heights as drawn, against the 500k
 * gridline the columns actually reach, which is what the analytics endpoint
 * will replace. Flagged to the designer.
 */
export const SLA_RISK: readonly BarRow[] = [
  { label: "2019", values: [205000, 250000, 235000, 195000] },
  { label: "2020", values: [65000, 240000, 480000, 195000] },
  { label: "2021", values: [455000, 95000, 525000, 410000] },
  { label: "2022", values: [280000, 275000, 250000, 265000] },
  { label: "2023", values: [300000, 265000, 90000, 105000] },
  { label: "2024", values: [200000, 225000, 245000, 265000] },
  { label: "2025", values: [255000, 90000, 110000, 40000] },
  { label: "2026", values: [260000, 385000, 300000, 65000] },
];

export const SLA_SCOPES = ["Client", "Team", "Region"] as const;

export const ESCALATION_RADAR: readonly RadarPoint[] = [
  { label: "Fraud Risk", value: 2457 },
  { label: "No Response", value: 1995 },
  { label: "Ownership Mismatch", value: 1228 },
  { label: "Consent Missing", value: 6448 },
  { label: "AI Uncertainty", value: 4764 },
];

export const ESCALATION_LEGEND: readonly ChartSeries[] = [
  { label: "24% Fraud Risk", tone: "warning" },
  { label: "16% No Response", tone: "information" },
  { label: "8% Ownership Mismatch", tone: "neutral" },
  { label: "32% Consent Missing", tone: "success" },
  { label: "20% AI Uncertainty", tone: "neutral" },
];

/*
 * AI Outreach Performance and System Failure Monitoring — Figma nodes
 * 18176:37115 and 18176:38003.
 *
 * Read point by point off the design's own line layers, against its 0–5m axis:
 * each layer is a polyline pinned to the plot, so a vertex's height is the
 * value. The two cards draw the same four lines under different legends, so
 * they share the samples until the analytics endpoint separates them.
 */
const OUTREACH_VALUES = {
  green: [4.3, 4.12, 4.08, 3.94, 3.94, 4.12, 4.12, 4.08, 4.12, 4.34, 4.37, 4.37, 4.12, 3.97, 4.01, 3.9, 3.9, 3.79, 3.79, 3.79, 3.65, 3.75, 3.79, 3.79, 3.86, 3.86, 3.75, 3.9, 3.94, 4.19, 4.19, 4.23, 4.23, 4.19, 4.19, 4.23, 4.15, 4.15, 4.12, 4.01, 4.01, 4.01, 4.12, 4.01, 4.37, 4.84, 4.63, 4.7, 4.63, 4.3, 4.3, 4.26, 4.26, 4.26, 4.3, 4.12, 4.19, 4.19, 4.19, 4.12, 4.19, 4.08, 4.04, 4.08, 4.08, 4.19, 4.08, 4.04, 3.9, 3.9, 3.94, 3.94, 3.9, 3.75, 3.83, 3.43, 3.46, 3.43, 3.46, 3.54, 3.54, 3.54, 3.54, 3.43, 3.65, 3.68, 3.83, 3.83],
  blue: [4.99, 4.28, 3.63, 2.97, 2.77, 2.67, 2.67, 2.62, 2.72, 3.02, 3.02, 2.67, 2.72, 2.72, 2.87, 2.97, 2.87, 2.62, 2.16, 2.16, 2.27, 1.86, 2.16, 2.42, 2.16, 2.06, 2.16, 2.27, 2.27, 2.27, 2.42, 2.52, 2.77, 3.12, 3.12, 3.12, 3.12, 3.12, 3.22, 3.42, 3.42, 3.42, 3.22, 3.37, 3.58, 3.78, 3.68, 3.63, 3.58, 3.68, 3.68, 3.63, 3.63, 3.88, 3.98, 3.83, 3.68, 3.53, 3.17, 3.32, 3.53, 3.53, 3.63, 3.68, 3.53, 3.68, 3.98, 3.98, 3.88, 3.78, 3.78, 3.68, 3.68, 3.68, 3.78, 4.08, 4.38, 4.58, 4.43, 4.03, 4.03, 3.83, 3.83, 3.93, 3.93, 4.08, 3.83],
  orange: [1.89, 2.01, 1.94, 1.94, 1.89, 1.89, 1.99, 1.99, 2.19, 2.26, 2.16, 2.01, 1.87, 1.82, 1.82, 1.82, 1.87, 1.87, 1.91, 1.96, 1.96, 1.82, 1.74, 1.82, 1.79, 1.74, 1.74, 1.64, 1.57, 1.74, 1.82, 1.89, 1.96, 1.91, 1.79, 1.79, 1.82, 1.82, 1.77, 1.79, 1.82, 1.87, 1.77, 1.67, 1.59, 1.69, 1.69, 1.69, 1.59, 1.54, 1.54, 1.54, 1.54, 1.54, 1.37, 1.24, 1.19, 1.12, 1.12, 1.12, 1.07, 1.02, 1.07, 1.19, 1.07, 0.92, 1.12, 1.07, 1.07, 1.29, 1.42, 1.47, 1.42, 1.34, 1.34, 1.32, 1.49, 1.49, 1.34, 1.29, 1.32, 1.32, 1.37, 1.47, 1.79, 2.11, 2.46],
  yellow: [0.86, 0.74, 0.62, 0.51, 0.47, 0.46, 0.46, 0.45, 0.47, 0.52, 0.52, 0.46, 0.47, 0.47, 0.49, 0.51, 0.49, 0.45, 0.37, 0.37, 0.39, 0.32, 0.37, 0.41, 0.37, 0.35, 0.37, 0.39, 0.39, 0.39, 0.41, 0.43, 0.47, 0.54, 0.54, 0.54, 0.54, 0.54, 0.55, 0.59, 0.59, 0.59, 0.55, 0.58, 0.62, 0.65, 0.63, 0.62, 0.62, 0.63, 0.63, 0.62, 0.62, 0.67, 0.69, 0.66, 0.63, 0.61, 0.54, 0.57, 0.61, 0.61, 0.62, 0.63, 0.61, 0.63, 0.69, 0.69, 0.67, 0.65, 0.65, 0.63, 0.63, 0.63, 0.65, 0.7, 0.76, 0.79, 0.77, 0.69, 0.69, 0.66, 0.66, 0.68, 0.68, 0.7, 0.66],
};

function outreachSeries(labels: readonly [string, string, string, string]): readonly LineSeries[] {
  // Figma washes the green line at 12% and the other three at 32%.
  return [
    { label: labels[0], tone: "success", fill: true, fillOpacity: 0.12, values: OUTREACH_VALUES.green },
    { label: labels[1], tone: "neutral", fill: true, fillOpacity: 0.32, values: OUTREACH_VALUES.blue },
    { label: labels[2], tone: "accent", fill: true, fillOpacity: 0.32, values: OUTREACH_VALUES.orange },
    { label: labels[3], tone: "highlight", fill: true, fillOpacity: 0.32, values: OUTREACH_VALUES.yellow },
  ];
}

export const OUTREACH_SERIES = outreachSeries([
  "66 Call Answered (25%)",
  "66 SMS Delivery (25%)",
  "66 Email Open (25%)",
  "66 Response Rate (25%)",
]);

export const SYSTEM_FAILURE_SERIES = outreachSeries([
  "66 SMS Failures (25%)",
  "66 API Outages (25%)",
  "66 Call Delivery Issues (25%)",
  "66 AI Processing Delays (25%)",
]);

/*
 * Human Override Rate — Figma node 18176:37195.
 *
 * The anchors of the design's smooth curve, read against its 0–5k axis at
 * their own horizontal positions, since the curve is not sampled evenly. The
 * wash is Surface/Brand 2 from full strength to nothing, with the Brand 1 line
 * the design draws along its top edge.
 */
export const OVERRIDE_SERIES: readonly LineSeries[] = [
  {
    label: "Human overrides",
    tone: "brand1",
    fill: true,
    fillOpacity: 1,
    fillColor: "var(--ve-surface-brand2)",
    positions: [0, 0.0562, 0.1473, 0.2259, 0.2996, 0.355, 0.4368, 0.5319, 0.6194, 0.6775, 0.737, 0.793, 0.8525, 0.9318, 1],
    values: [2794, 3440, 3203, 2494, 3346, 4615, 4183, 4243, 4149, 3960, 3372, 3061, 2811, 3007, 4406],
  },
];

export const MONTH_LABELS_UPPER = MONTH_LABELS.map((month) => month.toUpperCase());

/*
 * Figma spells two of these "Overrridden" and "Esalated"; corrected here and
 * flagged to the designer.
 */
export const OVERRIDE_FILTERS = ["AI Pass Overridden", "AI Fail Overridden", "AI Review Escalated"] as const;

/* Client Risk Radar — Figma node 18176:37251. */
export const CLIENT_RISK_RADAR: readonly RadarPoint[] = [
  { label: "Fraud Rate", value: 2457, tone: "warning" },
  { label: "NSF Frequency", value: 1995, tone: "brand1" },
  { label: "Escalation %", value: 1228, tone: "information" },
  { label: "Eviction Findings", value: 6448, tone: "success" },
  { label: "Response Rate", value: 4764, tone: "neutral" },
];

export const CLIENT_RISK_LEGEND: readonly ChartSeries[] = [
  { label: "24% Fraud Rate", tone: "warning" },
  { label: "16% NSF Frequency", tone: "brand1" },
  { label: "8% Escalation", tone: "information" },
  { label: "32% Eviction Findings", tone: "success" },
  { label: "20% Response Rate", tone: "neutral" },
];

/*
 * Verification Activity by State — Figma node 18176:37374.
 *
 * Badge centres in the design's 778 × 548 map, worked out from each badge's
 * offset in Figma plus half its drawn size.
 */
export const STATE_COUNTS: readonly StateCount[] = [
  { value: "59,275", x: 239.5, y: 117.7 },
  { value: "68,387", x: 145.3, y: 222.8 },
  { value: "65,908", x: 501.6, y: 294.6 },
  { value: "49,078", x: 502.1, y: 357.6 },
  { value: "70,669", x: 576.4, y: 269.9 },
  { value: "49,645", x: 651.9, y: 297.8 },
  { value: "37,401", x: 617.3, y: 315.8 },
  { value: "50,365", x: 532.4, y: 334.9 },
  { value: "17,182", x: 578.5, y: 328.2 },
  { value: "30,374", x: 647.0, y: 384.3 },
  { value: "35,920", x: 261.5, y: 195.8 },
  { value: "9,663", x: 244.8, y: 285.2 },
  { value: "96,698", x: 199.0, y: 177.1 },
  { value: "54,590", x: 327.1, y: 130.8 },
  { value: "58,590", x: 315.8, y: 489.8 },
  { value: "21,619", x: 300.3, y: 67.9 },
  { value: "81,359", x: 725.8, y: 94.8 },
  { value: "95,543", x: 688.8, y: 112.9 },
  { value: "43,431", x: 752.4, y: 60.0 },
  { value: "62,449", x: 399.8, y: 63.4 },
  { value: "17,048", x: 427.9, y: 234.0 },
  { value: "27,226", x: 486.3, y: 166.3 },
  { value: "9,804", x: 547.5, y: 76.2 },
  { value: "95,401", x: 521.8, y: 112.3 },
  { value: "46,750", x: 588.2, y: 133.0 },
  { value: "73,755", x: 609.6, y: 179.8 },
  { value: "50,201", x: 573.1, y: 188.8 },
  { value: "12,466", x: 591.6, y: 237.4 },
  { value: "39,628", x: 633.9, y: 218.5 },
  { value: "21,918", x: 473.4, y: 88.1 },
  { value: "94,166", x: 670.0, y: 164.5 },
  { value: "26,244", x: 504.7, y: 231.7 },
  { value: "89,545", x: 537.5, y: 201.4 },
  { value: "92,927", x: 674.9, y: 221.2 },
  { value: "31,695", x: 693.9, y: 194.2 },
  { value: "18,791", x: 734.9, y: 134.3 },
  { value: "61,439", x: 406.4, y: 177.9 },
  { value: "75,366", x: 320.9, y: 290.1 },
  { value: "86,276", x: 184.7, y: 32.0 },
  { value: "17,636", x: 674.6, y: 261.8 },
  { value: "40,923", x: 330.1, y: 213.8 },
  { value: "7,695", x: 166.5, y: 99.3 },
  { value: "78,805", x: 400.8, y: 355.2 },
  { value: "31,280", x: 439.6, y: 285.6 },
  { value: "57,871", x: 133.2, y: 426.2 },
  { value: "15,353", x: 393.6, y: 124.0 },
];

export const STATE_METRICS = ["Volume", "Fraud %", "Avg TAT", "Escalation Time"] as const;

export const TOP_STATES: readonly StateRank[] = [
  { name: "Veridia", share: "60%", value: "8,700" },
  { name: "New Glarus", share: "24%", value: "7,400" },
  { name: "Brighton", share: "17%", value: "6,900" },
  { name: "Arvada", share: "12%", value: "6,200" },
  { name: "Evergreen", share: "10%", value: "5,800" },
  { name: "Lakewood", share: "9%", value: "5,500" },
  { name: "Thornton", share: "7%", value: "5,100" },
  { name: "Aurora", share: "5%", value: "4,800" },
  { name: "Westminster", share: "3%", value: "4,500" },
  { name: "Centennial", share: "1%", value: "4,100" },
];

/* Top Clients — Figma node 18176:37625. */
export const TOP_CLIENTS: readonly TopClientRow[] = [
  { id: "#9353", name: "Mary Freund", volume: "6,577", success: "83.8%", escalation: "23.3%", avgTat: "367.5" },
  { id: "#3297", name: "David Elson", volume: "1,375", success: "38.4%", escalation: "6.2%", avgTat: "133.1" },
  { id: "#4123", name: "Bradley Lawlor", volume: "1,968", success: "46.3%", escalation: "10.8%", avgTat: "145.7" },
  { id: "#1126", name: "Chris Glasser", volume: "3,852", success: "50.6%", escalation: "12.5%", avgTat: "203.6" },
  { id: "#1644", name: "John Dukes", volume: "5,041", success: "75.9%", escalation: "16.4%", avgTat: "229.1" },
  { id: "#2178", name: "Eddie Lake", volume: "7,898", success: "84.7%", escalation: "26.0%", avgTat: "385.7" },
  { id: "#7949", name: "Dennis Callis", volume: "8,934", success: "98.2%", escalation: "26.6%", avgTat: "395.9" },
  { id: "#5575", name: "Kenneth Allen", volume: "2,286", success: "50.0%", escalation: "11.8%", avgTat: "154.4" },
  { id: "#4168", name: "Corina McCoy", volume: "7,996", success: "97.5%", escalation: "26.3%", avgTat: "393.7" },
  { id: "#2312", name: "Katie Sims", volume: "4,411", success: "53.6%", escalation: "13.3%", avgTat: "205.9" },
];

/*
 * Verification Breakdown and Fraud Detection Breakdown — Figma nodes
 * 18176:37710 and 18176:37809.
 *
 * The shares are the slices as drawn, measured from the design. The badges
 * Figma prints on them add up to 111% and 119%, so the drawing was kept and
 * each badge now states its own slice. Flagged to the designer. The legend
 * counts and the total are the design's as written.
 *
 * Slices run clockwise from twelve o'clock; the legends keep the design's own
 * order, which is not the order round the ring.
 */
export const CHANNEL_BREAKDOWN: readonly DonutSlice[] = [
  { label: "Voice", tone: "success", percent: 70 },
  { label: "Multi-Channel", tone: "highlight", percent: 8 },
  { label: "SMS", tone: "accent", percent: 15 },
  { label: "Email", tone: "warning", percent: 7 },
];

export const CHANNEL_LEGEND: readonly ChartSeries[] = [
  { label: "12,094 Voice", tone: "success" },
  { label: "2,469 SMS", tone: "accent" },
  { label: "841 Email", tone: "warning" },
  { label: "841 Multi-Channel", tone: "highlight" },
];

export const FRAUD_BREAKDOWN: readonly DonutSlice[] = [
  { label: "Identity Mismatch", tone: "neutral", percent: 7 },
  { label: "Ownership Mismatch", tone: "success", percent: 62 },
  { label: "Suspicious Behavior", tone: "highlight", percent: 8 },
  { label: "Fake Contact", tone: "accent", percent: 15 },
  { label: "Duplicate", tone: "warning", percent: 8 },
];

export const FRAUD_LEGEND: readonly ChartSeries[] = [
  { label: "12,094 Identity Mismatch", tone: "neutral" },
  { label: "12,094 Ownership Mismatch", tone: "success" },
  { label: "2,469 Fake Contact", tone: "accent" },
  { label: "841 Duplicate", tone: "warning" },
  { label: "841 Suspicious Behavior", tone: "highlight" },
];

export const BREAKDOWN_TOTAL = "15,420";

/*
 * Compliance Completion — Figma node 18176:37915.
 *
 * Same situation as the donuts: the rings are drawn at about 84%, 64%, 53% and
 * 71% while their badges read 57%, 12%, 13% and 8%. The rings were kept and the
 * badges follow them. Outermost ring first.
 */
export const COMPLIANCE_RINGS: readonly RingProgress[] = [
  { label: "Consent Signed", tone: "neutral", percent: 84 },
  { label: "Audit Logs", tone: "accent", percent: 64 },
  { label: "Disclosure", tone: "warning", percent: 53 },
  { label: "Verification", tone: "success", percent: 71 },
];

export const COMPLIANCE_LEGEND: readonly ChartSeries[] = [
  { label: "12,094 Consent Signed", tone: "neutral" },
  { label: "2,469 Audit Logs", tone: "accent" },
  { label: "841 Disclosure", tone: "warning" },
  { label: "841 Verification", tone: "success" },
];
