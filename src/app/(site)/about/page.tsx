import type { Metadata } from "next";
import { CompanyPage, type CompanySection } from "@/components/sections/CompanyPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Verify Engine builds AI-powered verification for landlords, employers, and lenders — combining machine consistency with human review.",
};

const sections: CompanySection[] = [
  {
    heading: "Why we exist",
    paragraphs: [
      "Verification has always been slow for the same reason: it depends on reaching a person. A leasing agent calls a previous landlord, leaves a message, and waits for a callback that often never comes. Multiply that across every applicant and the cost shows up as vacant units, delayed hires, and decisions made on incomplete information.",
      "Verify Engine was built to remove the waiting without removing the rigour. AI voice agents place the calls, follow the same structure every time, and retry until they reach someone — so the data that comes back is comparable across every applicant.",
    ],
  },
  {
    heading: "How we work",
    paragraphs: [
      "Automation is not the same as autonomy. Every report passes a trained reviewer who listens to the call, confirms the extracted data, and adds the context a model cannot infer.",
      "That combination — machine consistency plus human judgement — is what makes a result defensible when someone questions the decision behind it.",
    ],
  },
  {
    heading: "What we care about",
    paragraphs: [
      "Applicants are people, not records. We collect the minimum needed to answer the question asked, we store only what we must, and we are explicit about what happens to it.",
      "Our customers operate under FCRA and a patchwork of state rules. Compliance is not a feature we added; it shapes how the product is built.",
    ],
  },
];

export default function AboutPage() {
  return (
    <CompanyPage
      badge="About Us"
      title="Verification built for"
      titleAccent="speed and defensibility"
      intro="We combine AI voice agents with trained human review so landlords, employers, and lenders get answers in hours instead of weeks — without giving up the rigour a regulated decision demands."
      highlights={[
        { value: "24h", label: "Typical turnaround" },
        { value: "98%", label: "Contact rate" },
        { value: "50 states", label: "Coverage" },
        { value: "SOC 2", label: "Ready" },
      ]}
      sections={sections}
      cta={{
        title: "Want to see how it works?",
        subtitle: "Book a walkthrough and we'll run a live verification with you.",
      }}
    />
  );
}
