import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowRight as ArrowIcon, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge, Eyebrow } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { LogosRow } from "@/components/sections/LogosRow";
import { AudienceDashboardCard } from "./AudienceDashboardCard";
import type { AudienceStat, BreakdownRow } from "./AudienceDashboardCard";

export type FlowStep = { icon: LucideIcon; title: string; description: string };
export type TrustStat = { icon: LucideIcon; value: string; label: string };

export type AudiencePageConfig = {
  breadcrumb: { label: string; href?: string }[];
  badge: string;
  title: ReactNode;
  subtitle: string;
  highlights: string[];
  dashboard: {
    title: string;
    /** Pass an empty string to hide the range selector. */
    rangeLabel?: string;
    scoreLabel: string;
    score: number;
    scoreCaption?: string;
    breakdown: BreakdownRow[];
    stats: AudienceStat[];
    insight: string;
    insightTitle?: string;
    insightTag?: string;
    statsLayout?: "row" | "column";
  };
  features: { eyebrow: string; title: string; items: Feature[] };
  flow: {
    eyebrow: string;
    title: string;
    panelTitle?: string;
    description: string;
    checklist: string[];
    ctaLabel: string;
    ctaHref: string;
    steps: FlowStep[];
    highlight?: number;
    /** Numbers sit under the icon, or are already part of the step title. */
    numbered?: boolean;
  };
  /** Closing band above the CTA — either trust stats or partner logos. */
  trust?: { eyebrow: string; stats: TrustStat[] };
  logos?: { label: string; items: string[] };
  cta: { title: string; description: string };
};

/**
 * Shared layout for the landlord audience sub-pages (independent landlords,
 * property managers, multifamily operators, and so on). Each page supplies
 * copy and data through a config object; structure and spacing stay identical.
 */
export function AudiencePage({ config }: { config: AudiencePageConfig }) {
  const { flow } = config;

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-navy-900 pt-6 pb-20 sm:pb-24">
        <div
          className="pointer-events-none absolute top-12 right-0 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Container>
          <div className="relative [&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb items={config.breadcrumb} />
          </div>

          <div className="relative mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
            <Reveal>
              <PillBadge>{config.badge}</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.12] font-bold tracking-tight text-white sm:text-5xl">
                {config.title}
              </h1>
              <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">{config.subtitle}</p>

              <ul className="mt-7 space-y-3">
                {config.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mint-200" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-demo" size="lg">
                  Book a Demo <ArrowRight />
                </Button>
                <Button href="/how-it-works" variant="outline-dark" size="lg">
                  <PlayIcon /> See How It Works
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <AudienceDashboardCard {...config.dashboard} />
            </Reveal>
          </div>
        </Container>
      </section>

      <FeatureGrid
        eyebrow={config.features.eyebrow}
        title={config.features.title}
        features={config.features.items}
        columns={config.features.items.length === 6 ? 6 : 5}
      />

      {/* how it works panel */}
      <section className="bg-bg-muted py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-14">
            <Reveal>
              <Eyebrow>{flow.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                {flow.title}
              </h2>
              <p className="mt-5 text-base text-slate-600">{flow.description}</p>
              <ul className="mt-6 space-y-3">
                {flow.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-ink-900"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-teal-500" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href={flow.ctaHref} variant="dark" size="lg" className="mt-8">
                {flow.ctaLabel} <ArrowRight />
              </Button>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
                {flow.panelTitle && (
                  <h3 className="text-lg font-bold text-ink-900">{flow.panelTitle}</h3>
                )}

                <RevealGroup className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {flow.steps.map((step, i) => {
                    const isHighlighted = i === flow.highlight;
                    return (
                      <RevealItem key={step.title} className="relative">
                        {i < flow.steps.length - 1 && (
                          <ArrowIcon
                            className="absolute top-12 -right-2.5 z-10 hidden size-4 text-slate-300 lg:block"
                            strokeWidth={2}
                          />
                        )}

                        <div
                          className={`flex h-full flex-col items-center rounded-xl px-3 py-5 text-center ${
                            isHighlighted ? "bg-bg-mint-50" : ""
                          }`}
                        >
                          <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-navy-900">
                            <step.icon className="size-6" strokeWidth={1.75} />
                          </span>

                          {flow.numbered !== false && (
                            <span className="mt-3 flex size-6 items-center justify-center rounded-full bg-teal-500 text-[11px] font-bold text-white">
                              {i + 1}
                            </span>
                          )}

                          <h4 className="mt-2.5 text-xs font-bold text-ink-900">{step.title}</h4>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                            {step.description}
                          </p>
                        </div>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* trust band */}
      {config.trust && (
        <section className="bg-white py-14">
          <Container>
            <Reveal className="text-center">
              <Eyebrow>{config.trust.eyebrow}</Eyebrow>
            </Reveal>
            <RevealGroup className="mt-8 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
              {config.trust.stats.map((stat, i) => (
                <RevealItem
                  key={stat.label}
                  className={`flex items-center justify-center gap-3.5 px-4 ${
                    i > 0 ? "lg:border-l lg:border-slate-200" : ""
                  }`}
                >
                  <stat.icon className="size-8 shrink-0 text-navy-900" strokeWidth={1.5} />
                  <div>
                    <p className="text-lg font-bold text-ink-900">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      {config.logos && (
        <LogosRow label={config.logos.label} logos={config.logos.items} background="white" />
      )}

      {/* closing CTA */}
      <section className="bg-white pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-bg-muted px-6 py-9 sm:px-10">
              <div
                className="pointer-events-none absolute top-5 right-8 bottom-5 hidden w-44 opacity-40 lg:block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-teal-500) 1.2px, transparent 1.2px)",
                  backgroundSize: "14px 14px",
                }}
              />
              <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
                <div className="flex items-center gap-5">
                  <span className="hidden size-16 shrink-0 items-center justify-center rounded-full bg-mint-100 text-navy-900 sm:flex">
                    <ShieldCheck className="size-7" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
                      {config.cta.title}
                    </h2>
                    <p className="mt-1.5 max-w-xl text-sm text-slate-600">
                      {config.cta.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap justify-center gap-3">
                  <Button href="/book-demo" variant="primary">
                    Book a Demo <ArrowRight />
                  </Button>
                  <Button href="/how-it-works" variant="outline-light">
                    <PlayIcon /> See How It Works
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
