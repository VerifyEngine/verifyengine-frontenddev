import type { Metadata } from "next";
import { CompanyPage, type CompanySection } from "@/components/sections/CompanyPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Verify Engine and help build AI-powered verification that people can defend, audit, and trust.",
};

const sections: CompanySection[] = [
  {
    heading: "What it is like here",
    paragraphs: [
      "We are a small team working on a problem with real consequences: a verification result decides whether someone gets a home or a job. That raises the bar on accuracy, on how we handle applicant data, and on how carefully we ship.",
      "You will own work end to end and talk directly to the landlords, recruiters, and reviewers who use what you build.",
    ],
  },
  {
    heading: "How we hire",
    paragraphs: [
      "A short intro call, a conversation about work you have actually done, and a practical exercise close to the real thing — no whiteboard puzzles. We tell you where you stand at every step.",
      "We hire remotely across the United States and we are happy to accommodate the schedule that makes you effective.",
    ],
  },
  {
    heading: "Open roles",
    paragraphs: [
      "We are not running any open postings right now, but we always read speculative applications — particularly from engineers, compliance specialists, and verification reviewers.",
      "Send a note to careers@verifyengine.com telling us what you would want to work on and what you have built before.",
    ],
  },
];

export default function CareersPage() {
  return (
    <CompanyPage
      badge="Careers"
      title="Build verification people can"
      titleAccent="actually trust"
      intro="We are a small, deliberate team building the verification layer that landlords, employers, and lenders rely on. If that sounds like your kind of problem, we would like to hear from you."
      sections={sections}
      cta={{
        title: "Not seeing the right role?",
        subtitle: "Tell us what you would want to work on — we read every note.",
      }}
    />
  );
}
