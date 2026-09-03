import type { ReactNode } from "react";
import { Container } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";

export type CompanySection = {
  heading: string;
  paragraphs: string[];
};

export type CompanyHighlight = {
  label: string;
  value: string;
};

/**
 * Shared layout for the company pages the footer links to — About, Careers,
 * Partners, Press and Contact.
 *
 * These sit outside the 30 approved screens: the design's footer links to them
 * but never draws them, so there is no reference to be pixel-perfect against.
 * They are built from the existing design system instead — the same navy hero,
 * dot field and closing CTA every other section page uses — so they read as
 * part of the site rather than as something bolted on. Each page supplies a
 * config object and no layout of its own.
 */
export function CompanyPage({
  badge,
  title,
  titleAccent,
  intro,
  highlights = [],
  sections,
  children,
  cta,
}: {
  badge: string;
  title: string;
  /** Trailing part of the heading, rendered in mint. */
  titleAccent?: string;
  intro: string;
  highlights?: CompanyHighlight[];
  sections: CompanySection[];
  /** Extra content rendered after the prose sections. */
  children?: ReactNode;
  cta?: { title: string; subtitle: string };
}) {
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
          <Reveal>
            <PillBadge>{badge}</PillBadge>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
              {title}
              {titleAccent && <span className="text-mint-200"> {titleAccent}</span>}
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg">{intro}</p>
          </Reveal>

          {highlights.length > 0 && (
            <RevealGroup className="mt-10 grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
              {highlights.map((item) => (
                <RevealItem key={item.label}>
                  <p className="text-3xl font-bold text-mint-200">{item.value}</p>
                  <p className="mt-1 text-base text-white/60">{item.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl space-y-10">
            {sections.map((section) => (
              <Reveal key={section.heading}>
                <h2 className="text-2xl font-bold text-ink-900">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {children}
        </Container>
      </section>

      <FinalCta
        title={cta?.title ?? "Ready to Modernize Your Verification Process?"}
        subtitle={cta?.subtitle ?? "Join the leading companies transforming verification with AI."}
      />
    </>
  );
}
