import type { Metadata } from "next";
import {
  ShieldCheck,
  Timer,
  ScanSearch,
  ClipboardCheck,
  Heart,
  GraduationCap,
  Landmark,
  BookOpen,
  FileCheck2,
  ScrollText,
  Award,
  Briefcase,
  BadgeCheck,
  School,
  Globe,
  FileSearch,
} from "lucide-react";
import { ProductPage, type ProductPageConfig } from "@/components/sections/product/ProductPage";

export const metadata: Metadata = {
  title: "Education Verification",
  description:
    "Confirm degrees, diplomas, enrollment, and academic achievements with speed, accuracy, and confidence.",
};

const config: ProductPageConfig = {
  badge: "Education Verification",
  title: (
    <>
      Verify Education. Trust <span className="text-mint-200">Every Credential.</span>
    </>
  ),
  subtitle:
    "Verify Engine helps schools, employers, and organizations confirm degrees, diplomas, enrollment, and academic achievements with speed, accuracy, and confidence.",
  highlights: [
    "Verify degrees, diplomas & certifications",
    "Prevent fraud and misrepresentation",
    "Speed up admissions & hiring decisions",
    "Ensure compliance and maintain integrity",
  ],
  processHref: "/how-it-works/education-verification",
  card: {
    score: 94,
    detailsTitle: "Verification Summary",
    completedIn: "6 min",
    details: [
      { icon: GraduationCap, label: "Degree Verification", value: "Verified" },
      { icon: Landmark, label: "Institution Verification", value: "Verified" },
      { icon: BookOpen, label: "Enrollment Verification", value: "Verified" },
      { icon: FileCheck2, label: "Certification Verification", value: "Verified" },
      { icon: ScrollText, label: "Academic History", value: "Verified" },
      { icon: Award, label: "Honors & Distinctions", value: "Clear" },
    ],
    summary:
      "All education credentials have been verified and match the information provided. No discrepancies found.",
  },
  features: {
    eyebrow: "Built for Educational Institutions & Employers",
    title: "Accurate Verifications for Every Achievement",
    items: [
      {
        icon: ShieldCheck,
        title: "Verify with Confidence",
        description: "Confirm degrees, diplomas, certificates, and academic achievements.",
      },
      {
        icon: Timer,
        title: "Faster Decisions",
        description: "Reduce turnaround time for admissions, hiring, and credential evaluations.",
      },
      {
        icon: ScanSearch,
        title: "Reduce Risk & Fraud",
        description: "AI + human verification catches discrepancies before they become an issue.",
      },
      {
        icon: ClipboardCheck,
        title: "Ensure Compliance",
        description: "Stay audit-ready and meet accreditation and regulatory requirements.",
      },
      {
        icon: Heart,
        title: "Build Trust",
        description: "Provide verified proof that enhances credibility and reputation.",
      },
    ],
  },
  platform: {
    eyebrow: "Real-Time Visibility",
    title: "One Platform. Complete Visibility.",
    subtitle:
      "Track every verification in real time, collaborate with your team, and access detailed reports from your dashboard.",
    checklist: [
      "Real-time status updates",
      "Comprehensive verification reports",
      "Team collaboration & notes",
      "Custom rules & thresholds",
      "Audit trail & compliance ready",
    ],
  },
  logos: {
    label: "Trusted by leading educational organizations",
    items: [
      "HARVARD UNIVERSITY",
      "Berkeley",
      "Arizona State University",
      "coursera",
      "WGU",
      "STRIDE EDUCATION",
    ],
  },
  audiences: {
    eyebrow: "Designed for Every Education Workflow",
    title: "Verification Across the Academic Journey",
    columns: 6,
    items: [
      {
        icon: GraduationCap,
        title: "Higher Education",
        description: "Verify degrees, transcripts, and academic history for admissions and transfers.",
      },
      {
        icon: Briefcase,
        title: "Employers",
        description: "Confirm educational credentials during hiring and promotions.",
      },
      {
        icon: BadgeCheck,
        title: "Certifying Bodies",
        description: "Validate certifications and professional qualifications.",
      },
      {
        icon: School,
        title: "K-12 Schools",
        description: "Verify diplomas and enrollment for transfers and records.",
      },
      {
        icon: Globe,
        title: "International Education",
        description: "Evaluate foreign degrees and equivalency with confidence.",
      },
      {
        icon: FileSearch,
        title: "Background Screening",
        description: "Add education verification to your comprehensive screening process.",
      },
    ],
  },
  cta: {
    title: "Ready to Verify Education with Confidence?",
    subtitle:
      "Join thousands of institutions and organizations using Verify Engine to ensure academic integrity and build trust.",
  },
};

export default function EducationVerificationPage() {
  return <ProductPage config={config} />;
}
