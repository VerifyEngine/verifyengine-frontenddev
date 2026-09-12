import type { Metadata } from "next";
import { FormCard, FormPanel } from "@/components/platform/FormCard";
import { FormSelect } from "@/components/platform/FormField";
import { PageHeader } from "@/components/platform/PageHeader";
import { RuleExamplesCard } from "@/components/platform/RuleExamplesCard";
import { VerificationRuleRows } from "@/components/platform/VerificationRuleRows";
import {
  CLIENT_OPTIONS,
  INITIAL_RULES,
  RULE_EXAMPLES,
} from "@/lib/platform/client-configuration";

export const metadata: Metadata = { title: "Client Configuration" };

/*
 * Client Configuration — Figma node 18176:28313.
 *
 * One rules card at 1192 beside a 320 aside, the same split the New Order
 * screen uses. Drawn only in the Dark Mode section of the file; every colour
 * here is a token with a light value, so the light theme falls out of the
 * same markup.
 */
export default function ClientConfigurationPage() {
  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Clients", "Client Configuration"]}
        title="Client Configuration"
        description="Configure pass/review/fail criteria for verification results"
        showSearch={false}
        actions={[
          { label: "Cancel", icon: "cancel" },
          { label: "Save Configuration", icon: "check", primary: true },
        ]}
        utilities={[{ label: "Reset to Default", icon: "refresh" }]}
        note="Auto saved 2 min ago"
      />

      <div className="flex flex-col gap-2 xl:flex-row xl:items-start">
        <div className="flex min-w-px flex-1 flex-col gap-2">
          <FormCard title="Verification Rules">
            <div className="flex flex-col gap-4">
              <p className="-mt-6 text-body-xs text-app-text-secondary">
                Define conditions that determine pass, review, or fail outcomes
              </p>

              <FormPanel className="sm:max-w-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex min-w-px flex-1 flex-col gap-1">
                    <p className="text-label-xs text-app-text">Clients</p>
                    <p className="text-label-2xs text-app-text-tertiary">
                      Select the clients to apply this rule to.
                    </p>
                  </div>
                  <FormSelect
                    name="configuration-clients"
                    label="&nbsp;"
                    placeholder="Select Clients..."
                    options={CLIENT_OPTIONS}
                    className="sm:w-48"
                  />
                </div>
              </FormPanel>

              <VerificationRuleRows initialRules={INITIAL_RULES} />
            </div>
          </FormCard>
        </div>

        <div className="xl:sticky xl:top-0 xl:w-80 xl:shrink-0">
          <RuleExamplesCard title="Rule Examples" groups={RULE_EXAMPLES} />
        </div>
      </div>
    </div>
  );
}
