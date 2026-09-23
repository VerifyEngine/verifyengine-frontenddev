import { IconArrowRight } from "@tabler/icons-react";
import { iconProps } from "../icon";
import { TONE_VAR } from "../charts/tones";
import { VerificationRuleRows } from "../VerificationRuleRows";
import { ScoreModeControl } from "./ScoreModeControl";
import { CARD, Eyebrow } from "./TabParts";
import { ToggleSwitch } from "./ToggleSwitch";
import { INITIAL_RULES } from "@/lib/platform/client-configuration";
import {
  DECISION_ENGINE,
  DECISION_RULES,
  SCORE_MODES,
  SCORING_WEIGHTS,
  type DecisionRule,
} from "@/lib/platform/client-profile";

/*
 * Applicant Scoring tab — Figma node 18398:224906 and its Rules frames
 * 18495:16824 / 18495:16828.
 *
 * Decision engine switches beside the VE Score™ mode, scoring weights beside
 * the decision rules, then the same rules editor as Client Configuration and
 * the save bar.
 *
 * Figma draws every weight bar at the same quarter width whatever its share;
 * here each bar is as long as its weight, so 30% reads longer than 8%.
 */

const WEIGHT_TEXT: Record<(typeof SCORING_WEIGHTS)[number]["tone"], string> = {
  ink: "text-app-heading",
  information: "text-app-information",
  neutral: "text-app-neutral",
  warning: "text-app-warning",
  accent: "text-app-accent",
  success: "text-app-success",
};

const OUTCOME_TONE: Record<DecisionRule["tone"], string> = {
  warning: "bg-app-warning/10 text-app-warning",
  accent: "bg-app-accent/10 text-app-accent",
};

const BUTTON = "rounded-app-l px-4 py-2.5 text-label-2xs transition-opacity hover:opacity-90";

export function ScoringTab() {
  const total = SCORING_WEIGHTS.reduce((sum, weight) => sum + weight.weight, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="flex flex-col gap-3">
          <Eyebrow>Decision Engine</Eyebrow>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {DECISION_ENGINE.map((mode) => (
              <li key={mode.label} className={`flex items-start gap-3 p-4 ${CARD}`}>
                <div className="flex min-w-px flex-1 flex-col gap-1">
                  <p className="text-label-2xs text-app-heading">{mode.label}</p>
                  <p className="text-body-2xs text-app-text-tertiary">{mode.description}</p>
                </div>
                <ToggleSwitch label={mode.label} defaultOn={mode.enabled} />
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-3">
          <Eyebrow>VE Score™ Mode</Eyebrow>
          <div className={`p-1.5 ${CARD}`}>
            <ScoreModeControl modes={SCORE_MODES} />
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-app-line-brand2 pt-5 xl:grid-cols-2">
        <section className="flex flex-col gap-3">
          <Eyebrow
            action={
              <span className="rounded-full bg-app-brand2-40 px-2 py-0.5 text-body-2xs font-bold text-app-success">
                Total: {total}%
              </span>
            }
          >
            Scoring Weights
          </Eyebrow>
          <ul className="flex flex-col gap-4">
            {SCORING_WEIGHTS.map((weight) => (
              <li key={weight.label} className="flex flex-col gap-1.5">
                <p className="flex items-center justify-between gap-3">
                  <span className="text-label-2xs text-app-heading">{weight.label}</span>
                  <span className={`text-label-2xs font-bold ${WEIGHT_TEXT[weight.tone]}`}>{weight.weight}%</span>
                </p>
                <span
                  role="meter"
                  aria-label={weight.label}
                  aria-valuenow={weight.weight}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="block h-1.5 overflow-hidden rounded-full bg-app-brand2-16"
                >
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${weight.weight}%`, backgroundColor: TONE_VAR[weight.tone] }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <Eyebrow>Decision Rules</Eyebrow>
          <ul className="flex flex-col gap-2">
            {DECISION_RULES.map((rule) => (
              <li
                key={rule.field}
                className={`flex flex-wrap items-center gap-3 px-4 py-3 ${CARD} ${rule.enabled ? "" : "opacity-50"}`}
              >
                <span className="min-w-[calc(150px*var(--ve-type-scale))] text-label-2xs text-app-heading">
                  {rule.field}
                </span>
                <span className="rounded-app-xs bg-app-brand2-16 px-2 py-0.5 font-mono text-body-2xs text-app-text-tertiary">
                  {rule.condition}
                </span>
                <span className="text-app-text-tertiary">
                  <IconArrowRight {...iconProps(12)} />
                </span>
                <span className={`rounded-app-xs px-2 py-0.5 text-body-2xs font-bold ${OUTCOME_TONE[rule.tone]}`}>
                  {rule.outcome}
                </span>
                <span className="ml-auto">
                  <ToggleSwitch label={`${rule.field} rule`} defaultOn={rule.enabled} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <VerificationRuleRows initialRules={INITIAL_RULES} />

      <div className="flex flex-wrap justify-end gap-2">
        <button type="button" className={`border-w-2xs border-app-line-brand1 text-app-heading ${BUTTON}`}>
          Reset to Default
        </button>
        <button type="button" className={`bg-app-brand1 text-app-text-inverse ${BUTTON}`}>
          Save Configuration
        </button>
      </div>
    </div>
  );
}
