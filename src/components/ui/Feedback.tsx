import type { LucideIcon, } from "lucide-react";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
  Inbox,
  RotateCcw,
} from "lucide-react";
import type { ReactNode } from "react";

/** Alert / spinner / skeleton / empty-state / error-state primitives. */

type AlertTone = "success" | "info" | "warning" | "error";

const alertTones: Record<AlertTone, { wrap: string; icon: LucideIcon; iconColor: string }> = {
  success: { wrap: "bg-mint-100/70 text-teal-900", icon: CheckCircle2, iconColor: "text-teal-600" },
  info: { wrap: "bg-sky-50 text-sky-900", icon: Info, iconColor: "text-sky-600" },
  warning: { wrap: "bg-amber-50 text-amber-900", icon: AlertTriangle, iconColor: "text-amber-600" },
  error: { wrap: "bg-rose-50 text-rose-900", icon: XCircle, iconColor: "text-rose-600" },
};

export function Alert({
  tone = "info",
  title,
  children,
  className = "",
}: {
  tone?: AlertTone;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  const { wrap, icon: Icon, iconColor } = alertTones[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-xl px-4 py-3.5 ${wrap} ${className}`}
    >
      <Icon className={`mt-0.5 size-4.5 shrink-0 ${iconColor}`} strokeWidth={2} />
      <div className="min-w-0 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? "mt-0.5 opacity-90" : "opacity-90"}>{children}</div>}
      </div>
    </div>
  );
}

export function Spinner({ className = "size-5" }: { className?: string }) {
  return (
    <Loader2 className={`animate-spin ${className}`} strokeWidth={2} aria-hidden="true" />
  );
}

/** Inline loading row, e.g. while a table or list is fetching. */
export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-2.5 py-12 text-slate-500">
      <Spinner className="size-4" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

/** Grey placeholder block used while real content loads. */
export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return <span className={`block animate-pulse rounded-md bg-slate-100 ${className}`} />;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-bg-muted text-slate-400">
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
        <AlertTriangle className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-bg-muted"
        >
          <RotateCcw className="size-4" strokeWidth={2} />
          {retryLabel}
        </button>
      )}
    </div>
  );
}
