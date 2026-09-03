import { Send, Building2, ShieldCheck, CheckCircle2, Tag, FileText, Zap, Blocks, Headset } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { CalloutTag } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const plans = [
  {
    icon: Send,
    name: "Starter",
    volume: "Less than 100 verification checks per month",
    price: "$15.99",
    priceNote: "per verification",
    tagline: "Perfect for small teams getting started.",
    features: [
      "Up to 100 verification checks / month",
      "All Core Verifications",
      "AI Verification Engine",
      "Secure Data Handling",
      "Email Support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/get-started",
    featured: false,
  },
  {
    icon: Building2,
    name: "Business",
    volume: "200 verification checks per month or less",
    price: "$13.99",
    priceNote: "per verification",
    tagline: "Built for scaling organizations that need more power.",
    features: [
      "Up to 200 verification checks / month",
      "All Core Verifications",
      "AI Verification Engine",
      "Advanced Reporting & Analytics",
      "API Access",
      "SSO & Role-Based Access",
      "Priority Support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/get-started",
    featured: true,
  },
  {
    icon: ShieldCheck,
    name: "Enterprise",
    volume: "",
    price: "Custom",
    priceNote: "pricing",
    tagline: "For large organizations with custom requirements.",
    features: [
      "Unlimited verification checks",
      "All Core Verifications",
      "AI Verification Engine",
      "Custom Reporting & Dashboards",
      "API Access",
      "SSO & Role-Based Access",
      "Dedicated Account Manager",
      "SLA & Uptime Guarantee",
    ],
    ctaLabel: "Contact Sales",
    ctaHref: "/book-demo",
    featured: false,
  },
];

const addOns = [
  { icon: FileText, name: "Additional Verifications", price: "$15.99 / per verification" },
  { icon: Zap, name: "Instant Report Delivery", price: "$9.99 / month" },
  { icon: Blocks, name: "Premium Integrations", price: "$19.99 / month" },
  { icon: Headset, name: "Dedicated Support", price: "$99.99 / month" },
];

const enterprisePoints = [
  "Custom workflows & integrations",
  "On-premise or private cloud options",
  "Dedicated implementation & training",
];

export function PricingPlans() {
  return (
    <section className="bg-bg-muted py-20 sm:py-24">
      <Container>
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-2 text-2xl font-bold text-ink-900 sm:text-3xl">
            <Tag className="size-6 text-teal-600" strokeWidth={1.75} />
            All plans are <span className="text-teal-600">per verification check</span>
          </p>
          <p className="mt-3 text-base text-slate-600">
            Pay only for the verifications you run. No contracts. No hidden fees.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <RevealItem key={plan.name}>
              <div
                className={`relative flex h-full flex-col rounded-2xl bg-white p-7 ${
                  plan.featured
                    ? "border-2 border-teal-500 shadow-xl lg:-mt-4 lg:pt-11"
                    : "border border-slate-200"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <CalloutTag>Most Popular</CalloutTag>
                  </span>
                )}

                <div className="flex flex-col items-center text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                    <plan.icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold tracking-[0.1em] text-ink-900 uppercase">
                    {plan.name}
                  </h3>
                  {plan.volume && (
                    <p className="mt-2 max-w-[16rem] text-base text-slate-500">{plan.volume}</p>
                  )}
                  <p className="mt-5 text-4xl font-bold text-ink-900">{plan.price}</p>
                  <p className="mt-1 text-base text-slate-500">{plan.priceNote}</p>
                </div>

                <p className="mt-6 border-t border-slate-100 pt-5 text-center text-base text-slate-600">
                  {plan.tagline}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-base text-slate-600">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-teal-500"
                        strokeWidth={2}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Button
                    href={plan.ctaHref}
                    variant={plan.featured ? "dark" : "outline-light"}
                    className="w-full"
                  >
                    {plan.ctaLabel}
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* add-ons */}
        <Reveal className="mt-14">
          <p className="text-sm font-bold tracking-[0.1em] text-teal-600 uppercase">Add-ons</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addOn) => (
              <div
                key={addOn.name}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint-100 text-teal-600">
                  <addOn.icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink-900">{addOn.name}</p>
                  <p className="mt-0.5 text-base text-slate-500">{addOn.price}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* enterprise banner */}
        <Reveal delay={0.1} className="mt-8">
          <div className="grid grid-cols-1 items-center gap-6 rounded-2xl bg-white p-7 lg:grid-cols-[1.3fr_1fr_auto]">
            <div className="flex items-start gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                <ShieldCheck className="size-6" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink-900">Enterprise-Grade Solutions</h3>
                <p className="mt-1.5 text-base text-slate-600">
                  Need a custom solution? Our enterprise plan is designed to your unique workflow,
                  compliance, and security needs.
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {enterprisePoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-base text-slate-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>

            <Button href="/book-demo" variant="dark" className="shrink-0">
              Contact Sales Team <ArrowRight />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
