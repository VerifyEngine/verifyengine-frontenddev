import type { Metadata } from "next";
import { GraduationCap, BookOpen, FileCheck2, Landmark } from "lucide-react";
import { ProcessPage, type ProcessPageConfig } from "@/components/sections/process/ProcessPage";
import {
  summaryStages,
  workflowSubtitle,
  buildWorkflowSteps,
  buildBehindTheScenes,
} from "@/lib/process-content";

export const metadata: Metadata = {
  title: "Education Verification Process",
  description:
    "How Verify Engine verifies degrees, enrollments, certifications, and institutions with AI-powered verification and human oversight.",
};

const config: ProcessPageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Education Verification" },
  ],
  badge: "How It Works",
  title: (
    <>
      Education <span className="text-mint-200">Verification</span>
    </>
  ),
  subtitle:
    "Verify Engine verifies academic credentials, degrees, enrollments, and certifications quickly and accurately with AI-powered verifications and human oversight—so you can make confident decisions with confidence.",
  summary: {
    steps: summaryStages,
    score: 93,
    checks: [
      { icon: GraduationCap, label: "Degree Verification", result: "Verified" },
      { icon: BookOpen, label: "Enrollment Verification", result: "Verified" },
      { icon: FileCheck2, label: "Certification Verification", result: "Verified" },
      { icon: Landmark, label: "Institution Verification", result: "Verified" },
    ],
  },
  workflow: {
    eyebrow: "A Simple, Powerful Workflow",
    title: "5 Steps to Accurate Education Verification",
    subtitle: workflowSubtitle,
    highlight: 2,
    steps: buildWorkflowSteps({
      requestedDescription:
        "You submit an education verification request through your portal or integration.",
      initiatedDescription:
        "We securely contact educational institutions, registries, or databases to request verification.",
      reportNoun: "education",
    }),
  },
  behindTheScenes: buildBehindTheScenes({
    dataSources:
      "We connect to accredited institutions, national student clearinghouses, registries, and other trusted sources to verify education with confidence.",
    aiIntelligence:
      "Our AI reads documents, detects inconsistencies, and validates degrees, enrollments, and certifications in real time.",
    humanLoop:
      "Trained analysts review every verification to ensure accuracy, context, and compliance with education standards.",
    compliance:
      "We follow industry-leading security standards and maintain compliance with FERPA, GDPR, SOC 2, and other regulations.",
  }),
  call: {
    description:
      "Our AI voice agent contacts educational institutions to verify key academic information. Listen to a short example call.",
    duration: "1:18",
    respondentLabel: "Registrar Representative",
    agentLines: [
      {
        time: "00:00",
        text: "Hi, may I speak with the registrar's office regarding a degree verification for John Doe?",
      },
      {
        time: "00:16",
        text: "Thank you. Can you please confirm John Doe's degree, major, graduation date, and degree status?",
      },
    ],
    respondentLines: [
      { time: "00:03", text: "This is the registrar's office. How can I help you?" },
      {
        time: "00:27",
        text: "John Doe graduated with a Bachelor of Science in Computer Science on May 15, 2022. The degree is conferred.",
      },
    ],
  },
  cta: {
    title: "See the Verify Engine Difference",
    description:
      "Join thousands of organizations that verify faster, reduce risk, and make better decisions.",
  },
};

export default function EducationVerificationProcessPage() {
  return <ProcessPage config={config} />;
}
