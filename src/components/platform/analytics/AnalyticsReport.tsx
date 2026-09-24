import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconCurrencyDollar,
  IconShield,
  IconTrendingDown,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Wordmark } from "../Wordmark";
import { iconProps } from "../icon";
import { BarChart, HorizontalBars, LineChart, RiskMap, Ring } from "./ReportCharts";
import { TONE_COLOR } from "./tones";
import {
  COMPLETION,
  COMPLETION_TIME,
  DECISIONS_BY_MONTH,
  DENIAL_REASONS,
  ESCALATION,
  FOOTER,
  FRAUD_TREND,
  FUNNEL,
  HIGHLIGHTS,
  KPIS,
  MONTHS,
  OUTCOMES,
  OUTREACH,
  QUALITY_TREND,
  REPORT_META,
  SCORE_DISTRIBUTION,
  SCREENING_VOLUME,
  STATE_RISK,
  type Kpi,
} from "@/lib/platform/analytics";

/*
 * The report card of Analytics Reports — Figma container 18335:54704.
 *
 * A white document of full-width bands split by hairlines: title, summary,
 * KPIs, three rows of four charts, the benchmark note and the footer. The
 * frame is set in DM Sans at odd sizes (9.9, 11, 22px — an export scaled
 * 1.104x); it uses the platform's Satoshi and type utilities instead, the
 * same call made for Create Report. Flagged.
 *
 * At 3xl the bands hold four columns as drawn; narrower they fold to two, then
 * one, and the KPI strip to four, then two.
 */

const BAND = "border-t-[1.1px] border-app-line px-4 py-5 sm:px-9";
const EYEBROW = "text-[calc(10px*var(--ve-type-scale))] font-bold uppercase tracking-[0.11em] text-app-heading";
const CHART_GRID = "grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 3xl:grid-cols-4";

function Block({ title, children, legend }: { title: string; children: ReactNode; legend?: ReactNode }) {
  return (
    <div className="flex min-w-px flex-col gap-3">
      <h3 className={EYEBROW}>{title}</h3>
      {children}
      {legend}
    </div>
  );
}

function Legend({ items }: { items: readonly { label: string; color: string; line?: boolean }[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5 text-body-2xs" style={{ color: item.line ? undefined : item.color }}>
          {item.line ? (
            <svg viewBox="0 0 16 8" className="h-2 w-4" aria-hidden>
              <line x1="0" x2="16" y1="4" y2="4" stroke={item.color} strokeWidth="1.5" />
              <circle cx="8" cy="4" r="2.5" fill="var(--ve-surface-default)" stroke={item.color} strokeWidth="1.5" />
            </svg>
          ) : (
            <span aria-hidden className="size-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
          )}
          <span className={item.line ? "text-app-text" : ""}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function KpiIcon({ icon }: { icon: Kpi["icon"] }) {
  if (icon === "users") return <IconUsers {...iconProps(12)} />;
  if (icon === "check") return <IconCircleCheck {...iconProps(12)} />;
  if (icon === "x") return <IconCircleX {...iconProps(12)} />;
  if (icon === "shield") return <IconShield {...iconProps(12)} />;
  if (icon === "clock") return <IconClock {...iconProps(12)} />;
  if (icon === "dollar") return <IconCurrencyDollar {...iconProps(12)} />;
  return <IconAlertTriangle {...iconProps(12)} />;
}

function ReportHeader() {
  return (
    <header className="flex flex-col gap-3 px-4 pt-6 pb-5 sm:px-9">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Wordmark className="h-6 w-auto text-[var(--ve-wordmark)]" />
          <span className="text-heading-xs font-medium text-app-text">Analytics Reports</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-right">
            <span className="text-heading-xs font-extrabold tracking-[-0.025em] text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">
              {REPORT_META.client}
            </span>
            <span className="text-[calc(10px*var(--ve-type-scale))] font-semibold tracking-[0.1em] text-app-text-tertiary uppercase">
              {REPORT_META.clientKind}
            </span>
          </div>
          <span className="flex size-[53px] shrink-0 items-center justify-center rounded-app-m border-w-2xs border-app-line bg-app-surface p-3">
            <Image src="/images/platform-abc-logo.png" alt={`${REPORT_META.client} logo`} width={50} height={50} className="size-full object-cover" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[calc(10px*var(--ve-type-scale))] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-2xs text-app-text-tertiary">{REPORT_META.subtitle}</p>
        <p className="flex flex-wrap gap-x-3 text-app-text-tertiary">
          <span><strong className="text-app-text-brand1-secondary">Period:</strong> {REPORT_META.period}</span>
          <span aria-hidden>·</span>
          <span><strong className="text-app-text-brand1-secondary">Generated:</strong> {REPORT_META.generated}</span>
          <span aria-hidden>·</span>
          <span><strong className="text-app-text-brand1-secondary">By:</strong> {REPORT_META.by}</span>
        </p>
      </div>
    </header>
  );
}

function Summary() {
  return (
    <section className={`${BAND} grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:grid-cols-[646fr_379fr_513fr]`}>
      <div className="flex flex-col gap-2 lg:col-span-2 3xl:col-span-1">
        <h2 className={EYEBROW}>Executive Summary</h2>
        <p className="h-full rounded-[15px] border-[1.1px] border-app-surface bg-app-brand2-quaternary p-4 text-body-xs leading-[1.72] text-app-text">
          Approval rates increased <strong>8%</strong> compared to the previous period while fraud flags decreased by{" "}
          <strong>11%</strong>. Average turnaround time improved from 14.2 hours to <strong>8.6 hours</strong>, demonstrating
          strong operational efficiency gains. Geographic risk concentrations remained highest in <strong>Texas</strong> and{" "}
          <strong>Florida</strong> markets. The average VE Score™ reached <strong>742</strong>, outperforming 68% of comparable
          portfolios nationally.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={EYEBROW}>Key Highlights</h2>
        <ul className="flex h-full flex-col gap-2 rounded-[15px] bg-app-brand1 p-4">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-body-2xs text-app-text-inverse">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-white" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className={EYEBROW}>Application Outcomes Overview</h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Ring
            total={OUTCOMES.total}
            size={146}
            thickness={16}
            slices={OUTCOMES.rows.map((row) => ({ label: row.label, percent: row.percent, color: TONE_COLOR[row.tone] }))}
          />
          <ul className="flex w-full min-w-px flex-1 flex-col gap-3">
            {OUTCOMES.rows.map((row) => (
              <li key={row.label} className="flex flex-col gap-0.5">
                <span className="flex items-center justify-between text-body-2xs">
                  <span className="flex items-center gap-1.5 text-app-text">
                    <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: TONE_COLOR[row.tone] }} />
                    {row.label}
                  </span>
                  <strong className="text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">{row.percent}%</strong>
                </span>
                <span className="h-1 overflow-hidden rounded-full bg-app-brand1-quaternary">
                  <span className="block h-full rounded-full" style={{ width: `${row.percent}%`, backgroundColor: TONE_COLOR[row.tone] }} />
                </span>
                <span className="text-[calc(9px*var(--ve-type-scale))] text-app-text-tertiary">{row.applicants}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Kpis() {
  return (
    <section aria-label="Key indicators" className={`${BAND} grid grid-cols-2 gap-3 md:grid-cols-4 3xl:grid-cols-8`}>
      {KPIS.map((kpi) => (
        <div key={kpi.label} className="flex flex-col gap-1.5 rounded-[15px] bg-app-surface py-3">
          <span className="flex items-center justify-between">
            <span className="flex size-[22px] items-center justify-center rounded-[9px] bg-app-brand1-quaternary text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">
              <KpiIcon icon={kpi.icon} />
            </span>
            <span className="flex items-center gap-1 text-[calc(9px*var(--ve-type-scale))] font-semibold text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">
              {kpi.trend === "up" ? <IconTrendingUp {...iconProps(12)} /> : <IconTrendingDown {...iconProps(12)} />}
              {kpi.delta}
            </span>
          </span>
          <span className="text-heading-s text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">{kpi.value}</span>
          <span className="text-[calc(9px*var(--ve-type-scale))] text-app-text-tertiary">{kpi.label}</span>
        </div>
      ))}
    </section>
  );
}

function ChartsRowOne() {
  return (
    <section aria-label="Volume and outcomes" className={`${BAND} ${CHART_GRID}`}>
      <Block title="Screening Volume Over Time" legend={<Legend items={[{ label: "Applications", color: "var(--ve-surface-brand1)", line: true }]} />}>
        <LineChart name="Screening volume over time" values={SCREENING_VOLUME.values} categories={MONTHS} ticks={SCREENING_VOLUME.ticks} color="var(--ve-surface-brand1)" />
      </Block>
      <Block
        title="Approval / Review / Denial by Month"
        legend={<Legend items={[{ label: "Approved", color: TONE_COLOR.success }, { label: "Review", color: TONE_COLOR.highlight }, { label: "Denied", color: TONE_COLOR.warning }]} />}
      >
        <BarChart name="Decisions by month" ticks={DECISIONS_BY_MONTH.ticks} bars={MONTHS.map((month, index) => ({ label: month, value: DECISIONS_BY_MONTH.values[index], color: TONE_COLOR.warning }))} />
      </Block>
      <Block title="Completion Ratio">
        <div className="flex items-center gap-5">
          <Ring total={COMPLETION.total} size={110} thickness={18} slices={COMPLETION.slices.map((slice) => ({ label: slice.label, percent: slice.percent, color: TONE_COLOR[slice.tone] }))} />
          <ul className="flex min-w-px flex-1 flex-col gap-2.5">
            {COMPLETION.slices.map((slice) => (
              <li key={slice.label} className="flex items-start justify-between gap-2 text-body-2xs">
                <span className="flex flex-col">
                  <span className="flex items-center gap-1.5" style={{ color: TONE_COLOR[slice.tone] }}>
                    <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: TONE_COLOR[slice.tone] }} />
                    {slice.label}
                  </span>
                  <span className="pl-3.5 text-[calc(8px*var(--ve-type-scale))] text-app-text-tertiary">{slice.count}</span>
                </span>
                <strong className="text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">{slice.percent}%</strong>
              </li>
            ))}
          </ul>
        </div>
      </Block>
      <Block title="Human Escalation Rate">
        <BarChart name="Human escalation rate" ticks={ESCALATION.ticks} format="percent" barCategoryGap="12%" bars={ESCALATION.bars.map((bar) => ({ label: bar.label, value: bar.value, color: TONE_COLOR[bar.tone] }))} />
      </Block>
    </section>
  );
}

function ChartsRowTwo() {
  return (
    <section aria-label="Speed and risk" className={`${BAND} ${CHART_GRID}`}>
      <Block title="Avg Completion Time (TAT)">
        <LineChart name="Average completion time" values={COMPLETION_TIME.values} categories={MONTHS} ticks={COMPLETION_TIME.ticks} color="var(--ve-surface-brand1)" format="hours" area />
      </Block>
      <Block title="Fraud Flag Trends (%)">
        <LineChart name="Fraud flag trend" values={FRAUD_TREND.values} categories={MONTHS} ticks={FRAUD_TREND.ticks} color="var(--ve-warning)" format="percent" />
      </Block>
      <Block title="Top Denial Reasons">
        <HorizontalBars name="Top denial reasons" ticks={DENIAL_REASONS.ticks} bars={DENIAL_REASONS.bars.map((bar) => ({ label: bar.label, value: bar.value, color: TONE_COLOR[bar.tone] }))} />
      </Block>
      <Block title="Geographic Tenant Risk Trends">
        <RiskMap states={STATE_RISK} />
      </Block>
    </section>
  );
}

function ChartsRowThree() {
  const top = Math.max(...FUNNEL.map((step) => step.value));
  return (
    <section aria-label="Quality and outreach" className={`${BAND} ${CHART_GRID}`}>
      <Block title="VE Score™ Distribution">
        <BarChart name="VE Score distribution" ticks={SCORE_DISTRIBUTION.ticks} barCategoryGap="18%" bars={SCORE_DISTRIBUTION.bars.map((bar) => ({ label: bar.label, value: bar.value, color: TONE_COLOR[bar.tone] }))} />
      </Block>
      <Block title="Applicant Quality Trend (Avg VE Score™)">
        <LineChart name="Applicant quality trend" values={QUALITY_TREND.values} categories={MONTHS} ticks={QUALITY_TREND.ticks} color="var(--ve-success)" />
      </Block>
      <Block
        title="Outreach Effectiveness"
        legend={<Legend items={[{ label: "Responded", color: "var(--ve-surface-brand1)" }, { label: "No Response", color: "var(--ve-text-tertiary)" }]} />}
      >
        <BarChart name="Outreach effectiveness" ticks={OUTREACH.ticks} format="percent" barCategoryGap="18%" bars={OUTREACH.bars.map((bar) => ({ label: bar.label, value: bar.value, color: "var(--ve-surface-brand1)" }))} />
      </Block>
      <Block title="Verification Funnel">
        <ul className="flex flex-col gap-2.5">
          {FUNNEL.map((step) => (
            <li key={step.label} className="flex items-center gap-2">
              <span className="min-w-px flex-[2]">
                <span
                  className="flex min-w-14 items-center rounded-[5px] px-2 py-1.5 text-label-2xs text-white"
                  style={{ width: `${(step.value / top) * 100}%`, backgroundColor: TONE_COLOR[step.tone] }}
                >
                  {step.display}
                </span>
              </span>
              <span className="min-w-px flex-1 text-[calc(9px*var(--ve-type-scale))] text-app-text-secondary">{step.label}</span>
            </li>
          ))}
        </ul>
      </Block>
    </section>
  );
}

function Benchmark() {
  return (
    <section className={BAND}>
      <div className="flex items-start gap-4 rounded-[15px] border-[1.1px] border-app-line-brand2 bg-app-brand2-quaternary p-4 sm:items-center sm:p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[15px] bg-app-success text-white">
          <IconTrendingUp {...iconProps(20)} />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-[calc(9.4px*var(--ve-type-scale))] font-bold tracking-[0.05em] text-app-success uppercase">VE Score™ Benchmark</p>
          <p className="text-body-xs text-app-text">
            Your average applicant VE Score™ of <strong className="text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">742</strong> is higher than{" "}
            <strong className="text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">68%</strong> of comparable portfolios nationally. Applicant quality has improved for{" "}
            <strong>6 consecutive months</strong> — a clear indicator of strengthened screening protocols and improved market positioning.
          </p>
        </div>
      </div>
    </section>
  );
}

function ReportFooter() {
  return (
    <footer className={`${BAND} grid grid-cols-1 items-center gap-4 lg:grid-cols-3`}>
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[9px] border-[1.1px] border-app-line-brand2 bg-app-brand2-quaternary">
          <Image src="/images/platform-ve-mark.svg" alt="" width={24} height={24} className="h-6" style={{ width: "auto" }} />
        </span>
        <span className="flex flex-col gap-0.5">
          <strong className="text-body-xs text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">VerifyEngine.ai</strong>
          <span className="text-[calc(9px*var(--ve-type-scale))] text-app-text-tertiary">AI-Powered Tenant Verification</span>
          <span className="text-[calc(9px*var(--ve-type-scale))] text-app-text-tertiary">
            Prepared for <strong className="text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">{FOOTER.preparedFor}</strong>
          </span>
        </span>
      </div>
      <p className="text-center text-[calc(9.4px*var(--ve-type-scale))] text-app-text-brand1-tertiary">
        <strong>CONFIDENTIAL</strong> — This report contains proprietary and confidential information intended solely for the use
        of the client identified above. Unauthorized distribution is strictly prohibited.
      </p>
      <dl className="flex flex-col gap-0.5 text-[calc(9.4px*var(--ve-type-scale))] text-app-text-tertiary lg:text-right">
        <div><dt className="inline font-bold">Generated:</dt> <dd className="inline">{FOOTER.generated}</dd></div>
        <div><dt className="inline font-bold">Report Version:</dt> <dd className="inline">{FOOTER.version}</dd></div>
        <div><dt className="inline font-bold">Report ID:</dt> <dd className="inline">{FOOTER.reportId}</dd></div>
        <div className="pt-1 font-semibold text-app-text-brand1 [[data-ve-theme=dark]_&]:text-app-text-brand2">Page 1 of 1</div>
      </dl>
    </footer>
  );
}

export function AnalyticsReport() {
  return (
    <article className="overflow-hidden rounded-app-xl border-w-2xs border-app-line bg-app-surface print:rounded-none print:border-0">
      <ReportHeader />
      <Summary />
      <Kpis />
      <ChartsRowOne />
      <ChartsRowTwo />
      <ChartsRowThree />
      <Benchmark />
      <ReportFooter />
    </article>
  );
}
