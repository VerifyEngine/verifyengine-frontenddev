import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { BlogBrowser } from "@/components/marketing/BlogBrowser";
import { NewsletterBand } from "@/components/sections/NewsletterBand";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights and practical guidance to help you verify smarter, reduce risk, and make confident decisions.",
};

const heroChecks = [
  "Identity Verified",
  "Employment Verified",
  "Income Verified",
  "Background Check",
  "References Verified",
];

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pt-14 sm:pt-20">
        <div
          className="pointer-events-none absolute top-10 right-0 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Container>
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
            <Reveal>
              <PillBadge>Blog</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Insights, Trends, and <span className="text-mint-200">Best Practices</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                Expert insights and practical guidance to help you verify smarter, reduce risk, and
                make confident decisions in a changing world.
              </p>
            </Reveal>

            {/* Layered sample-report visual, matching the design's hero collage. */}
            <Reveal delay={0.12} className="hidden lg:block">
              <div className="relative ml-auto w-full max-w-lg rounded-2xl bg-navy-800/60 p-6">
                <div className="grid grid-cols-[0.7fr_1fr] gap-5 rounded-xl bg-white p-5 shadow-2xl">
                  <div className="text-center">
                    <p className="text-[11px] text-slate-500">
                      VE Score<span className="align-super text-[8px]">™</span>
                    </p>
                    <ScoreGauge score={94} caption="Low Risk" />
                  </div>
                  <ul className="flex flex-col justify-center gap-2.5">
                    {heroChecks.map((check) => (
                      <li
                        key={check}
                        className="flex items-center gap-2 text-xs font-medium text-ink-900"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-teal-500" strokeWidth={2} />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-xl bg-navy-950 p-5 shadow-2xl xl:block">
                  <p className="text-sm leading-snug font-bold text-white">
                    Reduce Risk.
                    <br />
                    Verify with Confidence.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <BlogBrowser />

      <NewsletterBand />
    </>
  );
}
