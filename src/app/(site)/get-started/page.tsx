import type { Metadata } from "next";
import {
  Rocket,
  ShieldCheck,
  BarChart3,
  Headset,
  TrendingUp,
  UserPlus,
  SlidersHorizontal,
  UploadCloud,
  LineChart,
} from "lucide-react";
import { SplitFormHero } from "@/components/sections/SplitFormHero";
import { CreateAccountForm } from "@/components/marketing/CreateAccountForm";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StepsRow } from "@/components/sections/StepsRow";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Create your Verify Engine account and start running AI-powered verifications in minutes — no setup fees, cancel anytime.",
};

const features = [
  {
    icon: Rocket,
    title: "Quick Setup",
    description: "Get up and running in minutes with our simple onboarding process.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description: "Enterprise-grade security with SOC 2 compliance and data encryption.",
  },
  {
    icon: BarChart3,
    title: "Powerful Platform",
    description: "Access all verification tools, reports, and analytics in one intuitive platform.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description: "Dedicated support team available to help you every step of the way.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Built to grow with your business from hundreds to millions of verifications.",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in minutes and tell us about your organization's verification needs.",
  },
  {
    icon: SlidersHorizontal,
    title: "Configure Workflows",
    description: "Set up your verification workflows and customize rules to match your policies.",
  },
  {
    icon: UploadCloud,
    title: "Start Verifying",
    description: "Invite applicants and start running AI-powered verifications instantly.",
  },
  {
    icon: LineChart,
    title: "Get Insights",
    description: "Access real-time reports and analytics to make confident decisions.",
  },
];

export default function GetStartedPage() {
  return (
    <>
      <SplitFormHero
        badge="Get Started"
        title={
          <>
            Get Started with <span className="text-mint-200">Verify Engine</span> Today
          </>
        }
        subtitle="Join thousands of organizations already using AI-powered verification to make smarter, faster, and more confident decisions."
        highlights={["No setup fees", "Cancel anytime", "Enterprise-grade security"]}
        helpCard={{
          title: "Need help getting started?",
          description: "Our team is here to help you find the right solution for your business.",
          ctaLabel: "Book a Demo",
          ctaHref: "/book-demo",
        }}
      >
        <CreateAccountForm />
      </SplitFormHero>

      <FeatureGrid
        eyebrow="Built for Modern Organizations"
        title="Everything You Need to Succeed"
        subtitle="Verify Engine provides all the tools, insights, and support you need to streamline verification and drive better outcomes across your organization."
        features={features}
        columns={5}
      />

      <StepsRow
        eyebrow="Get Started in 4 Simple Steps"
        title="Your Journey to Smarter Verification"
        steps={steps}
      />

      <FinalCta
        title="Ready to Transform Your Verification Process?"
        subtitle="Join thousands of organizations using Verify Engine to automate verification and make confident decisions."
        primaryLabel="See How It Works"
        primaryHref="/how-it-works"
        secondaryLabel="Book Demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
