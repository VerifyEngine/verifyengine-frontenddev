"use client";

import { IconChevronDown, IconSearch, IconX } from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Filter field — Figma node 18109:23781 ("input field").
 *
 * Label is Label/2XS in Text/Primary with 12px side padding; the control below
 * is Surface/Fade/40% behind a 0.8px hairline at Radius/L 16, padded Gap/M 12,
 * with Body/XS placeholder text in Text/Tertiary. Trailing icons are 16px —
 * one size smaller than the Top Nav's, per Width/S.
 *
 * The same shape serves all three variants the dashboard uses, which is why
 * this takes a `variant` rather than existing three times.
 *
 * Reports (node 18176:36367) draws the control on Surface/Defualt/Primary
 * instead of the 40% fade, because its filter row sits straight on the page
 * rather than inside a glass panel — hence `surface`.
 */

type Variant = "select" | "text" | "search";

export function FilterField({
  label,
  placeholder,
  variant = "select",
  surface = "fade",
  className = "",
}: {
  label: string;
  placeholder: string;
  variant?: Variant;
  surface?: "fade" | "solid";
  className?: string;
}) {
  const inputId = `filter-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className={`flex flex-col justify-end gap-1 ${className}`}>
      <label htmlFor={inputId} className="px-3 text-label-2xs text-app-text">
        {label}
      </label>

      <div className="flex w-full items-center gap-1">
        <div className={`flex min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line p-3 ${
          surface === "solid" ? "bg-app-surface" : "bg-app-fade-40"
        }`}>
          {variant === "search" ? (
            <IconSearch {...iconProps(16)} className="shrink-0 text-app-text" />
          ) : null}

          <input
            id={inputId}
            type="text"
            readOnly={variant === "select"}
            placeholder={placeholder}
            className="min-w-px flex-1 cursor-text bg-transparent py-px text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary read-only:cursor-pointer"
          />

          {variant === "select" ? (
            <IconChevronDown {...iconProps(16)} className="shrink-0 text-app-text" />
          ) : null}
          {variant === "search" ? (
            <button
              type="button"
              aria-label={`Clear ${label}`}
              className="shrink-0 text-app-warning"
            >
              <IconX {...iconProps(16)} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
