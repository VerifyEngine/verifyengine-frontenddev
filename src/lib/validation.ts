/**
 * Minimal, dependency-free form validation.
 *
 * The scope requires frontend validation on every form; this keeps the rules
 * declarative and colocated with each form's field definitions, so the same
 * shape can later be sent to a backend API without rework.
 */

export type Validator = (value: string) => string | null;

export type FieldRules = Record<string, Validator[]>;

export type FieldErrors = Record<string, string>;

export const required =
  (message = "This field is required"): Validator =>
  (value) =>
    value.trim().length === 0 ? message : null;

export const email =
  (message = "Enter a valid email address"): Validator =>
  (value) => {
    if (!value.trim()) return null; // let `required` own emptiness
    // Deliberately permissive: catches obvious typos without rejecting
    // valid-but-unusual addresses.
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? null : message;
  };

export const workEmail =
  (message = "Please use your work email address"): Validator =>
  (value) => {
    if (!value.trim()) return null;
    const freeProviders = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "aol.com",
      "proton.me",
      "protonmail.com",
    ];
    const domain = value.trim().split("@")[1]?.toLowerCase();
    return domain && freeProviders.includes(domain) ? message : null;
  };

export const minLength =
  (n: number, message = `Must be at least ${n} characters`): Validator =>
  (value) =>
    value.trim().length > 0 && value.trim().length < n ? message : null;

export const phone =
  (message = "Enter a valid phone number"): Validator =>
  (value) => {
    if (!value.trim()) return null;
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15 ? null : message;
  };

export const matches =
  (other: string, message = "Values do not match"): Validator =>
  (value) =>
    value === other ? null : message;

/** Run every rule for one field and return the first failure. */
export function validateField(value: string, validators: Validator[]): string | null {
  for (const validate of validators) {
    const error = validate(value);
    if (error) return error;
  }
  return null;
}

/** Validate a whole form; returns a map of field name → first error message. */
export function validateForm(
  values: Record<string, string>,
  rules: FieldRules,
): FieldErrors {
  const errors: FieldErrors = {};
  for (const [name, validators] of Object.entries(rules)) {
    const error = validateField(values[name] ?? "", validators);
    if (error) errors[name] = error;
  }
  return errors;
}
