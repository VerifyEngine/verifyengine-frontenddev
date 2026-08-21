import type { Metadata } from "next";
import {
  Gauge,
  ShieldCheck,
  Clock,
  BarChart3,
  ClipboardCheck,
  Users,
  Briefcase,
  Wallet,
  Home,
  Fingerprint,
  ScanSearch,
  UserRound,
  UploadCloud,
  CircleCheck,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { AudiencePage, type AudiencePageConfig } from "@/components/sections/audience/AudiencePage";

export const metadata: Metadata = {
  title: "Property Management Companies",
  description:
    "Streamline tenant screening across your entire portfolio with AI-powered verifications, consistent standards, and audit-ready reporting.",
};

const config: AudiencePageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "Landlord Verification", href: "/industries/landlord-verification" },
    { label: "Property Management Companies" },
  ],
  badge: "For Property Management Companies",
  title: (
    <>
      Smarter Verifications. Better Tenants.{" "}
      <span className="text-mint-200">Stronger Communities.</span>
    </>
  ),
  subtitle:
    "Verify Engine helps property management companies streamline tenant screening, reduce risk, and improve portfolio performance with AI-powered verifications and actionable insights.",
  highlights: [
    "Speed up leasing and reduce vacancy rates",
    "Ensure compliance across your entire portfolio",
    "Reduce risk with accurate, reliable reports",
    "Improve resident quality and retention",
  ],
  dashboard: {
    title: "Verification Overview",
    rangeLabel: "",
    scoreLabel: "Portfolio Accuracy",
    score: 97,
    statsLayout: "column",
    breakdown: [
      { icon: Briefcase, label: "Employment Verification", value: "14,256" },
      { icon: Wallet, label: "Income Verification", value: "13,987" },
      { icon: Home, label: "Rental History Verification", value: "13,102" },
      { icon: Fingerprint, label: "Identity Verification", value: "14,502" },
      { icon: ScanSearch, label: "Fraud Check", value: "14,256" },
    ],
    stats: [
      { icon: Users, label: "Applications Screened", value: "18,742", delta: "22%", up: true },
      { icon: Clock, label: "Avg. Time to Complete", value: "6 min", delta: "18%", up: false },
      { icon: ShieldCheck, label: "Fraud Detected", value: "2.4%", delta: "32%", up: false },
      { icon: BadgeCheck, label: "Compliance Rate", value: "99.6%", delta: "4%", up: true },
    ],
    insightTitle: "AI Insights",
    insight:
      "Verified applicants in your portfolio have a 28% lower late payment rate and 31% lower eviction rate compared to industry average.",
  },
  features: {
    eyebrow: "Built for Property Management Success",
    title: "Built to Support Your Entire Portfolio",
    items: [
      {
        icon: Gauge,
        title: "Portfolio-Wide Visibility",
        description: "Track screening performance across properties, teams, and markets in real time.",
      },
      {
        icon: ShieldCheck,
        title: "Consistent Screening Standards",
        description: "Apply the same rules and criteria across your entire organization.",
      },
      {
        icon: Clock,
        title: "Faster Leasing",
        description: "Reduce screening time and approve qualified tenants faster.",
      },
      {
        icon: BarChart3,
        title: "Lower Risk",
        description: "AI + human verification catches issues others might miss.",
      },
      {
        icon: ClipboardCheck,
        title: "Compliance Assured",
        description: "Stay audit-ready with built-in compliance and documentation.",
      },
      {
        icon: Users,
        title: "Better Residents",
        description: "Attract and retain high-quality residents across every property.",
      },
    ],
  },
  flow: {
    eyebrow: "Power Your Operations",
    title: "Seamless Screening. Stronger Results.",
    panelTitle: "How It Works",
    description:
      "Verify Engine integrates with your property management software and existing workflows so your teams can do more with less effort.",
    checklist: [
      "Real-time status updates",
      "Webhooks & automation",
      "Custom rules & thresholds",
      "Detailed reporting & analytics",
    ],
    ctaLabel: "Explore Integrations",
    ctaHref: "/how-it-works",
    highlight: 2,
    numbered: false,
    steps: [
      {
        icon: UserRound,
        title: "1. Application Submitted",
        description: "Applicant applies through your leasing channel or portal.",
      },
      {
        icon: UploadCloud,
        title: "2. Verification Request",
        description: "We instantly initiate verifications based on your rules.",
      },
      {
        icon: ShieldCheck,
        title: "3. AI + Human Verification",
        description: "Our AI agents and analysts verify data across trusted sources.",
      },
      {
        icon: CircleCheck,
        title: "4. Decision & Score",
        description: "Get a clear decision and VE Score™ to help you make the right call.",
      },
      {
        icon: FileText,
        title: "5. Report Delivered",
        description: "Detailed report delivered to your team and stored securely.",
      },
    ],
  },
  logos: {
    label: "Trusted by leading property management companies",
    items: ["appfolio", "Buildium", "YARDI", "Propertyware", "rentvine", "entrata"],
  },
  cta: {
    title: "Ready to Streamline Screening Across Your Portfolio?",
    description:
      "Join leading property management companies using Verify Engine to reduce risk, improve performance, and grow with confidence.",
  },
};

export default function PropertyManagementCompaniesPage() {
  return <AudiencePage config={config} />;
}
