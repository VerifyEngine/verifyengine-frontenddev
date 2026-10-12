import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "How Verify Engine approaches information security, data protection, access control, and responsible use of AI, and how to report a security concern.",
};

// Text from the client's "VE_security_trust" document.
const sections: LegalSection[] = [
  {
    heading: "Our Commitment to Security",
    numbered: false,
    content: [
      "At Verify Engine, protecting information and maintaining the trust of our customers, partners, and website visitors are important responsibilities.",
      "Verify Engine develops technology-enabled verification solutions for businesses, including landlord and rental history verification, employment verification, income verification, and AI-assisted verification workflows.",
      "Because our services may involve confidential business information and sensitive consumer data, we recognize the importance of information security, privacy, responsible data handling, and regulatory compliance.",
      "Our approach to security is guided by principles of confidentiality, integrity, availability, accountability, and continuous improvement.",
    ],
  },
  {
    heading: "Information Security Governance",
    content: [
      "Verify Engine is committed to establishing and maintaining an information security program appropriate to the nature of its services, the information it processes, and its applicable legal obligations.",
      "Our security governance approach includes:",
      {
        list: [
          "Identifying and evaluating information security risks.",
          "Establishing policies and procedures for protecting sensitive information.",
          "Assigning responsibility for security oversight.",
          "Evaluating access to systems and information.",
          "Assessing third-party service providers.",
          "Reviewing and improving security practices as our operations evolve.",
        ],
      },
      "Security measures and controls are implemented according to operational requirements, risk assessments, and applicable laws.",
    ],
  },
  {
    heading: "Data Protection and Confidentiality",
    content: [
      "Verify Engine recognizes that information used in verification processes may be sensitive and confidential.",
      "We seek to limit the collection, use, and disclosure of personal information to authorized business purposes and applicable legal requirements.",
      "Our data protection principles include:",
      {
        list: [
          "Collecting information relevant to authorized verification activities.",
          "Restricting access to individuals and systems with legitimate business needs.",
          "Protecting confidential customer and consumer information.",
          "Maintaining appropriate controls over information shared with service providers.",
          "Establishing retention and disposal procedures.",
          "Supporting applicable privacy and consumer reporting obligations.",
        ],
      },
      "Information collected through our public marketing website is handled according to our Website Privacy Policy.",
      "Information processed through our verification platform may be subject to additional contractual and regulatory protections.",
    ],
  },
  {
    heading: "Access Controls and Authentication",
    content: [
      "Controlling access to systems and information is a fundamental component of our security approach.",
      "Verify Engine’s security program is designed to incorporate appropriate access management practices, which may include:",
      {
        list: [
          "Individual user accounts.",
          "Role-based access permissions.",
          "Authentication safeguards.",
          "Administrative access restrictions.",
          "User access reviews.",
          "Procedures for revoking access when no longer authorized.",
        ],
      },
      "Access controls are evaluated based on the sensitivity of information and the functions performed.",
    ],
  },
  {
    heading: "Encryption and Secure Communications",
    content: [
      "Verify Engine recognizes the importance of protecting information during transmission and storage.",
      "Our security architecture is designed to incorporate appropriate encryption and secure communications practices, including protections for information transmitted between users, applications, and authorized service providers.",
      "Specific encryption methods and technical controls depend on the systems involved and their implementation.",
      "Additional technical security information may be made available to qualified business customers under appropriate confidentiality arrangements.",
    ],
  },
  {
    heading: "Infrastructure and Application Security",
    content: [
      "Verify Engine uses software, infrastructure, and third-party technologies to support its services.",
      "Our security approach includes consideration of:",
      {
        list: [
          "Secure application development practices.",
          "Infrastructure configuration and access management.",
          "Software maintenance and vulnerability remediation.",
          "Monitoring for suspicious or unauthorized activity.",
          "Appropriate separation of customer information.",
          "Backup and recovery planning.",
          "Security testing and ongoing risk assessment.",
        ],
      },
      "Controls are developed and maintained according to operational needs and applicable requirements.",
    ],
  },
  {
    heading: "Consumer Reporting and Regulatory Compliance",
    content: [
      "Certain Verify Engine services may qualify as consumer reporting activities under the Fair Credit Reporting Act (“FCRA”).",
      "For services subject to the FCRA, Verify Engine recognizes applicable obligations concerning:",
      {
        list: [
          "Permissible purposes for furnishing consumer reports.",
          "Reasonable procedures to assure maximum possible accuracy.",
          "Protection of consumer information.",
          "Consumer file disclosures and dispute rights.",
          "Appropriate retention and secure disposal of records.",
          "Compliance with applicable federal and state consumer protection laws.",
        ],
      },
      "Access to consumer reporting services is restricted to authorized business customers.",
      "Use of our public website does not grant access to consumer reports.",
      "Where applicable, our security practices are also informed by relevant federal and state data protection requirements.",
    ],
  },
  {
    heading: "Artificial Intelligence and Automated Verification",
    content: [
      "Verify Engine may use artificial intelligence and automated technologies to support verification workflows, communications, information processing, and quality assurance.",
      "We recognize that these technologies introduce additional privacy, security, and accuracy considerations.",
      "Our approach includes evaluating appropriate safeguards for:",
      {
        list: [
          "Access to information processed by automated systems.",
          "Authorized use of AI-assisted communications.",
          "Protection of verification records and transcripts.",
          "Identification of inaccurate or inconsistent information.",
          "Human oversight when appropriate or legally required.",
          "Third-party AI and communications service providers.",
        ],
      },
      "The use of automation does not eliminate applicable privacy, security, or consumer reporting obligations.",
    ],
  },
  {
    heading: "Third-Party Service Providers",
    content: [
      "Verify Engine may rely on third-party providers for cloud infrastructure, communications, data connectivity, analytics, and other services.",
      "We recognize the importance of evaluating third-party risks and establishing appropriate contractual safeguards.",
      "Our vendor management approach considers the nature of services provided, access to information, security requirements, and applicable legal obligations.",
      "Third-party providers remain subject to their own operational environments and contractual responsibilities.",
    ],
  },
  {
    heading: "Security Monitoring and Incident Response",
    content: [
      "Verify Engine is committed to maintaining procedures for identifying, evaluating, and responding to potential information security incidents.",
      "Our security approach includes planning for:",
      {
        list: [
          "Identification of suspected security events.",
          "Evaluation of potential risks and affected systems.",
          "Containment and remediation.",
          "Investigation and documentation.",
          "Restoration of affected services.",
          "Notification to affected parties or authorities when legally required.",
        ],
      },
      "Notification obligations are determined by applicable laws, contractual requirements, and the circumstances of each incident.",
    ],
  },
  {
    heading: "Data Retention and Secure Disposal",
    content: [
      "Verify Engine recognizes that personal and consumer reporting information should not be retained indefinitely without a legitimate purpose or applicable legal requirement.",
      "Our retention and disposal practices are intended to account for:",
      {
        list: [
          "Business and operational needs.",
          "Customer agreements.",
          "Applicable legal retention requirements.",
          "Consumer reporting obligations.",
          "Security and audit records.",
          "Secure deletion or disposal when information is no longer required.",
        ],
      },
      "Retention practices may vary according to the type of information and the services involved.",
    ],
  },
  {
    heading: "Security Standards and Continuous Improvement",
    content: [
      "Verify Engine evaluates its security practices against relevant industry standards and regulatory requirements.",
      "Frameworks and guidance that may inform our security program include:",
      {
        list: [
          "National Institute of Standards and Technology (NIST) cybersecurity guidance.",
          "SOC 2 Trust Services Criteria.",
          "Applicable FCRA and consumer reporting requirements.",
          "Relevant federal and state privacy and information security laws.",
        ],
      },
      "Reference to a security framework does not constitute a representation that Verify Engine has obtained certification, completed an independent audit, or achieved a particular compliance designation.",
      "Any formal security attestations or certifications will be identified separately if and when obtained.",
    ],
  },
  {
    heading: "Shared Responsibility",
    content: [
      "Protecting information is a shared responsibility.",
      "Verify Engine is responsible for security measures within the systems and services it operates, subject to applicable agreements and legal requirements.",
      "Business customers are responsible for appropriately managing their authorized users, protecting account credentials, restricting access to downloaded reports, and complying with applicable laws governing their use of information.",
    ],
  },
  {
    heading: "Reporting a Security Concern",
    content: [
      "We encourage responsible reporting of potential security vulnerabilities or concerns involving Verify Engine systems.",
      "If you believe you have identified a security issue, please contact:",
      { lines: ["Security Contact", "Email: support@verifyengine.ai"] },
      "Please provide a description of the concern and sufficient information to help us evaluate it.",
      "Do not access information without authorization, disrupt services, or disclose confidential information while investigating a potential issue.",
      "Submitting a report does not authorize security testing or activities that would otherwise violate applicable law.",
    ],
  },
  {
    heading: "Security Information for Business Customers",
    content: [
      "Prospective and existing business customers may request additional information concerning Verify Engine’s security practices.",
      "Depending on availability and confidentiality requirements, information may include:",
      {
        list: [
          "Security program overviews.",
          "Data handling practices.",
          "Infrastructure and access management information.",
          "Third-party risk management practices.",
          "Available security assessments or compliance documentation.",
        ],
      },
      "Requests may be directed to our security or business development team.",
    ],
  },
  {
    heading: "Updates to This Page",
    content: [
      "We may update this Security & Trust page as our services, technology, security practices, and regulatory requirements evolve.",
      "The date above will reflect the latest revision.",
    ],
  },
  {
    heading: "Contact Verify Engine",
    numbered: false,
    content: [
      {
        lines: [
          "Verify Engine",
          "Website: https://verifyengine.ai",
          "Security: support@verifyengine.ai",
          "General Inquiries: support@verifyengine.ai",
        ],
      },
      "For additional information about our collection and processing of personal information, please review our Privacy Policy.",
    ],
  },
];

export default function SecurityPage() {
  return <LegalPage title="Security & Trust" lastUpdated="October 12, 2026" sections={sections} />;
}
