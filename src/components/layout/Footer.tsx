import Link from "next/link";
import { Container } from "@/components/ui/Button";
import { footerNav } from "@/lib/nav";
import { Logo } from "./Logo";

/**
 * The design shows these four marks, but the client has not supplied the
 * profile URLs. `href` is therefore optional: a mark without one renders as a
 * plain icon rather than a link to "#", which looked live and went nowhere.
 * Filling in a URL here is all it takes to turn one back into a link.
 */
const socials: { label: string; href?: string; path: string }[] = [
  { label: "LinkedIn", path: "M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" },
  { label: "X", path: "M4 4l16 16M20 4 4 20" },
  { label: "Facebook", path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" },
  { label: "YouTube", path: "M21 8.5s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C15 5 12 5 12 5h0s-3 0-5.9.2c-.4 0-1.4.1-2.2 1-.7.7-.9 2.3-.9 2.3S2.8 10.4 2.8 12.3v1.4C2.8 15.6 3 17.5 3 17.5s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s3 0 5.9-.2c.4 0 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8ZM10 15V9.5l5 2.8-5 2.7Z" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-base text-white/60 transition-colors hover:text-mint-200">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16">
      {/* Dotted wave the design tucks into the top-right corner. Built from a
          repeating dot pattern masked by a soft radial falloff, so it fades out
          instead of ending on a hard edge. Hidden on small screens, where the
          columns stack into the space it would occupy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden h-64 w-96 opacity-40 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-mint-200) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          maskImage:
            "radial-gradient(120% 90% at 88% 22%, #000 0%, rgba(0,0,0,0.55) 45%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 88% 22%, #000 0%, rgba(0,0,0,0.55) 45%, transparent 72%)",
        }}
      />
      <Container className="relative">
        {/* The brand block takes a narrower share than an even split would give
            it, so the five link columns keep their labels on one line the way
            the design does — "Property Management Companies" is the tightest. */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(5,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-base text-white/60">
              AI-powered verification platform for landlords, property managers, and businesses
              across industries. Stronger communities. Smarter decisions.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const mark = (
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
                    <path d={s.path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill={s.label === "LinkedIn" || s.label === "Facebook" || s.label === "YouTube" ? "currentColor" : "none"} />
                  </svg>
                );
                const shell =
                  "flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70";

                return s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className={shell + " transition-colors hover:border-mint-200/40 hover:text-mint-200"}
                  >
                    {mark}
                  </a>
                ) : (
                  <span key={s.label} className={shell} role="img" aria-label={s.label}>
                    {mark}
                  </span>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Solutions" links={footerNav.solutions} />
          <FooterColumn title="Industries" links={footerNav.industries} />
          <FooterColumn title="Resources" links={footerNav.resources} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Verify Engine. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>SOC 2 Ready</span>
            <span className="text-white/20">|</span>
            <Link href="/legal/privacy" className="hover:text-mint-200">Privacy</Link>
            <span className="text-white/20">|</span>
            <Link href="/legal/security" className="hover:text-mint-200">Security</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
