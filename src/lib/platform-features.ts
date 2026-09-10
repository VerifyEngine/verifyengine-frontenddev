import {
  Boxes,
  Building2,
  FileClock,
  Headset,
  Lock,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  UserCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Which part of the central dashboard a capability actually produces.
 *
 * The platform section uses this to connect a card to its result: hovering or
 * focusing a card highlights that region of the mockup and draws a line to it,
 * which is what turns "here are six features" into "these all run inside one
 * platform".
 *
 * The mapping is literal, not decorative — the voice agents are what confirm
 * employment, the fraud engine is what clears the fraud check, the API is what
 * requests arrive through, and workflow automation is the side rail the work
 * moves along.
 */
export type PlatformTarget =
  | "check-reference"
  | "check-fraud"
  | "check-income"
  | "check-employment"
  | "rail"
  | "topbar";

export type PlatformFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
  target: PlatformTarget;
};

/**
 * The Verify Engine platform overview.
 *
 * Three cards run down each side of the central product visualisation on a
 * desktop; below `lg` the two columns are simply read one after the other, so
 * the order here is also the reading order on a phone.
 */
export const platformFeaturesLeft: PlatformFeature[] = [
  {
    icon: Building2,
    title: "Reference Verification Engine",
    description:
      "Verify rental history, employment, and professional references using AI-assisted workflows and human review.",
    target: "check-reference",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Detection",
    description:
      "Detect inconsistencies, suspicious patterns, and potential fraud before decisions are made.",
    target: "check-fraud",
  },
  {
    icon: TrendingUp,
    title: "Income Verification Engine",
    description:
      "Validate income and employment using automated data checks and supporting documentation.",
    target: "check-income",
  },
];

export const platformFeaturesRight: PlatformFeature[] = [
  {
    icon: Headset,
    title: "AI Voice Agents",
    description:
      "Conduct natural conversations, capture responses, and automate verification outreach.",
    target: "check-employment",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate routing, approvals, follow-ups, and verification actions across the process.",
    target: "rail",
  },
  {
    icon: Boxes,
    title: "API Integrations",
    description:
      "Connect Verify Engine with your existing systems through APIs, webhooks, and integrations.",
    target: "topbar",
  },
];

/**
 * The checks the central dashboard lists as complete.
 *
 * `target` ties a row to the capability card that produced it; the two rows
 * without one are simply not claimed by any single card.
 */
export const platformChecks: { label: string; target?: PlatformTarget }[] = [
  { label: "Identity Verified" },
  { label: "Employment Confirmed", target: "check-employment" },
  { label: "Income Validated", target: "check-income" },
  { label: "Landlord Reference Verified", target: "check-reference" },
  { label: "No Fraud Detected", target: "check-fraud" },
];

/**
 * The rules the mockups show the engine evaluating.
 *
 * These are the client's own preconfigured screening rules, not Verify Engine's
 * criteria — the verified result on the left is what the workflow established,
 * and the evaluation on the right is only whether that result meets the rule
 * the client configured. The same six rows back the "Client Rules Applied"
 * step and the homepage closing mockup, so the two never drift apart.
 */
export const clientRules: { rule: string; result: string }[] = [
  { rule: "Identity Confirmed", result: "Yes" },
  { rule: "Property Ownership", result: "Confirmed" },
  { rule: "Tenancy Dates", result: "24 Months" },
  { rule: "Late Payments", result: "0" },
  { rule: "Lease Violations", result: "None" },
  { rule: "Eviction History", result: "None Reported" },
];

/** Smaller capabilities shown as badges under the central visualisation. */
export const platformBadges: { icon: LucideIcon; label: string }[] = [
  { icon: UserCheck, label: "Human QA" },
  { icon: Lock, label: "Enterprise Security" },
  { icon: FileClock, label: "Audit Trail" },
  { icon: SlidersHorizontal, label: "Rules Engine" },
];
