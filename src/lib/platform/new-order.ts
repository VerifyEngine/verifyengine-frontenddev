import type { PreferenceOption } from "@/components/platform/PreferenceRadioList";

/**
 * Copy and field definitions for the New Order screen — Figma node 18113:32057
 * (light) / 18122:22570 (dark).
 *
 * The screen is a form with no data of its own, so nothing here is mock API
 * output: these are the labels, placeholders and option lists the design
 * draws. When the backend exists, the option lists (states, lease months) come
 * from it and this file keeps only the labels.
 */

export const NEW_ORDER_SECTIONS = [
  { id: "applicant-details", label: "Applicant Details" },
  { id: "property-landlord-details", label: "Property & Landlord Details" },
  { id: "lease-terms", label: "Lease Terms & Conditions" },
  { id: "consent-legal", label: "Consent & Legal" },
  { id: "verification-preferences", label: "Verification Preferences" },
] as const;

/** The six name parts, used for both the tenant and each landlord. */
export const NAME_FIELDS = [
  { name: "prefix", label: "Prefix", width: "narrow" },
  { name: "first-name", label: "First Name", width: "wide" },
  { name: "middle-name", label: "Middle Name", width: "wide" },
  { name: "last-name", label: "Last Name", width: "wide" },
  { name: "suffix", label: "Suffix", width: "narrow" },
  { name: "generations", label: "Generations", width: "wide" },
] as const;

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** Ten years back from the current one, newest first. */
export const LEASE_YEARS = Array.from({ length: 10 }, (_, index) =>
  String(new Date().getFullYear() - index),
);

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

export const VERIFICATION_PROCESS = {
  title: "Verification Process",
  description: "Once submitted, our AI agent will follow this workflow:",
  steps: [
    "Data validation",
    "Ownership lookup",
    "AI outreach",
    "Follow-up cadence",
    "Escalation path",
    "Estimated completion: 24-48h",
  ],
  tip: "Tip: Providing landlord contact info speeds up the process, but isn't required. We'll find it automatically.",
} as const;

export const CONSENT_STATEMENT =
  "I confirm that the applicant has provided written consent for this verification and understands how their data will be used. A timestamp will be recorded.";

export const VERIFICATION_PREFERENCES: readonly PreferenceOption[] = [
  {
    value: "voice",
    title: "Voice Only",
    description: "Contact landlord by phone call only",
    icon: "phone",
  },
  {
    value: "sms",
    title: "SMS Only",
    description: "Contact view text message only",
    icon: "message",
  },
  {
    value: "email",
    title: "Email Only",
    description: "Contact via email only",
    icon: "mail",
  },
  {
    value: "full",
    title: "Full Outreach (Recommended)",
    description: "Use all channels for best response",
    icon: "star",
  },
  {
    value: "rush",
    title: "Rush Verification",
    description: "Priority processing, 12-24 hours turnaround",
    icon: "bolt",
  },
];
