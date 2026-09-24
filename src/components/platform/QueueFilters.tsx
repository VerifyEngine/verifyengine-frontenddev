"use client";

import { IconAdjustmentsHorizontal, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { FilterField } from "./FilterField";
import { iconProps } from "./icon";

/*
 * Verification Queue filters — Figma draws ten fields in two rows of five.
 * That holds from 2xl. Narrower, the grid folds to four, three, two columns,
 * and below lg all but Search sit behind a Filters toggle so the queue itself
 * is not pushed a whole screen down on a phone.
 */

const FILTERS = [
  { label: "File#", placeholder: "Type here...", variant: "text" as const },
  { label: "Applicant", placeholder: "Select an option..." },
  { label: "Property", placeholder: "Select an option..." },
  { label: "Client", placeholder: "Select an option..." },
  { label: "Assigned Team", placeholder: "Select an option..." },
  { label: "Verification Type", placeholder: "Select an option..." },
  { label: "Status", placeholder: "Select an option..." },
  { label: "Date Created", placeholder: "Select Date Range--" },
  { label: "Last Action Date", placeholder: "Select Date Range--" },
];

export function QueueFilters() {
  const [open, setOpen] = useState(false);

  return (
    // From lg both wrappers dissolve (display: contents) into one grid.
    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 xl:grid-cols-5">
      <div className="flex items-end gap-2 lg:contents">
        <FilterField label="Search" placeholder="Search by keywords..." variant="search" className="min-w-px flex-1" />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="queue-filters"
          onClick={() => setOpen((value) => !value)}
          className="flex shrink-0 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-40 p-3 text-app-text transition-colors hover:bg-app-fade-48 lg:hidden"
        >
          <IconAdjustmentsHorizontal {...iconProps(16)} />
          <span className="text-label-2xs">Filters</span>
          <IconChevronDown {...iconProps(12)} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div
        id="queue-filters"
        className={`${open ? "grid" : "hidden"} grid-cols-1 gap-2 sm:grid-cols-2 lg:contents`}
      >
        {FILTERS.map((filter) => (
          <FilterField key={filter.label} {...filter} />
        ))}
      </div>
    </div>
  );
}
