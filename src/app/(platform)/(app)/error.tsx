"use client";

import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { iconProps } from "@/components/platform/icon";

/*
 * Error state for every platform screen — no Figma frame. Keeps the shell
 * around it, says what happened in plain words, and offers a retry and a way
 * back. The digest is shown so support can find the failure in the logs.
 */
export default function PlatformError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="flex max-w-md flex-col items-center gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-8 text-center backdrop-blur-[12px]">
        <span className="flex size-12 items-center justify-center rounded-app-12xl bg-app-warning text-app-text-inverse">
          <IconAlertTriangle {...iconProps(20)} />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-s text-app-text">This page could not load</h1>
          <p className="text-body-s text-app-text-secondary">
            Something went wrong on our side. Your data is safe — try again, or head back to the dashboard.
          </p>
          {error.digest ? (
            <p className="text-body-2xs text-app-text-tertiary">Reference: {error.digest}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => retry()}
            className="flex items-center gap-2 rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
          >
            <IconRefresh {...iconProps(20)} />
            <span className="text-label-xs">Try Again</span>
          </button>
          <Link
            href="/dashboard"
            className="rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-label-xs text-app-text transition-colors hover:bg-app-fade-48"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
