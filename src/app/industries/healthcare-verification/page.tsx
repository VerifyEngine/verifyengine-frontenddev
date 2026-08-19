import type { Metadata } from "next";
import {
  ShieldCheck,
  Timer,
  ClipboardCheck,
  BarChart3,
  Heart,
  BadgeCheck,
  FileCheck2,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Eye,
  Building2,
  Users,
  HousePlus,
  Brain,
  Pill,
} from "lucide-react";
import { ProductPage, type ProductPageConfig } from "@/components/sections/product/ProductPage";

export const metadata: Metadata = {
  title: "Healthcare Verification",
  description:
    "Verify licenses, credentials, education, and employment for healthcare professionals — ensure compliance and deliver safer patient care.",
};

const config: ProductPageConfig = {
  badge: "Healthcare Verification",
  title: (
    <>
      Verify Healthcare Professionals.{" "}
      <span className="text-mint-200">Protect Patients.</span>
    </>
  ),
  subtitle:
    "Verify Engine helps healthcare organizations verify licenses, credentials, employment, and more—so you can ensure compliance, reduce risk, and deliver safer patient care.",
  highlights: [
    "Verify licenses & certifications in real time",
    "Reduce credentialing time and costs",
    "Ensure compliance and patient safety",
  ],
  processHref: "/how-it-works/healthcare-verification",
  card: {
    title: "Healthcare Professional Example",
    score: 96,
    detailsTitle: "Verification Summary",
    completedIn: "8 min",
    details: [
      { icon: BadgeCheck, label: "License Verification", value: "Verified" },
      { icon: FileCheck2, label: "Certification Verification", value: "Verified" },
      { icon: GraduationCap, label: "Education Verification", value: "Verified" },
      { icon: Briefcase, label: "Employment Verification", value: "Verified" },
      { icon: Stethoscope, label: "NPI Verification", value: "Verified" },
      { icon: Eye, label: "Sanctions & Watchlist", value: "Clear" },
    ],
    summary:
      "All verification checks have been completed and verified. No adverse items found. Professional is qualified and in good standing.",
  },
  features: {
    eyebrow: "Built for Healthcare Organizations",
    title: "Comprehensive Verification for Better Care",
    items: [
      {
        icon: ShieldCheck,
        title: "Verify Credentials",
        description: "Verify licenses, certifications, education, and board submissions.",
      },
      {
        icon: Timer,
        title: "Accelerate Onboarding",
        description: "Speed up credentialing and get providers to work faster.",
      },
      {
        icon: ClipboardCheck,
        title: "Ensure Compliance",
        description: "Stay audit-ready with continuous monitoring and regulatory checks.",
      },
      {
        icon: BarChart3,
        title: "Reduce Risk",
        description: "AI + human verification catches issues before they impact care.",
      },
      {
        icon: Heart,
        title: "Improve Patient Safety",
        description: "Place qualified, verified professionals where they're needed most.",
      },
    ],
  },
  platform: {
    eyebrow: "Real-Time Visibility",
    title: "One Platform. Complete Visibility.",
    subtitle:
      "Monitor every verification in real time, collaborate with your team, and access detailed reports from your dashboard.",
    checklist: [
      "Real-time status updates",
      "Comprehensive verification reports",
      "Team collaboration & notes",
      "Custom rules & thresholds",
      "Audit trail & compliance ready",
    ],
  },
  logos: {
    label: "Trusted by leading healthcare organizations",
    items: [
      "HCA Healthcare",
      "CommonSpirit",
      "Tenet Health",
      "AdventHealth",
      "UCLA Health",
      "Sutter Health",
    ],
  },
  audiences: {
    eyebrow: "Designed for Every Healthcare Workflow",
    title: "Credentialing Across Every Care Setting",
    columns: 6,
    items: [
      {
        icon: Stethoscope,
        title: "Hospitals",
        description: "Verify providers, nurses, and allied health staff accurately and fast.",
      },
      {
        icon: Building2,
        title: "Health Systems",
        description: "Streamline credentialing across multiple facilities and locations.",
      },
      {
        icon: Users,
        title: "Medical Groups",
        description: "Ensure provider qualifications and maintain compliance.",
      },
      {
        icon: HousePlus,
        title: "Home Health",
        description: "Verify caregivers and staff to deliver safe, compliant care at home.",
      },
      {
        icon: Brain,
        title: "Behavioral Health",
        description: "Verify licenses and certifications for clinical and support staff.",
      },
      {
        icon: Pill,
        title: "Pharmacies",
        description: "Verify pharmacists and technicians with real-time license checking.",
      },
    ],
  },
  cta: {
    title: "Ready to Strengthen Your Credentialing Process?",
    subtitle:
      "Join healthcare organizations using Verify Engine to reduce risk, ensure compliance, and improve patient outcomes.",
  },
};

export default function HealthcareVerificationPage() {
  return <ProductPage config={config} />;
}
