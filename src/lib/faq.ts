import {
  CircleHelp,
  PlayCircle,
  Workflow,
  LayoutList,
  Building2,
  Blocks,
  ShieldCheck,
  CreditCard,
  Headset,
  type LucideIcon,
} from "lucide-react";

export type FaqCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const faqCategories: FaqCategory[] = [
  { id: "all", label: "All Questions", icon: CircleHelp },
  { id: "getting-started", label: "Getting Started", icon: PlayCircle },
  { id: "how-it-works", label: "How It Works", icon: Workflow },
  { id: "features", label: "Features", icon: LayoutList },
  { id: "industries", label: "Industries", icon: Building2 },
  { id: "integrations", label: "Integrations", icon: Blocks },
  { id: "security", label: "Security & Compliance", icon: ShieldCheck },
  { id: "billing", label: "Billing & Pricing", icon: CreditCard },
  { id: "support", label: "Support", icon: Headset },
];

export type FaqEntry = {
  category: string;
  question: string;
  answer: string;
};

export const faqs: FaqEntry[] = [
  {
    category: "getting-started",
    question: "What is Verify Engine?",
    answer:
      "Verify Engine is an AI-powered verification platform that helps organizations verify identities, employment, income, education, and more—quickly, accurately, and with confidence.",
  },
  {
    category: "how-it-works",
    question: "How does Verify Engine work?",
    answer:
      "You submit an applicant and the verification you need. Our AI voice agents contact the source, run a dynamic interview, and validate every answer. A human reviewer then confirms the results before the report is released to you.",
  },
  {
    category: "features",
    question: "What verifications can Verify Engine perform?",
    answer:
      "Landlord and rental history, employment, income, education, and healthcare credential verification, along with identity checks and fraud detection across all of them.",
  },
  {
    category: "features",
    question: "How accurate is Verify Engine?",
    answer:
      "Verifications run at 99.2% accuracy. Every report combines AI-gathered data with a human quality review, so nothing reaches you without being confirmed by a trained reviewer.",
  },
  {
    category: "how-it-works",
    question: "How long does a verification take?",
    answer:
      "Most verifications complete in minutes rather than days. Turnaround depends on how quickly the source responds, and our agents retry automatically until they reach a real person.",
  },
  {
    category: "security",
    question: "Is my data secure with Verify Engine?",
    answer:
      "Yes. Data is encrypted in transit and at rest with bank-level encryption, access is permission-controlled, and every action is recorded in a complete audit trail.",
  },
  {
    category: "security",
    question: "Does Verify Engine comply with regulations?",
    answer:
      "Verify Engine is built for regulated workflows, is SOC 2 ready, and produces audit-ready reports designed to support your compliance obligations.",
  },
  {
    category: "integrations",
    question: "Can Verify Engine integrate with our software?",
    answer:
      "Yes. We integrate with major property management and screening platforms including AppFolio, Yardi, Buildium, Propertyware, TazWorks and Zapier, and offer an API for custom workflows.",
  },
  {
    category: "billing",
    question: "How much does Verify Engine cost?",
    answer:
      "Pricing scales with your verification volume across our Starter, Growth, and Enterprise plans. See the pricing page for details, or book a demo for a tailored quote.",
  },
  {
    category: "getting-started",
    question: "Is there a free trial or demo available?",
    answer:
      "Yes. You can start a free trial from the Get Started page, or book a personalized demo where our team walks through the platform with examples from your industry.",
  },
  {
    category: "industries",
    question: "Which industries does Verify Engine serve?",
    answer:
      "Our flagship product is landlord verification for tenant screening companies, property managers, and independent landlords. We also serve employment screening, financial services, healthcare, and education.",
  },
  {
    category: "support",
    question: "What support is included?",
    answer:
      "Every plan includes access to our support team, and Enterprise customers get a dedicated account manager along with onboarding and workflow configuration help.",
  },
];
