import type { Metadata } from "next";
import {
  UserRound,
  UploadCloud,
  ShieldCheck,
  CircleCheck,
  FileText,
  Briefcase,
  Wallet,
  Home,
  Fingerprint,
  Database,
  BrainCircuit,
  UserCog,
  Lock,
} from "lucide-react";
import { ProcessPage, type ProcessPageConfig } from "@/components/sections/process/ProcessPage";

export const metadata: Metadata = {
  title: "Landlord Verification Process",
  description:
    "How Verify Engine runs landlord verification end to end — from application to AI-assisted interview, human QA review, and final report.",
};

const config: ProcessPageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Landlord Verification Process" },
  ],
  badge: "How It Works",
  title: (
    <>
      Landlord Verification <span className="text-mint-200">Process</span>
    </>
  ),
  subtitle:
    "Verify Engine makes tenant screening faster, smarter, and more accurate with AI-powered verifications and human oversight—so you can rent with confidence.",
  summary: {
    steps: [
      { icon: UserRound, label: "Application" },
      { icon: UploadCloud, label: "Verifications" },
      { icon: ShieldCheck, label: "AI Analysis" },
      { icon: CircleCheck, label: "Decision" },
      { icon: FileText, label: "Report" },
    ],
    checks: [
      { icon: Briefcase, label: "Employment", result: "Verified" },
      { icon: Wallet, label: "Income", result: "Verified" },
      { icon: Home, label: "Rental", result: "Verified" },
      { icon: Fingerprint, label: "Identity", result: "Verified" },
    ],
  },
  workflow: {
    eyebrow: "A Simple, Powerful Workflow",
    title: "5 Steps to Smarter Tenant Screening",
    subtitle:
      "From application to decision—our process is designed for accuracy, speed, and compliance.",
    highlight: 2,
    steps: [
      {
        icon: UserRound,
        title: "Application Submitted",
        description: "The applicant completes your rental application through your portal or link.",
      },
      {
        icon: UploadCloud,
        title: "Verifications Initiated",
        description:
          "We automatically trigger the required verifications based on your rules and the applicant's data.",
      },
      {
        icon: ShieldCheck,
        title: "AI + Human Analysis",
        description:
          "Our AI analyzes the results instantly, while human review ensures accuracy and compliance.",
      },
      {
        icon: CircleCheck,
        title: "Decision Generated",
        description:
          "Get a clear recommendation and VE Score™ with explainable insights you can trust.",
      },
      {
        icon: FileText,
        title: "Report Delivered",
        description:
          "Receive a detailed report with verification results and decision rationale in seconds.",
      },
    ],
  },
  behindTheScenes: [
    {
      icon: Database,
      title: "Data from Trusted Sources",
      description:
        "We connect to trusted data providers and public records to verify identity, employment, income, rental history, and more.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Intelligence",
      description:
        "Our AI evaluates patterns and detects inconsistencies or risk factors that could be missed with traditional screening.",
    },
    {
      icon: UserCog,
      title: "Human in the Loop",
      description:
        "Every decision is reviewed by trained analysts to ensure context, accuracy, and compliance with fair housing regulations.",
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description:
        "We follow industry-leading security practices and maintain compliance with FCRA, GDPR, SOC 2, and more.",
    },
  ],
  call: {
    description:
      "Our AI voice agent contacts employers or landlords to verify key information. Listen to a short example call.",
    duration: "1:12",
    respondentLabel: "Employer Representative",
    agentLines: [
      {
        time: "00:00",
        text: "Hi, is this the payroll department? This is an automated call from Verify Engine. May I please speak with someone who can verify employment for John Doe?",
      },
      {
        time: "00:15",
        text: "Great, thank you. Could you please confirm John Doe's job title, employment status, and date of hire?",
      },
    ],
    respondentLines: [
      { time: "00:22", text: "Yes, this is payroll. I can help you." },
      {
        time: "00:35",
        text: "John Doe is a Senior Project Manager. He is currently employed full-time and was hired on March 14, 2022.",
      },
    ],
  },
  cta: {
    title: "See the Verify Engine Difference",
    description:
      "Join thousands of landlords who save time, reduce risk, and make confident leasing decisions.",
  },
};

export default function LandlordVerificationProcessPage() {
  return <ProcessPage config={config} />;
}
