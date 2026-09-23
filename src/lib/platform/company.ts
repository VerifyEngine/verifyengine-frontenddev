import type { Metric } from "./dashboard";

/*
 * Company — Figma section 18510:18576 ("Company"), eight frames sharing one
 * header, the summary band and the tab strip.
 *
 * Every Company frame still carries the Client Profile header it was
 * duplicated from (title "National Realty Corp", "CLNT-9210 • Enterprise",
 * breadcrumb "Clients / Client Profile"). The title and breadcrumb here name
 * the company the tabs describe; the actions are the design's own.
 *
 * All figures are the design's, read off the frames.
 */

export type CompanyTab = { slug: string; label: string };

export const COMPANY_TABS: readonly CompanyTab[] = [
  { slug: "profile", label: "Company Profile" },
  { slug: "users", label: "Users & permissions" },
  { slug: "branding", label: "Branding" },
  { slug: "notifications", label: "Notifications" },
  { slug: "integrations", label: "Integrations & API" },
  { slug: "chrome-extension", label: "Chrome Extension" },
  { slug: "documents", label: "Document Library" },
  { slug: "security", label: "Security & Compliance" },
];

export const COMPANY_HEADER = {
  name: "VerifyEngine, Inc.",
  meta: "SaaS Platform / PropTech  •  Founded March 2021",
};

export const COMPANY_METRICS: Metric[] = [
  { label: "Active Users", value: "87" },
  { label: "Monthly Reports", value: "6,240" },
  { label: "Avg VE Score™", value: "940" },
  { label: "Monthly Usage", value: "$49,219.19" },
  { label: "API Requests", value: "940" },
  { label: "Fraud Flag Rate", value: "4.1%" },
];

export const ORGANIZATION_SCORE = {
  score: 96,
  out: 100,
  standing: "Excellent Standing",
  legend: [
    { label: "Good", tone: "success" },
    { label: "Moderate", tone: "accent" },
    { label: "Low", tone: "warning" },
  ],
} as const;

export type HealthTone = "success" | "information" | "warning" | "accent";

export const COMPANY_HEALTH: readonly { label: string; value: number; tone: HealthTone }[] = [
  { label: "Platform Uptime", value: 94, tone: "success" },
  { label: "Revenue Health", value: 100, tone: "success" },
  { label: "User Adoption", value: 88, tone: "information" },
  { label: "Compliance", value: 78, tone: "accent" },
  { label: "Support Load", value: 72, tone: "success" },
];

export type CompanyAlert = { tone: "accent" | "highlight" | "success"; message: string };

export const COMPANY_ALERTS: readonly CompanyAlert[] = [
  { tone: "accent", message: "Support ticket spike (Mon)" },
  { tone: "highlight", message: "State Disclosure review due" },
  { tone: "success", message: "All systems operational" },
];

/* ---------------------------------------------------------------- Overview */

export const COMPANY_INFO_FIELDS: readonly { label: string; value: string }[] = [
  { label: "Legal Name", value: "VerifyEngine, Inc." },
  { label: "DBA", value: "VerifyEngine" },
  { label: "Business Type", value: "SaaS Platform / PropTech" },
  { label: "EIN / Tax ID", value: "87-2234156" },
  { label: "Industry", value: "Tenant Screening & Property Tech" },
  { label: "Website", value: "verifyengine.ai" },
  { label: "Founded", value: "March 2021" },
  { label: "Headquarters", value: "San Francisco, CA 94102" },
  { label: "Time Zone", value: "America/Los_Angeles (PST)" },
];

export const COMPANY_MAILING_ADDRESS = [
  "VerifyEngine, Inc.",
  "101 Mission Street, Suite 1800",
  "San Francisco, CA 94105",
  "United States",
];

export const COMPANY_CONTRACT_FIELDS: readonly { label: string; value: string }[] = [
  { label: "Contract Start", value: "Jan 1, 2024" },
  { label: "Renewal Date", value: "Jan 1, 2027" },
  { label: "Contract Type", value: "Annual — Enterprise" },
  { label: "Assigned CSM", value: "Jennifer Walsh" },
];

/* -------------------------------------------------------------------- Users */

export type CompanyUserRole = "Super Admin" | "Admin" | "Manager" | "Analyst" | "Viewer";
export type CompanyUserStatus = "Active" | "Pending" | "Inactive";

export type CompanyUserRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: CompanyUserRole;
  dateAdded: string;
  lastLogin: string;
  status: CompanyUserStatus;
};

/** The fifteen rows Figma draws, with their roles, statuses and phone numbers. */
export const COMPANY_USERS: readonly CompanyUserRow[] = [
  { id: "USR-4436", name: "Eddie Lake", email: "r.m.smith@gmail.com", phone: "(406) 382-2670", role: "Super Admin", dateAdded: "May 18, 2026 5:30 am", lastLogin: "May 17, 2026 10:30 pm", status: "Active" },
  { id: "USR-9039", name: "Judith Rodriguez", email: "c_j_mccoy@gmail.com", phone: "(618) 474-9169", role: "Admin", dateAdded: "May 17, 2026 5:22 am", lastLogin: "May 16, 2026 6:43 pm", status: "Pending" },
  { id: "USR-7445", name: "Lorri Warf", email: "autumn_philips@aol.com", phone: "(708) 813-8989", role: "Manager", dateAdded: "May 15, 2026 2:34 pm", lastLogin: "May 14, 2026 9:53 pm", status: "Inactive" },
  { id: "USR-7261", name: "Kathy Pacheco", email: "k.r.mastrangelo@outlook.com", phone: "(518) 744-6291", role: "Analyst", dateAdded: "May 14, 2026 4:09 pm", lastLogin: "May 14, 2026 3:24 am", status: "Active" },
  { id: "USR-7884", name: "Kimberly Mastrangelo", email: "j.jones@outlook.com", phone: "(214) 390-8650", role: "Viewer", dateAdded: "May 13, 2026 5:29 pm", lastLogin: "May 12, 2026 6:46 pm", status: "Pending" },
  { id: "USR-7160", name: "Autumn Phillips", email: "kurt_bates@outlook.com", phone: "(256) 289-9707", role: "Super Admin", dateAdded: "May 10, 2026 10:47 pm", lastLogin: "May 10, 2026 6:19 pm", status: "Active" },
  { id: "USR-2914", name: "Daniel Hamilton", email: "eddie_lake@gmail.com", phone: "(785) 712-6532", role: "Admin", dateAdded: "May 10, 2026 8:04 am", lastLogin: "May 8, 2026 3:51 pm", status: "Pending" },
  { id: "USR-5038", name: "Iva Ryan", email: "s.t.sharkey@outlook.com", phone: "(267) 739-6240", role: "Manager", dateAdded: "May 8, 2026 11:43 am", lastLogin: "May 8, 2026 5:55 am", status: "Inactive" },
  { id: "USR-4243", name: "Frances Swann", email: "paula611@gmail.com", phone: "(617) 623-2338", role: "Analyst", dateAdded: "May 7, 2026 1:04 pm", lastLogin: "May 6, 2026 2:30 pm", status: "Active" },
  { id: "USR-1572", name: "Rhonda Rhodes", email: "Daniel_hamilton@aol.com", phone: "(303) 569-1279", role: "Viewer", dateAdded: "May 5, 2026 5:59 am", lastLogin: "May 5, 2026 2:49 am", status: "Pending" },
  { id: "USR-6417", name: "Joshua Jones", email: "j.e.dukes@aol.com", phone: "(813) 752-5611", role: "Super Admin", dateAdded: "May 4, 2026 11:26 am", lastLogin: "May 3, 2026 9:48 pm", status: "Active" },
  { id: "USR-3021", name: "Paula Mora", email: "jerry73@aol.com", phone: "(401) 715-3344", role: "Admin", dateAdded: "May 2, 2026 1:51 pm", lastLogin: "May 1, 2026 8:20 am", status: "Pending" },
  { id: "USR-9700", name: "Jerry Helfer", email: "james_hall@gmail.com", phone: "(818) 313-7673", role: "Manager", dateAdded: "Apr 29, 2026 10:49 pm", lastLogin: "Apr 29, 2026 4:37 am", status: "Inactive" },
  { id: "USR-2224", name: "Alex Buckmaster", email: "c.a.glasser@outlook.com", phone: "(765) 322-1399", role: "Analyst", dateAdded: "Apr 28, 2026 8:26 am", lastLogin: "Apr 27, 2026 4:25 pm", status: "Active" },
  { id: "USR-2386", name: "Katie Sims", email: "rodger913@aol.com", phone: "(504) 896-6913", role: "Viewer", dateAdded: "Apr 27, 2026 1:44 pm", lastLogin: "Apr 26, 2026 8:28 am", status: "Pending" },
];

/* ------------------------------------------------------------- Notifications */

export const NOTIFICATION_CHANNELS: readonly { label: string; description: string; defaultOn: boolean }[] = [
  { label: "Email Notifications", description: "Send alerts via email", defaultOn: true },
  { label: "SMS Notifications", description: "Text message alerts", defaultOn: true },
  { label: "In-App Notifications", description: "Platform dashboard alerts", defaultOn: true },
];

export const NOTIFICATION_CATEGORIES: readonly { label: string; description: string; defaultOn: boolean }[] = [
  { label: "System Alerts", description: "Downtime, errors, performance", defaultOn: true },
  { label: "Billing Alerts", description: "Payments, invoices, renewals", defaultOn: true },
  { label: "New Client Sign-ups", description: "New organization registered", defaultOn: true },
  { label: "Failed Payments", description: "Declined or failed charges", defaultOn: true },
  { label: "Compliance Warnings", description: "FCRA, TCPA, regulatory alerts", defaultOn: true },
  { label: "API Usage Spikes", description: "Unusual API activity", defaultOn: false },
  { label: "Report Generation", description: "Scheduled reports ready", defaultOn: true },
  { label: "User Login Activity", description: "Admin login notifications", defaultOn: false },
];

export const DIGEST_FREQUENCIES = ["Real-time", "Daily", "Weekly"] as const;

/* --------------------------------------------------------- Integrations & API */

export const API_KEYS: readonly { label: string; masked: string }[] = [
  { label: "PRODUCTION KEY", masked: "sk_live_vE8x••••••••••••••••••••••••" },
  { label: "SANDBOX KEY", masked: "sk_test_aB2c••••••••••••••••••••••••" },
];

export type Webhook = { url: string; events: string; active: boolean };

export const WEBHOOKS: readonly Webhook[] = [
  { url: "https://api.nationalrealty.com/ve-hook", events: "report.complete, fraud.alert", active: true },
  { url: "https://hooks.apex-pg.io/verify", events: "payment.success, payment.fail", active: true },
  { url: "https://integrations.greenlp.co/webhook", events: "client.created, user.invite", active: false },
];

export type Integration = { name: string; status: "Connected" | "Not Connected" };

export const INTEGRATIONS: readonly Integration[] = [
  { name: "Stripe", status: "Connected" },
  { name: "Twilio", status: "Connected" },
  { name: "SendGrid", status: "Connected" },
  { name: "Salesforce", status: "Not Connected" },
  { name: "Zapier", status: "Not Connected" },
  { name: "Slack", status: "Not Connected" },
];

/* ----------------------------------------------------------- Chrome Extension */

export const CHROME_EXTENSION_INFO = {
  name: "VerifyEngine Chrome Extension",
  version: "Version 3.2.1 — Updated May 12, 2026",
  active: true,
};

export const CHROME_EXTENSION_STATS: Metric[] = [
  { label: "Active Users", value: "47" },
  { label: "Searches This Month", value: "2,841" },
  { label: "Avg Sessions/Day", value: "8.3" },
];

export const CHROME_EXTENSION_SETTINGS: readonly { label: string; description: string; defaultOn: boolean }[] = [
  { label: "Auto-fill screening forms", description: "Pre-fill applicant fields on supported sites", defaultOn: true },
  { label: "One-click property lookup", description: "Enable quick property address search", defaultOn: true },
  { label: "Show VE Score overlay", description: "Display score badge on rental listing pages", defaultOn: true },
  { label: "Preferred data source: MLS", description: "Pull property data from MLS integration", defaultOn: true },
];

/* ------------------------------------------------------------- Document Library */

export const DOCUMENT_CATEGORIES = ["All", "Contracts", "Compliance", "Templates", "Reports"] as const;

export type CompanyDocument = {
  name: string;
  type: "Contract" | "Compliance" | "Template" | "Report";
  size: string;
  uploadedBy: string;
  date: string;
};

export const COMPANY_DOCUMENTS: readonly CompanyDocument[] = [
  { name: "Master Service Agreement 2024.pdf", type: "Contract", size: "2.4 MB", uploadedBy: "Marcus Reid", date: "Jan 15, 2024" },
  { name: "FCRA Compliance Certificate.pdf", type: "Compliance", size: "890 KB", uploadedBy: "Priya Nair", date: "Mar 1, 2026" },
  { name: "Standard Screening Template.docx", type: "Template", size: "145 KB", uploadedBy: "Sofia Alvarez", date: "Feb 10, 2026" },
  { name: "Q1 2026 Portfolio Report.pdf", type: "Report", size: "5.2 MB", uploadedBy: "David Chen", date: "Apr 5, 2026" },
  { name: "API Integration Guide v3.pdf", type: "Template", size: "1.1 MB", uploadedBy: "James Okonkwo", date: "Apr 20, 2026" },
  { name: "NDA — National Realty Corp.pdf", type: "Contract", size: "320 KB", uploadedBy: "Marcus Reid", date: "Jan 15, 2024" },
];

/* --------------------------------------------------------- Security & Compliance */


export type ComplianceStatus = { label: string; verified: string; state: "Compliant" | "Review" };

export const COMPLIANCE_STATUSES: readonly ComplianceStatus[] = [
  { label: "FCRA Compliance", verified: "Last verified: Jun 1, 2026", state: "Compliant" },
  { label: "TCPA Compliance", verified: "Last verified: Jun 1, 2026", state: "Compliant" },
  { label: "SOC 2 Type II", verified: "Last verified: Mar 15, 2026", state: "Compliant" },
  { label: "GDPR Data Policy", verified: "Last verified: Jan 1, 2026", state: "Compliant" },
  { label: "State Disclosure", verified: "Last verified: May 20, 2026", state: "Review" },
];

export type AuditLogRow = { timestamp: string; action: string; user: string; ip: string };

export const AUDIT_LOG: readonly AuditLogRow[] = [
  { timestamp: "2026-06-01 09:14", action: "2FA enforcement enabled", user: "Marcus Reid", ip: "104.21.8.34" },
  { timestamp: "2026-05-31 16:42", action: "API key regenerated (Production)", user: "Priya Nair", ip: "104.21.8.34" },
  { timestamp: "2026-05-30 11:08", action: "Webhook endpoint added", user: "James Okonkwo", ip: "198.41.0.4" },
  { timestamp: "2026-05-29 09:55", action: "User Hannah Petrov invited", user: "Marcus Reid", ip: "104.21.8.34" },
  { timestamp: "2026-05-28 14:22", action: "Branding colors updated", user: "Sofia Alvarez", ip: "104.21.8.34" },
];

/* ------------------------------------------------------------------- Branding */

export const BRAND_COLOR_SWATCHES = [
  "#ff4848", "#ffbf00", "#46c85c", "#00ee87", "#00e1ff", "#489bff",
  "#5548ff", "#c532c5", "#ff5f8a", "#ca0003", "#00e5bf", "#32e500", "#923f00",
] as const;
