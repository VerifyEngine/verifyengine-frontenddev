import type { Metadata } from "next";
import {
  Timer,
  ShieldAlert,
  Crosshair,
  BarChart3,
  Heart,
  Building2,
  Briefcase,
  CalendarDays,
  BadgeCheck,
  MapPin,
  UserCheck,
  Users,
  Building,
  ClipboardCheck,
  UserCog,
} from "lucide-react";
import { ProductPage, type ProductPageConfig } from "@/components/sections/product/ProductPage";

export const metadata: Metadata = {
  title: "Employment Verification",
  description:
    "Fast, accurate, and fraud-resistant employment verification so you can make confident hiring decisions while reducing risk.",
};

const config: ProductPageConfig = {
  badge: "Employment Verification",
  title: (
    <>
      Verify Employment. Hire with <span className="text-mint-200">Confidence.</span>
    </>
  ),
  subtitle:
    "Verify Engine delivers fast, accurate, and fraud-resistant employment verification so you can make confident hiring decisions while reducing risk and improving efficiency.",
  highlights: [
    "Instant verifications with AI + human review",
    "Reduce fake jobs and resume fraud",
    "Improve candidate experience and speed to hire",
  ],
  processHref: "/how-it-works/employment-verification",
  card: {
    score: 95,
    detailsTitle: "Employment Details",
    completedIn: "6 min",
    details: [
      { icon: Building2, label: "Employer", value: "Tech Solutions Inc." },
      { icon: Briefcase, label: "Position", value: "Senior Software Engineer" },
      { icon: CalendarDays, label: "Start Date", value: "Jan 15, 2022" },
      { icon: BadgeCheck, label: "Employment Status", value: "Full-time" },
      { icon: MapPin, label: "Work Location", value: "San Francisco, CA" },
      { icon: UserCheck, label: "Verified By", value: "HR Department" },
    ],
    summary:
      "Employment has been verified with HR at Tech Solutions Inc. All details match the information provided by the candidate.",
  },
  features: {
    eyebrow: "Built for HR and Recruiting Teams",
    title: "Accurate Verifications. Better Hires.",
    items: [
      {
        icon: Timer,
        title: "Verify Faster",
        description: "Get employment verifications in minutes, not days.",
      },
      {
        icon: ShieldAlert,
        title: "Reduce Risk",
        description: "AI + human verification catches fake jobs and resume fraud.",
      },
      {
        icon: Crosshair,
        title: "Improve Accuracy",
        description: "Direct source verification ensures data is accurate and reliable.",
      },
      {
        icon: BarChart3,
        title: "Increase Efficiency",
        description: "Automate manual tasks and free up your HR team to focus on candidates.",
      },
      {
        icon: Heart,
        title: "Better Candidate Experience",
        description: "Fast, seamless verifications create a great experience for top talent.",
      },
    ],
  },
  platform: {
    eyebrow: "Real-Time Visibility",
    title: "Everything You Need in One Platform",
    subtitle:
      "Track every verification in real time, collaborate with your team, and access detailed reports from your dashboard.",
    checklist: [
      "Real-time status updates",
      "Detailed verification reports",
      "Team collaboration & notes",
      "Custom rules & thresholds",
      "Audit trail & compliance ready",
    ],
  },
  logos: {
    label: "Trusted by leading organizations",
    items: ["GUSTO", "RIPPLING", "deel.", "greenhouse", "brex", "workday", "bambooHR"],
  },
  audiences: {
    eyebrow: "Perfect for Every Hiring Need",
    title: "Helping Companies Build Stronger Teams",
    items: [
      {
        icon: Users,
        title: "Enterprise HR Teams",
        description: "Streamline high-volume hiring with automated employment verifications.",
      },
      {
        icon: Building,
        title: "Staffing Agencies",
        description: "Verify candidates faster and place talent with confidence.",
      },
      {
        icon: Building2,
        title: "Small & Mid-Size Businesses",
        description: "Get enterprise-grade verification without the enterprise complexity.",
      },
      {
        icon: ClipboardCheck,
        title: "Background Screening Companies",
        description: "Enhance your screening reports with verified employment data.",
      },
      {
        icon: UserCog,
        title: "Hiring Managers",
        description: "Make better hiring decisions with accurate, verified information.",
      },
    ],
  },
  cta: {
    title: "Ready to Verify Employment Smarter?",
    subtitle:
      "Join thousands of companies using Verify Engine to reduce risk, speed up hiring, and build stronger teams.",
  },
};

export default function EmploymentVerificationPage() {
  return <ProductPage config={config} />;
}
