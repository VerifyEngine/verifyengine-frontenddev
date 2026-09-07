import type { Metadata } from "next";
import {
  BadgeCheck,
  Bot,
  ClipboardCheck,
  FileCheck2,
  PhoneOff,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PlatformVisual } from "@/components/marketing/PlatformVisual";
import { LogosRow } from "@/components/sections/LogosRow";
import { StepsRow, type Step } from "@/components/sections/StepsRow";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Verify Engine builds AI-powered verification for landlords, employers, and lenders — combining machine consistency with human review.",
};

/*
 * About Us.
 *
 * It sits outside the 30 approved screens — the design's footer links to it but
 * never draws it — so it is composed from the sections the rest of the site is
 * made of rather than invented: the navy hero with the product beside it, the
 * partner band, a step row, a card grid and the closing CTA. The copy is the
 * page's own, reorganised into those shapes: as one column of prose it was the
 * plainest page on a site that sells a product you can see.
 */

const stats = [
  { value: "24h", label: "Typical turnaround" },
  { value: "98%", label: "Contact rate" },
  { value: "50 states", label: "Coverage" },
  { value: "SOC 2", label: "Ready" },
];

/* The problem the company exists to solve, as the two ways of doing the work. */
const manual = [
  "A call goes to voicemail and the file waits days for a callback.",
  "Every agent asks slightly different questions, so files do not compare.",
  "What was said lives in someone's notes, if it was written down at all.",
];

const engine = [
  "Calls are placed and retried until a real person answers.",
  "The same structured interview runs on every applicant.",
  "The call, the answers and the reviewer's confirmation stay on the record.",
];

const steps: Step[] = [
  {
    icon: Bot,
    title: "AI places the call",
    description:
      "Voice agents dial the previous landlord or employer, follow the same interview every time, and retry until they reach someone.",
  },
  {
    icon: UserCheck,
    title: "A reviewer confirms it",
    description:
      "A trained specialist listens to the call, checks the extracted data against the file, and adds the context a model cannot infer.",
  },
  {
    icon: FileCheck2,
    title: "You get a defensible report",
    description:
      "The result arrives with the evidence behind it, so the decision holds up when someone asks what it was based on.",
  },
];

const principles: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Applicants are people",
    description:
      "We collect the minimum needed to answer the question asked, store only what we must, and are explicit about what happens to it.",
  },
  {
    icon: Scale,
    title: "Compliance shapes the build",
    description:
      "Our customers operate under FCRA and a patchwork of state rules. It is not a feature we added later; it is how the product is built.",
  },
  {
    icon: ClipboardCheck,
    title: "Automation is not autonomy",
    description:
      "Machine consistency plus human judgement is what makes a result defensible. Every report passes a reviewer before it is released.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div
          className="pointer-events-none absolute top-10 right-0 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Container>
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
            <Reveal>
              <PillBadge>About Us</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Verification built for{" "}
                <span className="text-mint-200">speed and defensibility</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">
                We combine AI voice agents with trained human review so landlords, employers, and
                lenders get answers in hours instead of weeks — without giving up the rigour a
                regulated decision demands.
              </p>
            </Reveal>

            {/* The product itself, the same screen the platform section shows. */}
            <Reveal delay={0.12}>
              <div className="ml-auto w-full max-w-xl">
                <PlatformVisual />
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid grid-cols-2 gap-6 sm:gap-10 lg:mt-16 lg:grid-cols-4">
            {stats.map((item) => (
              <RevealItem key={item.label}>
                <p className="text-3xl font-bold text-mint-200 sm:text-4xl">{item.value}</p>
                <p className="mt-1 text-base text-white/60">{item.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <LogosRow
        label="Trusted by innovative companies"
        logos={["RentPrep", "ProScreen", "appfolio", "RentCheck", "Certn", "snappt"]}
        background="white"
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                Why we exist
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Verification has always been slow for the same reason: it depends on reaching a
                person. A leasing agent calls a previous landlord, leaves a message, and waits for a
                callback that often never comes. Multiply that across every applicant and the cost
                shows up as vacant units, delayed hires, and decisions made on incomplete
                information.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Verify Engine was built to remove the waiting without removing the rigour. The data
                that comes back is comparable across every applicant, because every applicant was
                asked the same way.
              </p>
            </Reveal>

            {/* The two ways of doing the work, side by side — the argument the
                paragraphs make, in the form it is easiest to check. */}
            <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <RevealItem>
                <div className="h-full rounded-2xl border border-slate-200/70 bg-bg-muted p-6">
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-slate-400">
                    <PhoneOff className="size-5.5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-lg font-bold text-ink-900">Chasing it by hand</p>
                  <ul className="mt-4 space-y-3">
                    {manual.map((line) => (
                      <li key={line} className="text-base leading-relaxed text-slate-500">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="h-full rounded-2xl border border-mint-100 bg-bg-mint-50 p-6">
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-teal-600">
                    <BadgeCheck className="size-5.5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-lg font-bold text-ink-900">Running it on Verify Engine</p>
                  <ul className="mt-4 space-y-3">
                    {engine.map((line) => (
                      <li key={line} className="text-base leading-relaxed text-slate-600">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </Container>
      </section>

      <StepsRow
        eyebrow="How we work"
        title="Automation is not the same as autonomy"
        subtitle="Every verification runs the same way, and every report passes a person before it reaches you."
        steps={steps}
        background="muted"
      />

      <FeatureGrid
        eyebrow="What we care about"
        title="The rules we build against"
        features={principles}
        columns={3}
        variant="cards"
      />

      <FinalCta
        title="Want to see how it works?"
        subtitle="Book a walkthrough and we'll run a live verification with you."
      />
    </>
  );
}
