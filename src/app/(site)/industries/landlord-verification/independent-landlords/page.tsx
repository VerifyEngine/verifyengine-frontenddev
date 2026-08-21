import type { Metadata } from "next";
import {
  ShieldCheck,
  Clock,
  CircleDollarSign,
  ClipboardList,
  Smartphone,
  Tag,
  Fingerprint,
  Wallet,
  Home,
  Briefcase,
  ScanSearch,
  UserRound,
  UploadCloud,
  CircleCheck,
  FileText,
  Users,
  Star,
  Lock,
} from "lucide-react";
import { AudiencePage, type AudiencePageConfig } from "@/components/sections/audience/AudiencePage";

export const metadata: Metadata = {
  title: "Independent Landlords",
  description:
    "Screening tools built for independent landlords — verify tenants faster, avoid costly evictions, and protect your property and income.",
};

const config: AudiencePageConfig = {
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: "Landlord Verification", href: "/industries/landlord-verification" },
    { label: "Independent Landlords" },
  ],
  badge: "For Independent Landlords",
  title: (
    <>
      Better Tenants. Fewer Headaches. More{" "}
      <span className="text-mint-200">Peace of Mind.</span>
    </>
  ),
  subtitle:
    "Verify Engine gives independent landlords the tools and confidence to screen tenants, reduce risk, and protect your property and income.",
  highlights: [
    "Screen smarter and faster",
    "Avoid costly evictions and late payments",
    "Simple, affordable, and built for landlords",
    "Professional reports your way",
  ],
  dashboard: {
    title: "Your Verification Dashboard",
    scoreLabel: "Overall Score",
    score: 93,
    scoreCaption: "Strong applicants. Lower risk.",
    breakdown: [
      { icon: Fingerprint, label: "Identity Verification", value: "156" },
      { icon: Wallet, label: "Income Verification", value: "139" },
      { icon: Home, label: "Rental History", value: "142" },
      { icon: Briefcase, label: "Employment Verification", value: "130" },
      { icon: ScanSearch, label: "Fraud Check", value: "156" },
    ],
    stats: [
      { icon: Users, label: "Applications", value: "184", delta: "18%", up: true },
      { icon: Clock, label: "Avg. Time to Complete", value: "6 min", delta: "30%", up: false },
      { icon: ShieldCheck, label: "Fraud Detected", value: "3.1%", delta: "24%", up: false },
      { icon: Home, label: "Approved Tenants", value: "82%", delta: "12%", up: true },
    ],
    insight:
      "Your approved tenants have a 41% lower late payment rate and a 35% lower eviction risk compared to industry average.",
  },
  features: {
    eyebrow: "Built for Independent Landlords",
    title: "Everything You Need to Rent with Confidence",
    items: [
      {
        icon: ShieldCheck,
        title: "Accurate Screening",
        description: "AI + human verification catches issues others might miss.",
      },
      {
        icon: Clock,
        title: "Save Time",
        description: "Get complete reports in minutes, not days.",
      },
      {
        icon: CircleDollarSign,
        title: "Reduce Risk",
        description: "Lower the chance of late payments, property damage, and evictions.",
      },
      {
        icon: ClipboardList,
        title: "Easy to Use",
        description: "No complicated setup. Simple, landlord-friendly dashboard.",
      },
      {
        icon: Smartphone,
        title: "Screen Anywhere",
        description: "Manage applicants and reports from your phone or computer.",
      },
      {
        icon: Tag,
        title: "Affordable Plans",
        description: "Built for landlords, not big property management firms.",
      },
    ],
  },
  flow: {
    eyebrow: "Simple. Fast. Effective.",
    title: "How It Works",
    description:
      "From application to decision, Verify Engine makes screening easy so you can focus on what matters most—your property.",
    checklist: [
      "Fast online applications",
      "AI + human verification",
      "Clear results and recommendations",
      "Reports you can trust",
    ],
    ctaLabel: "See How It Works",
    ctaHref: "/how-it-works/landlord-verification",
    highlight: 2,
    steps: [
      {
        icon: UserRound,
        title: "Applicant Applies",
        description: "Your applicant submits their application securely online.",
      },
      {
        icon: UploadCloud,
        title: "We Verify",
        description: "AI and human experts verify identity, income, rental history, and more.",
      },
      {
        icon: ShieldCheck,
        title: "We Analyze",
        description: "Our system analyzes the data and calculates a risk score.",
      },
      {
        icon: CircleCheck,
        title: "You Decide",
        description: "Review the report and make confident leasing decisions.",
      },
      {
        icon: FileText,
        title: "Move In with Confidence",
        description: "Rent to quality tenants and protect your property and income.",
      },
    ],
  },
  trust: {
    eyebrow: "Trusted by Landlords Like You",
    stats: [
      { icon: Home, value: "10,000+", label: "Landlords" },
      { icon: Star, value: "4.9/5", label: "Average Rating" },
      { icon: ShieldCheck, value: "Millions", label: "of Verifications" },
      { icon: Lock, value: "Bank-Level", label: "Security" },
    ],
  },
  cta: {
    title: "Ready to Find Better Tenants?",
    description:
      "Join thousands of independent landlords who use Verify Engine to screen smarter and rent with confidence.",
  },
};

export default function IndependentLandlordsPage() {
  return <AudiencePage config={config} />;
}
