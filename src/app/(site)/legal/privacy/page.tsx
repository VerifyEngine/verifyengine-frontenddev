import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Verify Engine collects, uses, discloses, and protects personal information collected through its public website.",
};

// Text from the client's "Verify_Engine_Privacy_Policy_Updated_SMS" document. Its bracketed
// drafting notes ("Before publication, confirm…") are instructions to the
// client, not policy text, and are left out.
const sections: LegalSection[] = [
  {
    heading: "Introduction",
    content: [
      "Verify Engine (“Verify Engine,” “we,” “us,” or “our”) respects your privacy and is committed to protecting personal information collected through our public website, https://verifyengine.ai (the “Website”).",
      "This Privacy Policy explains how Verify Engine LLC collects, uses, discloses, and protects personal information when you visit our Website, request information, schedule a demonstration, interact with our AI demonstration tools, or communicate with our team.",
      "Verify Engine provides business verification technology and may operate as a consumer reporting agency under the Fair Credit Reporting Act (“FCRA”) for certain services.",
      "This Website Privacy Policy primarily addresses information collected through our public marketing Website. Information processed through our authenticated verification platform may be governed by separate privacy notices, agreements, and applicable consumer reporting laws.",
    ],
  },
  {
    heading: "Information We Collect",
    content: [
      "Depending on how you interact with our Website, we may collect the following categories of information.",
      { subheading: "A. Information You Provide" },
      "When you submit a contact form, request a demonstration, or communicate with us, we may collect:",
      {
        list: [
          "First and last name.",
          "Business name and job title.",
          "Business email address.",
          "Telephone number.",
          "Company website.",
          "Industry or business category.",
          "Information included in messages or inquiries.",
          "Product interests and service requirements.",
        ],
      },
      { subheading: "B. Demonstration Information" },
      "When you participate in an interactive or AI-powered demonstration, we may collect:",
      {
        list: [
          "Telephone numbers submitted for demo calls.",
          "Demonstration request details.",
          "Interaction timestamps and technical records.",
          "Call recordings or transcripts, where legally permitted and appropriately disclosed.",
          "Feedback or information voluntarily provided during the demonstration.",
        ],
      },
      "We use this information to deliver the requested experience, evaluate demonstration functionality, respond to inquiries, and maintain service quality.",
      { subheading: "C. Automatically Collected Information" },
      "When you visit the Website, certain technical information may be collected automatically, including:",
      {
        list: [
          "IP address.",
          "Browser type and version.",
          "Device type and operating system.",
          "Pages visited and navigation activity.",
          "Referral URLs.",
          "Approximate geographic location derived from IP address.",
          "Session information.",
          "Cookie identifiers and similar technical data.",
        ],
      },
      { subheading: "D. Business Communications" },
      "We may maintain records of communications with prospective customers, partners, vendors, and other business contacts.",
      "These records may include emails, meeting details, support inquiries, and related correspondence.",
    ],
  },
  {
    heading: "How We Use Personal Information",
    content: [
      "We may use information collected through the Website to:",
      {
        list: [
          "Respond to questions and inquiries.",
          "Schedule and conduct product demonstrations.",
          "Provide requested AI demonstration calls.",
          "Communicate about Verify Engine products and services.",
          "Evaluate prospective customer requirements.",
          "Manage business relationships.",
          "Improve Website functionality and user experience.",
          "Analyze Website performance and engagement.",
          "Detect fraudulent or unauthorized activity.",
          "Maintain Website security.",
          "Comply with applicable legal obligations.",
          "Send marketing communications where permitted by law.",
        ],
      },
      "We will not use information collected through general marketing inquiries to create consumer reports about Website visitors merely because they contacted us.",
    ],
  },
  {
    heading: "Artificial Intelligence and Automated Communications",
    content: [
      "Verify Engine may use artificial intelligence and automated technologies to support certain Website features, including interactive demonstrations and AI-powered telephone experiences.",
      "If you request an AI telephone demonstration, your phone number and information you provide may be processed by the systems used to conduct that demonstration.",
      "Where applicable, we will provide required disclosures and obtain legally required consent for automated calls, recordings, and transcription.",
      "We may use authorized service providers to support these technologies, subject to applicable contractual and privacy requirements.",
      "We will not use Website demonstration information to train general-purpose AI models without an appropriate lawful basis and required authorization.",
    ],
  },
  {
    heading: "SMS Messaging and Mobile Communications",
    content: [
      { subheading: "A. Scope of SMS Communications" },
      "Verify Engine LLC may send non-marketing, verification-related SMS messages to employers, landlords, property managers, and other verification contacts who have expressly opted in. Messages may include secure verification links, reminders, and coordination notices. These operational communications may occur outside the public Website; this section applies to the SMS program even where separate platform agreements govern the underlying verification services.",
      { subheading: "B. Consent and Message Frequency" },
      "Before sending program SMS messages, Verify Engine obtains and documents the recipient’s affirmative consent through an appropriate opt-in method, including verbal consent during a verification call. An applicant’s authorization for screening, a client’s provision of a third party’s telephone number, or consent to receive AI-generated calls does not, by itself, constitute SMS consent by that third party. Message frequency varies by verification request; recipients may receive up to 25 messages per verification request. Message and data rates may apply.",
      { subheading: "C. SMS Information Collected and Uses" },
      "We may process mobile telephone numbers, consent and opt-out records, consent timestamps and script versions, message content, delivery status, support requests, and associated verification request identifiers. We use this information to deliver requested messages, document consent, manage preferences, respond to support requests, maintain security, and comply with applicable obligations.",
      { subheading: "D. Mobile Information Sharing" },
      "Verify Engine LLC respects the privacy of individuals participating in our SMS messaging program.",
      {
        term: "We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.",
        text: "",
      },
      "We do not sell, rent, or share mobile telephone numbers or SMS consent information with third parties or affiliates for their own marketing or promotional purposes.",
      "Authorized service providers, including messaging and infrastructure providers, may process information solely to deliver and support Verify Engine’s SMS services, subject to appropriate confidentiality, security, and contractual protections.",
      { subheading: "E. Opt-Out and Help" },
      "Recipients can reply STOP to opt out of the applicable SMS program and HELP for assistance, or contact support@verifyengine.ai. After an opt-out, we may send one confirmation message and will not send further program messages unless the recipient subsequently provides valid consent. SMS consent is voluntary; alternative verification channels may be available.",
      { subheading: "F. SMS Security and Sensitive Information" },
      "We seek to avoid transmitting Social Security numbers, financial account credentials, confidential consumer reports, or other sensitive verification records in ordinary SMS. Where appropriate, messages direct recipients to secure verification channels. SMS delivery may involve wireless carriers and service providers.",
      { subheading: "G. Related Terms" },
      "For program terms, see https://verifyengine.ai/legal/terms. For SMS support, contact support@verifyengine.ai.",
    ],
  },
  {
    heading: "Cookies and Analytics",
    content: [
      "Our Website may use cookies and similar technologies to support functionality, security, analytics, and user experience.",
      "Depending on the technologies implemented, these may include:",
      {
        term: "Essential Cookies:",
        text: "Used for basic Website functionality, security, and session management.",
      },
      {
        term: "Analytics Technologies:",
        text: "Used to understand Website traffic, visitor engagement, and performance.",
      },
      {
        term: "Preference Technologies:",
        text: "Used to remember applicable visitor preferences.",
      },
      {
        term: "Marketing Technologies:",
        text: "If implemented, these may help measure advertising performance or support relevant business marketing activities.",
      },
      "Where required by applicable law, visitors will be offered appropriate choices concerning nonessential cookies or tracking technologies.",
      "You may also manage certain cookies through your browser settings.",
    ],
  },
  {
    heading: "Marketing Communications",
    content: [
      "If you provide your contact information, we may communicate with you about your inquiry, requested demonstration, or potential business relationship.",
      "We may also send product updates, business information, or marketing communications where permitted by applicable law.",
      "You may opt out of marketing emails using the unsubscribe instructions included in those communications or by contacting us.",
      "Opting out of marketing does not prevent necessary communications concerning an existing business relationship or a service you specifically requested.",
      "Submitting a demo request does not automatically authorize unrelated automated marketing calls or text messages.",
    ],
  },
  {
    heading: "How We Disclose Information",
    content: [
      "We may disclose Website-related personal information to the following categories of recipients:",
      { subheading: "Service Providers" },
      "Companies that assist with Website hosting, cloud infrastructure, communications, scheduling, analytics, customer relationship management, security, and related business operations.",
      { subheading: "Business Partners" },
      "Authorized partners involved in responding to inquiries or providing requested business services, where appropriate and legally permitted.",
      { subheading: "Legal and Regulatory Authorities" },
      "Government agencies, regulators, courts, or other parties where disclosure is required or permitted by applicable law.",
      { subheading: "Corporate Transactions" },
      "Parties involved in a potential merger, acquisition, financing, reorganization, or sale of business assets, subject to appropriate legal and confidentiality protections.",
      "We require service providers to handle information according to applicable contractual obligations and privacy requirements.",
    ],
  },
  {
    heading: "Sale or Sharing of Personal Information",
    content: [
      "Verify Engine does not sell consumer reports or consumer reporting information for unrelated advertising purposes.",
      "For personal information collected through the public Website, whether any activity constitutes a “sale” or “sharing” under applicable privacy laws depends on the tracking, analytics, advertising, and data disclosure practices actually implemented.",
      "Where required, Verify Engine will provide applicable notices and opt-out mechanisms.",
    ],
  },
  {
    heading: "Consumer Reporting Information and FCRA",
    content: [
      "Verify Engine may provide services that qualify as consumer reporting activities under the FCRA.",
      "Personal information processed for consumer reporting purposes is subject to additional legal requirements concerning permissible purposes, accuracy, confidentiality, disclosure, disputes, and consumer rights.",
      "Consumer reporting information is handled separately from general Website marketing information according to applicable operational and legal requirements.",
      "Visitors seeking information about their consumer reports or exercising rights under the FCRA should contact our designated consumer support department.",
      "This Website Privacy Policy does not replace required consumer reporting disclosures or the Summary of Your Rights Under the Fair Credit Reporting Act.",
    ],
  },
  {
    heading: "Data Security",
    content: [
      "We use administrative, technical, and organizational measures designed to protect personal information against unauthorized access, disclosure, alteration, and destruction.",
      "These measures may include access restrictions, secure communications, system monitoring, and other safeguards appropriate to the information involved.",
      "No internet-based system can guarantee absolute security.",
      "If a security incident triggers applicable notification requirements, we will comply with those requirements.",
    ],
  },
  {
    heading: "Data Retention",
    content: [
      "We retain personal information for periods reasonably necessary to fulfill the purposes described in this Privacy Policy, including responding to inquiries, maintaining business relationships, supporting security, and meeting legal obligations.",
      "Retention periods may vary by information category.",
      "When personal information is no longer required, we will delete, deidentify, or securely dispose of it as appropriate and in accordance with applicable law.",
    ],
  },
  {
    heading: "Your Privacy Rights",
    content: [
      "Depending on your location and applicable law, you may have rights to:",
      {
        list: [
          "Request access to personal information.",
          "Request correction of inaccurate information.",
          "Request deletion of eligible information.",
          "Obtain information about certain disclosures.",
          "Opt out of certain marketing communications.",
          "Exercise applicable rights concerning sale, sharing, or targeted advertising.",
          "Request limitations on certain uses of sensitive personal information, where applicable.",
        ],
      },
      "Certain rights may be subject to legal exceptions and identity verification requirements.",
      "To submit a privacy request, contact us using the information below.",
      "We will respond according to applicable legal requirements.",
    ],
  },
  {
    heading: "California Privacy Rights",
    content: [
      "California residents may have additional rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act, where applicable.",
      "These may include rights to know, access, correct, delete, and opt out of certain uses or disclosures of personal information.",
      "Certain information subject to the FCRA may be governed by specialized rules or statutory exemptions.",
      "We will not unlawfully discriminate against individuals for exercising applicable privacy rights.",
    ],
  },
  {
    heading: "Third-Party Links and Services",
    content: [
      "The Website may link to third-party websites or use third-party scheduling, communication, or demonstration services.",
      "These services may have independent privacy policies and data handling practices.",
      "We encourage visitors to review the privacy notices of third-party services they choose to use.",
    ],
  },
  {
    heading: "International Data Processing",
    content: [
      "Personal information may be processed by authorized service providers operating in different geographic locations.",
      "Where international transfers occur, we will implement legally required safeguards.",
    ],
  },
  {
    heading: "Children’s Privacy",
    content: [
      "Our Website is intended for business audiences and is not directed toward children under 18.",
      "We do not knowingly collect personal information directly from children through the Website for marketing purposes.",
      "If we become aware that information has been collected in violation of applicable children’s privacy laws, we will take appropriate steps to address it.",
    ],
  },
  {
    heading: "Do Not Track and Privacy Preferences",
    content: [
      "Some browsers provide privacy preference signals, including Global Privacy Control.",
      "Where applicable law requires recognition of such signals, Verify Engine will honor them in accordance with legal requirements.",
      "Browser-level Do Not Track signals and other preference mechanisms may operate differently depending on the technology used.",
    ],
  },
  {
    heading: "Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy to reflect changes in our Website, services, technologies, business practices, or legal obligations.",
      "The effective date will be revised when updates are made.",
      "Where required by law, we will provide additional notice of material changes.",
    ],
  },
  {
    heading: "Contact Us",
    content: [
      "If you have questions about this Privacy Policy or wish to exercise applicable privacy rights, contact:",
      {
        lines: [
          "Verify Engine",
          "Verify Engine LLC",
          "2872 Ygnacio Valley Road #173",
          "Walnut Creek CA 94598",
          "Email: support@verifyengine.ai",
          "Website: https://verifyengine.ai",
        ],
      },
      "For consumer reporting inquiries, file disclosures, or disputes under the FCRA:",
      {
        lines: [
          "Consumer Support",
          "Email: support@verifyengine.ai",
          "Phone: 925-231-6200",
          "Mailing Address: 2872 Ygnacio Valley Road #173, Walnut Creek CA 94598",
        ],
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="October 1, 2026"
      lastUpdated="October 1, 2026"
      sections={sections}
    />
  );
}
