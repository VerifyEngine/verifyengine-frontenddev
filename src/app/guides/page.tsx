import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { GuideBrowser } from "@/components/marketing/GuideBrowser";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Step-by-step resources, best practices, and how-to guides to help you streamline verification, reduce risk, and stay compliant.",
};

const heroChecks = [
  "Identity Verified",
  "Employment Verified",
  "Income Verified",
  "Background Check",
];

export default function GuidesPage() {
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
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
            <Reveal>
              <PillBadge>Guides</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Expert Guides. <span className="text-mint-200">Confident Decisions.</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                Step-by-step resources, best practices, and how-to guides to help you streamline
                verification, reduce risk, and stay compliant.
              </p>
            </Reveal>

            {/* Laptop-and-ebook collage from the design, drawn rather than photographed. */}
            <Reveal delay={0.12} className="hidden lg:block">
              <div className="relative ml-auto w-full max-w-lg">
                <div className="rounded-2xl bg-navy-800 p-5 shadow-2xl">
                  <p className="text-xs font-bold text-white">
                    VERIFY <span className="text-mint-200">ENGINE</span>
                  </p>
                  <p className="mt-4 text-xl font-bold text-white">
                    Verification
                    <br />
                    Best Practices
                  </p>
                  <p className="mt-1 text-xs text-white/50">A Complete Guide</p>

                  <div className="mt-5 grid grid-cols-[0.7fr_1fr] gap-4 rounded-xl bg-white p-4">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500">
                        VE Score<span className="align-super text-[7px]">™</span>
                      </p>
                      <ScoreGauge score={95} caption="Low Risk" />
                    </div>
                    <ul className="flex flex-col justify-center gap-2">
                      {heroChecks.map((check) => (
                        <li
                          key={check}
                          className="flex items-center gap-1.5 text-[11px] font-medium text-ink-900"
                        >
                          <CheckCircle2 className="size-3.5 shrink-0 text-teal-500" strokeWidth={2} />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 hidden w-44 rounded-lg border-l-4 border-mint-200 bg-navy-950 p-5 shadow-2xl xl:block">
                  <p className="text-sm leading-snug font-bold text-white">
                    The Ultimate Guide to Tenant Screening
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/50">
                    Best Practices for Property Managers
                  </p>
                  <ShieldCheck className="mt-5 size-10 text-mint-200/70" strokeWidth={1.25} />
                  <p className="mt-4 text-[10px] font-bold text-white">
                    VERIFY <span className="text-mint-200">ENGINE</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <GuideBrowser />

      <section className="bg-white pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-bg-mint-50 px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
              <div className="flex items-center gap-4">
                <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-white text-teal-600 sm:flex">
                  <ShieldCheck className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">
                    Need help implementing what you&apos;ve learned?
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Our team is here to help you get the most out of Verify Engine.
                  </p>
                </div>
              </div>
              <Button href="/book-demo" variant="dark" className="shrink-0">
                Book a Demo <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
