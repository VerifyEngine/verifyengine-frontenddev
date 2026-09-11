"use client";

import { useState } from "react";
import {
  IconBolt,
  IconMail,
  IconMessage2,
  IconPhone,
  IconStar,
} from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Radio List Toggle — Figma node 18176:14221.
 *
 * Five stacked rows sharing a hairline, no radius and no gap, so the group
 * reads as one block. The selected row fills with Surface/Brand 1/Quaternary,
 * its title turns Text/Brand 1 and its description drops to 50% — the unselected
 * rows stay entirely in the tertiary colour.
 *
 * `icon` is a name, not a component: icon components must not cross a module
 * boundary as a value in this codebase.
 */

export type PreferenceOption = {
  value: string;
  title: string;
  description: string;
  icon: "phone" | "message" | "mail" | "star" | "bolt";
};

function OptionIcon({ icon }: { icon: PreferenceOption["icon"] }) {
  if (icon === "phone") return <IconPhone {...iconProps(20)} />;
  if (icon === "message") return <IconMessage2 {...iconProps(20)} />;
  if (icon === "mail") return <IconMail {...iconProps(20)} />;
  if (icon === "star") return <IconStar {...iconProps(20)} />;
  return <IconBolt {...iconProps(20)} />;
}

export function PreferenceRadioList({
  name,
  options,
  defaultValue,
  legend,
}: {
  name: string;
  options: readonly PreferenceOption[];
  defaultValue?: string;
  legend: string;
}) {
  const [selected, setSelected] = useState(defaultValue ?? "");

  return (
    <fieldset className="flex flex-col overflow-hidden rounded-app-xl">
      <legend className="sr-only">{legend}</legend>

      {options.map((option) => {
        const isSelected = option.value === selected;

        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 border-w-2xs border-app-line p-4 transition-colors sm:p-5 ${
              isSelected ? "bg-app-brand1-quaternary" : ""
            }`}
          >
            <span className={`shrink-0 ${isSelected ? "text-app-text-brand1" : "text-app-text-tertiary"}`}>
              <OptionIcon icon={option.icon} />
            </span>

            <span className="flex min-w-px flex-1 flex-col justify-center gap-2">
              <span
                className={`text-label-xs ${isSelected ? "text-app-text-brand1" : "text-app-text-tertiary"}`}
              >
                {option.title}
              </span>
              <span
                className={`text-body-s ${
                  isSelected ? "text-app-text opacity-50" : "text-app-text-tertiary"
                }`}
              >
                {option.description}
              </span>
            </span>

            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => setSelected(option.value)}
              className="size-4 shrink-0 accent-[var(--ve-text-brand1)]"
            />
          </label>
        );
      })}
    </fieldset>
  );
}
