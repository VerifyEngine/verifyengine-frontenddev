import type { Metadata } from "next";
import { MessagesSquare } from "lucide-react";
import { Button, Container, ArrowRight, PlayIcon } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldOrbit } from "@/components/marketing/ShieldOrbit";
import { FaqBrowser } from "@/components/marketing/FaqBrowser";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the most common questions about Verify Engine — how verification works, accuracy, security, integrations, and pricing.",
};

export default function FaqPage() {
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
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <PillBadge>FAQ</PillBadge>
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Frequently Asked <span className="text-mint-200">Questions</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                Find answers to the most common questions about Verify Engine, our features, and
                how we help you verify with confidence.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="hidden lg:block">
              <ShieldOrbit />
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqBrowser />

      <section className="bg-bg-muted pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-navy-900 px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
              <div className="flex items-center gap-4">
                <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-mint-200 sm:flex">
                  <MessagesSquare className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Ready to verify with confidence?
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    See how Verify Engine can streamline your verification process and reduce risk.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <Button href="/book-demo" variant="primary">
                  Book a Demo <ArrowRight />
                </Button>
                <Button href="/how-it-works" variant="outline-dark">
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
