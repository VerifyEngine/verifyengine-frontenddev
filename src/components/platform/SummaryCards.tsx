import { IconShieldLock, IconSparkles } from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * The third and fourth cards of the Order Details score band — Figma nodes
 * 18216:28564 (AI Summary) and 18216:28574 (Super Admin Actions).
 *
 * Both are the same 48%-fade card as the gauge beside them: a small icon and
 * title, then either a quoted paragraph or a wrapping set of buttons.
 */

export function AiSummaryCard({ title, quote }: { title: string; quote: string }) {
  return (
    <section className="flex flex-col gap-3 overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-fade-48 p-5 backdrop-blur-[12px]">
      <h2 className="flex items-center gap-2 text-label-2xs text-app-text-secondary">
        <IconSparkles {...iconProps(16)} />
        {title}
      </h2>
      <blockquote className="text-body-xs text-app-text">{quote}</blockquote>
    </section>
  );
}

export type AdminAction = { label: string; danger?: boolean };

export function AdminActionsCard({
  title,
  actions,
}: {
  title: string;
  actions: readonly AdminAction[];
}) {
  return (
    <section className="flex flex-col gap-3 overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-fade-48 p-5 backdrop-blur-[12px]">
      <h2 className="flex items-center gap-2 text-label-2xs text-app-text-secondary">
        <IconShieldLock {...iconProps(16)} />
        {title}
      </h2>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={`flex items-center gap-2 rounded-app-l border-w-2xs px-3 py-2 text-label-2xs transition-colors ${
              action.danger
                ? "border-app-warning text-app-warning hover:bg-app-warning/10"
                : "border-app-line bg-app-fade-40 text-app-text hover:bg-app-fade-48"
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
