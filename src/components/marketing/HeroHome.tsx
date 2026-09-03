import { Star, Mic, UserCheck, ShieldAlert, Building2, ShieldCheck, Zap } from "lucide-react";
import { Button, ArrowRight, PlayIcon, HeroRow, FullBleedContainer } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { WorkflowShowcase } from "./WorkflowShowcase";

/*
 * These used to sit in a white band under the hero, above the partner logos,
 * under their own "Trusted Verification Technology" heading. Two stacked,
 * centred rows both headed "Trusted ..." read as one section repeating
 * itself, and the badges say back what the hero paragraph has just said — AI
 * voice agents, fraud detection, human-reviewed accuracy. As a hairline strip
 * closing the hero they read as part of it, and the white band below is left
 * to do the one thing the hero does not: name the companies.
 */
const badges = [
  { icon: Mic, label: "AI Voice Agents" },
  { icon: UserCheck, label: "Human Reviewed" },
  { icon: ShieldAlert, label: "Fraud Detection" },
  { icon: Building2, label: "Enterprise Ready" },
  { icon: ShieldCheck, label: "SOC 2 Ready" },
  { icon: Zap, label: "Fast Turnaround" },
];

export function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-14 pb-12 sm:pt-20 sm:pb-14">
      <div
        className="pointer-events-none absolute top-10 right-0 h-64 w-64 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/*
        The hero runs the full width of the viewport with matching space on
        both sides — see <HeroRow>. It used to align its left column to the
        centred container and let the mockup bleed off the right edge; the
        balanced full-bleed row gives the mockup far more room without cropping
        it, which is what the client asked for.
      */}
      <HeroRow className="gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
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
              <p className="mt-1 text-base text-white/60">
                Trusted by leading tenant screening companies and property managers
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <WorkflowShowcase />
        </Reveal>
      </HeroRow>

      <FullBleedContainer>
        <Reveal delay={0.25}>
          {/* Six labels of different lengths wrap into a ragged block on a
              phone, so there they sit in two even columns instead. */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-8 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 lg:justify-between">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2.5 text-base font-medium text-white/70"
              >
                <b.icon className="size-6 text-mint-200" strokeWidth={1.75} />
                {b.label}
              </div>
            ))}
          </div>
        </Reveal>
      </FullBleedContainer>
    </section>
  );
}
