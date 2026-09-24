import type { Metadata } from "next";
import {
  IconBuildingEstate,
  IconCalendarEvent,
  IconFilterX,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { FilterField } from "@/components/platform/FilterField";
import { PageHeader } from "@/components/platform/PageHeader";
import { UserActivityProperties } from "@/components/platform/UserActivityProperties";
import { UserActivityTable } from "@/components/platform/UserActivityTable";
import { iconProps } from "@/components/platform/icon";
import { USER_ACTIVITY } from "@/lib/platform/user-activity";

export const metadata: Metadata = { title: "User Activity & Responses" };

const FILTERS = ["MLS ID", "Filter by User ID", "Select User"] as const;

/*
 * User Activity & Responses - Users — Figma node 18030:2381.
 *
 * Page header, then a mint filter bar (18030:2385) with the Users / Properties
 * switch, three selects, Date Filter and a clear button, then the responses
 * table on the same mint panel.
 *
 * The frame's header instance still carries the Dashboard's title and
 * description, so the title here is the frame's own name and the description
 * is left out rather than copied. Only the Users view is drawn; Properties
 * (?view=properties) regroups the same rows by MLS ID in the same style.
 *
 * Below xl the filter bar stacks and the selects fold into three, then one
 * column; the table scrolls sideways like the other list screens.
 */

const VIEW_ACTIVE = "flex items-center gap-3 rounded-app-7xl bg-app-brand1 px-4 py-3 text-app-text-inverse";
const VIEW_IDLE =
  "flex items-center gap-3 rounded-app-7xl px-4 py-3 text-app-text transition-colors hover:bg-app-brand1-quaternary";

export default async function UserActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const properties = view === "properties";

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="User Activity & Responses"
        actions={[{ label: "Export", icon: "download" }]}
        utilities={[{ label: "Refresh", icon: "refresh" }]}
      />

      <section
        aria-label="Filters"
        className="flex flex-col gap-4 rounded-app-xl border-w-2xs border-app-line bg-app-brand2-tertiary p-4 xl:flex-row xl:items-center xl:gap-30"
      >
        <div
          role="group"
          aria-label="View"
          className="flex shrink-0 items-center self-start rounded-app-12xl border-w-2xs border-app-line bg-app-surface p-1"
        >
          <Link
            href="/user-activity"
            aria-current={properties ? undefined : "page"}
            className={properties ? VIEW_IDLE : VIEW_ACTIVE}
          >
            <IconUsersGroup {...iconProps(20)} />
            <span className="whitespace-nowrap text-label-xs">Users</span>
          </Link>
          <Link
            href="/user-activity?view=properties"
            aria-current={properties ? "page" : undefined}
            className={properties ? VIEW_ACTIVE : VIEW_IDLE}
          >
            <IconBuildingEstate {...iconProps(20)} />
            <span className="whitespace-nowrap text-label-xs">Properties</span>
          </Link>
        </div>

        <div className="flex min-w-px flex-1 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-end xl:flex-nowrap">
          <div className="grid min-w-px flex-1 grid-cols-1 gap-1 sm:basis-full sm:grid-cols-3 xl:basis-auto">
            {FILTERS.map((label) => (
              <FilterField key={label} label={label} placeholder="Select an option..." surface="solid" />
            ))}
          </div>
          <div className="flex items-center gap-1 sm:ml-auto xl:ml-0">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-app-7xl border-w-2xs border-app-line bg-app-surface py-3 pr-4 pl-3 text-app-text-brand1 transition-colors hover:bg-app-brand1-quaternary"
            >
              <IconCalendarEvent {...iconProps(16)} />
              <span className="whitespace-nowrap text-label-2xs">Date Filter</span>
            </button>
            <button
              type="button"
              aria-label="Clear filters"
              className="flex items-center justify-center rounded-app-7xl border-w-2xs border-app-warning bg-app-surface p-3 text-app-warning transition-colors hover:bg-app-brand1-quaternary"
            >
              <IconFilterX {...iconProps(16)} />
            </button>
          </div>
        </div>
      </section>

      <section
        aria-label="User responses"
        className="rounded-app-xl border-w-2xs border-app-line bg-app-brand2-tertiary p-4"
      >
        {properties ? (
          <UserActivityProperties rows={USER_ACTIVITY} />
        ) : (
          <UserActivityTable rows={USER_ACTIVITY} />
        )}
      </section>
    </div>
  );
}
