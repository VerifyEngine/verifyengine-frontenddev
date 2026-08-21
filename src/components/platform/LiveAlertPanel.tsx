import { NewCountChip, TagChip } from "./StatusChip";
import type { LiveAlert } from "@/lib/platform/dashboard";

/*
 * Live Alert panel — Figma node 18048:2319, cards at 18110:30937.
 *
 * Each card is Surface/Fade/48% behind a 0.6px hairline with padding Gap/M 12
 * and a 12px gap between the message and the chip row. The message clamps to
 * two lines, which is what the design shows and why the card height is even.
 * The timestamp takes the remaining width and right-aligns.
 */
export function LiveAlertPanel({ alerts }: { alerts: LiveAlert[] }) {
  return (
    <section className="flex w-full shrink-0 flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px] xl:w-100">
      <h2 className="text-heading-m text-app-text-brand1">Live Alert</h2>

      <ul className="flex flex-col overflow-y-auto">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="flex flex-col justify-center gap-3 border-w-2xs border-app-line bg-app-fade-48 p-3"
          >
            <p className="line-clamp-2 overflow-hidden text-ellipsis text-body-2xs text-app-text">
              {alert.message}
            </p>
            <div className="flex items-end justify-end gap-1">
              <NewCountChip label={alert.newCount} />
              <TagChip label={alert.tag} tone={alert.tone} />
              <span className="min-w-px flex-1 text-right text-body-2xs text-app-text-secondary">
                {alert.timeAgo}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
