"use client";

import { useCallback, useState } from "react";
import { validateField, validateForm, type FieldErrors, type FieldRules } from "./validation";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Small form controller: values, per-field validation on blur, full validation
 * on submit, and a submission status the UI can render loading/success/error
 * states from. Deliberately dependency-free and API-agnostic — `onSubmit`
 * decides whether that means a real request or a mocked one.
 */
export function useForm<T extends Record<string, string>>({
  initialValues,
  rules = {},
  onSubmit,
}: {
  initialValues: T;
  rules?: FieldRules;
  onSubmit?: (values: T) => Promise<void> | void;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setValue = useCallback(
    (name: keyof T & string, value: string) => {
      setValues((current) => ({ ...current, [name]: value }));
      // Clear an existing error as soon as the user starts fixing the field,
      // rather than nagging while they type.
      setErrors((current) => {
        if (!current[name]) return current;
        const next = { ...current };
        delete next[name];
        return next;
      });
    },
    [],
  );

  const handleBlur = useCallback(
    (name: keyof T & string) => {
      setTouched((current) => ({ ...current, [name]: true }));
      const fieldRules = rules[name];
      if (!fieldRules) return;
      const error = validateField(values[name] ?? "", fieldRules);
      setErrors((current) => {
        if (!error) {
          const next = { ...current };
          delete next[name];
          return next;
        }
        return { ...current, [name]: error };
      });
    },
    [rules, values],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setSubmitError(null);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      const nextErrors = validateForm(values, rules);
      setErrors(nextErrors);
      setTouched(Object.fromEntries(Object.keys(rules).map((k) => [k, true])));
      if (Object.keys(nextErrors).length > 0) return;

      setStatus("submitting");
      setSubmitError(null);
      try {
        await onSubmit?.(values);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setSubmitError(
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
        );
      }
    },
    [onSubmit, rules, values],
  );

  /** Spread onto an Input/Select to wire value, change, blur and error state. */
  const field = useCallback(
    (name: keyof T & string) => ({
      name,
      value: values[name] ?? "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => setValue(name, e.target.value),
      onBlur: () => handleBlur(name),
      invalid: Boolean(errors[name]),
    }),
    [values, errors, setValue, handleBlur],
  );

  return {
    values,
    errors,
    touched,
    status,
    submitError,
    setValue,
    field,
    handleSubmit,
    reset,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
  };
}
