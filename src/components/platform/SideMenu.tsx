"use client";

import {
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconChartDots3,
  IconFileAnalytics,
  IconFileBarcode,
  IconFileDollar,
  IconFileReport,
  IconMailHeart,
  IconHeadset,
  IconSquareRoundedPlus,
  IconTablePlus,
  IconTools,
  IconUserDollar,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { iconProps } from "./icon";

/*
 * Side Menu — Figma node 18105:4682.
 *
 * 240 wide, px-2 / py-6 (Gap/S and Gap/2XL). Sections are 16px apart
 * (Gap/L); inside a section the heading sits 4px above the group (Gap/XS).
 * Each group is one rounded 16px box with hairline dividers, which is why the
 * rows have no radius of their own and the group clips them.
 *
 * From lg up this sits in the flow exactly as drawn. Below lg the design has
 * nothing to copy — the Figma file only has 1920 frames — so the menu becomes
 * a drawer over the content, keeping its own visual design untouched.
 *
 * Icons are declared in this module rather than passed in, so no icon
 * component crosses a module boundary as a value.
 */

const NAV_SECTIONS = [
  {
    heading: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: IconChartDots3 },
      { label: "Analytics", href: "/analytics", Icon: IconFileAnalytics },
    ],
  },
  {
    heading: "Order",
    items: [
      { label: "New Order", href: "/orders/new", Icon: IconSquareRoundedPlus },
      { label: "Batch Order", href: "/orders/batch", Icon: IconTablePlus },
    ],
  },
  {
    heading: "Admin",
    items: [
      { label: "Clients", href: "/clients", Icon: IconUserDollar },
      { label: "Integrations", href: "/integrations", Icon: IconBuildingStore },
      { label: "Company", href: "/company", Icon: IconBuildingSkyscraper },
    ],
  },
  {
    heading: "Utilities",
    items: [
      { label: "Billing Summary", href: "/billing", Icon: IconFileDollar },
      { label: "Invoices", href: "/invoices", Icon: IconFileBarcode },
      { label: "Report Creator", href: "/reports", Icon: IconFileReport },
      { label: "Tools", href: "/tools", Icon: IconTools },
    ],
  },
  {
    heading: "Other",
    items: [
      { label: "Support", href: "/support", Icon: IconHeadset },
      { label: "Feedback", href: "/feedback", Icon: IconMailHeart },
    ],
  },
] as const;

export function SideMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const drawerPosition = isOpen
    ? "translate-x-0"
    : "-translate-x-[calc(100%+0.5rem)]";

  return (
    <>
      {/* Scrim — only below lg, where the menu floats over the content. */}
      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
        />
      ) : null}

      <nav
        aria-label="Platform"
        className={`fixed inset-y-2 left-2 z-30 flex w-60 shrink-0 flex-col overflow-y-auto rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 px-2 py-6 backdrop-blur-[12px] transition-transform duration-200 ${drawerPosition} lg:static lg:z-auto lg:translate-x-0 lg:transition-none`}
      >
        {/* Close affordance exists only while the menu is a drawer. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="mb-4 self-end rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 p-2 text-app-text lg:hidden"
        >
          <IconX {...iconProps(16)} />
        </button>

        <div className="flex w-full flex-col gap-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading} className="flex w-full flex-col gap-1">
              <h2 className="flex items-center px-2 text-nav-heading text-app-text">
                {section.heading}
              </h2>
              <div className="flex w-full flex-col overflow-hidden rounded-app-l border-w-2xs border-app-line">
                {section.items.map(({ label, href, Icon }) => {
                  const isActive = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onClose}
                      className={`flex w-full items-center gap-2 border-w-2xs border-app-line p-3 transition-colors ${
                        isActive
                          ? "bg-app-brand1-16 text-app-nav-active"
                          : "bg-app-fade-48 text-app-text hover:bg-app-fade-40"
                      }`}
                    >
                      <Icon {...iconProps(20)} className="shrink-0" />
                      <span className="min-w-px flex-1 text-label-xs">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
