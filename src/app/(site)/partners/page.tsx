import type { Metadata } from "next";
import { CompanyPage, type CompanySection } from "@/components/sections/CompanyPage";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Verify Engine — integrations for property management systems, ATS platforms, and screening providers.",
};

const sections: CompanySection[] = [
  {
    heading: "Technology partners",
    paragraphs: [
      "Verify Engine is designed to sit inside the system your team already works in. Property management platforms, applicant tracking systems, and loan origination software can start a verification and receive the completed report without anyone leaving their workflow.",
      "Our API returns the same structured result the dashboard shows, so the data lands in your fields rather than in a PDF someone has to re-key.",
    ],
  },
  {
    heading: "Screening and reseller partners",
    paragraphs: [
      "Screening companies use Verify Engine for the part of the report that has always been manual: reaching a previous landlord or an employer and getting a straight answer on the record.",
      "White-label options are available so the result arrives under your brand, with your compliance language attached.",
    ],
  },
  {
    heading: "Becoming a partner",
    paragraphs: [
      "Tell us about your platform, the volume you expect, and the workflow you want verification to fit into. We will walk through the integration surface and what the timeline looks like.",
      "Write to partners@verifyengine.com or book a demo and mention that you are exploring a partnership.",
    ],
  },
];

export default function PartnersPage() {
  return (
    <CompanyPage
      badge="Partners"
      title="Verification that fits"
      titleAccent="inside your platform"
      intro="Property management systems, applicant tracking platforms, and screening providers use Verify Engine to close the manual gap in their workflow — without sending anyone to a second tool."
      sections={sections}
      cta={{
        title: "Interested in partnering?",
        subtitle: "Book a call and we'll walk through the integration together.",
      }}
    />
  );
}
