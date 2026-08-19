import type { Metadata } from "next";
import { Wallet, Building2, CalendarDays, TrendingUp } from "lucide-react";
import { ProcessPage, type ProcessPageConfig } from "@/components/sections/process/ProcessPage";
import {
  summaryStages,
  workflowSubtitle,
  buildWorkflowSteps,
  buildBehindTheScenes,
  defaultCta,
} from "@/lib/process-content";

export const metadata: Metadata = {
  title: "Income Verification Process",
  description:
    "How Verify Engine verifies income amount, source, frequency, and stability with AI-powered analysis and human oversight.",
};

const config: ProcessPageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Income Verification" },
  ],
  badge: "How It Works",
  title: (
    <>
      Income <span className="text-mint-200">Verification</span>
    </>
  ),
  subtitle:
    "Verify Engine verifies income quickly and accurately with AI-powered analysis and human oversight—so you can approve qualified tenants with confidence.",
  summary: {
    steps: summaryStages,
    score: 93,
    checks: [
      { icon: Wallet, label: "Income Amount", result: "Verified" },
      { icon: Building2, label: "Income Source", result: "Verified" },
      { icon: CalendarDays, label: "Frequency", result: "Verified" },
      { icon: TrendingUp, label: "Stability", result: "Verified" },
    ],
  },
  workflow: {
    eyebrow: "A Simple, Powerful Workflow",
    title: "5 Steps to Reliable Income Verification",
    subtitle: workflowSubtitle,
    highlight: 2,
    steps: buildWorkflowSteps({
      requestedDescription:
        "You submit an income verification request through your portal or integration.",
      initiatedDescription:
        "We securely collect income documents or access verified data sources.",
      reportNoun: "income",
    }),
  },
  behindTheScenes: buildBehindTheScenes({
    dataSources:
      "We connect to payroll providers, banks, tax authorities, and other secure sources to verify income with confidence.",
    aiIntelligence:
      "Our AI reads documents, detects anomalies, and understands income patterns across multiple sources in real time.",
    humanLoop:
      "Trained analysts review every verification to ensure accuracy, context, and compliance with industry standards.",
    compliance:
      "We follow industry-leading security standards and maintain compliance with FCRA, GDPR, SOC 2, and other regulations.",
  }),
  call: {
    description:
      "Our AI voice agent contacts employers or income sources to verify key information. Listen to a short example call.",
    duration: "1:05",
    respondentLabel: "Employer Representative",
    agentLines: [
      {
        time: "00:00",
        text: "Hi, may I speak with the payroll department regarding an income verification for John Doe?",
      },
      {
        time: "00:14",
        text: "Thank you. Can you please confirm John Doe's gross annual income and date of hire?",
      },
    ],
    respondentLines: [
      { time: "00:03", text: "This is payroll. How can I help you?" },
      {
        time: "00:22",
        text: "John Doe earns a gross annual income of $78,500 and was hired on May 10, 2022.",
      },
    ],
  },
  cta: defaultCta,
};

export default function IncomeVerificationProcessPage() {
  return <ProcessPage config={config} />;
}
