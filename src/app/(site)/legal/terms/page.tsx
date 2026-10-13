import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your access to and use of the Verify Engine website, including its content, demonstrations, and contact forms.",
};

// Text from the client's "Verify_Engine_Terms_of_Service_Updated_SMS" document.
const sections: LegalSection[] = [
  {
    heading: "Purpose of the Website",
    content: [
      "Verify Engine provides technology-enabled verification solutions designed for businesses, including tenant screening companies, property management companies, landlords, and other authorized organizations.",
      "Our services may include landlord verification, rental history verification, employment and income verification, AI-assisted communications, fraud detection, workflow automation, and related verification technologies.",
      "The Website is intended to provide general business and product information, demonstrate certain capabilities, and allow prospective customers to contact Verify Engine.",
      "Descriptions of products or features do not guarantee their availability. Certain services may be under development, subject to eligibility requirements, or offered only through separate agreements.",
    ],
  },
  {
    heading: "Website Eligibility",
    content: [
      "The Website is intended primarily for business professionals and individuals seeking information about Verify Engine.",
      "You agree to use the Website only for lawful purposes.",
      "The Website is not directed toward children under 18 years of age.",
    ],
  },
  {
    heading: "Consumer Reporting Services",
    content: [
      "Verify Engine may operate as a consumer reporting agency (“CRA”) under the Fair Credit Reporting Act (“FCRA”), 15 U.S.C. § 1681 et seq., for services that constitute consumer reporting.",
      "Certain verification reports may qualify as consumer reports when used to evaluate an individual’s eligibility for housing, employment, or other legally permissible purposes.",
      "Access to consumer reporting services is restricted to approved business customers with permissible purposes under applicable law.",
      "Browsing the Website, requesting information, or scheduling a demonstration does not establish authorization to obtain consumer reports.",
      "Consumer reporting services are governed by separate agreements, compliance requirements, and applicable federal and state laws.",
      "Nothing in these Terms limits any rights or obligations under the FCRA or other applicable consumer protection laws.",
    ],
  },
  {
    heading: "Website Information and Product Descriptions",
    content: [
      "We strive to provide accurate and current information about our business, products, and services.",
      "However, Website materials are provided for general informational purposes and may be updated without notice.",
      "Product descriptions, illustrations, sample reports, demonstrations, performance statistics, and interface previews may be illustrative.",
      "Actual capabilities, service availability, integrations, turnaround times, and results may vary.",
      "Unless expressly stated in a binding agreement, Website content does not constitute a guarantee of performance, accuracy, or service availability.",
    ],
  },
  {
    heading: "Demonstrations and Interactive Features",
    content: [
      "The Website may offer product demonstrations, sample reports, interactive previews, and AI-powered experiences.",
      "Demonstrations may use simulated scenarios, fictional data, sample information, or limited live functionality.",
      "Demo outputs are provided to illustrate potential functionality and should not be relied upon for actual housing, employment, financial, or other eligibility decisions.",
      "Verify Engine may modify or discontinue demonstration features at any time.",
    ],
  },
  {
    heading: "AI Voice Demonstrations and Communications",
    content: [
      "Certain Website features may allow visitors to request a telephone demonstration using an AI-powered voice agent.",
      "By submitting a telephone number through such a feature, you represent that you are authorized to receive the requested call at that number.",
      "Where required by applicable law, Verify Engine will obtain appropriate consent before initiating automated or AI-generated calls, recording conversations, or processing call transcripts.",
      "A request for a product demonstration does not automatically constitute consent to receive unrelated telemarketing calls or text messages.",
      "Any optional marketing communications will be subject to applicable consent requirements and opt-out rights.",
    ],
  },
  {
    heading: "SMS Messaging Terms and Conditions",
    content: [
      // A–F as the client sent them on 2026-10-13 for the SMS campaign; the
      // earlier provisions their message asked to keep (the one-time opt-out
      // confirmation, carrier delivery, program changes) follow without
      // repeating what A–F now say.
      { subheading: "A. Program Name" },
      "Verify Engine Verification Notifications",
      { subheading: "B. Program Description" },
      "Verify Engine LLC provides non-marketing SMS communications to authorized verification contacts participating in rental history, employment, and income verification processes.",
      "Recipients may include landlords, property managers, employers, payroll representatives, and other authorized verification contacts.",
      "Messages may include verification requests, coordination communications, follow-up reminders, and related service notifications.",
      "This section governs these SMS communications even when the underlying verification services are subject to separate customer agreements.",
      { subheading: "C. Consent" },
      "Recipients must expressly consent to receiving verification-related SMS communications before messages are sent. Consent may be obtained verbally through Verify Engine representatives or AI-assisted calling agents.",
      "Consent is voluntary and is not a condition of purchasing services. Consent to screening or to AI calls alone does not establish consent to SMS.",
      { subheading: "D. Message Frequency" },
      "Message frequency varies depending on the verification request. Recipients may receive up to 25 SMS messages per verification request.",
      "Message and data rates may apply.",
      { subheading: "E. Opt-Out and Assistance" },
      "Recipients may reply STOP at any time to unsubscribe from Verify Engine SMS communications. You may receive one final opt-out confirmation message. No further program texts will be sent unless you provide valid new consent.",
      "For assistance, reply HELP, email support@verifyengine.ai, or call 925-231-6200.",
      { subheading: "F. Privacy" },
      "We do not sell or share SMS opt-in data or personal information with third parties for marketing purposes.",
      "Our Privacy Policy is available at https://verifyengine.ai/legal/privacy.",
      { subheading: "G. Delivery" },
      "Carriers are not liable for delayed or undelivered messages. Message delivery is not guaranteed.",
      { subheading: "H. Program Changes" },
      "We may modify or discontinue the program in accordance with applicable law. Where changes require renewed consent, we will obtain it before sending affected messages.",
    ],
  },
  {
    heading: "Contact Forms and Business Inquiries",
    content: [
      "When you submit an inquiry, request a demonstration, or contact Verify Engine, you agree to provide accurate information.",
      "We may use the information you submit to respond to your inquiry, communicate about requested services, arrange demonstrations, and evaluate potential business relationships.",
      "Personal information collected through the Website is handled in accordance with our Website Privacy Policy.",
      "Submitting an inquiry does not establish a customer relationship or obligate Verify Engine to provide services.",
    ],
  },
  {
    heading: "Intellectual Property",
    content: [
      "The Website and its content, including software demonstrations, text, graphics, logos, designs, interfaces, trademarks, documentation, and other materials, are owned by Verify Engine or its licensors and are protected by applicable intellectual property laws.",
      "You may view and use Website materials for legitimate informational and business evaluation purposes.",
      "Without prior written permission, you may not:",
      {
        list: [
          "Reproduce or commercially redistribute Website content.",
          "Copy proprietary designs or software.",
          "Reverse engineer interactive demonstrations.",
          "Use Verify Engine trademarks in a misleading manner.",
          "Create derivative commercial products using protected Website materials.",
        ],
      },
      "No intellectual property rights are transferred through use of the Website.",
    ],
  },
  {
    heading: "Acceptable Use",
    content: [
      "You agree not to:",
      {
        list: [
          "Access or attempt to access restricted systems without authorization.",
          "Interfere with Website functionality or security.",
          "Introduce malicious code or harmful software.",
          "Scrape or systematically extract Website data without authorization.",
          "Submit fraudulent inquiries or impersonate another person.",
          "Misuse demonstration tools or communications systems.",
          "Use the Website to violate privacy, consumer protection, or other applicable laws.",
          "Attempt to obtain confidential business or consumer information through unauthorized means.",
        ],
      },
      "Verify Engine may restrict access where reasonably necessary to protect the Website, its users, or its systems.",
    ],
  },
  {
    heading: "Third-Party Websites and Services",
    content: [
      "The Website may contain links to third-party websites, scheduling tools, service providers, or external resources.",
      "Verify Engine does not control independent third-party websites and is not responsible for their content or practices.",
      "Use of third-party services may be subject to separate terms and privacy policies.",
    ],
  },
  {
    heading: "No Professional Advice",
    content: [
      "Information provided on the Website is for general informational purposes.",
      "Website content does not constitute legal, financial, compliance, housing, or employment advice.",
      "Businesses should consult qualified professionals concerning their own regulatory obligations and decisions.",
    ],
  },
  {
    heading: "Disclaimer of Warranties",
    content: [
      "To the extent permitted by law, the Website and its publicly available content are provided on an “as is” and “as available” basis.",
      "Verify Engine does not warrant uninterrupted Website availability or that all publicly displayed information will be free from errors.",
      "These disclaimers do not affect warranties or obligations that cannot lawfully be excluded.",
    ],
  },
  {
    heading: "Limitation of Liability",
    content: [
      "To the extent permitted by applicable law, Verify Engine will not be liable for indirect, incidental, special, or consequential damages arising solely from use of the public Website.",
      "Nothing in these Terms limits liability that cannot legally be limited, including applicable statutory obligations.",
      "Separate customer agreements govern liability arising from contracted verification services.",
    ],
  },
  {
    heading: "Privacy and Security",
    content: [
      "Your use of the Website is subject to our Website Privacy Policy.",
      "Verify Engine maintains security measures appropriate to the nature of information processed through the Website.",
      "You should not submit sensitive consumer reporting information, Social Security numbers, financial account credentials, or confidential applicant documents through general marketing contact forms unless expressly directed to an authorized secure channel.",
    ],
  },
  {
    heading: "Changes to the Website or Terms",
    content: [
      "Verify Engine may modify Website content, functionality, or these Terms.",
      "Updated Terms will be posted with a revised effective date.",
      "Where legally required, additional notice will be provided.",
      "Continued use after revised Terms become effective constitutes acceptance to the extent permitted by applicable law.",
    ],
  },
  {
    heading: "Governing Law",
    content: [
      "These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles, except where applicable federal law controls.",
    ],
  },
  {
    heading: "Contact Information",
    content: [
      "For questions concerning these Terms, contact:",
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
      "For questions involving consumer reports or FCRA rights, please use the designated consumer support channels provided by Verify Engine.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      effectiveDate="October 1, 2026"
      lastUpdated="October 1, 2026"
      intro={[
        "Welcome to Verify Engine.",
        "These Website Terms of Service (“Terms”) govern your access to and use of the website located at https://verifyengine.ai, including its webpages, content, demonstrations, contact forms, and other publicly available features (collectively, the “Website”).",
        "The Website is operated by Verify Engine LLC (“Verify Engine,” “we,” “us,” or “our”).",
        "By accessing or using the Website, you agree to these Terms. If you do not agree, please discontinue use of the Website.",
      ]}
      sections={sections}
    />
  );
}
