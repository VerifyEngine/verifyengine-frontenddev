import {
  IconChartBar,
  IconCheck,
  IconFileAnalytics,
  IconHome,
  IconSettings,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button, Container, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  MockBadge,
  MockCheck,
  MockPanel,
  MockRail,
  MockShell,
  MockTile,
  MockTopBar,
} from "@/components/marketing/PlatformMock";
import { platformChecks } from "@/lib/platform-features";

/*
 * The homepage conversion section.
 *
 * A substantial dark navy block rather than the thin banner the rest of the
 * site uses (that one is <FinalCta>, still in place on every other page): copy
 * and both calls to action on the left, a product visualisation on the right.
 *
 * "Get Started" is deliberately not the primary action here. Booking a demo is
 * the real entry point today, and promoting a self-service signup that does
 * not exist yet would send visitors to a dead end.
 */

const trustPoints = ["Faster verification", "Human QA", "Enterprise-ready"];

export function HomeCta() {
  return (
    <section className="bg-bg-muted pb-20 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <BackgroundTexture />

            <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="text-base font-semibold tracking-wide text-mint-200 uppercase">
                  Ready to Get Started?
                </p>
                <h2 className="font-display mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Modernize Your Verification Process With Verify Engine.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                  See how Verify Engine can help your team automate verification, reduce manual
                  work, and make faster, more confident decisions.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Button href="/book-demo" size="lg">
                    Book a Demo <ArrowRight />
                  </Button>
                  {/* A link rather than a <Button>: the secondary action is
                      text-only here, and the button sizes carry padding this
                      one must not have. */}
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 rounded text-base font-semibold text-mint-200 transition-colors hover:text-mint-100 focus-visible:ring-2 focus-visible:ring-mint-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 focus-visible:outline-none"
                  >
                    Explore the Platform <ArrowRight />
                  </Link>
                </div>

                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-mint-200/50 text-mint-200">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-base font-medium text-white/85">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <CtaVisual />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** A very quiet dot field on the right half — texture, not decoration. */
function BackgroundTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.14] lg:block"
      style={{
        backgroundImage: "radial-gradient(circle, #8fe9d9 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(120% 90% at 80% 50%, #000 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(120% 90% at 80% 50%, #000 30%, transparent 75%)",
      }}
    />
  );
}

const railIcons = [IconHome, IconUser, IconShieldCheck, IconFileAnalytics, IconChartBar, IconSettings];

/*
 * The product visualisation.
 *
 * The same platform surface the rest of the site's mockups are built from — app
 * canvas, glass panels, Satoshi, Tabler icons — so the closing section shows
 * the real product rather than a generic card. It sits on navy here, which is
 * exactly how a light app window reads as a screenshot.
 */
function CtaVisual() {
  return (
    <div className="relative">
      <MockShell nativeWidth={520} nativeHeight={330} maxZoom={1.4}>
        <MockTopBar
          right={
            <span className="flex items-center gap-1.5">
              <span className="hidden text-body-2xs text-app-text-tertiary sm:inline">
                Reports Today
              </span>
              <MockBadge tone="brand">248</MockBadge>
            </span>
          }
        />

        <div className="flex gap-2">
          <MockRail icons={railIcons} />

          <div className="flex min-w-px flex-1 flex-col gap-2 sm:flex-row">
            <MockPanel title="Verification Complete" className="min-w-px flex-[1.35]">
              <ul className="flex flex-1 flex-col justify-center gap-2">
                {platformChecks.map((check) => (
                  <MockCheck key={check.label} label={check.label} />
                ))}
              </ul>
            </MockPanel>

            <MockPanel title="Report" className="min-w-px flex-1">
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <span className="flex size-11 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse">
                  <IconCheck size={24} stroke={3} aria-hidden />
                </span>
                <span className="text-label-2xs text-app-success">APPROVED</span>
              </div>
              <MockTile className="mt-auto text-center">
                <span className="text-body-2xs text-app-text">View Report</span>
              </MockTile>
            </MockPanel>
          </div>
        </div>
      </MockShell>

      {/* The shield that overlaps the shell's bottom-right corner. */}
      <span className="absolute -right-3 -bottom-5 hidden sm:block" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-teal-400/30 blur-2xl" />
        <svg
          viewBox="0 0 64 76"
          className="relative h-20 w-16 drop-shadow-[0_8px_24px_rgba(45,212,191,0.35)]"
        >
          <defs>
            <linearGradient id="cta-shield" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3fdcc6" />
              <stop offset="100%" stopColor="#123a72" />
            </linearGradient>
          </defs>
          <path
            d="M32 2 60 12v26c0 16-11.5 28.5-28 36C15.5 66.5 4 54 4 38V12L32 2Z"
            fill="url(#cta-shield)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
          />
          <path
            d="M20 38l8.5 8.5L45 30"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
