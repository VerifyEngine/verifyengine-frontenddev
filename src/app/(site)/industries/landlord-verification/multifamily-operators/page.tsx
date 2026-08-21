import type { Metadata } from "next";
import {
  Building2,
  ShieldCheck,
  Clock,
  BarChart3,
  ClipboardList,
  Users,
  Briefcase,
  Wallet,
  Home,
  Fingerprint,
  ScanSearch,
  Timer,
  UserRound,
  UploadCloud,
  CircleCheck,
  FileText,
} from "lucide-react";
import { AudiencePage, type AudiencePageConfig } from "@/components/sections/audience/AudiencePage";

export const metadata: Metadata = {
  title: "Multifamily Operators",
  description:
    "Standardize verification across communities, accelerate leasing, and improve NOI with AI-powered verifications built to scale.",
};

const config: AudiencePageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "Landlord Verification", href: "/industries/landlord-verification" },
    { label: "Multifamily Operators" },
  ],
  badge: "For Multifamily Operators",
  title: (
    <>
      Verify More Applicants. Fill More Units.{" "}
      <span className="text-mint-200">Protect</span> Your Communities.
    </>
  ),
  subtitle:
    "Verify Engine helps multifamily operators reduce risk, accelerate leasing, and improve NOI with AI-powered verifications that scale across properties, markets, and portfolios.",
  highlights: [
    "Speed up time-to-lease and reduce vacancy loss",
    "Standardize screening across your entire portfolio",
    "Reduce fraud and ensure compliance",
    "Actionable insights to improve portfolio performance",
  ],
  dashboard: {
    title: "Portfolio Overview",
    scoreLabel: "Overall Verification Score",
    score: 95,
    scoreCaption: "Industry avg: 78%",
    breakdown: [
      { icon: Briefcase, label: "Employment Verification", value: "12,348" },
      { icon: Wallet, label: "Income Verification", value: "11,102" },
      { icon: Home, label: "Rental History Verification", value: "9,876" },
      { icon: Fingerprint, label: "Identity Verification", value: "11,234" },
      { icon: ScanSearch, label: "Fraud Check", value: "12,348" },
    ],
    stats: [
      { icon: Users, label: "Applications Received", value: "24,681", delta: "18%", up: true },
      { icon: Timer, label: "Avg. Time to Complete", value: "5.2 min", delta: "28%", up: false },
      { icon: ShieldCheck, label: "Fraud Flag Rate", value: "2.7%", delta: "21%", up: false },
      { icon: BarChart3, label: "Approved Applicants", value: "61%", delta: "11%", up: true },
    ],
    insight:
      "Verified applicants in your portfolio have a 40% lower late payment rate and a 33% lower eviction rate compared to industry average.",
  },
  features: {
    eyebrow: "Built for Large-Scale Operations",
    title: "Enterprise-Grade Verifications for Multifamily Success",
    items: [
      {
        icon: Building2,
        title: "Scale Across Portfolios",
        description:
          "Verify thousands of applicants across properties, regions, and asset classes.",
      },
      {
        icon: ShieldCheck,
        title: "Consistent Screening",
        description: "Apply the same rules and standards everywhere for maximum compliance.",
      },
      {
        icon: Clock,
        title: "Faster Leasing",
        description: "Automate verifications and reduce time-to-lease by up to 50%.",
      },
      {
        icon: BarChart3,
        title: "Lower Risk",
        description: "AI + human verification catches issues others might miss.",
      },
      {
        icon: ClipboardList,
        title: "Portfolio Insights",
        description: "Real-time dashboards and analytics to drive better decisions.",
      },
      {
        icon: Users,
        title: "Better Communities",
        description: "Verify the right residents and create stronger, more stable communities.",
      },
    ],
  },
  flow: {
    eyebrow: "Designed to Integrate",
    title: "Seamless Workflows. Better Outcomes.",
    panelTitle: "How It Works",
    description:
      "Verify Engine connects with your property management software and leasing platforms to automate verifications and decisions.",
    checklist: [
      "Real-time status updates",
      "API integrations & webhooks",
      "Custom decision rules",
      "Detailed reporting & alerts",
    ],
    ctaLabel: "View Integrations",
    ctaHref: "/how-it-works",
    highlight: 2,
    numbered: false,
    steps: [
      {
        icon: UserRound,
        title: "1. Applicant Applies",
        description: "Applicant submits their application through your leasing platform.",
      },
      {
        icon: UploadCloud,
        title: "2. Verification Initiated",
        description: "Verify Engine automatically initiates all required verifications.",
      },
      {
        icon: ShieldCheck,
        title: "3. AI + Human Verification",
        description: "AI analyzes data and experts verify to ensure accuracy and detect risk factors.",
      },
      {
        icon: CircleCheck,
        title: "4. Decision & Score",
        description:
          "Get a clear recommendation and VE Score™ to help make confident leasing decisions.",
      },
      {
        icon: FileText,
        title: "5. Move-In with Confidence",
        description: "Lease the right residents faster and protect your property and reputation.",
      },
    ],
  },
  logos: {
    label: "Trusted by leading multifamily operators",
    items: [
      "Greystar",
      "Camden",
      "Equity Residential",
      "BERKADIA",
      "AVISON YOUNG",
      "ESSEX",
      "RPM Living",
    ],
  },
  cta: {
    title: "Ready to Optimize Your Screening Process?",
    description:
      "Join leading multifamily operators using Verify Engine to reduce risk, speed up leasing, and improve portfolio performance.",
  },
};

export default function MultifamilyOperatorsPage() {
  return <AudiencePage config={config} />;
}
