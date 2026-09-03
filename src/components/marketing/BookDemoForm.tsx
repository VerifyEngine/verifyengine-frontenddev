"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField, Input, Select, Checkbox } from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";
import { useToast } from "@/components/ui/Toast";
import { useForm } from "@/lib/useForm";
import { required, email, workEmail, phone } from "@/lib/validation";
import { api } from "@/lib/api";

const industries = [
  "Landlord / Property Management",
  "Tenant Screening",
  "Employment Screening",
  "Financial Services",
  "Healthcare",
  "Education",
  "Other",
];

const volumeRanges = [
  "Under 100 per month",
  "100 – 500 per month",
  "500 – 2,000 per month",
  "2,000 – 10,000 per month",
  "Over 10,000 per month",
];

const focusAreas = [
  "Landlord Verification",
  "Financial Services",
  "Employment Verification",
  "Healthcare Verification",
  "Income Verification",
  "Education Verification",
];

export function BookDemoForm() {
  const { toast } = useToast();
  // Multi-select lives outside useForm, which models single string values.
  const [focus, setFocus] = useState<string[]>([]);

  function toggleFocus(area: string) {
    setFocus((current) =>
      current.includes(area) ? current.filter((a) => a !== area) : [...current, area],
    );
  }

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      workEmail: "",
      companyName: "",
      phone: "",
      jobTitle: "",
      industry: "",
      volume: "",
    },
    rules: {
      firstName: [required("Enter your first name")],
      lastName: [required("Enter your last name")],
      workEmail: [required("Enter your work email"), email(), workEmail()],
      companyName: [required("Enter your company name")],
      phone: [phone()],
      industry: [required("Select your industry")],
      volume: [required("Select your monthly volume")],
    },
    onSubmit: async (values) => {
      await api.post("/demo-requests", { ...values, focusAreas: focus }, { mock: { ok: true } });
      toast({
        tone: "success",
        title: "Demo requested",
        description: "Our team will reach out to confirm a time.",
      });
    },
  });

  if (form.isSuccess) {
    return (
      <div className="py-6">
        <Alert tone="success" title="Demo requested">
          Thanks for your interest. Our team will reach out shortly to confirm a time that works
          for you.
        </Alert>
        <Button
          variant="outline-light"
          className="mt-5 w-full"
          onClick={() => {
            setFocus([]);
            form.reset();
          }}
        >
          Request another demo
        </Button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold text-ink-900">Book Your Demo</h2>
      <p className="mt-1 text-base text-slate-500">
        Fill out the form and our team will reach out to confirm your demo.
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

        <FormField label="Industry" htmlFor="industry" error={form.errors.industry}>
          <Select id="industry" {...form.field("industry")}>
            <option value="">Select Industry</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="How many verifications do you process per month?"
          htmlFor="volume"
          error={form.errors.volume}
        >
          <Select id="volume" {...form.field("volume")}>
            <option value="">Select Range</option>
            {volumeRanges.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormField>

        <fieldset>
          <legend className="mb-2.5 text-sm font-medium text-ink-900">
            What would you like to focus on in the demo?
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <Checkbox
                key={area}
                label={area}
                checked={focus.includes(area)}
                onChange={() => toggleFocus(area)}
              />
            ))}
          </div>
        </fieldset>

        {form.submitError && <Alert tone="error">{form.submitError}</Alert>}

        <Button type="submit" variant="dark" className="w-full" disabled={form.isSubmitting}>
          {form.isSubmitting ? (
            <>
              <Spinner className="size-4" /> Requesting demo...
            </>
          ) : (
            "Request Demo"
          )}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-center text-base text-slate-500">
          <ShieldCheck className="size-3.5 text-teal-500" strokeWidth={2} />
          No spam. We respect your time and privacy.
        </p>
      </form>
    </>
  );
}
