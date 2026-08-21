import type { Metadata } from "next";
import { BookOpen, ShieldCheck } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { GlossaryBrowser } from "@/components/marketing/GlossaryBrowser";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Understand the key terms and concepts behind verification and how Verify Engine helps you make smarter, more confident decisions.",
};

export default function GlossaryPage() {
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
              <PillBadge>Glossary</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Clear Terms. <span className="text-mint-200">Confident Decisions.</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                Understand the key terms and concepts behind verification and how Verify Engine
                helps you make smarter, more confident decisions.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="hidden lg:block">
              <div className="ml-auto flex max-w-lg items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <BookOpen className="size-24 shrink-0 text-mint-200" strokeWidth={1} />
                <div>
                  <p className="text-lg font-bold text-white">Knowledge is Power</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Our glossary breaks down important verification terms in simple,
                    easy-to-understand language.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <GlossaryBrowser />

      <section className="bg-white pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-bg-mint-50 px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
              <div className="flex items-center gap-4">
                <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-white text-teal-600 sm:flex">
                  <ShieldCheck className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-ink-900">Still have questions?</h2>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Our team is here to help you understand how Verify Engine works.
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
