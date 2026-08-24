import type { Metadata } from "next";
import { CompanyPage, type CompanySection } from "@/components/sections/CompanyPage";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Press resources for Verify Engine — company background, media contact, and brand assets.",
};

const sections: CompanySection[] = [
  {
    heading: "About Verify Engine",
    paragraphs: [
      "Verify Engine is an AI-powered verification platform used by landlords, employers, and lenders to confirm rental history, employment, and income. AI voice agents place and structure the outreach; trained reviewers confirm every result before it is released.",
      "The company serves customers across all 50 states and operates to FCRA standards.",
    ],
  },
  {
    heading: "Media enquiries",
    paragraphs: [
      "For interviews, comment, or background, write to press@verifyengine.com. We aim to respond within one business day.",
      "Please include your outlet, the angle you are working on, and your deadline.",
    ],
  },
  {
    heading: "Brand assets",
    paragraphs: [
      "Logo files, product screenshots, and executive headshots are available on request. Please use the wordmark as supplied and do not recolour or reproportion it.",
      "Request the current asset pack at press@verifyengine.com.",
    ],
  },
];

export default function PressPage() {
  return (
    <CompanyPage
      badge="Press"
      title="Press and"
      titleAccent="media resources"
      intro="Background on Verify Engine, how to reach us for comment, and where to get approved brand assets."
      sections={sections}
      cta={{
        title: "Working on a story?",
        subtitle: "Reach us at press@verifyengine.com and we'll get back to you quickly.",
      }}
    />
  );
}
