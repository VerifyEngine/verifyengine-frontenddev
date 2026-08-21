import type { Metadata } from "next";
import {
  ShieldCheck,
  Clock,
  Scale,
  ClipboardList,
  BarChart3,
  Users,
  Wallet,
  Briefcase,
  Fingerprint,
  Home,
  ScanSearch,
  Timer,
  BadgeCheck,
  Building2,
  UserRound,
  UploadCloud,
  CircleCheck,
  FileText,
} from "lucide-react";
import { AudiencePage, type AudiencePageConfig } from "@/components/sections/audience/AudiencePage";

export const metadata: Metadata = {
  title: "Affordable Housing",
  description:
    "Verify applicants faster, stay compliant with HUD and program requirements, and serve more eligible families with audit-ready reports.",
};

const config: AudiencePageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "Landlord Verification", href: "/industries/landlord-verification" },
    { label: "Affordable Housing" },
  ],
  badge: "For Affordable Housing Providers",
  title: (
    <>
      Fairer Screenings. Stronger Compliance.{" "}
      <span className="text-mint-200">Better Communities.</span>
    </>
  ),
  subtitle:
    "Verify Engine helps affordable housing providers and public housing authorities verify applicants faster, ensure compliance with HUD and program requirements, and serve more eligible families.",
  highlights: [
    "Ensure program compliance and audit readiness",
    "Reduce processing time and administrative burden",
    "Verify eligibility with accuracy and fairness",
    "Serve more families with the resources you have",
  ],
  dashboard: {
    title: "Program Performance Overview",
    scoreLabel: "Overall Verification Score",
    score: 96,
    scoreCaption: "Industry avg: 76%",
    breakdown: [
      { icon: Wallet, label: "Income Verification", value: "8,742" },
      { icon: Briefcase, label: "Employment Verification", value: "7,215" },
      { icon: Fingerprint, label: "Identity Verification", value: "8,315" },
      { icon: Home, label: "Rental History Verification", value: "6,421" },
      { icon: ScanSearch, label: "Fraud Check", value: "3,128" },
    ],
    stats: [
      { icon: Users, label: "Applications Received", value: "15,893", delta: "16%", up: true },
      { icon: Timer, label: "Avg. Time to Complete", value: "4.1 min", delta: "25%", up: false },
      { icon: BadgeCheck, label: "Compliance Rate", value: "99.2%", delta: "4%", up: false },
      { icon: Building2, label: "Families Housed", value: "1,248", delta: "12%", up: true },
    ],
    insight:
      "Verified applicants in your programs have a 38% lower recertification error rate and 27% lower denial rate due to documentation issues.",
  },
  features: {
    eyebrow: "Built for Affordable Housing",
    title: "Built to Meet Your Mission and Requirements",
    items: [
      {
        icon: ShieldCheck,
        title: "Program Compliance",
        description:
          "Built to meet HUD, RD, LIHTC, Section 8, and other affordable housing program requirements.",
      },
      {
        icon: Clock,
        title: "Reduce Processing Time",
        description: "Automate verifications and reduce manual follow-ups by up to 50%.",
      },
      {
        icon: Scale,
        title: "Fair and Consistent",
        description: "AI + human verification ensures fair evaluations for every applicant.",
      },
      {
        icon: ClipboardList,
        title: "Audit Ready",
        description: "Comprehensive logs and reports for audits and monitoring.",
      },
      {
        icon: BarChart3,
        title: "Use Resources Wisely",
        description: "Lower operational costs and serve more families with the same budget.",
      },
      {
        icon: Users,
        title: "Stronger Outcomes",
        description: "Housed families sooner and build stronger, more stable communities.",
      },
    ],
  },
  flow: {
    eyebrow: "Designed for Your Workflow",
    title: "Simplify Screening. Stay Compliant.",
    panelTitle: "How It Works",
    description:
      "Verify Engine integrates with your affordable housing systems to make screenings easier while ensuring full compliance.",
    checklist: [
      "Seamless integrations with compliance tools",
      "Custom rules by program and site",
      "Real-time status and alerts",
      "Detailed reports and document storage",
    ],
    ctaLabel: "View Integrations",
    ctaHref: "/how-it-works",
    highlight: 2,
    numbered: false,
    steps: [
      {
        icon: UserRound,
        title: "1. Applicant Applies",
        description: "Applicant submits their application through your portal or site.",
      },
      {
        icon: UploadCloud,
        title: "2. Verification Initiated",
        description: "We automatically run the required verifications based on program rules.",
      },
      {
        icon: ShieldCheck,
        title: "3. AI + Human Review",
        description: "AI and compliance experts review results for accuracy and program compliance.",
      },
      {
        icon: CircleCheck,
        title: "4. Eligibility Decision",
        description: "Get a clear recommendation and VE Score™ to support your decision.",
      },
      {
        icon: FileText,
        title: "5. Report & Archive",
        description: "Store reports securely and stay audit-ready at all times.",
      },
    ],
  },
  logos: {
    label: "Trusted by affordable housing organizations",
    items: [
      "NeighborWorks America",
      "mercy HOUSING",
      "Chicago Housing Authority",
      "National Church Residences",
      "Bridge Housing",
      "RELATED California",
    ],
  },
  cta: {
    title: "Ready to Serve More Families?",
    description:
      "Join affordable housing providers across the country using Verify Engine to reduce risk, ensure compliance, and strengthen their communities.",
  },
};

export default function AffordableHousingPage() {
  return <AudiencePage config={config} />;
}
