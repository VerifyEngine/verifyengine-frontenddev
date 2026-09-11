import type { DetailItem } from "@/components/platform/DetailCard";
import type {
  FlagRow,
  NoteRow,
  ResponseRow,
  TimelineEntry,
} from "@/components/platform/ActivityPanels";
import type { RadarAxis } from "@/components/platform/ScoreRadarCard";
import type { AdminAction } from "@/components/platform/SummaryCards";
import type { Metric } from "./dashboard";

/*
 * Order Details — Figma node 18176:20341.
 *
 * Every value below is the one the design draws, so the screen can be reviewed
 * against the file. It is display data for a single verification; when the
 * backend exists this whole module is replaced by one fetch, which is why the
 * page imports named records rather than reaching into a nested object.
 */

export const ORDER = {
  applicant: "John Doe",
  address: "123 Main St, Dallas, TX",
  reference: "VER-144202",
} as const;

export const VE_SCORE = {
  label: "VE SCORE™",
  score: 742,
  max: 1000,
  riskLabel: "Low Risk",
  riskTone: "success",
  caption: "Higher than 74% of comparable applicants",
} as const;

export const CONFIDENCE = {
  label: "Confidence",
  percent: 92,
  bands: [
    { label: "High", color: "var(--ve-success)" },
    { label: "Moderate", color: "var(--ve-accent)" },
    { label: "Low", color: "var(--ve-warning)" },
  ],
  recommendationLabel: "Recommendation:",
  recommendation: "Approve with standard deposit",
} as const;

export const AI_SUMMARY = {
  title: "AI Summary",
  quote:
    "“Landlord identity verified through ownership records. Tenant confirmed on lease for 24 months. Zero late payments, zero NSF, no eviction, full deposit returned, and landlord would rent again. Fraud indicators low.”",
} as const;

export const ADMIN_ACTIONS: readonly AdminAction[] = [
  { label: "Override Client Rules" },
  { label: "Suspend Client", danger: true },
  { label: "Billing Notes" },
  { label: "Feature Toggles" },
  { label: "Audit Client" },
];

/** The seven counters under the score band — same card as the dashboard uses. */
export const ORDER_METRICS: readonly Metric[] = [
  { label: "Calls", value: "8" },
  { label: "SMS", value: "2" },
  { label: "Emails", value: "9" },
  { label: "Responses", value: "5" },
  { label: "PRI™", value: "123" },
  { label: "FRI™", value: "456" },
  { label: "VPI™", value: "789" },
];

export const DETAIL_SECTIONS: readonly { title: string; items: readonly DetailItem[] }[] = [
  {
    title: "Applicant Identity & Authorization",
    items: [
      { label: "Full Name", value: "Mr. John Doe" },
      { label: "Applicant Reference #", value: "REF-2024-001" },
      { label: "Consent", value: "Yes" },
      { label: "Status", value: "Verified", tone: "success" },
      { label: "ID Confidence", value: "92.21%" },
      { label: "Fraud Mismatch", value: "Low", tone: "warning" },
    ],
  },
  {
    title: "Landlord & Ownership Verification",
    items: [
      { label: "Ownership", value: "Verified", tone: "success" },
      { label: "Contact Source", value: "ABC Name" },
      { label: "Deed/API Source", value: "www.example.com" },
      { label: "Respondent Match", value: "72.23%" },
      { label: "Ownership Duration", value: "13 years & 2 months" },
    ],
  },
  {
    title: "Lease Terms",
    items: [
      { label: "Lease Dates", value: "29 January 2026" },
      { label: "Rent", value: "$100,020.23 per annum" },
      { label: "Deposit", value: "$20,123.78" },
      { label: "Renewal History", value: "29 January 2026" },
    ],
  },
  {
    title: "Payment Performance",
    items: [
      { label: "Late Payments", value: "5x" },
      { label: "NSF", value: "$3,000.12" },
      { label: "Outstanding Balance", value: "$17,210.21" },
      { label: "Timeliness", value: "72.23%" },
      { label: "Payment Score", value: "218/500" },
    ],
  },
  {
    title: "Legal & Eviction",
    items: [
      { label: "Eviction", value: "1x" },
      { label: "Notices", value: "2x" },
      { label: "Lease Disputes", value: "3x" },
    ],
  },
  {
    title: "Property Condition",
    items: [
      { label: "Damage", value: "High", tone: "warning" },
      { label: "Deposit Return", value: "$3,000.12" },
      { label: "Maintenance", value: "$17,210.21" },
    ],
  },
];

export const SCORE_RADAR: readonly RadarAxis[] = [
  { label: "Payment", value: 38 },
  { label: "Stability", value: 30 },
  { label: "Legal", value: 34 },
  { label: "Fraud", value: 22 },
  { label: "Property Care", value: 28 },
  { label: "Compliance", value: 26 },
];

export const TIMELINE: readonly TimelineEntry[] = [
  {
    id: "t1",
    body: "When reaching out to property owners, consider using a friendly tone in your calls and messages. Ensure you clearly explain the purpose of your communication, whether it's about property management or inquiries. Always be respectful and attentive to their responses.",
    channel: "call",
    channelLabel: "Call (0:23)",
    status: "Completed",
    statusTone: "success",
    time: "1 min ago",
  },
  {
    id: "t2",
    body: "For effective communication with property owners, utilize SMS or email to provide concise updates. Make sure to personalize your messages and include relevant details about their property. This approach fosters trust and encourages a positive relationship.",
    channel: "mail",
    channelLabel: "Mail",
    status: "Scheduled",
    statusTone: "highlight",
    time: "1 min ago",
  },
  {
    id: "t3",
    body: "When contacting property owners, whether by phone or through digital means, keep your messages clear and to the point. Highlight any important information they need to know, and be open to their questions or concerns.",
    channel: "ai",
    channelLabel: "AI Call",
    status: "Missed",
    statusTone: "accent",
    time: "1 min ago",
  },
  {
    id: "t4",
    body: "In your outreach to property owners, consider sending a brief email or SMS that outlines your intentions. Use a warm and professional tone to make them feel valued and informed about any updates regarding their property.",
    channel: "sms",
    channelLabel: "SMS",
    status: "Error",
    statusTone: "warning",
    time: "1 min ago",
  },
  {
    id: "t5",
    body: "When calling property owners, aim for clarity and friendliness. Make sure to address their specific needs and provide any necessary information about their property. This will help build a strong rapport.",
    channel: "escalation",
    channelLabel: "Escalation",
    status: "Completed",
    statusTone: "success",
    time: "1 min ago",
  },
];

export const LANDLORD_RESPONSES: readonly ResponseRow[] = [
  { question: "Would rent again?", answer: "Positive", tone: "success" },
  { question: "Payment Consistency?", answer: "Mixed", tone: "highlight" },
  { question: "Lease Violations?", answer: "Negative", tone: "warning" },
  { question: "Any Notice?", answer: "Positive", tone: "success" },
  { question: "Recommended?", answer: "Negative", tone: "warning" },
];

export const FRAUD_FLAGS: readonly FlagRow[] = [
  { label: "Identity Mismatch", raised: true },
  { label: "Ownership Mismatch", raised: false },
  { label: "Fake Contact", raised: true },
  { label: "Scripted Answers", raised: false },
  { label: "High-Risk Geography", raised: true },
];

export const NOTES: readonly NoteRow[] = [
  {
    id: "n1",
    body: "For effective communication with property owners, always start with a warm greeting. If you're sending a text or an email, be concise yet informative. Highlight the benefits of your service and encourage them to respond with any questions.",
    kind: "Team Note",
    time: "1 min ago",
  },
  {
    id: "n2",
    body: "When reaching out to property owners, consider using a friendly tone in your calls and messages. Whether you're sending an SMS or an email, make sure to introduce yourself clearly and state your purpose. Personalize your communication to make it more engaging.",
    kind: "Override Note",
    time: "1 min ago",
  },
  {
    id: "n3",
    body: "When contacting property owners, it's essential to be polite and professional. Use SMS or email to provide clear information about your services. Make sure to follow up if you don't hear back, as persistence can lead to better engagement.",
    kind: "Audit Log",
    time: "1 min ago",
  },
];
