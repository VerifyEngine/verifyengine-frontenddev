import type { Metadata } from "next";
import { CheckCircle2, MessagesSquare, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { LogosRow } from "@/components/sections/LogosRow";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent per-verification pricing. Starter, Business, and Enterprise plans with no setup fees and no contracts.",
};

const reasons = [
  "AI + human verification for unmatched accuracy",
  "Reduce manual work and speed up decisions",
  "Enterprise-grade security and compliance",
  "Scalable platform that grows with you",
  "Dedicated support when you need it",
];

const pricingFaqs = [
  {
    question: "What's included in each plan?",
    answer:
      "Every plan includes the AI verification engine and all core verification types. Higher plans add advanced reporting, API access, SSO and role-based access, and faster support.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can move between plans at any time and the change applies from your next billing cycle — there are no contracts locking you in.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No. There are no setup fees on any plan, and you can cancel at any time.",
  },
  {
    question: "How does billing work?",
    answer:
      "You are billed per verification check that you run, so your cost tracks your actual usage rather than a fixed seat count.",
  },
  {
    question: "What happens if I exceed my verification limit?",
    answer:
      "Additional verifications are billed at the add-on rate for your plan. If you consistently exceed your limit, moving up a plan usually costs less.",
  },
];

const logos = ["RentPrep", "ProScreen", "appfolio", "RentCheck", "Certn", "snappt"];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute right-0 bottom-8 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Container>
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <PillBadge>Pricing</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Simple, Transparent Pricing Built for{" "}
                <span className="text-mint-200">Every Business</span>
              </h1>
              <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
                Choose the plan that fits your needs. All plans include our AI-powered verification
                platform, enterprise-grade security, and industry-leading support.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-demo" size="lg">
                  Book Demo <ArrowRight />
                </Button>
                <Button href="/how-it-works" variant="outline-dark" size="lg">
                  <PlayIcon /> See How It Works
                </Button>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
                <CheckCircle2 className="size-4 text-mint-200" strokeWidth={2} />
                No setup fees <span className="text-white/30">•</span> Cancel anytime
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                <ShieldCheck
                  className="pointer-events-none absolute -right-4 bottom-2 size-40 text-white/[0.04]"
                  strokeWidth={1}
                />
                <h2 className="relative text-lg font-bold text-white">
                  Why Organizations Choose Verify Engine
                </h2>
                <ul className="relative mt-5 space-y-3.5">
                  {reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3 text-sm text-white/85">
                      <CheckCircle2
                        className="mt-0.5 size-4.5 shrink-0 text-mint-200"
                        strokeWidth={2}
                      />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <PricingPlans />

      <LogosRow label="Trusted by innovative companies" logos={logos} />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="rounded-2xl border border-slate-200 p-7">
                <h2 className="text-lg font-bold text-teal-600">Frequently Asked Questions</h2>
                <div className="mt-2">
                  <Accordion items={pricingFaqs} icon="plus" defaultOpen={null} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-bg-muted p-7">
                <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                  <MessagesSquare className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">Have more questions?</h3>
                <p className="mt-1.5 text-sm text-slate-600">
                  Our team is here to help you find the perfect plan for your organization.
                </p>
                <div className="mt-5">
                  <Button href="/book-demo" variant="dark">
                    Book a Demo <ArrowRight />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta
        title="Ready to Streamline Your Verification Process?"
        subtitle="Join thousands of organizations using Verify Engine to verify faster, reduce risk, and make confident decisions."
        primaryLabel="See How It Works"
        primaryHref="/how-it-works"
        secondaryLabel="Book Demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
