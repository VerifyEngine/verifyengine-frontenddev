"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, Input, PasswordInput, DividerText } from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";
import { GoogleMark } from "@/components/ui/GoogleMark";
import { useForm } from "@/lib/useForm";
import { useState } from "react";
import { required, email } from "@/lib/validation";
import { api } from "@/lib/api";

export function LoginForm() {
  // Password recovery and Google sign-in are both in the approved design and
  // both wait on the authentication backend. Saying so where the reader
  // clicked is honest; a link to a 404 and a button that swallows the click
  // are not.
  const [notice, setNotice] = useState<string | null>(null);

  const form = useForm({
    initialValues: { email: "", password: "" },
    rules: {
      email: [required("Enter your work email"), email()],
      password: [required("Enter your password")],
    },
    onSubmit: async (values) => {
      // Real authentication arrives with the platform milestone; until the
      // backend endpoint exists this resolves through the mock path.
      await api.post("/auth/login", values, { mock: { ok: true } });
      throw new Error(
        "Sign-in is not available yet — the client platform is still in development.",
      );
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-ink-900">Welcome Back</h2>
      <p className="mt-1 text-base text-slate-500">Sign in to your Verify Engine account.</p>

      <form onSubmit={form.handleSubmit} noValidate className="mt-6 space-y-4">
        <FormField label="Work Email" htmlFor="email" error={form.errors.email}>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            {...form.field("email")}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={form.errors.password}>
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...form.field("password")}
          />
        </FormField>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setNotice(
                "Password recovery arrives with the client platform. Email support@verifyengine.ai and our team will reset it for you.",
              )
            }
            className="text-sm font-semibold text-teal-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {form.submitError && <Alert tone="error">{form.submitError}</Alert>}
        {notice && <Alert tone="info">{notice}</Alert>}

        <Button type="submit" variant="dark" className="w-full" disabled={form.isSubmitting}>
          {form.isSubmitting ? (
            <>
              <Spinner className="size-4" /> Signing in...
            </>
          ) : (
            "Log In"
          )}
        </Button>

        <DividerText>or</DividerText>

        <Button
          type="button"
          variant="outline-light"
          className="w-full"
          onClick={() =>
            setNotice("Google sign-in arrives with the client platform. It is not connected yet.")
          }
        >
          <GoogleMark /> Sign in with Google
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-center text-base text-slate-500">
          <Lock className="size-3.5 text-slate-400" strokeWidth={2} />
          Secure login protected by enterprise-grade encryption
        </p>
      </form>
    </>
  );
}
