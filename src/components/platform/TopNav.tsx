"use client";

import {
  IconBell,
  IconChevronDown,
  IconHeadset,
  IconMenu2,
  IconRefreshDot,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { iconProps } from "./icon";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Wordmark } from "./Wordmark";

/*
 * Top Nav — Figma node 18105:4628 (light) / 18110:24717 (dark).
 *
 * 1904 x 60 with 8px padding, so the row of controls is 44px tall. Every
 * measurement is the Figma variable, not an approximation:
 *   container  p-2 (Gap/S 8)  rounded-app-xl (Radius/XL 20)  border 0.6px
 *   search     p-3 (Gap/M 12) rounded-app-l  (Radius/L 16)   border 0.8px
 *   icon nav   gap-1 (Gap/XS 4), pill buttons at Radius/7XL 64
 *
 * The 160px gaps (Gap/12XL) are what the design draws at 1920, so they apply
 * from xl up. Narrower than that they would eat the search field, so the gap
 * tightens first, then the organisation label drops to icon-only, then the
 * search itself gives way — the order that keeps the bar usable longest.
 */

const ROUND_BUTTON =
  "flex size-11 shrink-0 items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 text-app-text transition-colors hover:bg-app-fade-40";

export function TopNav({
  organizationName,
  userName,
  avatarSrc,
  onOpenMenu,
}: {
  organizationName: string;
  userName: string;
  avatarSrc: string;
  onOpenMenu: () => void;
}) {
  return (
    <header className="flex h-15 shrink-0 items-center gap-2 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-2 backdrop-blur-[12px] lg:gap-8 xl:gap-40">
      {/* Menu button — exists only while the Side Menu is a drawer. */}
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className={`${ROUND_BUTTON} lg:hidden`}
      >
        <IconMenu2 {...iconProps(20)} />
      </button>

      {/* Logo — 28px tall box, aspect ratio gives the width (147.9 x 28). */}
      <div className="hidden h-full shrink-0 flex-col items-start px-3 py-2 sm:flex">
        <Wordmark className="h-7 w-auto text-[var(--ve-wordmark)]" />
      </div>

      {/* Search */}
      <div className="flex min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-48 p-3">
        <IconSearch {...iconProps(20)} className="shrink-0 text-app-text" />
        <div className="flex min-w-px flex-1 items-center gap-1 py-0.5">
          <input
            type="search"
            placeholder="Search by keywords..."
            aria-label="Search"
            className="w-full min-w-px bg-transparent text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
          />
        </div>
        <button
          type="button"
          aria-label="Clear search"
          className="flex shrink-0 items-center justify-center text-app-text"
        >
          <IconX {...iconProps(12)} />
        </button>
      </div>

      {/* Icon nav */}
      <nav className="flex shrink-0 items-center gap-1">
        <ThemeToggleButton className={ROUND_BUTTON} />
        <button
          type="button"
          aria-label="Support"
          className={`${ROUND_BUTTON} hidden sm:flex`}
        >
          <IconHeadset {...iconProps(20)} />
        </button>
        <button type="button" aria-label="Notifications" className={ROUND_BUTTON}>
          <IconBell {...iconProps(20)} />
        </button>

        {/* Organization switcher — the only pill that is not square: it pads
            12px on the left and 20px on the right (Gap/M and Gap/XL). Below md
            the labels drop and it collapses to the icon alone. */}
        <button
          type="button"
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-app-7xl border-w-2xs border-app-line bg-app-brand2-40 px-3 py-2 text-left transition-colors hover:bg-app-brand2-64 md:pl-3 md:pr-5"
          aria-label={`Switch organization. Current: ${organizationName}`}
        >
          <IconRefreshDot {...iconProps(20)} className="shrink-0 text-app-text" />
          <span className="hidden flex-col justify-center gap-1 md:flex">
            <span className="text-label-2xs text-app-text">{organizationName}</span>
            <span className="text-body-2xs text-app-text-secondary">Switch Organization</span>
          </span>
        </button>

        {/* Avatar and its chevron overlap by 13px, as drawn in the design. */}
        <div className="flex items-end justify-end">
          <span className="-mr-[13px] size-11 shrink-0 overflow-hidden rounded-app-12xl border-w-2xs border-app-line">
            <Image
              src={avatarSrc}
              alt={userName}
              width={44}
              height={44}
              className="size-full object-cover"
            />
          </span>
          <button
            type="button"
            aria-label="Account menu"
            className="flex shrink-0 items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-brand1 px-[0.5px] pt-px text-app-text-inverse"
          >
            <IconChevronDown {...iconProps(12)} />
          </button>
        </div>
      </nav>
    </header>
  );
}
