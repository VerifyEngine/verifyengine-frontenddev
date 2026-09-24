/*
 * Analytics Reports — Figma node 18176:29544 (the Light Mode "Reports" frame,
 * which is titled Analytics Reports and is a different screen from the dark
 * Reports frame built at /reports).
 *
 * Texts, legends and axis ticks are the design's. Series values are read off
 * the drawn charts (point and bar positions against their own axes), so they
 * reproduce the shapes as drawn; the reports endpoint replaces this module.
 */

export const REPORT_META = {
  client: "ABC",
  clientKind: "Property Management",
  subtitle: "Comprehensive tenant verification intelligence and performance overview",
  period: "Jan 1–31, 2026",
  generated: "Feb 2, 2026",
  by: "VerifyEngine.ai",
} as const;

export const HIGHLIGHTS = [
  "4,842 screenings completed",
  "81% approval rate",
  "Avg VE Score™: 742",
  "6% fraud flag rate",
  "9.2 hr avg completion time",
  "$48,920 total revenue",
] as const;

export type Tone = "success" | "highlight" | "warning" | "accent" | "neutral" | "brand1" | "slate" | "information" | "muted" | "faint";

export const OUTCOMES = {
  total: "4,842",
  rows: [
    { label: "Approved", percent: 81, applicants: "3,923 applicants", tone: "success" },
    { label: "Review", percent: 15, applicants: "725 applicants", tone: "highlight" },
    { label: "Denied", percent: 4, applicants: "194 applicants", tone: "warning" },
  ],
} as const satisfies { total: string; rows: readonly { label: string; percent: number; applicants: string; tone: Tone }[] };

export type Kpi = {
  icon: "users" | "check" | "x" | "alert" | "shield" | "clock" | "dollar";
  value: string;
  label: string;
  delta: string;
  trend: "up" | "down";
};

export const KPIS: readonly Kpi[] = [
  { icon: "users", value: "4,842", label: "Total Applications Screened", delta: "+8%", trend: "up" },
  { icon: "check", value: "81%", label: "Approval Rate", delta: "+6%", trend: "up" },
  { icon: "x", value: "8%", label: "Denial Rate", delta: "−3%", trend: "down" },
  { icon: "alert", value: "11%", label: "Review Rate", delta: "−4%", trend: "down" },
  { icon: "shield", value: "742", label: "Average VE Score™", delta: "+4.5 pts", trend: "up" },
  { icon: "alert", value: "6%", label: "Fraud Flag Rate", delta: "−1.9%", trend: "down" },
  { icon: "clock", value: "9.2 hrs", label: "Avg Verification Time", delta: "−1.3h", trend: "down" },
  { icon: "dollar", value: "$48,920", label: "Revenue / Usage", delta: "+12%", trend: "up" },
];

export const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"] as const;

export const SCREENING_VOLUME = { values: [685, 702, 746, 793, 815, 847], ticks: [620, 685, 750, 815, 880] };

/*
 * The design lists Approved, Review and Denied in the legend but draws every
 * bar in the Denied red at the month's total — the split is not in the file.
 * Reproduced as drawn and flagged.
 */
export const DECISIONS_BY_MONTH = { values: [575, 583, 617, 658, 675, 700], ticks: [0, 250, 500, 750, 1000] };

export const COMPLETION = {
  total: "4,842",
  slices: [
    { label: "Completed", percent: 83, count: "4,007", tone: "neutral" },
    { label: "Pending", percent: 11, count: "523", tone: "highlight" },
    { label: "Escalated", percent: 4, count: "182", tone: "accent" },
    { label: "Failed", percent: 3, count: "130", tone: "warning" },
  ],
} as const satisfies { total: string; slices: readonly { label: string; percent: number; count: string; tone: Tone }[] };

export const ESCALATION = {
  bars: [
    { label: "AI Completed", value: 74, tone: "brand1" },
    { label: "Escalated", value: 17, tone: "accent" },
    { label: "Human Review", value: 9, tone: "warning" },
  ],
  ticks: [0, 25, 50, 85],
} as const satisfies { bars: readonly { label: string; value: number; tone: Tone }[]; ticks: readonly number[] };

export const COMPLETION_TIME = { values: [14.2, 13.0, 12.3, 11.8, 10.4, 9.2], ticks: [6, 9, 12, 17] };

export const FRAUD_TREND = { values: [8.3, 8.2, 6.6, 5.2, 4.7, 4.6], ticks: [0, 3, 6, 11] };

export const DENIAL_REASONS = {
  bars: [
    { label: ["Eviction", "History"], value: 311, tone: "warning" },
    { label: ["Fraud /", "Payment", "Issues"], value: 246, tone: "accent" },
    { label: ["NSF /", "Payment", "History"], value: 164, tone: "highlight" },
    { label: ["Lease", "Violations"], value: 81, tone: "slate" },
    { label: ["Outstanding", "Balances"], value: 14, tone: "neutral" },
  ],
  ticks: [0, 80, 160, 240, 320],
} as const satisfies { bars: readonly { label: readonly string[]; value: number; tone: Tone }[]; ticks: readonly number[] };

export type Risk = "low" | "medium" | "high";

/** Dot centres in % of the map box, as placed in the design (node 18335:55508). */
export const STATE_RISK: readonly { state: string; x: number; y: number; risk: Risk }[] = [
  ["WA", 5, 19.4, "low"], ["OR", 5, 30.9, "low"], ["CA", 5, 48.5, "medium"], ["NV", 13, 39.7, "low"],
  ["ID", 14, 22.1, "low"], ["MT", 21, 13.3, "low"], ["AZ", 16, 51.2, "medium"], ["UT", 18, 35.3, "low"],
  ["CO", 25, 37.1, "low"], ["WY", 25, 23, "low"], ["NM", 22, 60, "low"], ["ND", 35, 12.4, "low"],
  ["SD", 35, 21.2, "low"], ["NE", 36, 28.3, "low"], ["KS", 36, 37.1, "low"], ["OK", 36, 45.9, "medium"],
  ["TX", 35, 61.8, "high"], ["MN", 45, 12.4, "low"], ["IA", 47, 23.9, "low"], ["MO", 48, 33.5, "low"],
  ["AR", 49, 44.1, "medium"], ["LA", 49, 58.2, "medium"], ["WI", 54, 15.9, "low"], ["IL", 56, 26.5, "low"],
  ["MS", 57, 51.2, "high"], ["MI", 60, 14.1, "low"], ["IN", 59, 26.5, "low"], ["TN", 58, 40.6, "medium"],
  ["AL", 61, 51.2, "high"], ["KY", 62, 30, "low"], ["OH", 66, 19.4, "low"], ["WV", 67, 28.3, "low"],
  ["GA", 67, 49.4, "high"], ["FL", 67, 65.3, "high"], ["SC", 71, 44.1, "medium"], ["NC", 70, 35.3, "medium"],
  ["VA", 70, 28.3, "medium"], ["PA", 74, 20.3, "low"], ["NY", 79, 14.1, "medium"], ["NJ", 81, 22.1, "low"],
  ["DE", 77, 27.4, "low"], ["MD", 78, 26.5, "medium"], ["CT", 84, 17.7, "low"], ["RI", 86, 15.9, "low"],
  ["MA", 85, 12.4, "low"], ["VT", 85, 9.7, "low"], ["NH", 86, 8, "low"], ["ME", 88, 6.2, "low"],
  ["AK", 7, 76.7, "low"], ["HI", 22, 76.7, "low"],
].map(([state, x, y, risk]) => ({ state: state as string, x: x as number, y: y as number, risk: risk as Risk }));

export const SCORE_DISTRIBUTION = {
  bars: [
    { label: "300–400", value: 44, tone: "faint" },
    { label: "401–500", value: 89, tone: "muted" },
    { label: "501–600", value: 252, tone: "slate" },
    { label: "601–700", value: 859, tone: "information" },
    { label: "701–800", value: 1990, tone: "brand1" },
    { label: "801–900", value: 1215, tone: "neutral" },
    { label: "901+", value: 430, tone: "neutral" },
  ],
  ticks: [0, 500, 1000, 1500, 2000],
} as const satisfies { bars: readonly { label: string; value: number; tone: Tone }[]; ticks: readonly number[] };

export const QUALITY_TREND = { values: [690, 704, 719, 733, 740, 744], ticks: [665, 690, 715, 755] };

/*
 * The legend reads Responded (navy) and No Response (grey), but every bar is
 * drawn grey. The heights are the response rates, so they are drawn in the
 * Responded navy — a legend-to-bar mismatch, corrected and flagged.
 */
export const OUTREACH = {
  bars: [
    { label: "Call", value: 63 },
    { label: "SMS", value: 76 },
    { label: "Email", value: 49 },
    { label: "Overall", value: 74 },
  ],
  ticks: [0, 25, 50, 75, 100],
} as const;

export const FUNNEL = [
  { value: 4842, display: "4,842", label: "Applications Submitted", tone: "brand1" },
  { value: 4210, display: "4,210", label: "Contact Initiated", tone: "brand1" },
  { value: 3841, display: "3,841", label: "Information Verified", tone: "neutral" },
  { value: 698, display: "698", label: "Escalated", tone: "accent" },
  { value: 4007, display: "4,007", label: "Completed", tone: "success" },
] as const satisfies readonly { value: number; display: string; label: string; tone: Tone }[];

export const FOOTER = {
  generated: "February 2, 2026 | CST",
  version: "v2.4.1",
  reportId: "VE-2026-0201-ABC",
  preparedFor: "ABC Property Management",
} as const;
