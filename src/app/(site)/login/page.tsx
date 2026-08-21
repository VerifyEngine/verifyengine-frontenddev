import type { Metadata } from "next";
import { ShieldCheck, Zap, Gauge, Users, Headset } from "lucide-react";
import { SplitFormHero } from "@/components/sections/SplitFormHero";
import { LoginForm } from "@/components/marketing/LoginForm";
import { PlatformVisibility } from "@/components/sections/PlatformVisibility";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { SupportBanner } from "@/components/sections/SupportBanner";

export const metadata: Metadata = {
  title: "Client Login",
  description:
    "Sign in to Verify Engine to manage verifications, view reports, and access real-time insights.",
};

const features = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Bank-level encryption and SOC 2 compliance keep your data protected.",
  },
  {
    icon: Zap,
    title: "Real-Time Access",
    description: "Instant access to verification status, reports, and analytics.",
  },
  {
    icon: Gauge,
    title: "Operational Efficiency",
    description: "Automate manual tasks and streamline workflows to move faster.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Manage users, roles, and permissions to keep your team aligned.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description: "Our support team is available 24/7 to help you succeed.",
  },
];

export default function LoginPage() {
  return (
    <>
      <SplitFormHero
        badge="Client Login"
        title={
          <>
            Secure Access to Your <span className="text-mint-200">Verification Platform</span>
          </>
        }
        subtitle="Log in to Verify Engine to manage verifications, view reports, and access powerful insights — all in one secure platform."
        highlights={[
          "Enterprise-grade security",
          "Real-time verification insights",
          "24/7 access to your data",
        ]}
        helpCard={{
          title: "Need help logging in?",
          description: "Our support team is here to help.",
          ctaLabel: "Contact Support",
          ctaHref: "/contact",
        }}
      >
        <LoginForm />
      </SplitFormHero>

      <PlatformVisibility
        eyebrow="All Your Verifications"
        title="Everything You Need, All in One Place"
        subtitle="From applicant screening to final reports, manage your entire verification workflow with powerful tools and real-time insights."
        checklist={[
          "Track verification status",
          "Review and download reports",
          "Manage applicants and clients",
          "Monitor team activity",
          "Access analytics and trends",
        ]}
        ctaLabel="See Platform Overview"
        ctaHref="/how-it-works"
        variant="analytics"
        background="white"
      />

      <FeatureGrid
        eyebrow="Why Clients Love Verify Engine"
        title="Built for Security, Speed, and Simplicity"
        features={features}
        columns={5}
        background="muted"
      />

      {/* Visitors here are existing customers, so the design closes with help
          rather than the generic sales CTA. */}
      <SupportBanner
        title="Having Trouble Logging In?"
        description="We're here to help you get back on track."
        email="support@verifyengine.ai"
        phone="(888) 987-5324"
      />
    </>
  );
}
