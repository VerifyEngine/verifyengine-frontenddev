import { CompanyFieldGrid, Panel } from "@/components/platform/company/CompanyTabs";
import {
  COMPANY_CONTRACT_FIELDS,
  COMPANY_INFO_FIELDS,
  COMPANY_MAILING_ADDRESS,
} from "@/lib/platform/company";

/** Company Profile — Figma node 18510:18577 (tab body 18513:50663). */
export function ProfileTab() {
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Company Information">
        <CompanyFieldGrid fields={COMPANY_INFO_FIELDS} />
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Mailing Address">
          <address className="flex flex-col gap-2 not-italic text-label-2xs text-app-heading">
            {COMPANY_MAILING_ADDRESS.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </Panel>
        <Panel title="Contract Details">
          <CompanyFieldGrid fields={COMPANY_CONTRACT_FIELDS} columns={2} />
        </Panel>
      </div>
    </div>
  );
}
