import { Star } from "lucide-react";
import { Button, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { WorkflowShowcase } from "./WorkflowShowcase";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute top-10 right-0 h-64 w-64 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/*
        The left column stays aligned with the rest of the page's centered
        1600px container. The right column intentionally ignores that cap and
        bleeds all the way to the true viewport edge for a "spilling off
        screen" effect — a fixed max-w container can't do this, so this row
        isn't built on the shared <Container>.
      */}
      <div
        className="relative grid grid-cols-1 items-center gap-14 pr-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:pr-0"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 1600px) / 2 + 3rem))" }}
      >
        <Reveal>
          <PillBadge>AI-Powered Landlord Verification</PillBadge>
          <h1 className="mt-5 text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl">
            AI-Powered Landlord Verification for{" "}
            <span className="text-mint-200">Faster, Smarter</span> Tenant Screening
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/65 sm:text-lg">
            Automate rental history verification with AI voice agents, intelligent workflow
            automation, fraud detection, and human-reviewed accuracy—helping tenant screening
            companies, property managers, and landlords eliminate manual verification while
            making faster leasing decisions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/book-demo" size="lg">
              Book Demo <ArrowRight />
            </Button>
            <Button href="/how-it-works" variant="outline-dark" size="lg">
              <PlayIcon /> Try Live AI Demo
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-9 rounded-full border-2 border-navy-900 bg-gradient-to-br from-teal-400 to-navy-700"
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-mint-200">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-0.5 text-xs text-white/50">
                Trusted by leading tenant screening companies and property managers
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <WorkflowShowcase />
        </Reveal>
      </div>
    </section>
  );
}
