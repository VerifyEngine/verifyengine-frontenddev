import type { Metadata } from "next";
import { Cpu, ShieldCheck, Timer, Lock, Blocks } from "lucide-react";
import { Button, ArrowRight, PlayIcon, HeroRow } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMock } from "@/components/sections/DashboardMock";
import { IndustriesWeServe } from "@/components/marketing/IndustriesWeServe";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI-powered verification solutions for landlords, employers, financial services, healthcare, and education.",
};

const features = [
  {
    icon: Cpu,
    title: "AI-Powered Accuracy",
    description:
      "Our AI agents and human review work together to deliver unmatched verification accuracy.",
  },
  {
    icon: ShieldCheck,
    title: "Industry Compliant",
    description: "Built to meet industry regulations and data security standards you can trust.",
  },
  {
    icon: Timer,
    title: "Fast Turnaround",
    description: "Automate verification and reduce manual workloads with intelligent workflows.",
  },
  {
    icon: Lock,
    title: "Enterprise Secure",
    description: "Bank-level security and encryption to protect sensitive data at every step.",
  },
  {
    icon: Blocks,
    title: "Easy Integration",
    description:
      "Seamlessly integrate with your existing systems via API, webhooks, or our platform.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute top-10 right-0 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <HeroRow className="gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
          <Reveal>
            <PillBadge>Industries</PillBadge>
            <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
              Verification Solutions Built for{" "}
              <span className="text-mint-200">Every Industry</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
              Verify Engine provides AI-powered verification solutions that help organizations
              across industries make faster, smarter, and more confident decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-demo" size="lg">
                Book Demo <ArrowRight />
              </Button>
              <Button href="/how-it-works" variant="outline-dark" size="lg">
                <PlayIcon /> See How It Works
              </Button>
            </div>
          </Reveal>

          {/* Full screen width on phones, page padding from sm up. */}
          <Reveal delay={0.12} className="-mx-6 sm:mx-0">
            <DashboardMock variant="industries" />
          </Reveal>
        </HeroRow>
      </section>

      <IndustriesWeServe
        title="One Platform. Multiple Industries."
        subtitle="Our intelligent verification platform adapts to your industry-specific needs with configurable workflows, custom rules, and enterprise-grade security."
        layout="row"
        background="white"
      />

      <FeatureGrid
        eyebrow="Why Businesses Choose Verify Engine"
        title="Trusted by Organizations That Need Accuracy"
        features={features}
        columns={5}
        background="muted"
        iconStyle="plain"
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
