"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Select, DividerText } from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";
import { GoogleMark } from "@/components/ui/GoogleMark";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "@/lib/useForm";
import { required, email, workEmail, phone } from "@/lib/validation";
import { api } from "@/lib/api";
import { useState } from "react";

const industries = [
  "Landlord / Property Management",
  "Tenant Screening",
  "Employment Screening",
  "Financial Services",
  "Healthcare",
  "Education",
  "Other",
];

export function CreateAccountForm() {
  const { toast } = useToast();
  // Google sign-up is in the approved design but waits on the authentication
  // backend, so the button says so rather than swallowing the click.
  const [notice, setNotice] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      workEmail: "",
      companyName: "",
      phone: "",
      jobTitle: "",
      industry: "",
    },
    rules: {
      firstName: [required("Enter your first name")],
      lastName: [required("Enter your last name")],
      workEmail: [required("Enter your work email"), email(), workEmail()],
      companyName: [required("Enter your company name")],
      phone: [phone()],
      industry: [required("Select your industry")],
    },
    onSubmit: async (values) => {
      // Runs against the mock path until NEXT_PUBLIC_API_BASE_URL is set; the
      // call site does not change once the backend endpoint exists.
      await api.post("/signup", values, { mock: { ok: true } });
      toast({
        tone: "success",
        title: "Account request received",
        description: "Our team will be in touch shortly.",
      });
    },
  });

  if (form.isSuccess) {
    return (
      <div className="py-6">
        <Alert tone="success" title="You're all set">
          Thanks for signing up. We&apos;ve received your details and our team will reach out with
          your onboarding steps.
        </Alert>
        <Button variant="outline-light" className="mt-5 w-full" onClick={form.reset}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold text-ink-900">Create Your Account</h2>
      <p className="mt-1 text-base text-slate-500">
        Start your free trial or request a personalized onboarding.
      </p>

      <form onSubmit={form.handleSubmit} noValidate className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField error={form.errors.firstName}>
            <Input placeholder="First Name" aria-label="First name" {...form.field("firstName")} />
          </FormField>
          <FormField error={form.errors.lastName}>
            <Input placeholder="Last Name" aria-label="Last name" {...form.field("lastName")} />
          </FormField>
        </div>

        <FormField error={form.errors.workEmail}>
          <Input
            type="email"
            placeholder="Work Email"
            aria-label="Work email"
            {...form.field("workEmail")}
          />
        </FormField>

        <FormField error={form.errors.companyName}>
          <Input
            placeholder="Company Name"
            aria-label="Company name"
            {...form.field("companyName")}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField error={form.errors.phone}>
            <Input
              type="tel"
              placeholder="Phone Number"
              aria-label="Phone number"
              {...form.field("phone")}
            />
          </FormField>
          <FormField error={form.errors.jobTitle}>
            <Input placeholder="Job Title" aria-label="Job title" {...form.field("jobTitle")} />
          </FormField>
        </div>

        <FormField error={form.errors.industry}>
          <Select aria-label="Industry" {...form.field("industry")}>
            <option value="">Industry</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormField>

        {form.submitError && <Alert tone="error">{form.submitError}</Alert>}

        <Button type="submit" variant="dark" className="w-full" disabled={form.isSubmitting}>
          {form.isSubmitting ? (
            <>
              <Spinner className="size-4" /> Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        <DividerText>or</DividerText>

        <Button
          type="button"
          variant="outline-light"
          className="w-full"
          onClick={() =>
            setNotice("Google sign-up arrives with the client platform. It is not connected yet.")
          }
        >
          <GoogleMark /> Sign up with Google
        </Button>

        {notice && <Alert tone="info">{notice}</Alert>}

        <p className="text-center text-base leading-relaxed text-slate-500">
          By creating an account, you agree to our{" "}
          <Link href="/legal/terms" className="text-teal-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-teal-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </>
  );
}
