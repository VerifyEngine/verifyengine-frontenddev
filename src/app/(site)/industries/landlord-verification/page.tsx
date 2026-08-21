import type { Metadata } from "next";
import {
  ShieldCheck,
  Timer,
  ScanSearch,
  BarChart3,
  CircleDollarSign,
  Home,
  Building2,
  Building,
  HeartHandshake,
  Users,
} from "lucide-react";
import { HeroLandlord } from "@/components/marketing/HeroLandlord";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PlatformVisibility } from "@/components/sections/PlatformVisibility";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { LogosRow } from "@/components/sections/LogosRow";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Landlord Verification",
  description:
    "AI-powered rental history verification for landlords and property managers — reduce risk, eliminate fraud, and make confident leasing decisions.",
};

const features = [
  {
    icon: ShieldCheck,
    title: "Verify Everything",
    description: "Employment, income, rental history, identity, and more.",
  },
  {
    icon: Timer,
    title: "Get Results Fast",
    description: "Most verifications completed in minutes, not days.",
  },
  {
    icon: ScanSearch,
    title: "Reduce Risk & Fraud",
    description: "AI + human verification catches what others miss.",
  },
  {
    icon: BarChart3,
    title: "Make Confident Decisions",
    description: "Clear reports and VE Score™ help you decide with certainty.",
  },
  {
    icon: CircleDollarSign,
    title: "Improve Tenant Outcomes",
    description: "Better tenants, longer leases, fewer evictions.",
  },
];

const audiences = [
  {
    icon: Home,
    title: "Independent Landlords",
    description: "Screen tenants like a pro without the enterprise tools or high costs.",
    href: "/industries/landlord-verification/independent-landlords",
  },
  {
    icon: Building2,
    title: "Property Managers",
    description: "Streamline screening across your portfolio and reduce manual work.",
    href: "/industries/landlord-verification/property-management-companies",
  },
  {
    icon: Building,
    title: "Multifamily Operators",
    description: "Standardize verification across communities and improve leasing velocity.",
    href: "/industries/landlord-verification/multifamily-operators",
  },
  {
    icon: HeartHandshake,
    title: "Affordable Housing",
    description: "Stay compliant and reduce fraud with reliable, audit-ready reports.",
    href: "/industries/landlord-verification/affordable-housing",
  },
  {
    icon: Users,
    title: "Tenant Screening Companies",
    description: "Power your screening platform with Verify Engine's verification infrastructure.",
    href: "/industries/landlord-verification/tenant-screening-companies",
  },
];

const propertyCompanies = [
  "Greystar",
  "AvalonBay",
  "Lincoln Property",
  "RELATED",
  "Bell Partners",
  "Camden",
];

export default function LandlordVerificationPage() {
  return (
    <>
      <HeroLandlord />
      <FeatureGrid
        eyebrow="Built for Landlords and Property Managers"
        title="Everything You Need to Rent with Confidence"
        features={features}
        columns={5}
      />
      <PlatformVisibility
        eyebrow="Real-Time Visibility"
        title="One Platform. Complete Visibility."
        subtitle="Track every verification in real time, collaborate with your team, and access detailed reports from your dashboard."
        checklist={[
          "Real-time status updates",
          "Comprehensive verification reports",
          "Team collaboration & notes",
          "Custom rules & thresholds",
          "Audit trail & compliance ready",
        ]}
        ctaLabel="See Platform Overview"
        variant="analytics"
      />
      <AudienceCards
        eyebrow="How Verify Engine Helps Landlords"
        title="Trusted by Landlords of All Sizes"
        audiences={audiences}
      />
      <LogosRow label="Trusted by leading property companies" logos={propertyCompanies} />
      <FinalCta
        title="Ready to Screen Smarter?"
        subtitle="Join thousands of landlords and property managers using Verify Engine to rent with confidence."
        primaryLabel="See How It Works"
        primaryHref="/how-it-works"
        secondaryLabel="Book Demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
