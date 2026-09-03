"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";
import { useForm } from "@/lib/useForm";
import { required, email } from "@/lib/validation";
import { api } from "@/lib/api";

/** Compact newsletter sign-up for article sidebars. */
export function NewsletterCard() {
  const form = useForm({
    initialValues: { email: "" },
    rules: { email: [required("Enter your email"), email()] },
    onSubmit: async (values) => {
      await api.post("/newsletter", values, { mock: { ok: true } });
    },
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-6">
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-24 w-32 opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mint-200) 1.2px, transparent 1.2px)",
          backgroundSize: "12px 12px",
        }}
      />
      <p className="relative text-lg font-bold text-white">Stay Updated</p>
      <p className="relative mt-2 text-sm leading-relaxed text-white/65">
        Get the latest verification insights, compliance updates, and product news delivered to
        your inbox.
      </p>

      {form.isSuccess ? (
        <div className="relative mt-4">
          <Alert tone="success" title="You're subscribed">
            Thanks — look out for our next issue.
          </Alert>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit} noValidate className="relative mt-4">
          {/* field() already supplies value, handlers and invalid. */}
          <Input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            {...form.field("email")}
          />
          {form.errors.email && (
            <p className="mt-1.5 text-xs font-medium text-rose-300">{form.errors.email}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            className="mt-3 w-full"
            disabled={form.isSubmitting}
          >
            {form.isSubmitting ? (
              <>
                <Spinner className="size-4" /> Subscribing
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}
