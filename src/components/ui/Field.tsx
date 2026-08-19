"use client";

import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

/**
 * Form primitives shared by every form on the site and, later, the platform.
 * Styling follows the supplied designs: a hairline border, generous padding,
 * and a muted placeholder — with an error state layered on top.
 */

const controlBase =
  "w-full rounded-lg border bg-white px-4 py-3.5 text-sm text-ink-900 transition-colors placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-bg-muted disabled:text-slate-400";

const controlTone = {
  normal: "border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15",
  invalid: "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15",
};

function toneFor(invalid?: boolean) {
  return invalid ? controlTone.invalid : controlTone.normal;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  className = "",
  children,
}: {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-900">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
      )}
      {children}
      {/* Errors take priority over hints so the field never shows both. */}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({
  invalid,
  className = "",
  ...rest
}: { invalid?: boolean } & ComponentPropsWithoutRef<"input">) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`${controlBase} ${toneFor(invalid)} ${className}`}
      {...rest}
    />
  );
}

export function Textarea({
  invalid,
  className = "",
  rows = 4,
  ...rest
}: { invalid?: boolean } & ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={`${controlBase} resize-y ${toneFor(invalid)} ${className}`}
      {...rest}
    />
  );
}

export function Select({
  invalid,
  className = "",
  children,
  ...rest
}: { invalid?: boolean } & ComponentPropsWithoutRef<"select">) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={`${controlBase} cursor-pointer appearance-none pr-10 ${toneFor(invalid)} ${className}`}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-400"
        strokeWidth={2}
      />
    </div>
  );
}

/** Password field with a show/hide toggle. */
export function PasswordInput({
  invalid,
  className = "",
  ...rest
}: { invalid?: boolean } & Omit<ComponentPropsWithoutRef<"input">, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={`${controlBase} pr-11 ${toneFor(invalid)} ${className}`}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-slate-400 transition-colors hover:text-slate-600"
      >
        {visible ? (
          <EyeOff className="size-4" strokeWidth={1.75} />
        ) : (
          <Eye className="size-4" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}

export function Checkbox({
  label,
  className = "",
  ...rest
}: { label: ReactNode } & ComponentPropsWithoutRef<"input">) {
  return (
    <label className={`flex cursor-pointer items-start gap-2.5 ${className}`}>
      <input
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-slate-300 text-teal-600 accent-teal-600 focus:ring-2 focus:ring-teal-500/25"
        {...rest}
      />
      <span className="text-sm text-slate-600">{label}</span>
    </label>
  );
}

/** Horizontal rule with centred text, e.g. the "or" between form and SSO. */
export function DividerText({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-slate-200" />
      <span className="text-xs text-slate-400">{children}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
