import type { ReactNode } from "react";
import { Wordmark } from "./Wordmark";

/*
 * Shared frame for the three authentication screens (login, forgot and reset
 * password). There is no Figma reference for these — the confirmed platform
 * file has no login/auth frames at all — so this reuses the platform's own
 * tokens and the Top Nav's glass-panel treatment rather than inventing a new
 * visual language. Flagged to the user rather than built silently.
 */
export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-6 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-6 backdrop-blur-[12px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <Wordmark className="h-8 w-auto text-[var(--ve-wordmark)]" />
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-m text-app-text">{title}</h1>
          <p className="text-body-xs text-app-text opacity-60">{description}</p>
        </div>
      </div>

      {children}

      {footer ? (
        <div className="text-center text-body-xs text-app-text-secondary">{footer}</div>
      ) : null}
    </div>
  );
}

export function AuthSubmitButton({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="flex items-center justify-center rounded-app-l bg-app-brand1 px-4 py-3 text-label-xs text-app-text-inverse transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {isLoading ? "Please wait…" : children}
    </button>
  );
}
