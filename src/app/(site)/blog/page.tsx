import type { Metadata } from "next";
import { Container } from "@/components/ui/Button";
import { PillBadge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ResourceHeroCard } from "@/components/marketing/ResourceHeroCard";
import { BlogBrowser } from "@/components/marketing/BlogBrowser";
import { NewsletterBand } from "@/components/sections/NewsletterBand";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights and practical guidance to help you verify smarter, reduce risk, and make confident decisions.",
};

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
              {/* The break is explicit: the design sets "Insights, Trends," and
                  "and Best Practices" on their own lines, which natural wrapping
                  at this column width does not reproduce. */}
              <h1 className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl">
                Insights, Trends,
                <br />
                and <span className="text-mint-200">Best Practices</span>
              </h1>
              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                Expert insights and practical guidance to help you verify smarter, reduce risk, and
                make confident decisions in a changing world.
              </p>
            </Reveal>

            {/*
              The product the writing is about, drawn in the platform's own
              vocabulary like every other hero on the site. The design also
              floats a photo of a building behind it; there is no such asset in
              the design package, so that layer is omitted rather than faked.
            */}
            <Reveal delay={0.12}>
              <div className="relative ml-auto w-full max-w-xl">
                <ResourceHeroCard
                  title="Verification Report"
                  badge="VE Score"
                  score={94}
                  caption="Low Risk"
                  checks={["Identity", "Employment", "Income", "References"]}
                  note="Reduce risk. Verify with confidence."
                />
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
