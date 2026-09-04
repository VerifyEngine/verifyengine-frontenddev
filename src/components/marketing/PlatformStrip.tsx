import Link from "next/link";
import { Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { PlatformShowcase } from "@/components/marketing/PlatformShowcase";
import { platformBadges } from "@/lib/platform-features";

/*
 * The Verify Engine platform overview.
 *
 * Desktop composes three feature cards, the product visualisation and three
 * more feature cards across one row; the middle column is deliberately the
 * widest, because the product — not the cards — is what this section is
 * selling. PlatformShowcase owns that grid and the link between a card and the
 * part of the dashboard that capability produces.
 *
 * Below `lg` the same markup reflows: the visualisation comes first (it stays
 * near the top on every screen), then the six cards, two per row on a tablet
 * and one per row on a phone.
 */

export function PlatformStrip() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>The Verify Engine Platform</Eyebrow>
          <h2 className="font-display mt-3 text-3xl leading-[1.08] font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl 2xl:text-6xl">
            One Platform. Multiple Verification Workflows.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Everything you need to verify with confidence — from automation to final report.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <PlatformShowcase />
        </div>

        <PlatformBadges />

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 rounded text-base font-semibold text-teal-600 transition-colors hover:text-teal-600/80 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            See All Platform Features <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/**
 * Supporting capabilities that sit under the product visualisation.
 *
 * Given its own reveal, and a delay, so it lands after the platform visual and
 * the feature cards — the spec asks for the badges to appear last.
 */
function PlatformBadges() {
  return (
    <Reveal delay={0.45} className="mt-8">
      {/* Sized to be read at arm's length like the rest of the section: a
          16px label and a 22px mark, not the small print the row started as. */}
      <ul className="flex flex-wrap justify-center gap-2.5">
        {platformBadges.map((badge) => (
          <li
            key={badge.label}
            className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 text-base font-semibold text-ink-900 shadow-sm"
          >
            <badge.icon className="size-5.5 shrink-0 text-teal-600" strokeWidth={1.75} />
            {badge.label}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
