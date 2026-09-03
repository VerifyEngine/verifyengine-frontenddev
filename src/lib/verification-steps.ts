import {
  AudioLines,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Database,
  FileCheck2,
  FileText,
  Fingerprint,
  Gauge,
  ListChecks,
  MessageSquareText,
  PhoneCall,
  ScanSearch,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * The Landlord Verification Workflow, in the order the client signed off on.
 *
 * This is the single source the How It Works section is built from: the active
 * step panel, the seven-step timeline and the compact mobile progress all read
 * from here, and each step's `id` selects its product visualisation in
 * VerificationStepVisuals.tsx.
 *
 * The category and description of every step are the exact copy from the
 * client's redesign spec (section 14, "Exact Step Copy") — change them here
 * and nowhere else.
 *
 * The hero mockup (WorkflowShowcase) walks through the same seven steps in the
 * same order — change one and change the other.
 */
export type VerificationStepId =
  | "applicant-submitted"
  | "fraud-detection"
  | "human-qa-review"
  | "ai-calls-landlord"
  | "dynamic-interview"
  | "responses-validated"
  | "report-delivered";

export type VerificationStep = {
  id: VerificationStepId;
  /** Zero-padded label used by the timeline and the "Step n of 7" pill. */
  number: string;
  /** Small teal eyebrow above the step title. */
  category: string;
  title: string;
  description: string;
  /** Two or three short capability indicators shown under the description. */
  features: { icon: LucideIcon; label: string }[];
  /** Supporting line in the tinted callout at the bottom of the panel. */
  callout: string;
  /** Used by the compact mobile header, where there is no room for a panel. */
  icon: LucideIcon;
};

export const verificationSteps: VerificationStep[] = [
  {
    id: "applicant-submitted",
    number: "01",
    category: "Verification Started",
    title: "Applicant Submitted",
    description:
      "Verification begins automatically when an applicant's information is submitted.",
    features: [
      { icon: Send, label: "Instant Intake" },
      { icon: ClipboardList, label: "Structured Data" },
      { icon: Workflow, label: "Auto Routing" },
    ],
    callout:
      "Requests arrive through your portal, our platform or the API — and start moving immediately.",
    icon: UserPlus,
  },
  {
    id: "fraud-detection",
    number: "02",
    category: "Automated Screening",
    title: "Fraud Detection",
    description:
      "Submitted information is analyzed for inconsistencies, suspicious patterns, and potential fraud.",
    features: [
      { icon: Fingerprint, label: "Identity Checks" },
      { icon: ScanSearch, label: "Document Analysis" },
      { icon: Gauge, label: "Risk Scoring" },
    ],
    callout:
      "Fraud signals are caught up front, so the rest of the workflow runs on data you can trust.",
    icon: ShieldAlert,
  },
  {
    id: "human-qa-review",
    number: "03",
    category: "Quality Control",
    title: "Human QA Review",
    description:
      "Our verification team reviews the request and confirms the information needed before outreach begins.",
    features: [
      { icon: UserCheck, label: "Expert Review" },
      { icon: ListChecks, label: "Compliance Checklist" },
      { icon: ShieldCheck, label: "Release Approval" },
    ],
    callout:
      "Every verification passes through human quality assurance — automation never runs unsupervised.",
    icon: Users,
  },
  {
    id: "ai-calls-landlord",
    number: "04",
    category: "AI-Powered Outreach",
    title: "AI Calls Previous Landlord",
    description:
      "Verify Engine automatically contacts the previous landlord and conducts a dynamic verification interview based on the information provided and responses received.",
    features: [
      { icon: PhoneCall, label: "Automated Outreach" },
      { icon: MessageSquareText, label: "Dynamic Questions" },
      { icon: ShieldCheck, label: "Recorded Responses" },
    ],
    callout:
      "Our AI conducts natural conversations, adapts in real time, and captures accurate, verifiable information.",
    icon: PhoneCall,
  },
  {
    id: "dynamic-interview",
    number: "05",
    category: "Intelligent Verification",
    title: "Dynamic Interview",
    description:
      "Questions adapt in real time based on previous answers and verification requirements.",
    features: [
      { icon: Sparkles, label: "Generated Follow-Ups" },
      { icon: Bot, label: "Natural Conversation" },
      { icon: AudioLines, label: "Real-Time Adaptation" },
    ],
    callout:
      "No two conversations are the same — the interview follows the answers it receives.",
    icon: AudioLines,
  },
  {
    id: "responses-validated",
    number: "06",
    category: "Response Analysis",
    title: "Responses Validated",
    description:
      "Responses are analyzed, cross-checked, and reviewed for accuracy and inconsistencies.",
    features: [
      { icon: Database, label: "Cross-Checked Sources" },
      { icon: CheckCircle2, label: "Consistency Rules" },
      { icon: ClipboardCheck, label: "Exception Handling" },
    ],
    callout:
      "Answers that do not line up are flagged for review instead of quietly passing through.",
    icon: CheckCircle2,
  },
  {
    id: "report-delivered",
    number: "07",
    category: "Verification Complete",
    title: "Report Delivered",
    description:
      "A complete verification report is delivered with the information your team needs to make a decision.",
    features: [
      { icon: FileCheck2, label: "Complete Report" },
      { icon: ShieldCheck, label: "Audit Trail" },
      { icon: Send, label: "Instant Delivery" },
    ],
    callout:
      "Reports return in minutes, not days, with everything your team needs to make the decision.",
    icon: FileText,
  },
];

/**
 * The general verification process, as the How It Works page tells it.
 *
 * Same shape and the same seven product visualisations as the landlord flow —
 * this page describes the process across every industry, so the copy is the
 * page's own rather than a second copy of the homepage's landlord story.
 */
export const generalProcessSteps: VerificationStep[] = [
  {
    id: "applicant-submitted",
    number: "01",
    category: "Verification Started",
    title: "Submit Applicant",
    description:
      "You submit the applicant's information and verification requirements — one at a time, in a batch, or straight from your platform through the API.",
    features: [
      { icon: Send, label: "Instant Intake" },
      { icon: ClipboardList, label: "Batch or Single" },
      { icon: Workflow, label: "API or Dashboard" },
    ],
    callout:
      "Verify Engine validates the request and queues it the moment it arrives.",
    icon: UserPlus,
  },
  {
    id: "ai-calls-landlord",
    number: "02",
    category: "AI-Powered Outreach",
    title: "AI Contacts the Source",
    description:
      "Our AI voice agents reach the landlord, employer or institution by phone, email or SMS, handling voicemail and gatekeepers along the way.",
    features: [
      { icon: PhoneCall, label: "Automated Outreach" },
      { icon: MessageSquareText, label: "Multi-Channel" },
      { icon: ShieldCheck, label: "Recorded Responses" },
    ],
    callout:
      "The agent retries on its own schedule until it reaches a real person — your team never chases anyone.",
    icon: PhoneCall,
  },
  {
    id: "dynamic-interview",
    number: "03",
    category: "Intelligent Verification",
    title: "AI Gathers and Validates",
    description:
      "A dynamic interview adapts to every answer, cross-checks responses against the application, and flags inconsistencies as they surface.",
    features: [
      { icon: Sparkles, label: "Generated Follow-Ups" },
      { icon: Database, label: "Cross-Checked Sources" },
      { icon: Gauge, label: "Risk Signals" },
    ],
    callout:
      "No two conversations are the same — the interview follows the answers it receives.",
    icon: AudioLines,
  },
  {
    id: "human-qa-review",
    number: "04",
    category: "Quality Control",
    title: "Human QA Review",
    description:
      "A trained reviewer listens to the call, confirms the extracted data, and adds confidence notes before anything is released.",
    features: [
      { icon: UserCheck, label: "Expert Review" },
      { icon: ListChecks, label: "Compliance Checklist" },
      { icon: ShieldCheck, label: "Release Approval" },
    ],
    callout:
      "Every verification passes through human quality assurance — automation never runs unsupervised.",
    icon: Users,
  },
  {
    id: "report-delivered",
    number: "05",
    category: "Verification Complete",
    title: "Report Delivered",
    description:
      "The finished report lands in your dashboard with the full transcript, audit trail, and a downloadable PDF — ready to attach to your decision.",
    features: [
      { icon: FileCheck2, label: "Complete Report" },
      { icon: ShieldCheck, label: "Audit Trail" },
      { icon: Send, label: "Instant Delivery" },
    ],
    callout:
      "Reports return in minutes, not days, with everything your team needs to decide.",
    icon: FileText,
  },
];

/**
 * The flows the How It Works section can render.
 *
 * The section takes a flow *id* rather than the steps themselves: it is a
 * Client Component, and handing it an array of Lucide icon components across
 * the server/client boundary is what breaks RSC streaming (see
 * scripts/check-client-icon-props.mjs). Selecting the flow inside the client
 * module keeps the icons on one side of that line.
 */
export type VerificationFlowId = "landlord" | "general";

export type VerificationFlow = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: VerificationStep[];
  /** The deep-dive prompt under the timeline; omitted when there is nowhere deeper to go. */
  cta?: { prompt: string; label: string; href: string };
};

export const verificationFlows: Record<VerificationFlowId, VerificationFlow> = {
  landlord: {
    eyebrow: "How It Works",
    title: "Verification From Request to Report",
    subtitle: "See how Verify Engine turns a verification request into a completed report.",
    steps: verificationSteps,
    cta: {
      prompt: "Want to see what's happening behind each step?",
      label: "View the Full Landlord Verification Process",
      href: "/how-it-works/landlord-verification",
    },
  },
  general: {
    eyebrow: "Our Verification Process",
    title: "How Verify Engine Works",
    subtitle:
      "From the moment a request arrives to the moment the report lands, every step in one place.",
    steps: generalProcessSteps,
    cta: {
      prompt: "Want the landlord verification process in full?",
      label: "View the Full Landlord Verification Process",
      href: "/how-it-works/landlord-verification",
    },
  },
};
