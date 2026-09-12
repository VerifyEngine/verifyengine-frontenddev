"use client";

import { useState } from "react";
import { IconCircle, IconCircleCheckFilled, IconPlus, IconTrash } from "@tabler/icons-react";
import { iconProps } from "./icon";
import { FormField, FormSelect } from "./FormField";
import type { RuleDraft } from "@/lib/platform/client-configuration";

/*
 * Rules editor — Figma node 18176:28344.
 *
 * Each row is a hairline band holding an enable toggle, five fields and a
 * delete action. Figma draws six rows in three states: enabled with values,
 * enabled but empty, and disabled (the whole row at reduced opacity with an
 * empty circle).
 *
 * The rows are real state rather than static markup: Add Rule and the bin are
 * drawn as controls, and a rules editor where you cannot add or remove a rule
 * would be a picture of one. Nothing is persisted — there is no endpoint yet —
 * so this is local state that Save Configuration will later post.
 */

const TYPES = ["If", "And", "Or"] as const;
const APPLIES_FOR = [
  "NSF Count",
  "Late Payments",
  "Eviction Filed",
  "Lease Violations",
  "Property Damage",
  "Landlord Response",
] as const;
const CONDITIONS = [
  "Greater Than or Equal",
  "Greater Than",
  "Less Than",
  "Equal To",
  "Not Equal To",
] as const;
const RESULTS = ["Pass", "Review", "Fail"] as const;

let nextId = 0;

export function VerificationRuleRows({ initialRules }: { initialRules: readonly RuleDraft[] }) {
  const [rules, setRules] = useState<RuleDraft[]>(() =>
    initialRules.map((rule) => ({ ...rule })),
  );

  function toggle(id: string) {
    setRules((current) =>
      current.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)),
    );
  }

  function remove(id: string) {
    setRules((current) => current.filter((rule) => rule.id !== id));
  }

  function add() {
    nextId += 1;
    setRules((current) => [
      ...current,
      { id: `new-${nextId}`, enabled: true, type: "", appliesFor: "", condition: "", value: "", result: "" },
    ]);
  }

  return (
    <div className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-4 backdrop-blur-[12px] sm:p-5">
      <div className="flex items-center gap-4">
        <h3 className="min-w-px flex-1 text-label-xs text-app-text">Rules</h3>
        <button
          type="button"
          onClick={add}
          className="flex shrink-0 items-center gap-1 rounded-app-7xl border-w-2xs border-app-line-brand2 bg-app-brand2-tertiary px-3 py-1.5 text-app-text-brand1 transition-opacity hover:opacity-80"
        >
          <IconPlus {...iconProps(12)} />
          <span className="whitespace-nowrap text-label-2xs">Add Rule</span>
        </button>
      </div>

      <div className="flex flex-col overflow-hidden rounded-app-l">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`flex flex-col gap-5 border-w-2xs border-app-line p-4 sm:flex-row sm:items-center sm:p-5 ${
              rule.enabled ? "" : "opacity-50"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(rule.id)}
              aria-pressed={rule.enabled}
              aria-label={rule.enabled ? "Disable rule" : "Enable rule"}
              className={`shrink-0 ${rule.enabled ? "text-app-success" : "text-app-text-tertiary"}`}
            >
              {rule.enabled ? (
                <IconCircleCheckFilled {...iconProps(20)} />
              ) : (
                <IconCircle {...iconProps(20)} />
              )}
            </button>

            <div className="grid min-w-px flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <FormSelect
                name={`${rule.id}-type`}
                label="Type"
                placeholder="Select an option..."
                options={TYPES}
                defaultValue={rule.type}
              />
              <FormSelect
                name={`${rule.id}-applies-for`}
                label="Applies For"
                placeholder="Select an option..."
                options={APPLIES_FOR}
                defaultValue={rule.appliesFor}
              />
              <FormSelect
                name={`${rule.id}-condition`}
                label="Condition"
                placeholder="Select an option..."
                options={CONDITIONS}
                defaultValue={rule.condition}
              />
              <FormField
                name={`${rule.id}-value`}
                label="Condition Value"
                placeholder="Type here..."
                defaultValue={rule.value}
              />
              <FormSelect
                name={`${rule.id}-result`}
                label="Result"
                placeholder="Select an option..."
                options={RESULTS}
                defaultValue={rule.result}
              />
            </div>

            <button
              type="button"
              onClick={() => remove(rule.id)}
              aria-label="Delete rule"
              className="shrink-0 self-end text-app-warning transition-opacity hover:opacity-70 sm:self-center"
            >
              <IconTrash {...iconProps(20)} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
