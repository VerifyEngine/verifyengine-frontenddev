"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard, AuthSubmitButton } from "@/components/platform/AuthCard";
import { AuthField } from "@/components/platform/AuthField";
import { resetPassword } from "@/lib/platform/auth";
import { useForm } from "@/lib/useForm";
import { matches, minLength, required } from "@/lib/validation";

// useSearchParams (reading the reset token) requires a Suspense boundary
// during static prerendering, hence the wrapper below.
export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";

  const { field, values, errors, touched, handleSubmit, isSubmitting, submitError } = useForm({
    initialValues: { password: "", confirmPassword: "" },
    rules: {
      password: [required("Enter a new password"), minLength(8)],
      confirmPassword: [required("Confirm your new password")],
    },
    onSubmit: async (formValues) => {
      const confirmError = matches(formValues.password, "Passwords do not match")(
        formValues.confirmPassword,
      );
      if (confirmError) throw new Error(confirmError);

      await resetPassword(token, formValues.password);
      router.push("/login");
    },
  });

  return (
    <AuthCard
      title="Set a new password"
      description="Choose a new password for your account"
      footer={
        <Link href="/login" className="text-app-text-brand1 underline">
          Back to sign in
        </Link>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="New password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={touched.password ? errors.password : undefined}
          {...field("password")}
        />
        <AuthField
          label="Confirm new password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={
            touched.confirmPassword
              ? (errors.confirmPassword ??
                (values.confirmPassword && values.confirmPassword !== values.password
                  ? "Passwords do not match"
                  : undefined))
              : undefined
          }
          {...field("confirmPassword")}
        />

        {submitError ? <p className="text-body-xs text-app-warning">{submitError}</p> : null}

        <AuthSubmitButton isLoading={isSubmitting}>Reset password</AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
