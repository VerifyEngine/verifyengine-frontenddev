"use client";

import { useEffect, useState } from "react";
import { IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Section index beside the New Order form — Figma node 18113:32157.
 *
 * Drawn with the first row ticked and the rest muted, which is the design
 * showing where the reader currently is rather than five static rows. It
 * follows the scroll here: the section whose card is nearest the top of the
 * viewport is the ticked one, and each row jumps to its card.
 *
 * IntersectionObserver rather than scroll maths, so nothing runs while the
 * page sits still.
 */
export function FormProgressList({
  sections,
}: {
  sections: readonly { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // Only the band just below the header counts as "here", so a tall card
      // does not keep the tick while the next one fills the screen.
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Form sections"
      className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-4 backdrop-blur-[12px]"
    >
      {sections.map((section) => {
        const isActive = section.id === activeId;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "step" : undefined}
            className="flex items-center gap-2"
          >
            <span className={`shrink-0 ${isActive ? "text-app-text-brand1" : "text-app-text-tertiary"}`}>
              {isActive ? (
                <IconCircleCheckFilled {...iconProps(20)} />
              ) : (
                <IconCircle {...iconProps(20)} />
              )}
            </span>
            <span
              className={`min-w-px flex-1 text-label-2xs ${
                isActive ? "text-app-text" : "text-app-text-tertiary"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
