import type { Metadata } from "next";
import {
  ShieldCheck,
  Zap,
  ScanSearch,
  BarChart3,
  CircleDollarSign,
  Fingerprint,
  Wallet,
  Briefcase,
  Landmark,
  Eye,
  ShieldAlert,
  Home,
  Car,
  Building2,
  Store,
} from "lucide-react";
import { ProductPage, type ProductPageConfig } from "@/components/sections/product/ProductPage";

export const metadata: Metadata = {
  title: "Financial Services",
  description:
    "Verify customers, reduce fraud, and stay compliant — identity, income, employment, and asset verification for lenders, banks, and credit unions.",
};

const config: ProductPageConfig = {
  badge: "Financial Services Verification",
  title: (
    <>
      Stronger Decisions. Lower Risk.{" "}
      <span className="text-mint-200">Built on Trust.</span>
    </>
  ),
  subtitle:
    "Verify Engine helps financial institutions verify customers, reduce fraud, and stay compliant—so you can onboard with confidence and protect what matters.",
  highlights: [
    "Verify identity, income & employment",
    "Detect fraud before it happens",
    "Improve compliance and audit readiness",
  ],
  processHref: "/how-it-works/mortgage-verification",
  card: {
    score: 93,
    detailsTitle: "Verification Summary",
    completedIn: "7 min",
    details: [
      { icon: Fingerprint, label: "Identity Verification", value: "Verified" },
      { icon: Wallet, label: "Income Verification", value: "Verified" },
      { icon: Briefcase, label: "Employment Verification", value: "Verified" },
      { icon: Landmark, label: "Bank Account Verification", value: "Verified" },
      { icon: Eye, label: "Watchlist Screening", value: "Clear" },
      { icon: ShieldAlert, label: "Fraud Check", value: "Clear" },
    ],
    summary:
      "All verification checks have been completed and verified. No adverse items found. Applicant meets all requirements.",
  },
  features: {
    eyebrow: "Built for Financial Institutions",
    title: "Comprehensive Verification for Every Relationship",
    items: [
      {
        icon: ShieldCheck,
        title: "Verify with Confidence",
        description: "Verify identity, income, employment, assets, and more.",
      },
      {
        icon: Zap,
        title: "Faster Onboarding",
        description: "Reduce manual work and approve more customers in less time.",
      },
      {
        icon: ScanSearch,
        title: "Reduce Risk & Fraud",
        description: "AI + human verification catches what others miss before it becomes a loss.",
      },
      {
        icon: BarChart3,
        title: "Stay Compliant",
        description: "Built-in regulatory checks and audit-ready reports keep you covered.",
      },
      {
        icon: CircleDollarSign,
        title: "Better Customer Experience",
        description: "Frictionless verification creates trust and improves customer satisfaction.",
      },
    ],
  },
  platform: {
    eyebrow: "Real-Time Visibility",
    title: "One Platform. Complete Visibility.",
    subtitle: "Monitor, manage, and act on verifications in real time across all channels.",
    checklist: [
      "Real-time status updates",
      "Comprehensive verification reports",
      "Risk scoring & fraud detection",
      "Custom rules & thresholds",
      "Audit trail & compliance ready",
    ],
  },
  logos: {
    label: "Trusted by leading financial institutions",
    items: ["CHASE", "WELLS FARGO", "PNC", "usbank", "TRUIST", "REGIONS", "NAVY FEDERAL"],
  },
  audiences: {
    eyebrow: "Designed for Every Financial Workflow",
    title: "Verification Across the Customer Lifecycle",
    columns: 6,
    items: [
      {
        icon: Landmark,
        title: "Consumer Lending",
        description: "Verify income, employment, and identity for loans, credit cards, and more.",
      },
      {
        icon: Home,
        title: "Mortgage & Home Loans",
        description: "Streamline borrower verification and reduce loan fraud risk.",
      },
      {
        icon: Car,
        title: "Auto Financing",
        description: "Fast, accurate verification for auto loans and lease applications.",
      },
      {
        icon: ShieldCheck,
        title: "Banking & Onboarding",
        description: "Onboard new customers faster with secure KYC and identity verification.",
      },
      {
        icon: Building2,
        title: "Business Lending",
        description: "Verify business ownership, income, and cash flow with confidence.",
      },
      {
        icon: Store,
        title: "Fraud Prevention",
        description: "Proactively detect fraud and protect your institution and customers.",
      },
    ],
  },
  cta: {
    title: "Ready to Strengthen Trust and Reduce Risk?",
    subtitle:
      "Join leading financial institutions using Verify Engine to verify with confidence and grow securely.",
  },
};

export default function FinancialServicesPage() {
  return <ProductPage config={config} />;
}
