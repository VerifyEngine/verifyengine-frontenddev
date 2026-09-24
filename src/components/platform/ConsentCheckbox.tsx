"use client";

import { useId, useState } from "react";
import { IconCircleCheckFilled, IconCircle } from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Consent row — Figma node 18176:14197.
 *
 * Drawn checked, as a 20px filled check beside a single line of Label/Small.
 * It is a real checkbox behind the glyph: consent is the one control on this
 * screen that carries legal weight, so it must be reachable by keyboard and
 * announced as a checkbox, not as decoration.
 *
 * Figma shows it already ticked. That is the drawn state of the component, not
 * a default the product should ship — a consent box the user did not tick
 * themselves is worth nothing — so it starts empty here.
 */
export function ConsentCheckbox({
  children,
  onChange,
}: {
  children: string;
  onChange?: (checked: boolean) => void;
}) {
  const id = useId();
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        name="consent"
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          onChange?.(event.target.checked);
        }}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-2 peer-focus-visible:outline peer-focus-visible:outline-app-line-brand1"
      >
        <span className={`shrink-0 ${checked ? "text-app-text-brand1" : "text-app-text-tertiary"}`}>
          {checked ? (
            <IconCircleCheckFilled {...iconProps(20)} />
          ) : (
            <IconCircle {...iconProps(20)} />
          )}
        </span>
        <span className="min-w-px flex-1 text-body-xs text-app-text">{children}</span>
      </label>
    </div>
  );
}
