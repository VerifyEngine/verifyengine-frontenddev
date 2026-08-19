import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your access to and use of the Verify Engine website, platform, and services.",
};

/**
 * Placeholder terms covering the structure the design specifies.
 * The binding text must come from the client's counsel before launch.
 */
const sections: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you may not access or use the Services.",
    ],
  },
  {
    heading: "Description of Services",
    paragraphs: [
      "Verify Engine provides an AI-powered verification platform that helps organizations verify identities, employment, income, education, and other data. The Services are provided on a subscription basis and may be updated from time to time.",
    ],
  },
  {
    heading: "User Accounts",
    paragraphs: [
      "You must create an account to access certain features of the Services. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.",
    ],
  },
  {
    heading: "Acceptable Use",
    paragraphs: ["You agree not to:"],
    bullets: [
      "Use the Services for any unlawful or unauthorised purpose",
      "Submit information you do not have consent or a permissible purpose to verify",
      "Attempt to gain unauthorised access to the Services or related systems",
      "Interfere with or disrupt the integrity or performance of the Services",
    ],
  },
  {
    heading: "Third-Party Services",
    paragraphs: [
      "The Services rely on and may link to third-party data sources and integrations. We are not responsible for the content, policies, or practices of those third parties.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "The Services, including all software, content, and trademarks, are owned by Verify Engine, Inc. and protected by intellectual property laws. These Terms grant you no ownership rights.",
    ],
  },
  {
    heading: "Disclaimers",
    paragraphs: [
      "The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied, to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Verify Engine, Inc. will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.",
    ],
  },
  {
    heading: "Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless Verify Engine, Inc. from any claims, losses, or expenses arising from your use of the Services or your breach of these Terms.",
    ],
  },
  {
    heading: "Termination",
    paragraphs: [
      "We may suspend or terminate your access to the Services at any time for a breach of these Terms or where required by law. Provisions that by their nature should survive termination will do so.",
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the jurisdiction in which Verify Engine, Inc. is incorporated, without regard to conflict of law principles.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: [
      "Questions about these Terms can be sent to legal@verifyengine.ai, or by post to Verify Engine, Inc.",
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      lastUpdated="May 1, 2024"
      intro="Welcome to Verify Engine. These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of our website, platform, and Services (collectively, the &ldquo;Services&rdquo;) operated by Verify Engine, Inc."
      sections={sections}
    />
  );
}
