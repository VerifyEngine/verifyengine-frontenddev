import { VERIFICATION_QUEUE, type VerificationStatus } from "./dashboard";

/*
 * Top Nav notifications — derived from the verification files, one per file
 * whose status is worth telling someone about, so the panel never shows an
 * event the rest of the platform does not know about.
 */

export type PlatformNotification = {
  id: string;
  title: string;
  detail: string;
  href: string;
  time: string;
  status: VerificationStatus;
};

const WORTH_TELLING: Partial<Record<VerificationStatus, string>> = {
  Escalated: "needs human review",
  Verified: "was verified",
  Unverified: "could not be verified",
};

export const NOTIFICATIONS: PlatformNotification[] = VERIFICATION_QUEUE.flatMap((row) => {
  const verb = WORTH_TELLING[row.status];
  if (!verb) return [];
  return [
    {
      id: row.fileNumber,
      title: `File ${row.fileNumber} ${verb}`,
      detail: `${row.applicant} · ${row.client}`,
      href: `/verifications/${row.fileNumber.replace("#", "")}`,
      time: row.lastAction,
      status: row.status,
    },
  ];
});
