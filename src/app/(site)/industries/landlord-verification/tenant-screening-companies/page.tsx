import type { Metadata } from "next";
import {
  Crosshair,
  ShieldAlert,
  Timer,
  Puzzle,
  BarChart3,
  Briefcase,
  Wallet,
  Home,
  Fingerprint,
  ScanSearch,
  FileBarChart2,
  Clock,
  UserRound,
  UploadCloud,
  ShieldCheck,
  CircleCheck,
  FileText,
} from "lucide-react";
import { AudiencePage, type AudiencePageConfig } from "@/components/sections/audience/AudiencePage";

export const metadata: Metadata = {
  title: "Tenant Screening Companies",
  description:
    "Power your screening platform with Verify Engine — more accurate reports, faster turnaround, and seamless API integration.",
};

const config: AudiencePageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "Landlord Verification", href: "/industries/landlord-verification" },
    { label: "Tenant Screening Companies" },
  ],
  badge: "For Tenant Screening Companies",
  title: (
    <>
      AI-Powered Verifications That Make Your Screening{" "}
      <span className="text-mint-200">Stronger</span> and{" "}
      <span className="text-mint-200">Smarter</span>
    </>
  ),
  subtitle:
    "Verify Engine helps tenant screening companies scale faster, reduce risk, and deliver more accurate reports—so you can build trust with property managers and landlords.",
  highlights: [
    "Increase report accuracy and consistency",
    "Reduce fraud and ensure compliance",
    "Faster turnaround times for better customer experience",
    "Seamless API integration with your platform",
  ],
  dashboard: {
    title: "Verification Overview",
    rangeLabel: "",
    scoreLabel: "Overall Accuracy",
    score: 98,
    statsLayout: "column",
    breakdown: [
      { icon: Briefcase, label: "Employment Verification", value: "12,456" },
      { icon: Wallet, label: "Income Verification", value: "11,982" },
      { icon: Home, label: "Rental History Verification", value: "9,874" },
      { icon: Fingerprint, label: "Identity Verification", value: "12,301" },
      { icon: ScanSearch, label: "Fraud Check", value: "12,456" },
    ],
    stats: [
      { icon: FileBarChart2, label: "Reports Completed", value: "13.6%", delta: "13.6%", up: true },
      { icon: Clock, label: "Avg. Turnaround Time", value: "6 min", delta: "21%", up: false },
      { icon: ShieldAlert, label: "Fraud Detected", value: "2.6%", delta: "34%", up: false },
    ],
    insightTitle: "AI Insights",
    insight:
      "AI verification has helped identify 34% more potential fraud attempts while reducing manual review by 42%.",
  },
  features: {
    eyebrow: "Built for Screening Platforms",
    title: "Why Screening Companies Choose Verify Engine",
    items: [
      {
        icon: Crosshair,
        title: "Higher Accuracy",
        description:
          "AI + human verification catches what others miss—reducing false positives and negatives.",
      },
      {
        icon: ShieldAlert,
        title: "Fraud Detection",
        description:
          "Identify synthetic identities, false documents, and income fraud before they become risk.",
      },
      {
        icon: Timer,
        title: "Faster Turnaround",
        description:
          "Get verifications completed in minutes, not days—so you can deliver reports faster.",
      },
      {
        icon: Puzzle,
        title: "Easy Integration",
        description: "Plug into your platform with our API and automate workflows effortlessly.",
      },
      {
        icon: BarChart3,
        title: "Scalable Growth",
        description: "Handle more volume with confidence and maintain quality as you grow.",
      },
    ],
  },
  flow: {
    eyebrow: "Power Your Platform",
    title: "Designed to Fit Your Workflow",
    panelTitle: "How It Works",
    description:
      "Verify Engine integrates seamlessly with leading screening platforms and CRMs, automating verifications and updating results in real time.",
    checklist: [
      "Real-time status updates via API",
      "Webhook notifications",
      "Custom workflows and business rules",
    ],
    ctaLabel: "View API Documentation",
    ctaHref: "/how-it-works",
    highlight: 2,
    numbered: false,
    steps: [
      {
        icon: UserRound,
        title: "Applicant Submission",
        description: "Applicant data is submitted on your platform.",
      },
      {
        icon: UploadCloud,
        title: "Verification Request",
        description: "API sends verification requests to Verify Engine.",
      },
      {
        icon: ShieldCheck,
        title: "AI + Human Verification",
        description: "Our AI agents and human verifiers validate the data across trusted sources.",
      },
      {
        icon: CircleCheck,
        title: "Results Returned",
        description: "Results are returned to your platform instantly.",
      },
      {
        icon: FileText,
        title: "Report Delivered",
        description: "You deliver a more accurate, faster report to your customers.",
      },
    ],
  },
  logos: {
    label: "Trusted by leading screening companies",
    items: ["RentPrep", "appfolio", "Intellirent", "rentspree", "MyRental", "tenantcheck"],
  },
  cta: {
    title: "Ready to Elevate Your Screening Platform?",
    description:
      "See how Verify Engine can help you deliver faster, more accurate verifications and grow your business with confidence.",
  },
};

export default function TenantScreeningCompaniesPage() {
  return <AudiencePage config={config} />;
}
