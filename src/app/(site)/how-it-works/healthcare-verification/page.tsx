import type { Metadata } from "next";
import { BadgeCheck, Briefcase, FileCheck2, GraduationCap } from "lucide-react";
import { ProcessPage, type ProcessPageConfig } from "@/components/sections/process/ProcessPage";
import {
  summaryStages,
  workflowSubtitle,
  buildWorkflowSteps,
  buildBehindTheScenes,
} from "@/lib/process-content";

export const metadata: Metadata = {
  title: "Healthcare Verification Process",
  description:
    "How Verify Engine verifies healthcare licenses, certifications, education, and employment history with AI-powered verification and human oversight.",
};

const config: ProcessPageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Healthcare Verification" },
  ],
  badge: "How It Works",
  title: (
    <>
      Healthcare <span className="text-mint-200">Verification</span>
    </>
  ),
  subtitle:
    "Verify Engine verifies healthcare credentials, licenses, certifications, and employment history quickly and accurately with AI-powered verifications and human oversight—so you can hire and onboard with confidence.",
  summary: {
    steps: summaryStages,
    score: 96,
    checks: [
      { icon: BadgeCheck, label: "License Verification", result: "Verified" },
      { icon: Briefcase, label: "Employment Verification", result: "Verified" },
      { icon: FileCheck2, label: "Certification Verification", result: "Verified" },
      { icon: GraduationCap, label: "Education Verification", result: "Verified" },
    ],
  },
  workflow: {
    eyebrow: "A Simple, Powerful Workflow",
    title: "5 Steps to Confident Healthcare Hiring",
    subtitle: workflowSubtitle,
    highlight: 2,
    steps: buildWorkflowSteps({
      requestedDescription:
        "You submit a healthcare verification request through your portal or integration.",
      initiatedDescription:
        "We securely request and collect data from primary sources and credentialing authorities.",
      reportNoun: "healthcare",
    }),
  },
  behindTheScenes: buildBehindTheScenes({
    dataSources:
      "We connect to state licensing boards, credentialing bodies, certification authorities, employers, and public records with confidence.",
    aiIntelligence:
      "Our AI reads documents, detects anomalies, and validates credentials, licenses, and work history in real time.",
    humanLoop:
      "Trained analysts review every verification to ensure accuracy, context, and compliance with healthcare regulations.",
    compliance:
      "We follow industry-leading security standards and maintain compliance with HIPAA, SOC 2, and other regulations.",
  }),
  call: {
    description:
      "Our AI voice agent contacts credentialing authorities or employers to verify key healthcare information. Listen to a short example call.",
    duration: "1:17",
    respondentLabel: "Credentialing Representative",
    agentLines: [
      {
        time: "00:00",
        text: "Hi, may I speak with the credentialing department regarding a license verification for John Doe?",
      },
      {
        time: "00:14",
        text: "Thank you. Can you please confirm John Doe's license number, license type, issue date, and expiration date?",
      },
    ],
    respondentLines: [
      { time: "00:03", text: "This is the credentialing office. How can I help you?" },
      {
        time: "00:26",
        text: "John Doe is a Registered Nurse. License number RN123456. Issued on May 10, 2021 and expires on May 10, 2026.",
      },
    ],
  },
  cta: {
    title: "See the Verify Engine Difference",
    description:
      "Join thousands of healthcare organizations that verify faster, reduce risk, and make better hiring decisions.",
  },
};

export default function HealthcareVerificationProcessPage() {
  return <ProcessPage config={config} />;
}
