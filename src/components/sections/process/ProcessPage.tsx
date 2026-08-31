import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowRight as ArrowIcon, ShieldCheck } from "lucide-react";
import { Button, Container, FullBleedContainer, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  VerificationSummaryCard,
  type SummaryCheck,
  type SummaryStep,
} from "./VerificationSummaryCard";
import { ExampleCall, type CallLine } from "./ExampleCall";

export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProcessPageConfig = {
  breadcrumb: { label: string; href?: string }[];
  badge: string;
  title: ReactNode;
  subtitle: string;
  summary: {
    steps: SummaryStep[];
    checks: SummaryCheck[];
    score?: number;
    riskLabel?: string;
    resultLabel?: string;
  };
  workflow: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    /** Index of the step the design highlights. */
    highlight?: number;
  };
  behindTheScenes: { icon: LucideIcon; title: string; description: string }[];
  call: {
    description: string;
    duration?: string;
    respondentLabel: string;
    agentLines: CallLine[];
    respondentLines: CallLine[];
  };
  cta: { title: string; description: string };
};

const stepColumns: Record<number, string> = {
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Shared layout for the six verification-process pages. Each page supplies its
 * own copy and workflow through a config object; the structure, interactions
 * and spacing stay identical across all of them.
 */
export function ProcessPage({ config }: { config: ProcessPageConfig }) {
  const { workflow } = config;

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
        <FullBleedContainer>
          <div className="relative [&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb items={config.breadcrumb} />
          </div>

          <div className="relative mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
            <Reveal>
              <PillBadge>{config.badge}</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                {config.title}
              </h1>
              <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">{config.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/book-demo" size="lg">
                  Book a Demo <ArrowRight />
                </Button>
                <Button href="#example-call" variant="outline-dark" size="lg">
                  <PlayIcon /> Watch Overview
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <VerificationSummaryCard {...config.summary} />
            </Reveal>
          </div>
        </FullBleedContainer>
      </section>

      {/* workflow steps */}
      <section className="bg-bg-muted py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
              {workflow.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              {workflow.title}
            </h2>
            <p className="mt-4 text-base text-slate-600">{workflow.subtitle}</p>
          </Reveal>

          <RevealGroup
            className={`mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
              stepColumns[workflow.steps.length] ?? "lg:grid-cols-5"
            }`}
          >
            {workflow.steps.map((step, i) => {
              const isHighlighted = i === workflow.highlight;
              return (
                <RevealItem key={step.title} className="relative">
                  {/* Arrow to the next card, desktop only. */}
                  {i < workflow.steps.length - 1 && (
                    <ArrowIcon
                      className="absolute top-1/2 -right-3 z-10 hidden size-4 -translate-y-1/2 text-slate-300 lg:block"
                      strokeWidth={2}
                    />
                  )}

                  <div
                    className={`flex h-full flex-col items-center rounded-2xl px-4 pt-8 pb-6 text-center transition-colors ${
                      isHighlighted
                        ? "border border-teal-500/30 bg-bg-mint-50"
                        : "border border-slate-100 bg-white"
                    }`}
                  >
                    <span className="absolute -top-3.5 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                      {i + 1}
                    </span>

                    <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-navy-900">
                      <step.icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 text-sm font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* behind the scenes */}
          <Reveal delay={0.1} className="mt-6">
            <div className="rounded-2xl bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-center text-xl font-bold text-ink-900 sm:text-2xl">
                What Happens Behind the Scenes
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {config.behindTheScenes.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex flex-col items-center px-5 text-center ${
                      i > 0 ? "lg:border-l lg:border-slate-100" : ""
                    }`}
                  >
                    <span className="flex size-14 items-center justify-center rounded-full bg-mint-100 text-navy-900">
                      <item.icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 text-sm font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div id="example-call" className="scroll-mt-24" />
      <ExampleCall {...config.call} />

      {/* closing banner */}
      <section className="bg-bg-muted pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="relative flex flex-col items-center gap-7 overflow-hidden rounded-2xl bg-navy-900 px-7 py-9 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="flex items-center gap-5">
                <span className="hidden size-20 shrink-0 items-center justify-center rounded-full bg-mint-200/10 text-mint-200 sm:flex">
                  <ShieldCheck className="size-9" strokeWidth={1.5} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">{config.cta.title}</h2>
                  <p className="mt-1.5 text-sm text-white/60">{config.cta.description}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <Button href="/book-demo" variant="primary">
                  Book a Demo <ArrowRight />
                </Button>
                <Button href="/how-it-works" variant="outline-dark">
                  <PlayIcon /> See How It Works
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
