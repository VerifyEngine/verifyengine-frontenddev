"use client";

import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, type ReactNode } from "react";
import { iconProps } from "./icon";

/*
 * Dialog frame shared by the URL-driven modals (invite a user, add a payment
 * method). Same scrim, card and close control as Create Report; opening and
 * closing go through the URL so Back and Escape both dismiss it.
 */
export function ModalShell({
  title,
  description,
  closeHref,
  children,
}: {
  title: string;
  description?: string;
  closeHref: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const id = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push(closeHref, { scroll: false });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, closeHref]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-app-fade-64 p-4 backdrop-blur-[2px] sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="flex w-full max-w-xl flex-col gap-6 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-surface p-6"
      >
        <div className="flex items-start gap-3">
          <div className="flex min-w-px flex-1 flex-col gap-1">
            <h2 id={`${id}-title`} className="text-heading-s text-app-text">
              {title}
            </h2>
            {description ? (
              <p className="text-body-xs text-app-text-secondary">{description}</p>
            ) : null}
          </div>
          <Link
            href={closeHref}
            scroll={false}
            aria-label="Close"
            className="flex shrink-0 items-center justify-center rounded-app-7xl bg-app-brand2-tertiary p-1.5 text-app-warning"
          >
            <IconX {...iconProps(12)} />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
