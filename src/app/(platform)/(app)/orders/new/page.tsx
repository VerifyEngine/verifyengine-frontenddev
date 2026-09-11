import type { Metadata } from "next";
import { ConsentCheckbox } from "@/components/platform/ConsentCheckbox";
import { FormCard, FormPanel } from "@/components/platform/FormCard";
import { FormField, FormPhoneField } from "@/components/platform/FormField";
import { FormProgressList } from "@/components/platform/FormProgressList";
import { PageHeader } from "@/components/platform/PageHeader";
import { PreferenceRadioList } from "@/components/platform/PreferenceRadioList";
import { PropertyFieldset } from "@/components/platform/PropertyFieldset";
import { UploadDropzone } from "@/components/platform/UploadDropzone";
import { VerificationProcessCard } from "@/components/platform/VerificationProcessCard";
import {
  CONSENT_STATEMENT,
  NAME_FIELDS,
  NEW_ORDER_SECTIONS,
  VERIFICATION_PREFERENCES,
  VERIFICATION_PROCESS,
} from "@/lib/platform/new-order";

export const metadata: Metadata = { title: "New Order" };

/*
 * New Order — Figma node 18113:32057 (light) / 18122:22570 (dark).
 *
 * Two columns below xl-and-up: the form at 1192 and a 320 aside that stays in
 * view while the form scrolls. The design draws the aside once at the top of a
 * 2534-tall page, so sticking it is an inference — without it the process
 * card and the section index scroll away after the first block, which is the
 * opposite of what an index is for. Below xl the aside moves above the form,
 * since the file only specifies 1920.
 *
 * The form posts nowhere yet: there is no backend endpoint for orders, and
 * inventing one would put a real submit behind a button that cannot work. The
 * markup is a real <form> so that wiring it later is one action away.
 */
export default function NewOrderPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Order", "New Order"]}
        title="Create New Verification Order"
        description="Submit applicant and lease information to initiate AI-powered verification workflow."
        showSearch={false}
        actions={[
          { label: "Cancel", icon: "cancel" },
          { label: "Create Order", icon: "check", primary: true },
        ]}
        note="Auto saved 2 min ago"
      />

      <div className="flex flex-col gap-2 xl:flex-row xl:items-start">
        <form className="flex min-w-px flex-1 flex-col gap-2">
          <FormCard id={NEW_ORDER_SECTIONS[0].id} title="Applicant Details">
            <FormPanel label="Tenant Information">
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr_1fr]">
                {NAME_FIELDS.map((field) => (
                  <FormField
                    key={field.name}
                    name={`tenant-${field.name}`}
                    label={field.label}
                    placeholder="Type here..."
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <FormField
                  name="tenant-email"
                  label="Email Address"
                  placeholder="example@email.com"
                  type="email"
                  icon="mail"
                />
                <FormPhoneField name="tenant-phone" label="Phone Number" />
                <FormField
                  name="applicant-reference"
                  label="Applicant Reference #"
                  placeholder="REF-2024-001"
                  icon="hash"
                />
              </div>
            </FormPanel>
          </FormCard>

          <FormCard id={NEW_ORDER_SECTIONS[1].id} title="Property & Landlord Details">
            <div className="flex flex-col gap-4">
              <PropertyFieldset index={1} />
              <PropertyFieldset index={2} />
            </div>
          </FormCard>

          <FormCard id={NEW_ORDER_SECTIONS[2].id} title="Upload Consent & Authorization">
            <FormPanel label="Lease Documentation">
              <UploadDropzone />
            </FormPanel>
          </FormCard>

          <FormCard id={NEW_ORDER_SECTIONS[3].id} title="Consent & Legal">
            <FormPanel className="gap-2">
              <ConsentCheckbox>{CONSENT_STATEMENT}</ConsentCheckbox>
            </FormPanel>
          </FormCard>

          <FormCard id={NEW_ORDER_SECTIONS[4].id} title="Verification Preferences">
            <PreferenceRadioList
              name="verification-preference"
              legend="Verification Preferences"
              options={VERIFICATION_PREFERENCES}
              defaultValue="sms"
            />
          </FormCard>
        </form>

        <div className="flex flex-col gap-2 xl:sticky xl:top-0 xl:w-80 xl:shrink-0">
          <VerificationProcessCard {...VERIFICATION_PROCESS} />
          <FormProgressList sections={NEW_ORDER_SECTIONS} />
        </div>
      </div>
    </div>
  );
}
