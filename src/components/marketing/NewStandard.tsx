import Image from "next/image";
import { CheckCircle2, Gauge, ShieldCheck, Repeat2, Lock } from "lucide-react";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { AiCallCard } from "./AiCallCard";

const checklist = [
  "Eliminate manual phone calls",
  "Verify more applicants in less time",
  "Detect fraud and red flags early",
  "Get accurate, human-reviewed reports",
];

const stats = [
  { icon: Gauge, value: "85%", label: "Faster Turnaround" },
  { icon: ShieldCheck, value: "99.2%", label: "Accuracy, Human Reviewed" },
  { icon: Repeat2, value: "73%", label: "Reduction in Manual Work" },
  { icon: Lock, value: "Enterprise", label: "Grade Security" },
];

export function NewStandard() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>The New Standard</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              The New Standard for Landlord Verification
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Manual landlord verification is slow, inconsistent, and easy to manipulate. Verify
              Engine automates the entire process with AI while maintaining human accuracy—so you
              can screen with confidence and lease faster.
            </p>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base font-medium text-ink-900">
                  <CheckCircle2 className="size-5 shrink-0 text-teal-500" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/industries/landlord-verification" variant="dark" size="lg" className="mt-8">
              Explore Landlord Verification <ArrowRight />
            </Button>
          </Reveal>

          {/*
            The design builds this column as one composition: the agent photo
            fills the frame, the live-call card overlaps its left edge, and the
            result pills stack down the right edge on top of the photo.
          */}
          <Reveal delay={0.12} className="relative">
            <div className="relative ml-auto aspect-4/3 w-full overflow-hidden rounded-2xl bg-navy-800 lg:w-[88%]">
              <Image
                src="/images/verification-specialist.png"
                alt="Verification specialist on a headset reviewing an AI-assisted rental history call"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
                priority={false}
              />
            </div>

            <div className="relative z-10 -mt-24 w-[78%] sm:-mt-28 sm:w-[62%] lg:-ml-6">
              <AiCallCard />
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-52 flex-col justify-center gap-3 pr-3 sm:flex lg:w-56 lg:pr-0">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-card"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mint-100 text-teal-600">
                    <s.icon className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-base font-bold text-ink-900">{s.value}</p>
                    <p className="text-base text-slate-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stacked fallback for narrow screens, where the overlay pills are hidden. */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:hidden">
              {stats.map((s) => (
                <div key={s.label} className="flex items-start gap-3 rounded-xl bg-bg-muted p-4">
                  <s.icon className="size-5 shrink-0 text-teal-600" strokeWidth={1.75} />
                  <div>
                    <p className="text-base font-bold text-ink-900">{s.value}</p>
                    <p className="text-base text-slate-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
