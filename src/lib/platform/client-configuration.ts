/*
 * Client Configuration — Figma node 18176:28313.
 *
 * The screen configures which conditions make a verification pass, go to
 * review, or fail. Nothing here is applicant data; it is the rule set the
 * design draws, which the backend will own once there is an endpoint for it.
 */

export type RuleDraft = {
  id: string;
  enabled: boolean;
  type: string;
  appliesFor: string;
  condition: string;
  value: string;
  result: string;
};

const EMPTY = { type: "", appliesFor: "", condition: "", value: "", result: "" };

/** The six rows Figma draws: filled, empty, disabled, filled, empty, disabled. */
export const INITIAL_RULES: readonly RuleDraft[] = [
  {
    id: "rule-1",
    enabled: true,
    type: "If",
    appliesFor: "NSF Count",
    condition: "Greater Than or Equal",
    value: "3",
    result: "Fail",
  },
  { id: "rule-2", enabled: true, ...EMPTY },
  { id: "rule-3", enabled: false, ...EMPTY },
  {
    id: "rule-4",
    enabled: true,
    type: "If",
    appliesFor: "NSF Count",
    condition: "Greater Than or Equal",
    value: "3",
    result: "Fail",
  },
  { id: "rule-5", enabled: true, ...EMPTY },
  { id: "rule-6", enabled: false, ...EMPTY },
];

export const CLIENT_OPTIONS = [
  "CutRite Lawn Care",
  "Rainbow Bay Crafts",
  "Electronic Geek",
  "Tam's Stationers",
  "Auto Works",
] as const;

export const RULE_EXAMPLES: readonly { heading: string; examples: readonly string[] }[] = [
  {
    heading: "Auto-Fail Rules",
    examples: ["3+ NSF → Fail", "Eviction Filed → Fail", "Severe Property Damage → Fail"],
  },
  {
    heading: "Manual Review Rules",
    examples: [
      "Missing Landlord Response → Review",
      "2+ Late Payments → Review",
      "2+ Lease Violations → Review",
    ],
  },
];
