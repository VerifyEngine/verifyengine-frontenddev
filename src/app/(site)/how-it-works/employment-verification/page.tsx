import type { Metadata } from "next";
import { Building2, BadgeCheck, CalendarDays, Wallet } from "lucide-react";
import { ProcessPage, type ProcessPageConfig } from "@/components/sections/process/ProcessPage";
import {
  summaryStages,
  workflowSubtitle,
  buildWorkflowSteps,
  buildBehindTheScenes,
} from "@/lib/process-content";

export const metadata: Metadata = {
  title: "Employment Verification Process",
  description:
    "How Verify Engine confirms employment status, job title, dates of employment, and income with AI-powered verification and human oversight.",
};

const config: ProcessPageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Employment Verification" },
  ],
  badge: "How It Works",
  title: (
    <>
      Employment <span className="text-mint-200">Verification</span>
    </>
  ),
  subtitle:
    "Verify Engine confirms employment details accurately and efficiently with AI-powered verifications and human oversight—so you can make confident decisions faster.",
  summary: {
    steps: summaryStages,
    score: 94,
    checks: [
      { icon: Building2, label: "Employment Status", result: "Verified" },
      { icon: BadgeCheck, label: "Job Title", result: "Verified" },
      { icon: CalendarDays, label: "Dates of Employment", result: "Verified" },
      { icon: Wallet, label: "Income / Salary", result: "Verified" },
    ],
  },
  workflow: {
    eyebrow: "A Simple, Powerful Workflow",
    title: "5 Steps to Accurate Employment Verification",
    subtitle: workflowSubtitle,
    highlight: 2,
    steps: buildWorkflowSteps({
      requestedDescription:
        "You submit an employment verification request through your portal or integration.",
      initiatedDescription:
        "We automatically contact the employer using multiple methods to get a response.",
      analysisDescription:
        "AI analyzes the response instantly, while human review ensures accuracy and compliance.",
      reportNoun: "employment",
    }),
  },
  behindTheScenes: buildBehindTheScenes({
    dataSources:
      "We connect to trusted employer databases, payroll systems, and public records to verify employment information and reduce risk.",
    aiIntelligence:
      "Our AI reads and understands employer responses, detects inconsistencies, and validates key employment details.",
    humanLoop:
      "Trained analysts review every verification to ensure accuracy, context, and compliance with industry regulations.",
    compliance:
      "We follow industry-leading security standards and maintain compliance with FCRA, GDPR, SOC 2, and other regulations.",
  }),
  call: {
    description:
      "Our AI voice agent contacts employers to verify key employment information. Listen to a short example call.",
    duration: "1:08",
    respondentLabel: "Employer Representative",
    agentLines: [
      {
        time: "00:00",
        text: "Hi, may I speak with the HR department regarding an employment verification for John Doe?",
      },
      {
        time: "00:12",
        text: "Thank you. Can you please confirm John Doe's job title, dates of employment, and current employment status?",
      },
    ],
    respondentLines: [
      { time: "00:02", text: "This is HR. How can I help you?" },
      {
        time: "00:28",
        text: "John Doe is a Senior Software Engineer. He has been employed since June 10, 2021 and is currently employed full-time.",
      },
    ],
  },
  cta: {
    title: "See the Verify Engine Difference",
    description:
      "Join thousands of businesses that verify faster, reduce risk, and make better decisions.",
  },
};

export default function EmploymentVerificationProcessPage() {
  return <ProcessPage config={config} />;
}
