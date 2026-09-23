import type { Metric } from "./dashboard";

/*
 * Client Profile — Figma section 18398:227163 ("Client Profile"), one frame per
 * tab, all sharing the same header, metrics and health summary.
 *
 * The figures are the design's own and stand in for the client endpoint. The
 * Account Notes card is drawn with lorem ipsum; that is placeholder copy, not
 * a note, so the mock carries no note and the card shows its empty state.
 */

export type ProfileTab = {
  slug: string;
  label: string;
  /** Tabs the design has no frame for yet are listed but not built. */
  designed: boolean;
};

export const PROFILE_TABS: readonly ProfileTab[] = [
  { slug: "overview", label: "Company Overview", designed: true },
  { slug: "contacts", label: "Contacts", designed: true },
  { slug: "billing", label: "Billing & Revenue", designed: true },
  { slug: "configuration", label: "Configuration", designed: true },
  { slug: "preferences", label: "Preferences", designed: true },
  { slug: "scoring", label: "Applicant Scoring", designed: true },
  { slug: "audit", label: "Audit & Compliance", designed: false },
  { slug: "portfolio", label: "Portfolio Analytics", designed: false },
];

export const CLIENT_PROFILE = {
  id: "CLNT-9210",
  name: "National Realty Corp",
  tier: "Enterprise",
  status: "Active",
  description:
    "Manage your organization settings, users, integrations, communications, and operational preferences.",
  notes: null as string | null,
};

export const PROFILE_METRICS: Metric[] = [
  { label: "Reports", value: "6,240" },
  { label: "MRR", value: "$49,219.19" },
  { label: "Avg VE Score™", value: "940" },
  { label: "Approval Rate", value: "82.21%" },
  { label: "Fraud Rate", value: "4.1%" },
  { label: "Active Users", value: "87" },
];

export const ACCOUNT_HEALTH = {
  percent: 92,
  standing: "Excellent Standing",
  legend: [
    { label: "Good", tone: "success" },
    { label: "Moderate", tone: "accent" },
    { label: "Low", tone: "warning" },
  ],
} as const;

export type HealthBar = { label: string; value: number; tone: "success" | "information" | "accent" | "warning" };

export const HEALTH_BARS: readonly HealthBar[] = [
  { label: "Revenue Health", value: 94, tone: "success" },
  { label: "Payment Health", value: 100, tone: "success" },
  { label: "Usage Health", value: 88, tone: "information" },
  { label: "Risk Level", value: 78, tone: "accent" },
  { label: "Compliance", value: 96, tone: "success" },
];

/* ---- Company Overview tab (18397:219020) ------------------------------- */

export type ProfileField = { label: string; value: string; wide?: boolean };

export const COMPANY_PROFILE_FIELDS: readonly ProfileField[] = [
  { label: "Legal Name", value: "National Realty Corporation" },
  { label: "DBA", value: "National Realty Corp" },
  { label: "Client Type", value: "Enterprise" },
  { label: "Industry", value: "Commercial & Residential Real Estate" },
  { label: "Website", value: "nationalrealtycorp.com" },
  { label: "EIN", value: "82-4491038" },
  { label: "Address", value: "1250 Avenue of the Americas, New York, NY 10020", wide: true },
  { label: "Region", value: "Northeast (NY, NJ, CT, PA)" },
  { label: "Time Zone", value: "Eastern Time (ET)" },
];

export const CONTRACT_FIELDS: readonly ProfileField[] = [
  { label: "Contract Start", value: "January 15, 2024" },
  { label: "Contract End", value: "January 14, 2027" },
  { label: "Auto-Renew", value: "Yes — 12-month terms" },
  { label: "White-Label Domain", value: "screening.nationalrealtycorp.com" },
  { label: "Brand Color", value: "#1A365D (Dark Navy)" },
  { label: "Logo Status", value: "Uploaded & Active" },
];

export const REGIONAL_RESTRICTIONS = [
  "New York",
  "New Jersey",
  "Connecticut",
  "Pennsylvania",
  "Massachusetts",
  "Maryland",
] as const;
