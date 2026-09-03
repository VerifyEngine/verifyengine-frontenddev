"use client";

import { Mail } from "lucide-react";
import { Button, Container } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";
import { Reveal } from "@/components/ui/Reveal";
import { useForm } from "@/lib/useForm";
import { required, email } from "@/lib/validation";
import { api } from "@/lib/api";

/** Navy newsletter sign-up band used across the resource pages. */
export function NewsletterBand({
  title = "Stay Informed",
  description = "Get the latest verification insights, compliance updates, and product news delivered to your inbox.",
}: {
  title?: string;
  description?: string;
}) {
  const form = useForm({
    initialValues: { email: "" },
    rules: { email: [required("Enter your email"), email()] },
    onSubmit: async (values) => {
      await api.post("/newsletter", values, { mock: { ok: true } });
    },
  });

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-7 rounded-2xl bg-navy-900 px-6 py-9 text-center lg:flex-row lg:justify-between lg:px-10 lg:text-left">
            <div className="flex items-center gap-5">
              <span className="hidden size-16 shrink-0 items-center justify-center rounded-full border border-dashed border-white/25 text-mint-200 sm:flex">
                <Mail className="size-7" strokeWidth={1.5} />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
                <p className="mt-1.5 max-w-md text-base text-white/60">{description}</p>
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-auto">
              {form.isSuccess ? (
                <Alert tone="success" title="You're subscribed">
                  Thanks — look out for our next issue.
                </Alert>
              ) : (
                <form onSubmit={form.handleSubmit} noValidate>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {/* field() already supplies value, handlers and invalid. */}
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="sm:w-64"
                      {...form.field("email")}
                    />
                    <Button type="submit" variant="primary" disabled={form.isSubmitting}>
                      {form.isSubmitting ? (
                        <>
                          <Spinner className="size-4" /> Subscribing
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                  </div>
                  {form.errors.email && (
                    <p className="mt-2 text-left text-xs font-medium text-rose-300">
                      {form.errors.email}
                    </p>
                  )}
                  <p className="mt-2 text-left text-sm text-white/50">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
