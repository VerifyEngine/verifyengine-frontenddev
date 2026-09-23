import { AreaLineChart } from "../charts/AreaLineChart";
import { StackedBarChart } from "../charts/BarCharts";
import { CARD, Eyebrow, StatCard } from "./TabParts";
import {
  DENIAL_REASONS,
  PORTFOLIO_STATS,
  VE_SCORE_TREND,
} from "@/lib/platform/client-profile";

/*
 * Portfolio Analytics tab — Figma node 18398:226991 (named "Applicant
 * Scoring" in the file, but drawn as this tab).
 *
 * Four figures, then the average VE Score™ over six months beside the top
 * denial reasons. The score axis runs 720–765, as drawn, so the climb reads.
 */
export function PortfolioTab() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {PORTFOLIO_STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-[1.1fr_1fr]">
        <section className={`flex flex-col gap-2 pt-4 ${CARD}`}>
          <div className="px-4">
            <Eyebrow>Avg VE Score Trend</Eyebrow>
          </div>
          <AreaLineChart
            series={[{ label: "Avg VE Score", tone: "ink", values: VE_SCORE_TREND.values }]}
            labels={VE_SCORE_TREND.labels}
            min={VE_SCORE_TREND.min}
            max={VE_SCORE_TREND.max}
            yTicks={4}
            format="plain"
            heightClass="h-72"
            smooth
            dots
          />
        </section>
        <section className={`flex flex-col gap-2 pt-4 ${CARD}`}>
          <div className="px-4">
            <Eyebrow>Top Denial Reasons</Eyebrow>
          </div>
          <StackedBarChart
            rows={DENIAL_REASONS.map((reason) => ({ label: reason.label, values: [reason.value] }))}
            series={[{ label: "Denials", tone: "ink" }]}
            max={100}
            steps={4}
            format="plain"
            labelWidth={130}
            heightClass="h-72"
          />
        </section>
      </div>
    </div>
  );
}
