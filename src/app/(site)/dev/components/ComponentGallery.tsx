"use client";

import { useState } from "react";
import { Search, FileX2 } from "lucide-react";
import { Button, ArrowRight, Container } from "@/components/ui/Button";
import { PillBadge, Eyebrow, CalloutTag } from "@/components/ui/Badge";
import {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  DividerText,
} from "@/components/ui/Field";
import {
  Alert,
  Spinner,
  LoadingState,
  Skeleton,
  EmptyState,
  ErrorState,
} from "@/components/ui/Feedback";
import { Accordion } from "@/components/ui/Accordion";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Table, StatusBadge, type Column } from "@/components/ui/Table";
import { Breadcrumb, Pagination, Dropdown, DropdownItem } from "@/components/ui/Navigation";
import { useForm } from "@/lib/useForm";
import { required, email, workEmail, phone } from "@/lib/validation";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-slate-200 py-10">
      <h2 className="text-xl font-bold text-ink-900">{title}</h2>
      {hint && <p className="mt-1 text-sm text-slate-500">{hint}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

type Row = { id: number; applicant: string; type: string; status: string; tone: "success" | "info" | "warning" };

const rows: Row[] = [
  { id: 1, applicant: "John Smith", type: "Landlord", status: "Completed", tone: "success" },
  { id: 2, applicant: "Michael Brown", type: "Income", status: "Under Review", tone: "warning" },
  { id: 3, applicant: "Emily Davis", type: "Employment", status: "In Progress", tone: "info" },
];

const columns: Column<Row>[] = [
  { key: "applicant", header: "Applicant", cell: (r) => <span className="font-semibold text-ink-900">{r.applicant}</span> },
  { key: "type", header: "Type" },
  { key: "status", header: "Status", cell: (r) => <StatusBadge tone={r.tone}>{r.status}</StatusBadge> },
];

export function ComponentGallery() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(3);
  const [showEmpty, setShowEmpty] = useState(true);

  // A real, working form — submits to the mock path of the API client.
  const form = useForm({
    initialValues: { firstName: "", workEmail: "", phone: "", industry: "", notes: "" },
    rules: {
      firstName: [required("Tell us your first name")],
      workEmail: [required("Email is required"), email(), workEmail()],
      phone: [phone()],
      industry: [required("Pick an industry")],
    },
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 900));
      toast({ tone: "success", title: "Form submitted", description: "Validation passed." });
    },
  });

  return (
    <Container className="py-12">
      <Alert tone="warning" title="Development-only page">
        This gallery exists so shared components can be reviewed in isolation. It is not linked
        from the site and returns 404 in production.
      </Alert>

      <h1 className="mt-8 text-3xl font-bold text-ink-900">Component library</h1>
      <p className="mt-2 text-slate-600">Every shared component, interactive. Click things.</p>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="outline-light">Outline</Button>
          <Button size="lg">Large <ArrowRight /></Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-navy-900 p-4">
          <Button variant="outline-dark">On navy</Button>
          <Button variant="ghost-dark">Ghost</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-4">
          <Eyebrow>Section eyebrow</Eyebrow>
          <CalloutTag>Most popular</CalloutTag>
          <span className="rounded-xl bg-navy-900 p-3"><PillBadge>On dark</PillBadge></span>
        </div>
      </Section>

      <Section
        title="Form fields + validation"
        hint="Blur a field or submit empty to see validation. Try a gmail.com address in the work email."
      >
        <form onSubmit={form.handleSubmit} noValidate className="max-w-xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="First name" htmlFor="firstName" required error={form.errors.firstName}>
              <Input id="firstName" placeholder="Jane" {...form.field("firstName")} />
            </FormField>
            <FormField label="Phone" htmlFor="phone" error={form.errors.phone} hint="Optional">
              <Input id="phone" placeholder="(555) 123-4567" {...form.field("phone")} />
            </FormField>
          </div>

          <FormField label="Work email" htmlFor="workEmail" required error={form.errors.workEmail}>
            <Input id="workEmail" type="email" placeholder="jane@company.com" {...form.field("workEmail")} />
          </FormField>

          <FormField label="Industry" htmlFor="industry" required error={form.errors.industry}>
            <Select id="industry" {...form.field("industry")}>
              <option value="">Select an industry</option>
              <option value="landlord">Landlord / Property Management</option>
              <option value="employment">Employment Screening</option>
              <option value="financial">Financial Services</option>
            </Select>
          </FormField>

          <FormField label="Notes" htmlFor="notes">
            <Textarea id="notes" placeholder="Anything else we should know?" {...form.field("notes")} />
          </FormField>

          <Checkbox label="I agree to be contacted about Verify Engine." />

          {form.submitError && <Alert tone="error">{form.submitError}</Alert>}

          <Button type="submit" variant="dark" disabled={form.isSubmitting}>
            {form.isSubmitting ? <><Spinner className="size-4" /> Submitting...</> : "Submit form"}
          </Button>

          <DividerText>or</DividerText>
          <Button variant="outline-light" type="button" onClick={form.reset} className="w-full">
            Reset form
          </Button>
        </form>
      </Section>

      <Section title="Alerts">
        <div className="max-w-xl space-y-3">
          <Alert tone="success" title="Verification complete">All checks passed.</Alert>
          <Alert tone="info" title="Heads up">The report will be ready in a few minutes.</Alert>
          <Alert tone="warning" title="Action needed">Two fields need review.</Alert>
          <Alert tone="error" title="Request failed">We couldn&apos;t reach the server.</Alert>
        </div>
      </Section>

      <Section title="Toasts" hint="Click to fire a notification (auto-dismisses after 5s).">
        <div className="flex flex-wrap gap-3">
          {(["success", "info", "warning", "error"] as const).map((tone) => (
            <Button
              key={tone}
              variant="outline-light"
              onClick={() => toast({ tone, title: `${tone} toast`, description: "This is a sample notification." })}
            >
              {tone}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Modal">
        <Button variant="dark" onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete verification?"
          description="This action cannot be undone."
          footer={
            <>
              <Button variant="outline-light" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="dark" onClick={() => { setModalOpen(false); toast({ tone: "success", title: "Deleted" }); }}>
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-sm text-slate-600">
            Press Escape or click the backdrop to close. Page scroll is locked while open.
          </p>
        </Modal>
      </Section>

      <Section title="Accordion">
        <div className="max-w-2xl">
          <Accordion
            items={[
              { question: "How long does a verification take?", answer: "Most complete in minutes rather than days." },
              { question: "Is every report reviewed by a human?", answer: "Yes — a trained reviewer confirms each report before release." },
              { question: "Can I integrate with my screening platform?", answer: "Yes, through the API and supported integrations." },
            ]}
          />
        </div>
      </Section>

      <Section title="Table + status badges">
        <Table columns={columns} rows={rows} caption="Sample verifications" />
      </Section>

      <Section title="Navigation">
        <div className="space-y-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: "Landlord Verification" },
            ]}
          />
          <Pagination page={page} totalPages={12} onChange={setPage} />
          <Dropdown trigger={<span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium"><Search className="size-4" /> Filter</span>}>
            <DropdownItem onClick={() => toast({ tone: "info", title: "All selected" })}>All</DropdownItem>
            <DropdownItem onClick={() => toast({ tone: "info", title: "Completed selected" })}>Completed</DropdownItem>
            <DropdownItem onClick={() => toast({ tone: "info", title: "In progress selected" })}>In progress</DropdownItem>
          </Dropdown>
        </div>
      </Section>

      <Section title="Loading, empty and error states">
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200">
            <LoadingState label="Loading verifications..." />
          </div>

          <div className="max-w-md space-y-2 rounded-xl border border-slate-200 p-5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="rounded-xl border border-slate-200">
            {showEmpty ? (
              <EmptyState
                icon={FileX2}
                title="No verifications yet"
                description="Once you submit an applicant, their verification will appear here."
                action={<Button variant="dark" onClick={() => setShowEmpty(false)}>Show error state</Button>}
              />
            ) : (
              <ErrorState onRetry={() => setShowEmpty(true)} retryLabel="Back to empty state" />
            )}
          </div>
        </div>
      </Section>
    </Container>
  );
}
