import { VERIFICATION_PROCESS } from "./new-order";

/*
 * Support copy — every answer restates something the platform itself already
 * says (the status chips, the New Order process card and preferences), so the
 * help page cannot contradict the screens it explains.
 */

export const SUPPORT_CATEGORIES = [
  "A verification file",
  "Orders & batch uploads",
  "Billing & invoices",
  "Users & access",
  "Chrome Extension",
  "Something else",
] as const;

export const FAQ: readonly { question: string; answer: string }[] = [
  {
    question: "What happens after I submit an order?",
    answer: `The workflow runs in this order: ${VERIFICATION_PROCESS.steps.join(", ").replace(/, ([^,]*)$/, ", then $1")}.`,
  },
  {
    question: "What do the verification statuses mean?",
    answer:
      "Pending — received and waiting to start. In Progress — outreach to the landlord is under way. Verified — the landlord confirmed the details. Unverified — the details could not be confirmed. Escalated — the file needs a person to review it.",
  },
  {
    question: "How do I choose how the landlord is contacted?",
    answer:
      "Under Verification Preferences on New Order or Batch Order: voice only, SMS only, email only, Full Outreach across every channel, or Rush Verification for priority processing.",
  },
  {
    question: "Can I send many orders at once?",
    answer:
      "Yes. Batch Order takes a CSV built from its template and checks every row before anything is sent.",
  },
  {
    question: "Do I need landlord contact details?",
    answer: VERIFICATION_PROCESS.tip.replace(/^Tip: /, ""),
  },
  {
    question: "Who can change what in the account?",
    answer:
      "Each user has a role, and Roles & Permissions shows what every role can do. Only a Super Admin can edit roles.",
  },
];
