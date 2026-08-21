import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Verify Engine collects, uses, discloses, and safeguards your information when you use our verification platform.",
};

/**
 * Placeholder policy copy covering the structure the design specifies.
 * The binding text must come from the client's counsel before launch.
 */
const sections: LegalSection[] = [
  {
    heading: "Introduction",
    paragraphs: ["This Privacy Policy applies to information we collect:"],
    bullets: [
      "On our website and Services",
      "From our customers, users, and applicants",
      "From third-party sources and integrations",
      "Through cookies and similar technologies",
    ],
  },
  {
    heading: "Information We Collect",
    paragraphs: ["We may collect the following types of information:"],
    bullets: [
      "Personal information such as name, email, phone number, mailing address, and date of birth",
      "Verification data supplied by applicants or obtained from authorised sources with consent",
      "Account and billing information for customers of the platform",
      "Technical data such as device, browser, and usage information",
    ],
  },
  {
    heading: "How We Use Information",
    paragraphs: [
      "We use the information we collect to deliver and improve the Services, to complete the verifications our customers request, to communicate with you, and to meet our legal and regulatory obligations.",
      "We do not sell personal information.",
    ],
  },
  {
    heading: "Information Sharing",
    paragraphs: [
      "We share information with the data sources and service providers required to complete a verification, and with our customers who requested it. We may also disclose information where required by law or to protect our rights.",
    ],
  },
  {
    heading: "Data Security",
    paragraphs: [
      "We apply administrative, technical, and physical safeguards designed to protect information, including encryption in transit and at rest, permission-controlled access, and a complete audit trail of access and changes.",
    ],
  },
  {
    heading: "Your Rights & Choices",
    paragraphs: [
      "Depending on where you live, you may have the right to access, correct, delete, or restrict the processing of your personal information, and to request a copy of it. Contact us to exercise these rights.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "We retain information for as long as needed to provide the Services and to meet our legal, accounting, and reporting obligations, after which it is deleted or anonymised.",
    ],
  },
  {
    heading: "Children's Privacy",
    paragraphs: [
      "The Services are not directed to children, and we do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this Policy from time to time. When we do, we revise the date at the top of this page and, where the changes are material, provide additional notice.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "Questions about this Policy can be sent to privacy@verifyengine.ai, or by post to Verify Engine, Inc.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="May 1, 2024"
      intro="Verify Engine, Inc. (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered verification platform and related services (collectively, the &ldquo;Services&rdquo;)."
      sections={sections}
    />
  );
}
