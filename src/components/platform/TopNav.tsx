"use client";

import {
  IconBell,
  IconCheck,
  IconChevronDown,
  IconCreditCard,
  IconHeadset,
  IconLogout,
  IconMenu2,
  IconMessageCircle,
  IconRefreshDot,
  IconSearch,
  IconSettings,
  IconShieldLock,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { iconProps } from "./icon";
import type { VerificationStatus } from "@/lib/platform/dashboard";
import { NOTIFICATIONS } from "@/lib/platform/notifications";
import { destroySession } from "@/lib/platform/session";
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

type Panel = "notifications" | "organization" | "account";

const ACCOUNT_LINKS = [
  { href: "/account", label: "My Account", Icon: IconUser },
  { href: "/settings", label: "Settings", Icon: IconSettings },
  { href: "/roles", label: "Roles & Permissions", Icon: IconShieldLock },
  { href: "/billing/plan", label: "Plan & Payment", Icon: IconCreditCard },
  { href: "/support", label: "Support", Icon: IconHeadset },
  { href: "/feedback", label: "Feedback", Icon: IconMessageCircle },
] as const;

const NOTIFICATION_DOT: Record<VerificationStatus, string> = {
  Pending: "bg-app-accent",
  "In Progress": "bg-app-neutral",
  Verified: "bg-app-success",
  Unverified: "bg-app-warning",
  Escalated: "bg-app-highlight",
};

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
  const router = useRouter();
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readIds, setReadIds] = useState<readonly string[]>([]);
  const unread = NOTIFICATIONS.filter(
    (item) => !readIds.includes(item.id),
  ).length;

  function toggle(panel: Panel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  async function handleLogout() {
    await destroySession();
    router.push("/login");
  }

  return (
    <>
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

        {/* Search — below md there is no room for a usable field, so it
            becomes a round button that opens a full-width bar under the nav. */}
        <span className="min-w-px flex-1 md:hidden" />
        <button
          type="button"
          aria-label="Search"
          aria-expanded={isSearchOpen}
          onClick={() => setIsSearchOpen((open) => !open)}
          className={`${ROUND_BUTTON} md:hidden`}
        >
          <IconSearch {...iconProps(20)} />
        </button>
        <div className="hidden min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-48 p-3 md:flex">
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
          <Link
            href="/support"
            aria-label="Support"
            className={`${ROUND_BUTTON} hidden sm:flex`}
          >
            <IconHeadset {...iconProps(20)} />
          </Link>
          <button
            type="button"
            aria-label={
              unread > 0 ? `Notifications, ${unread} unread` : "Notifications"
            }
            aria-expanded={openPanel === "notifications"}
            onClick={() => toggle("notifications")}
            className={`${ROUND_BUTTON} relative`}
          >
            <IconBell {...iconProps(20)} />
            {unread > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 flex min-w-4 items-center justify-center rounded-app-7xl bg-app-warning px-1 text-body-2xs text-app-text-inverse">
                {unread}
              </span>
            ) : null}
          </button>

          {/* Organization switcher — the only pill that is not square: it pads
            12px on the left and 20px on the right (Gap/M and Gap/XL). Below md
            the labels drop and it collapses to the icon alone. */}
          <button
            type="button"
            aria-expanded={openPanel === "organization"}
            onClick={() => toggle("organization")}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-app-7xl border-w-2xs border-app-line bg-app-brand2-40 px-3 py-2 text-left transition-colors hover:bg-app-brand2-64 lg:pl-3 lg:pr-5"
            aria-label={`Switch organization. Current: ${organizationName}`}
          >
            <IconRefreshDot
              {...iconProps(20)}
              className="shrink-0 text-app-text"
            />
            <span className="hidden flex-col justify-center gap-1 lg:flex">
              <span className="text-label-2xs text-app-text">
                {organizationName}
              </span>
              <span className="text-body-2xs text-app-text-secondary">
                Switch Organization
              </span>
            </span>
          </button>

          {/* Avatar and its chevron overlap by 13px, as drawn in the design. */}
          <div className="relative flex items-end justify-end">
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
              aria-expanded={openPanel === "account"}
              onClick={() => toggle("account")}
              className="flex shrink-0 items-center justify-center rounded-app-7xl border-w-2xs border-app-line bg-app-brand1 px-[0.5px] pt-px text-app-text-inverse"
            >
              <IconChevronDown {...iconProps(12)} />
            </button>
          </div>
        </nav>
      </header>

      {isSearchOpen ? (
        <div className="flex shrink-0 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-surface p-3 md:hidden">
          <IconSearch {...iconProps(20)} className="shrink-0 text-app-text" />
          <input
            type="search"
            autoFocus
            placeholder="Search by keywords..."
            aria-label="Search"
            className="min-w-px flex-1 bg-transparent text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
            className="flex shrink-0 items-center justify-center text-app-text"
          >
            <IconX {...iconProps(16)} />
          </button>
        </div>
      ) : null}

      {openPanel ? (
        <>
          {/* Backdrop closes the panel on outside click without a ref/effect. */}
          <button
            type="button"
            aria-label="Close panel"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpenPanel(null)}
          />
          {/* Fixed, not absolute: the header clips its overflow. */}
          <div className="fixed top-19 right-2 z-50 flex max-h-[calc(100vh-6rem)] w-[min(24rem,calc(100vw-1rem))] flex-col overflow-hidden rounded-app-l border-w-2xs border-app-line bg-app-surface shadow-lg">
            {openPanel === "notifications" ? (
              <>
                <div className="flex items-center justify-between gap-3 border-b-[0.6px] border-app-line px-4 py-3">
                  <p className="text-label-xs text-app-text">Notifications</p>
                  <button
                    type="button"
                    disabled={unread === 0}
                    onClick={() =>
                      setReadIds(NOTIFICATIONS.map((item) => item.id))
                    }
                    className="text-label-2xs text-app-text-secondary transition-colors hover:text-app-text disabled:opacity-40"
                  >
                    Mark all as read
                  </button>
                </div>
                <ul className="flex flex-col overflow-y-auto">
                  {NOTIFICATIONS.map((item) => {
                    const isUnread = !readIds.includes(item.id);
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            setReadIds((ids) => [...ids, item.id]);
                            setOpenPanel(null);
                          }}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-app-brand2-16"
                        >
                          <span
                            aria-hidden
                            className={`mt-1.5 size-2 shrink-0 rounded-full ${isUnread ? NOTIFICATION_DOT[item.status] : "bg-transparent"}`}
                          />
                          <span className="flex min-w-px flex-1 flex-col gap-0.5">
                            <span
                              className={`text-body-xs ${isUnread ? "font-medium text-app-text" : "text-app-text-secondary"}`}
                            >
                              {item.title}
                            </span>
                            <span className="truncate text-body-2xs text-app-text-secondary">
                              {item.detail}
                            </span>
                            <span className="text-body-2xs text-app-text-tertiary">
                              {item.time}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/verifications"
                  onClick={() => setOpenPanel(null)}
                  className="border-t-[0.6px] border-app-line px-4 py-3 text-center text-label-2xs text-app-text transition-colors hover:bg-app-brand2-16"
                >
                  View all verifications
                </Link>
              </>
            ) : openPanel === "organization" ? (
              <>
                <p className="border-b-[0.6px] border-app-line px-4 py-3 text-label-xs text-app-text">
                  Organizations
                </p>
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-app-m bg-app-brand1-16 text-label-2xs text-app-text-emphasis">
                    {organizationName.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="flex min-w-px flex-1 flex-col">
                    <span className="truncate text-label-2xs text-app-text">
                      {organizationName}
                    </span>
                    <span className="text-body-2xs text-app-text-secondary">
                      Current organization
                    </span>
                  </span>
                  <IconCheck
                    {...iconProps(16)}
                    className="shrink-0 text-app-success"
                  />
                </div>
                <p className="px-4 pb-3 text-body-2xs text-app-text-secondary">
                  Other organizations you belong to appear here.
                </p>
                <Link
                  href="/company"
                  onClick={() => setOpenPanel(null)}
                  className="border-t-[0.6px] border-app-line px-4 py-3 text-center text-label-2xs text-app-text transition-colors hover:bg-app-brand2-16"
                >
                  Manage company
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b-[0.6px] border-app-line px-4 py-3">
                  <Image
                    src={avatarSrc}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-app-12xl object-cover"
                  />
                  <span className="flex min-w-px flex-col">
                    <span className="truncate text-label-2xs text-app-text">
                      {userName}
                    </span>
                    <span className="truncate text-body-2xs text-app-text-secondary">
                      {organizationName}
                    </span>
                  </span>
                </div>
                <nav aria-label="Account" className="flex flex-col p-1">
                  {ACCOUNT_LINKS.map(({ href, label, Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpenPanel(null)}
                      className="flex items-center gap-2 rounded-app-m px-3 py-2 text-label-2xs text-app-text transition-colors hover:bg-app-brand2-16"
                    >
                      <Icon {...iconProps(16)} />
                      {label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex items-center gap-2 rounded-app-m border-t-[0.6px] border-app-line px-3 py-2 text-left text-label-2xs text-app-warning transition-colors hover:bg-app-brand2-16"
                  >
                    <IconLogout {...iconProps(16)} />
                    Log out
                  </button>
                </nav>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
