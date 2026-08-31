import type { ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Headset } from "lucide-react";
import { Container, ArrowRight } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Navy split hero used by every form page: marketing copy on the left, the
 * form card on the right. The form itself is passed in as children so each
 * page owns its own fields and submit behaviour.
 */
export function SplitFormHero({
  badge,
  title,
  subtitle,
  highlights = [],
  helpCard,
  children,
}: {
  badge: string;
  title: ReactNode;
  subtitle: string;
  highlights?: string[];
  helpCard?: { title: string; description: string; ctaLabel: string; ctaHref: string };
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-24">
      <div
        className="pointer-events-none absolute top-16 right-0 h-72 w-72 opacity-[0.13]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <Container>
        {/*
          The designs give the form card roughly 40% of the row, not half —
          a 50/50 split leaves it looking short and wide, especially on the
          login page where there are only two fields. The row is also held
          below the site's full width: unlike a hero with a product mockup,
          a form gains nothing from more width and only pushes the two
          columns apart.
        */}
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
          <Reveal className="lg:pt-6">
            <PillBadge>{badge}</PillBadge>
            <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">{subtitle}</p>

            {highlights.length > 0 && (
              <ul className="mt-7 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-white">
                    <CheckCircle2 className="size-5 shrink-0 text-mint-200" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {helpCard && (
              <div className="mt-9 flex max-w-md items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint-200/15 text-mint-200">
                  <Headset className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-base font-bold text-white">{helpCard.title}</p>
                  <p className="mt-1 text-sm text-white/60">{helpCard.description}</p>
                  <Link
                    href={helpCard.ctaHref}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-mint-200 transition-colors hover:text-mint-300"
                  >
                    {helpCard.ctaLabel} <ArrowRight />
                  </Link>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">{children}</div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
