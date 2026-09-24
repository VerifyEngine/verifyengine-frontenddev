import type { ReactNode } from "react";

/*
 * Empty state for any list or panel that has nothing to show — no results for
 * a filter, no records yet, or an endpoint that is not connected. The icon is
 * passed already rendered so no icon component crosses a module boundary.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-app-12xl border-w-2xs border-app-line bg-app-fade-48 text-app-text-secondary">
        {icon}
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <p className="text-heading-xs text-app-text">{title}</p>
        {description ? (
          <p className="text-body-xs text-app-text-secondary">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
