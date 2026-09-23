import { IconCircleCheck, IconClock } from "@tabler/icons-react";
import { ToggleSwitch } from "@/components/platform/client-profile/ToggleSwitch";
import { OUTLINE_BUTTON, Panel, SettingText } from "@/components/platform/company/CompanyTabs";
import { iconProps } from "@/components/platform/icon";
import { AUDIT_LOG, COMPLIANCE_STATUSES } from "@/lib/platform/company";

/*
 * Security & Compliance — Figma node 18514:53895.
 *
 * Security settings beside compliance status, then the recent audit log.
 * Session Timeout and IP Allowlist are drawn empty, so they are empty fields
 * here too rather than a value the design never gave.
 */

const FIELD =
  "w-full rounded-app-m border-w-2xs border-app-line bg-app-surface px-3 py-2.5 text-body-xs text-app-heading outline-none placeholder:text-app-text-tertiary focus:border-app-line-brand1";

const COLUMNS = ["Timestamp", "Action", "User", "IP Address"] as const;

export function SecurityTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Security Settings">
          <div className="flex items-center gap-3">
            <SettingText label="Enforce Two-Factor Auth" description="Require 2FA for all admin users" />
            <ToggleSwitch label="Enforce Two-Factor Auth" defaultOn tone="brand1" />
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-label-2xs text-app-heading">Session Timeout</span>
            <input type="text" name="session-timeout" className={FIELD} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-label-2xs text-app-heading">IP Allowlist</span>
            <textarea name="ip-allowlist" rows={4} className={`${FIELD} resize-none`} />
          </label>
        </Panel>

        <Panel title="Compliance Status">
          <ul className="flex flex-col">
            {COMPLIANCE_STATUSES.map((status) => {
              const compliant = status.state === "Compliant";
              return (
                <li
                  key={status.label}
                  className="flex items-center gap-3 border-b border-app-line-brand2 py-3 first:pt-0 last:border-b-0"
                >
                  <SettingText label={status.label} description={status.verified} />
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-body-2xs font-semibold ${
                      compliant ? "bg-app-success/10 text-app-success" : "bg-app-accent/10 text-app-accent"
                    }`}
                  >
                    {compliant ? <IconCircleCheck {...iconProps(12)} /> : <IconClock {...iconProps(12)} />}
                    {status.state}
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <Panel
        title="Recent Audit Log"
        action={
          <button type="button" className={OUTLINE_BUTTON}>
            View Full Log
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="border-b border-app-line-brand2 pb-2 text-nav-heading font-normal tracking-[0.05em] text-app-text-tertiary uppercase"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AUDIT_LOG.map((row) => (
                <tr key={`${row.timestamp}-${row.action}`} className="border-b border-app-line-brand2 last:border-b-0">
                  <td className="py-2.5 font-mono text-body-2xs text-app-text-tertiary">{row.timestamp}</td>
                  <td className="py-2.5 text-body-2xs text-app-heading">{row.action}</td>
                  <td className="py-2.5 text-body-2xs text-app-text-secondary">{row.user}</td>
                  <td className="py-2.5 font-mono text-body-2xs text-app-text-tertiary">{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
