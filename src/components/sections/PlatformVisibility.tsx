import { CheckCircle2 } from "lucide-react";
import { Button, ArrowRight, Container } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardMock, type DashboardVariant } from "./DashboardMock";

/**
 * Shared "copy on the left, wide product screenshot on the right" section.
 * The design gives the text about a quarter of the row and lets the dashboard
 * run wide to the right, so this row sets its own left padding (aligned with
 * the rest of the page) instead of sitting inside the capped Container.
 */
export function PlatformVisibility({
  eyebrow,
  title,
  subtitle,
  checklist,
  ctaLabel,
  ctaHref = "/get-started",
  variant = "verifications",
  background = "muted",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  checklist: string[];
  ctaLabel: string;
  ctaHref?: string;
  variant?: DashboardVariant;
  background?: "muted" | "white";
}) {
  return (
    <section
      className={`overflow-hidden py-20 sm:py-24 ${background === "muted" ? "bg-bg-muted" : "bg-white"}`}
    >
      {/*
        Wide, but still centred: the mockup used to bleed off the right edge,
        and it now sits inside the site's (wider) shared column with matching
        space on both sides — the treatment the client asked for on every
        section that is not a hero.
      */}
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.46fr_1fr] lg:gap-14">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base text-slate-600">{subtitle}</p>
          <ul className="mt-6 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink-900">
                <CheckCircle2 className="size-5 shrink-0 text-teal-500" strokeWidth={1.75} />
                {item}
              </li>
            ))}
          </ul>
          <Button href={ctaHref} variant="dark" size="lg" className="mt-8">
            {ctaLabel} <ArrowRight />
          </Button>
        </Reveal>

        <Reveal delay={0.12}>
          <DashboardMock variant={variant} />
        </Reveal>
      </Container>
    </section>
  );
}
