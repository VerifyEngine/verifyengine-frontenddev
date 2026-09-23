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
};

export const PROFILE_TABS: readonly ProfileTab[] = [
  { slug: "overview", label: "Company Overview" },
  { slug: "contacts", label: "Contacts" },
  { slug: "billing", label: "Billing & Revenue" },
  { slug: "configuration", label: "Configuration" },
  { slug: "preferences", label: "Preferences" },
  { slug: "scoring", label: "Applicant Scoring" },
  { slug: "audit", label: "Audit & Compliance" },
  { slug: "portfolio", label: "Portfolio Analytics" },
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

/* ---- Contacts tab (18397:219237) ---------------------------------------- */

export type KeyContact = { name: string; role: string; title: string; email: string; phone: string };

export const KEY_CONTACTS: readonly KeyContact[] = [
  { name: "David Kim", role: "Primary Admin", title: "VP of Operations", email: "d.kim@nrc.com", phone: "+1 212 555 0101" },
  { name: "Andrew Patel", role: "Technical", title: "CTO", email: "tech@nrc.com", phone: "+1 212 555 0103" },
  { name: "Rachel Torres", role: "Billing", title: "Finance Director", email: "billing@nrc.com", phone: "+1 212 555 0102" },
  { name: "Jennifer Walsh", role: "Compliance", title: "General Counsel", email: "legal@nrc.com", phone: "+1 212 555 0104" },
];

export type TeamMember = { name: string; email: string; role: string; lastLogin: string };

export const TEAM_MEMBERS: readonly TeamMember[] = [
  { name: "Sophie Grant", email: "s.grant@nrc.com", role: "Reviewer", lastLogin: "2h ago" },
  { name: "Mark Ellis", email: "m.ellis@nrc.com", role: "Reviewer", lastLogin: "1d ago" },
  { name: "Priya Sharma", email: "p.sharma@nrc.com", role: "Admin", lastLogin: "30m ago" },
  { name: "James Whitfield", email: "j.white@nrc.com", role: "Viewer", lastLogin: "5d ago" },
  { name: "Lisa Nakamura", email: "l.naka@nrc.com", role: "Reviewer", lastLogin: "3h ago" },
];

export const TEAM_TOTAL = 87;

/* ---- Billing & Revenue tab (18397:220618) ------------------------------- */

export type BillingStat = { label: string; value: string; note: string; trend?: "up" };

export const BILLING_STATS: readonly BillingStat[] = [
  { label: "Current MRR", value: "$48,200", note: "+3.6%", trend: "up" },
  { label: "YTD Revenue", value: "$261,200", note: "+22%", trend: "up" },
  { label: "Next Invoice", value: "Feb 1", note: "$48,200" },
  { label: "Payment Method", value: "ACH", note: "Bank of America" },
];

export const PLAN_FIELDS: readonly ProfileField[] = [
  { label: "Plan Type", value: "Enterprise (Custom)" },
  { label: "Per Report Fee", value: "$7.73 / report" },
  { label: "Monthly Base", value: "$12,000 / month" },
  { label: "API Fee", value: "$800 / month" },
  { label: "White-Label Fee", value: "$1,200 / month" },
  { label: "Invoice Cadence", value: "Monthly — 1st of month" },
  { label: "Credit Balance", value: "$0.00" },
  { label: "Seat Limit", value: "100 users" },
  { label: "Overage Rate", value: "$9.50 / report" },
];

export type ProfileInvoice = { id: string; date: string; amount: string; status: "Paid" };

/** Newest first, as the design lists them. The trend chart reads them oldest first. */
export const PROFILE_INVOICES: readonly ProfileInvoice[] = [
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$48,200", status: "Paid" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$46,500", status: "Paid" },
  { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$44,800", status: "Paid" },
  { id: "INV-2025-010", date: "Oct 1, 2025", amount: "$43,100", status: "Paid" },
  { id: "INV-2025-009", date: "Sep 1, 2025", amount: "$40,200", status: "Paid" },
  { id: "INV-2025-008", date: "Aug 1, 2025", amount: "$38,400", status: "Paid" },
];

/** Revenue Trend, Aug → Jan — the invoices above, oldest first. */
export const REVENUE_TREND = {
  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  values: [38400, 40200, 43100, 44800, 46500, 48200],
};

/* ---- Configuration tab (18397:224614) ----------------------------------- */

export const FEATURE_FLAGS: readonly { label: string; enabled: boolean }[] = [
  { label: "AI Voice Outreach", enabled: true },
  { label: "SMS Verification", enabled: true },
  { label: "Email Outreach", enabled: true },
  { label: "Manual Review", enabled: true },
  { label: "White-Label Portal", enabled: true },
  { label: "API Access", enabled: true },
  { label: "Chrome Extension", enabled: false },
  { label: "Team Management", enabled: true },
  { label: "Fraud Scoring", enabled: true },
  { label: "VE Score™", enabled: true },
  { label: "Scheduled Reports", enabled: true },
];

/** Masked as the design shows them; the full key never reaches the browser. */
export const API_KEYS: readonly { name: string; masked: string; created: string }[] = [
  { name: "Production Key", masked: "ve_prod_••••••••••••••••••••4a9f", created: "Jan 15, 2024" },
  { name: "Staging Key", masked: "ve_stg_••••••••••••••••••••8c2e", created: "Mar 2, 2024" },
];

export const WEBHOOKS: readonly { url: string; events: string }[] = [
  { url: "https://nrc.com/webhooks/ve/decisions", events: "Decision Complete, Fraud Alert" },
  { url: "https://nrc.com/webhooks/ve/reports", events: "Report Generated" },
];

export const PMS_INTEGRATIONS: readonly { name: string; connected: boolean }[] = [
  { name: "AppFolio", connected: true },
  { name: "Yardi", connected: true },
  { name: "Buildium", connected: false },
  { name: "RealPage", connected: true },
  { name: "Entrata", connected: false },
  { name: "ResMan", connected: false },
];

/* ---- Preferences tab (18397:218500) ------------------------------------- */

export const OUTREACH_CADENCE: readonly ProfileField[] = [
  { label: "First Attempt", value: "Immediate (SMS + Email)" },
  { label: "Second Attempt", value: "24 hours later (AI Call)" },
  { label: "Third Attempt", value: "48 hours (SMS + Call)" },
  { label: "Max Attempts", value: "5 per applicant" },
  { label: "Rush Verification", value: "Enabled — 4hr turnaround" },
  { label: "Quiet Hours", value: "10pm – 8am (client timezone)" },
];

export const CHANNEL_PRIORITY: readonly { label: string; icon: "phone" | "message" | "mail"; enabled: boolean }[] = [
  { label: "AI Voice Call", icon: "phone", enabled: true },
  { label: "SMS", icon: "message", enabled: true },
  { label: "Email", icon: "mail", enabled: true },
];

export const DECISION_DEFAULTS: readonly ProfileField[] = [
  { label: "Auto-Approve Threshold", value: "VE Score ≥ 720" },
  { label: "Auto-Deny Threshold", value: "VE Score ≤ 580" },
  { label: "Manual Review Zone", value: "VE Score 581–719" },
  { label: "Fallback Decision", value: "Manual Review" },
  { label: "PDF Template", value: "Corporate v3 (Dark Navy)" },
  { label: "Email Template", value: "National Realty — Pro" },
];

/* ---- Applicant Scoring tab (18398:224906) ------------------------------- */

export const DECISION_ENGINE: readonly { label: string; description: string; enabled: boolean }[] = [
  { label: "Auto Approve", description: "Auto-approve when VE Score ≥ 720", enabled: true },
  { label: "Auto Deny", description: "Auto-deny when VE Score ≤ 580", enabled: true },
  { label: "Manual Only", description: "All decisions require human review", enabled: false },
];

export const SCORE_MODES = ["VerifyEngine Default", "Custom Weighted", "Hybrid Mode"] as const;

/**
 * The design draws every bar at the same quarter width whatever its weight;
 * here each bar is as long as its share.
 */
export const SCORING_WEIGHTS: readonly { label: string; weight: number; tone: "ink" | "information" | "neutral" | "warning" | "accent" | "success" }[] = [
  { label: "Payment Reliability", weight: 30, tone: "ink" },
  { label: "Lease Compliance", weight: 20, tone: "information" },
  { label: "Property Condition", weight: 10, tone: "neutral" },
  { label: "Legal / Eviction", weight: 20, tone: "warning" },
  { label: "Fraud Score", weight: 12, tone: "accent" },
  { label: "Stability", weight: 8, tone: "success" },
];

export type DecisionRule = {
  field: string;
  condition: string;
  outcome: string;
  tone: "warning" | "accent";
  enabled: boolean;
};

export const DECISION_RULES: readonly DecisionRule[] = [
  { field: "Eviction History", condition: "= Yes", outcome: "Auto Fail", tone: "warning", enabled: true },
  { field: "NSF Count", condition: "> 2", outcome: "Review", tone: "accent", enabled: true },
  { field: "Late Payments", condition: "> 3", outcome: "Fail", tone: "warning", enabled: true },
  { field: "Fraud Score", condition: "> 70", outcome: "Auto Deny", tone: "warning", enabled: true },
  { field: "Missing Landlord Ref", condition: "= True", outcome: "Review", tone: "accent", enabled: false },
  { field: "Outstanding Balance", condition: "> $500", outcome: "Review", tone: "accent", enabled: true },
];

/* ---- Audit & Compliance tab (18398:226181) ------------------------------ */

export type AuditCategory = "Config" | "Billing" | "Auth" | "Override" | "System" | "Users";

export type AuditEntry = { at: string; actor: string; action: string; category: AuditCategory };

/** The design repeats its first three entries to fill the frame; each is listed once here. */
export const AUDIT_LOG: readonly AuditEntry[] = [
  { at: "Jan 28, 2026 14:23", actor: "Sarah M. (Admin)", action: "Modified scoring weight — Payment Reliability 25% → 30%", category: "Config" },
  { at: "Jan 25, 2026 09:14", actor: "System", action: "Invoice INV-2026-001 generated ($48,200)", category: "Billing" },
  { at: "Jan 20, 2026 16:47", actor: "David Kim", action: "Logged in via SSO", category: "Auth" },
  { at: "Jan 18, 2026 11:05", actor: "Super Admin", action: "Feature flag 'Chrome Extension' disabled", category: "Config" },
  { at: "Jan 15, 2026 08:33", actor: "Super Admin", action: "Manual decision override — Applicant #A-8842 Approved", category: "Override" },
  { at: "Jan 10, 2026 15:21", actor: "System", action: "Webhook delivery failed — retrying (attempt 2/5)", category: "System" },
  { at: "Jan 8, 2026 12:00", actor: "Sarah M. (Admin)", action: "Added team member p.sharma@nrc.com as Admin", category: "Users" },
];

export const COMPLIANCE_CHECKS: readonly { label: string; status: string }[] = [
  { label: "FCRA Permissible Purpose", status: "Verified" },
  { label: "TCPA Consent Records", status: "Active" },
  { label: "Adverse Action Notices", status: "Compliant" },
  { label: "Data Retention Policy", status: "90 days" },
];

export const OVERRIDE_HISTORY: readonly { label: string; count: number; by: string }[] = [
  { label: "Manual Approve", count: 12, by: "Admin" },
  { label: "Manual Deny", count: 4, by: "Admin" },
  { label: "Score Override", count: 3, by: "Super Admin" },
];

/* ---- Portfolio Analytics tab (18398:226991) ----------------------------- */

export const PORTFOLIO_STATS: readonly BillingStat[] = [
  { label: "Total Screenings (YTD)", value: "32,840", note: "+22%", trend: "up" },
  { label: "Avg Approval Rate", value: "82%", note: "+4%", trend: "up" },
  { label: "Avg Fraud Flag Rate", value: "4.1%", note: "-1.2%", trend: "up" },
  { label: "Avg Completion Time", value: "8.4h", note: "-0.9h", trend: "up" },
];

/** Read off the drawn line against its 720–765 axis. */
export const VE_SCORE_TREND = {
  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  values: [736, 740, 743, 749, 752, 757],
  min: 720,
  max: 765,
};

/** Read off the drawn bars against their 0–100 axis. */
export const DENIAL_REASONS: readonly { label: string; value: number }[] = [
  { label: "Eviction History", value: 89 },
  { label: "Fraud / Payment", value: 62 },
  { label: "NSF Count", value: 48 },
  { label: "Lease Violations", value: 24 },
];
