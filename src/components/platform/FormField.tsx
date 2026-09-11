"use client";

import {
  IconChevronDown,
  IconHash,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Input field — Figma node 260:21613, with the Email (3522:2814) and Phone
 * Number (3533:33645) variants of the same component.
 *
 * Shape in every variant: a 12px label row inset by 12px, then a 16px-radius
 * box with a 0.8px hairline (Width/XS) and 12px of padding. The variants only
 * change what sits inside that box — a leading glyph, a country selector, or
 * a trailing chevron.
 *
 * `icon` is a name rather than a component: icon components must never travel
 * across a module boundary as a value in this codebase, so each glyph is
 * imported here and resolved by the switch below.
 */

export type FieldIcon = "mail" | "phone" | "hash";

function LeadingIcon({ icon }: { icon: FieldIcon }) {
  if (icon === "mail") return <IconMail {...iconProps(16)} />;
  if (icon === "phone") return <IconPhone {...iconProps(16)} />;
  return <IconHash {...iconProps(16)} />;
}

const BOX =
  "flex min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-surface p-3";
const TEXT =
  "min-w-px flex-1 bg-transparent py-px text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary";

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-0.5 px-3 text-label-2xs text-app-text">
      {label}
      {required ? <span className="text-app-warning">*</span> : null}
    </label>
  );
}

export function FormField({
  name,
  label,
  placeholder,
  icon,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder: string;
  icon?: FieldIcon;
  required?: boolean;
  type?: "text" | "email" | "tel";
}) {
  const id = `field-${name}`;

  return (
    <div className="flex min-w-px flex-col gap-1">
      <Label htmlFor={id} label={label} required={required} />
      <div className="flex items-center">
        <div className={BOX}>
          {icon ? (
            <span className="shrink-0 text-app-text">
              <LeadingIcon icon={icon} />
            </span>
          ) : null}
          <input id={id} name={name} type={type} placeholder={placeholder} className={TEXT} />
        </div>
      </div>
    </div>
  );
}

/**
 * Same box, but the value comes from a list. The design draws a chevron on the
 * right and keeps the placeholder in the tertiary colour until something is
 * picked, which is why the empty option is selected and disabled.
 */
export function FormSelect({
  name,
  label,
  placeholder,
  options,
  required,
  className = "",
}: {
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  className?: string;
}) {
  const id = `field-${name}`;

  return (
    <div className={`flex min-w-px flex-col gap-1 ${className}`}>
      <Label htmlFor={id} label={label} required={required} />
      <div className="flex items-center">
        <div className={BOX}>
          <select
            id={id}
            name={name}
            defaultValue=""
            className={`${TEXT} appearance-none text-app-text-tertiary has-[option:checked:not([value=''])]:text-app-text`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="text-app-text">
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none shrink-0 text-app-text">
            <IconChevronDown {...iconProps(12)} />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Phone number — the only variant with a second control inside the box: a
 * rounded country selector on Surface/Brand 2/Tertiary between the glyph and
 * the number itself.
 *
 * The flag is written as the country's emoji rather than an exported image, so
 * the selector stays a real <select> the keyboard can reach.
 */
export function FormPhoneField({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  const id = `field-${name}`;

  return (
    <div className="flex min-w-px flex-col gap-1">
      <Label htmlFor={id} label={label} required={required} />
      <div className="flex items-center">
        <div className="flex min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-surface px-3 py-2">
          <span className="shrink-0 text-app-text">
            <IconPhone {...iconProps(16)} />
          </span>

          <div className="flex shrink-0 items-center gap-1 rounded-app-7xl bg-app-brand2-tertiary px-2 py-1">
            <select
              aria-label="Country code"
              name={`${name}-country`}
              defaultValue="+1"
              className="appearance-none bg-transparent text-body-xs text-app-text outline-none"
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+55">🇧🇷 +55</option>
            </select>
            <span className="pointer-events-none shrink-0 text-app-text">
              <IconChevronDown {...iconProps(12)} />
            </span>
          </div>

          <input
            id={id}
            name={name}
            type="tel"
            placeholder="(XXX) XXX - XXXX"
            className={TEXT}
          />
        </div>
      </div>
    </div>
  );
}
