import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import {
  ApplicantOverviewCard,
  type DetailRow,
} from "@/components/marketing/ApplicantOverviewCard";
import { FeatureGrid, type Feature } from "@/components/sections/FeatureGrid";
import { PlatformVisibility } from "@/components/sections/PlatformVisibility";
import { AudienceCards, type Audience } from "@/components/sections/AudienceCards";
import { LogosRow } from "@/components/sections/LogosRow";
import { FinalCta } from "@/components/sections/FinalCta";

export type ProductPageConfig = {
  badge: string;
  title: ReactNode;
  subtitle: string;
  highlights: string[];
  /** Where the hero's secondary CTA points, usually the matching process page. */
  processHref: string;
  card: {
    title?: string;
    score: number;
    detailsTitle: string;
    details: DetailRow[];
    summary: string;
    completedIn?: string;
  };
  features: { eyebrow: string; title: string; items: Feature[] };
  platform: { eyebrow: string; title: string; subtitle: string; checklist: string[] };
  logos: { label: string; items: string[] };
  audiences: { eyebrow: string; title: string; items: Audience[]; columns?: 5 | 6 };
  cta: { title: string; subtitle: string };
};

/**
 * Shared layout for the verification product pages (employment, financial
 * services, healthcare, education). Each page supplies only its own copy and
 * sample report through a config object.
 */
export function ProductPage({ config }: { config: ProductPageConfig }) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute top-8 right-0 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div
          className="relative grid grid-cols-1 items-center gap-12 pr-6 lg:grid-cols-[0.8fr_1fr] lg:gap-14 lg:pr-12"
          style={{ paddingLeft: "max(1.5rem, calc((100vw - 1600px) / 2 + 3rem))" }}
        >
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
                Book Demo <ArrowRight />
              </Button>
              <Button href={config.processHref} variant="outline-dark" size="lg">
                <PlayIcon /> See How It Works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ApplicantOverviewCard
              title={config.card.title ?? "Verification Example"}
              score={config.card.score}
              detailsTitle={config.card.detailsTitle}
              details={config.card.details}
              summary={config.card.summary}
              completedIn={config.card.completedIn}
            />
          </Reveal>
        </div>
      </section>

      <FeatureGrid
        eyebrow={config.features.eyebrow}
        title={config.features.title}
        features={config.features.items}
        columns={5}
      />

      <PlatformVisibility
        eyebrow={config.platform.eyebrow}
        title={config.platform.title}
        subtitle={config.platform.subtitle}
        checklist={config.platform.checklist}
        ctaLabel="See Platform Overview"
        variant="analytics"
      />

      <LogosRow label={config.logos.label} logos={config.logos.items} background="white" />

      <AudienceCards
        eyebrow={config.audiences.eyebrow}
        title={config.audiences.title}
        audiences={config.audiences.items}
        columns={config.audiences.columns ?? 5}
        background="muted"
      />

      <FinalCta
        title={config.cta.title}
        subtitle={config.cta.subtitle}
        primaryLabel="See How It Works"
        primaryHref={config.processHref}
        secondaryLabel="Book Demo"
        secondaryHref="/book-demo"
      />
    </>
  );
}
