"use client";

import type { InputHTMLAttributes } from "react";

/**
 * Labeled input for the auth forms, styled like the platform's other inputs
 * (FilterField, PageHeader's search) rather than the marketing site's Field —
 * the two deliverables keep separate component sets on purpose.
 */
export function AuthField({
  label,
  error,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = `auth-${props.name}`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="px-1 text-label-2xs text-app-text">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-app-l border-w-xs bg-app-fade-40 p-3 text-body-xs text-app-text outline-none placeholder:text-app-text-tertiary ${
          error ? "border-app-warning" : "border-app-line"
        }`}
        {...props}
      />
      {error ? <p className="px-1 text-body-2xs text-app-warning">{error}</p> : null}
    </div>
  );
}
