import { VERIFICATION_QUEUE, type VerificationRow, type VerificationStatus } from "./dashboard";

/*
 * Applicants — derived from the verification files rather than kept as a
 * second list, so the two can never disagree. Contact details are left out on
 * purpose: the mock has none, and they come from the applicants endpoint.
 */

export type ApplicantRow = {
  name: string;
  files: readonly VerificationRow[];
  latestStatus: VerificationStatus;
  property: string;
  client: string;
  lastAction: string;
};

export const APPLICANTS: ApplicantRow[] = Object.values(
  VERIFICATION_QUEUE.reduce<Record<string, VerificationRow[]>>((groups, row) => {
    (groups[row.applicant] ??= []).push(row);
    return groups;
  }, {}),
).map((files) => {
  const latest = files[0];
  return {
    name: latest.applicant,
    files,
    latestStatus: latest.status,
    property: latest.property,
    client: latest.client,
    lastAction: latest.lastAction,
  };
});
