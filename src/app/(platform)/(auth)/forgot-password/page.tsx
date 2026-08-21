"use client";

import Link from "next/link";
import { AuthCard, AuthSubmitButton } from "@/components/platform/AuthCard";
import { AuthField } from "@/components/platform/AuthField";
import { requestPasswordReset } from "@/lib/platform/auth";
import { useForm } from "@/lib/useForm";
import { email as emailRule, required } from "@/lib/validation";

export default function ForgotPasswordPage() {
  const { field, errors, touched, handleSubmit, isSubmitting, isSuccess, submitError } = useForm({
    initialValues: { email: "" },
    rules: { email: [required("Enter your email"), emailRule()] },
    onSubmit: async (values) => {
      await requestPasswordReset(values.email);
    },
  });

  if (isSuccess) {
    return (
      <AuthCard
        title="Check your email"
        description="If an account matches that address, a reset link is on its way."
        footer={
          <Link href="/login" className="text-app-text-brand1 underline">
            Back to sign in
          </Link>
        }
      >
        <p className="text-body-xs text-app-text opacity-80">
          The link expires after 1 hour. Didn&apos;t get it? Check spam, or try again.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email and we'll send you a reset link"
      footer={
        <Link href="/login" className="text-app-text-brand1 underline">
          Back to sign in
        </Link>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={touched.email ? errors.email : undefined}
          {...field("email")}
        />

        {submitError ? <p className="text-body-xs text-app-warning">{submitError}</p> : null}

        <AuthSubmitButton isLoading={isSubmitting}>Send reset link</AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
