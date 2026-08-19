import type { Metadata } from "next";
import { Landmark, Wallet, FileCheck2, MapPin } from "lucide-react";
import { ProcessPage, type ProcessPageConfig } from "@/components/sections/process/ProcessPage";
import {
  summaryStages,
  workflowSubtitle,
  buildWorkflowSteps,
  buildBehindTheScenes,
  defaultCta,
} from "@/lib/process-content";

export const metadata: Metadata = {
  title: "Mortgage Verification Process",
  description:
    "How Verify Engine confirms mortgage accounts, monthly payments, loan status, and property address with AI-powered verification and human oversight.",
};

const config: ProcessPageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Mortgage Verification" },
  ],
  badge: "How It Works",
  title: (
    <>
      Mortgage <span className="text-mint-200">Verification</span>
    </>
  ),
  subtitle:
    "Verify Engine confirms mortgage and housing obligations quickly and accurately with AI-powered verifications and human oversight—so you can approve qualified tenants with confidence.",
  summary: {
    steps: summaryStages,
    score: 95,
    checks: [
      { icon: Landmark, label: "Mortgage Account", result: "Verified" },
      { icon: Wallet, label: "Monthly Payment", result: "Verified" },
      { icon: FileCheck2, label: "Loan Status", result: "Verified" },
      { icon: MapPin, label: "Property Address", result: "Verified" },
    ],
  },
  workflow: {
    eyebrow: "A Simple, Powerful Workflow",
    title: "5 Steps to Accurate Mortgage Verification",
    subtitle: workflowSubtitle,
    highlight: 2,
    steps: buildWorkflowSteps({
      requestedDescription:
        "You submit a mortgage verification request through your portal or integration.",
      initiatedDescription:
        "We securely access lender databases or use trusted sources to collect mortgage information.",
      reportNoun: "mortgage",
    }),
  },
  behindTheScenes: buildBehindTheScenes({
    dataSources:
      "We connect to lenders, servicers, credit bureaus, and public records to verify mortgage accounts and payment history with confidence.",
    aiIntelligence:
      "Our AI reads loan documents, detects inconsistencies, and understands mortgage terms in real time.",
    humanLoop:
      "Trained analysts review every verification to ensure accuracy, context, and compliance with industry regulations.",
    compliance:
      "We follow industry-leading security standards and maintain compliance with FCRA, GDPR, SOC 2, and other regulations.",
  }),
  call: {
    description:
      "Our AI voice agent contacts mortgage servicers to verify key mortgage information. Listen to a short example call.",
    duration: "1:12",
    respondentLabel: "Mortgage Representative",
    agentLines: [
      {
        time: "00:00",
        text: "Hi, may I speak with the mortgage verification department regarding an account for John Doe?",
      },
      {
        time: "00:16",
        text: "Thank you. Can you please confirm the loan number, current balance, monthly payment amount, and payment status?",
      },
    ],
    respondentLines: [
      { time: "00:04", text: "This is the verification team. How can I help you?" },
      {
        time: "00:28",
        text: "Loan number 123456789. The current balance is $268,450. The monthly payment is $1,855.32 and the account is current.",
      },
    ],
  },
  cta: defaultCta,
};

export default function MortgageVerificationProcessPage() {
  return <ProcessPage config={config} />;
}
