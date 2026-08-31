import { CheckCircle2, Briefcase, Wallet, Home, Fingerprint, ShieldCheck } from "lucide-react";
import { Button, ArrowRight, PlayIcon, HeroRow } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ApplicantOverviewCard } from "./ApplicantOverviewCard";

const highlights = [
  "Verify applicants faster",
  "Reduce costly fraud",
  "Drive better tenant outcomes",
];

const verificationChecks = [
  { icon: Briefcase, label: "Employment", value: "Verified" },
  { icon: Wallet, label: "Income", value: "Verified" },
  { icon: Home, label: "Rental History", value: "Verified" },
  { icon: Fingerprint, label: "Identity", value: "Verified" },
  { icon: ShieldCheck, label: "Fraud Check", value: "Clear" },
];

export function HeroLandlord() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute top-8 right-0 h-72 w-72 opacity-[0.13]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Full-bleed row with matching space on both sides — see <HeroRow>. */}
      <HeroRow className="gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
        <Reveal>
          <PillBadge>Landlord Verification</PillBadge>
          <h1 className="mt-5 text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl">
            Smarter Tenant Screening Starts with{" "}
            <span className="text-mint-200">Verified Data</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
            Verify Engine helps landlords and property managers reduce risk, eliminate fraud, and
            make confident leasing decisions with AI-powered verification.
          </p>

          <ul className="mt-7 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-base font-medium text-white">
                <CheckCircle2 className="size-5 shrink-0 text-mint-200" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/book-demo" size="lg">
              Book Demo <ArrowRight />
            </Button>
            <Button href="/how-it-works" variant="outline-dark" size="lg">
              <PlayIcon /> See How It Works
            </Button>
          </div>
        </Reveal>

        {/* Full screen width on phones, page padding from sm up. */}
        <Reveal delay={0.12} className="-mx-6 sm:mx-0">
          <ApplicantOverviewCard details={verificationChecks} />
        </Reveal>
      </HeroRow>
    </section>
  );
}
