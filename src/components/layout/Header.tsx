"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { industriesMenu, landlordAudiences, primaryNav } from "@/lib/nav";
import { Logo } from "./Logo";

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative px-1 py-2 text-base font-medium transition-colors ${
        active ? "text-white" : "text-white/80 hover:text-white"
      }`}
    >
      {label}
      {active && <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-mint-200" />}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const industriesActive = pathname.startsWith("/industries");

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-900">
      <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between gap-4 px-6 py-4 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          <NavItem href="/" label="Home" active={pathname === "/"} />

          <div
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-1 py-2 text-base font-medium transition-colors ${
                industriesActive ? "text-white" : "text-white/80 hover:text-white"
              }`}
              aria-expanded={industriesOpen}
            >
              Industries
              <svg viewBox="0 0 12 12" className="mt-0.5 size-3" fill="none" aria-hidden="true">
                <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {industriesActive && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-[calc(100%-16px)] rounded-full bg-mint-200" />
              )}
            </button>

            {industriesOpen && (
              <div className="absolute top-full left-1/2 w-[680px] -translate-x-1/2 pt-3">
                {/*
                  Kept deliberately plain: no icon chips, no pill badges, no
                  tinted panels — just type and a single 1px divider between
                  the two columns. Landlord Verification (~70% of the site's
                  content weight) is signalled by a small uppercase eyebrow
                  and larger type, not a decorative badge. Body copy runs at
                  white/80+ rather than the faint white/50 muted-gray look —
                  legible at a glance, not a low-contrast placeholder feel.
                */}
                <div className="grid grid-cols-[1.1fr_1fr] rounded-2xl bg-navy-800 shadow-2xl">
                  <div className="p-7">
                    <Link href="/industries/landlord-verification" className="group block">
                      <p className="text-xs font-bold tracking-[0.1em] text-mint-200 uppercase">
                        Most popular
                      </p>
                      <p className="mt-2 text-xl font-bold text-white group-hover:text-mint-200">
                        Landlord Verification
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                        Rental history verification for tenant screening.
                      </p>
                    </Link>

                    <div className="mt-6 space-y-3.5 border-l-2 border-white/15 pl-4">
                      {landlordAudiences.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm font-medium text-white/75 transition-colors hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col border-l border-white/10 p-7">
                    <div className="space-y-5">
                      {industriesMenu.slice(1).map((item) => (
                        <Link key={item.href} href={item.href} className="group block">
                          <p className="text-base font-bold text-white group-hover:text-mint-200">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-white/80">{item.description}</p>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/industries"
                      className="mt-7 flex items-center gap-1.5 text-sm font-bold text-mint-200 hover:text-mint-300"
                    >
                      View all industries
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {primaryNav.slice(1).map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
          ))}

          <Link href="/login" className="text-base font-medium text-white/80 transition-colors hover:text-white">
            Client Login
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/get-started" variant="outline-dark" size="md">
            Get Started
          </Button>
          <Button href="/book-demo" variant="primary" size="md">
            Book DEMO
          </Button>
        </div>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path
                d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-900 px-6 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1 pt-4">
            <Link href="/" className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5">
              Home
            </Link>
            <p className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-white/40 uppercase">
              Industries
            </p>
            {industriesMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5"
              >
                {item.title}
              </Link>
            ))}
            {primaryNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/5">
              Client Login
            </Link>
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Button href="/get-started" variant="outline-dark" className="w-full">
              Get Started
            </Button>
            <Button href="/book-demo" variant="primary" className="w-full">
              Book DEMO
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
