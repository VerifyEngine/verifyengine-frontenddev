import type { Metadata } from "next";
import { Cpu, ShieldCheck, Zap, UserCheck, BarChart3 } from "lucide-react";
import { HeroHowItWorks } from "@/components/marketing/HeroHowItWorks";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { PlatformVisibility } from "@/components/sections/PlatformVisibility";
import { AiCallDemo } from "@/components/marketing/AiCallDemo";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { IntegrationsRow } from "@/components/marketing/IntegrationsRow";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Verify Engine's AI voice agents, workflow automation, and human QA review combine to deliver accurate verification reports in minutes.",
};

const whyChooseFeatures = [
  {
    icon: Cpu,
    title: "AI-Powered Accuracy",
    description: "Advanced AI with human oversight ensures unmatched accuracy and fraud detection.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Bank-level security, encryption, and compliance built into every step.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Most verifications completed in minutes, not days, so you can lease faster.",
  },
  {
    icon: UserCheck,
    title: "Human + AI",
    description: "The perfect combination of AI efficiency and human expertise.",
  },
  {
    icon: BarChart3,
    title: "Scalable Platform",
    description: "Built to scale with your business from hundreds to millions of verifications.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <HeroHowItWorks />
      <ProcessSteps />
      <PlatformVisibility
        eyebrow="Real-Time Visibility"
        title="Track Every Verification in Real Time"
        subtitle="Monitor status, review AI conversations, and access verification reports instantly from your dashboard."
        checklist={[
          "Real-time status updates",
          "AI conversation transcripts",
          "Human QA notes & confidence scores",
          "Instant report download",
          "Complete audit trail",
        ]}
        ctaLabel="See Platform in Action"
        variant="verifications"
      />
      <AiCallDemo />
      <FeatureGrid
        eyebrow="Why Choose Verify Engine"
        title="Built for Accuracy, Speed, and Scale"
        features={whyChooseFeatures}
        columns={5}
      />
      <IntegrationsRow />
      <FinalCta
        title="Ready to Streamline Your Verification Process?"
        subtitle="Join thousands of industry leaders using Verify Engine to verify faster, reduce risk, and make confident decisions."
        primaryLabel="See How It Works"
        primaryHref="/how-it-works"
        secondaryLabel="Book Demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
