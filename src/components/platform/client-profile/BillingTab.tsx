import { IconDownload, IconFileText } from "@tabler/icons-react";
import { iconProps } from "../icon";
import { AreaLineChart } from "../charts/AreaLineChart";
import { FieldGrid } from "./ProfileTabs";
import { CARD, Eyebrow, EyebrowAction, Pill, StatCard } from "./TabParts";
import {
  BILLING_STATS,
  PLAN_FIELDS,
  PROFILE_INVOICES,
  REVENUE_TREND,
} from "@/lib/platform/client-profile";

/*
 * Billing & Revenue tab — Figma node 18397:220618.
 *
 * Four figures, then Revenue Trend beside Plan Details on tinted glass, then
 * the invoice history. The trend is the invoices themselves, oldest first.
 */

const GLASS = "rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16";

export function BillingTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {BILLING_STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
        <section className={`flex flex-col gap-2 pt-4 ${GLASS}`}>
          <div className="px-4">
            <Eyebrow>Revenue Trend</Eyebrow>
          </div>
          <AreaLineChart
            series={[{ label: "Revenue", tone: "success", values: REVENUE_TREND.values }]}
            labels={REVENUE_TREND.labels}
            max={60000}
            format="dollars"
            heightClass="h-48"
            dots
          />
        </section>
        <section className={`flex flex-col gap-3 p-4 ${GLASS}`}>
          <Eyebrow>Plan Details</Eyebrow>
          <FieldGrid fields={PLAN_FIELDS} />
        </section>
      </div>

      <section className="flex flex-col gap-3 border-t border-app-line-brand2 pt-5">
        <Eyebrow action={<EyebrowAction icon={<IconDownload {...iconProps(12)} />} label="Export All" />}>
          Invoice History
        </Eyebrow>
        <ul className={`flex flex-col overflow-hidden ${CARD}`}>
          {PROFILE_INVOICES.map((invoice) => (
            <li
              key={invoice.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-app-line-brand2 px-4 py-3 last:border-b-0"
            >
              <span className="text-app-text-tertiary">
                <IconFileText {...iconProps(16)} />
              </span>
              <span className="font-mono text-body-2xs text-app-text-secondary">{invoice.id}</span>
              <span className="text-body-2xs text-app-text-tertiary">{invoice.date}</span>
              <span className="min-w-px flex-1 text-label-2xs font-bold text-app-heading">{invoice.amount}</span>
              <Pill tone="success">{invoice.status}</Pill>
              <button type="button" className="text-body-2xs font-semibold text-app-neutral hover:opacity-70">
                Download
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
