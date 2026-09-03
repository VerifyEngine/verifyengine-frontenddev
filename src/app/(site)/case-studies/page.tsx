import type { Metadata } from "next";
import { Building2, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { Button, Container, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Navigation";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyBrowser } from "@/components/marketing/CaseStudyBrowser";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how organizations across industries use Verify Engine to improve accuracy, reduce risk, save time, and deliver better experiences.",
};

const stats = [
  { icon: Building2, value: "2,500+", label: "Organizations Trust Verify Engine" },
  { icon: ShieldCheck, value: "99.4%", label: "Average Verification Accuracy" },
  { icon: Clock, value: "78%", label: "Average Time Savings" },
  { icon: TrendingUp, value: "45%", label: "Reduction in Fraud Risk" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pt-6 pb-16 sm:pb-20">
        <div
          className="pointer-events-none absolute top-16 right-0 h-72 w-72 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-mint-200) 1.5px, transparent 1.5px)",
            backgroundSize: "18px 18px",
          }}
        />
        <Container>
          <div className="relative [&_a]:text-white/50 [&_a:hover]:text-mint-200 [&_span[aria-current]]:text-white">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Resources", href: "/blog" },
                { label: "Case Studies" },
              ]}
            />
          </div>

          <div className="relative mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1fr]">
            <Reveal>
              <PillBadge>Case Studies</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Real Results. <span className="text-mint-200">Proven Impact.</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                See how organizations across industries use Verify Engine to improve accuracy,
                reduce risk, save time, and deliver better experiences.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-4 py-3 text-center ${
                      i > 0 ? "sm:border-l sm:border-white/10" : ""
                    }`}
                  >
                    <stat.icon
                      className="mx-auto size-7 text-mint-200"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <dd className="mt-3 text-2xl font-bold text-white">{stat.value}</dd>
                    <dt className="mt-1 text-base leading-tight text-white/60">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <CaseStudyBrowser />

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
                    Your success story could be next.
                  </h2>
                  <p className="mt-1.5 max-w-lg text-base text-slate-600">
                    Join thousands of organizations already achieving greater accuracy, efficiency,
                    and peace of mind with Verify Engine.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <Button href="/book-demo" variant="primary">
                  Book a Demo <ArrowRight />
                </Button>
                <Button href="/how-it-works" variant="outline-light">
                  <PlayIcon /> See How It Works
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
