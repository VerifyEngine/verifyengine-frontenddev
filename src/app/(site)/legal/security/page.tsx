import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Verify Engine protects applicant and customer data: encryption, access control, retention, and incident response.",
};

/**
 * Placeholder security copy following the structure of the other legal pages.
 * The binding statements — certifications, retention periods, sub-processors —
 * must be confirmed by the client before launch.
 */
const sections: LegalSection[] = [
  {
    heading: "Our approach",
    paragraphs: [
      "Verify Engine handles information that decides whether someone gets a home or a job. We collect the minimum needed to answer the question asked, keep it only as long as it is needed, and are explicit about who can reach it.",
      "Security is reviewed as part of how the product is built rather than audited once a year and filed away.",
    ],
  },
  {
    heading: "Data protection",
    paragraphs: ["Applicant and customer data is protected in transit and at rest:"],
    bullets: [
      "TLS 1.2 or higher for all traffic between clients, our services, and third parties",
      "Encryption at rest for stored records, documents, and call recordings",
      "Secrets held in a managed store, never in source control or client-side code",
      "Only the last four digits of a Social Security Number are ever stored",
    ],
  },
  {
    heading: "Access control",
    paragraphs: ["Access to production data is limited and recorded:"],
    bullets: [
      "Role-based permissions, scoped to the organisation a record belongs to",
      "Multi-factor authentication required for all internal accounts",
      "Least-privilege access, reviewed on a recurring basis",
      "Audit logging of access to applicant records",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      "Verification records are retained for the period required by the applicable regulation and by our agreement with the customer, then deleted.",
      "Customers can request deletion of records associated with their organisation, subject to the retention obligations that apply to consumer reports.",
    ],
  },
  {
    heading: "Compliance",
    paragraphs: [
      "Verify Engine operates to Fair Credit Reporting Act standards, alongside the state rules that apply to tenant and employment screening.",
      "Our SOC 2 readiness programme covers the security, availability, and confidentiality criteria. Current reports and certifications are available to customers on request.",
    ],
  },
  {
    heading: "Incident response",
    paragraphs: [
      "We maintain a documented incident response process covering detection, containment, notification, and post-incident review.",
      "Where a security incident affects customer or applicant data, we notify affected customers without undue delay and within the timeframes the applicable law requires.",
    ],
  },
  {
    heading: "Reporting a vulnerability",
    paragraphs: [
      "If you believe you have found a security issue, email security@verifyengine.com with enough detail to reproduce it. We will confirm receipt and keep you updated while we investigate.",
      "Please give us a reasonable window to resolve the issue before disclosing it publicly. We will not pursue action against researchers who report in good faith.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      lastUpdated="August 24, 2026"
      intro="This page describes the controls Verify Engine uses to protect applicant and customer information, and how to reach us about a security concern."
      sections={sections}
    />
  );
}
