import { COMPANY_USERS, type CompanyUserRole } from "./company";

/*
 * Roles & Permissions — no Figma frame. The five roles are the ones the
 * Company › Users table already assigns; the permission areas follow the
 * platform's own sections. The default grants are a starting point the
 * company edits, not a rule of the product.
 */

export const ROLES: readonly { role: CompanyUserRole; summary: string }[] = [
  { role: "Super Admin", summary: "Full access, including users, roles and billing." },
  { role: "Admin", summary: "Runs the account day to day; cannot change roles." },
  { role: "Manager", summary: "Oversees orders, verifications and clients." },
  { role: "Analyst", summary: "Works verification files and reports." },
  { role: "Viewer", summary: "Read-only access to dashboards and files." },
];

export const PERMISSIONS = [
  "View dashboards & reports",
  "Create orders",
  "Work verification files",
  "Override & escalate results",
  "Manage clients",
  "Billing & invoices",
  "Company settings",
  "Invite users & edit roles",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export const DEFAULT_GRANTS: Record<CompanyUserRole, readonly Permission[]> = {
  "Super Admin": PERMISSIONS,
  Admin: PERMISSIONS.filter((permission) => permission !== "Invite users & edit roles"),
  Manager: [
    "View dashboards & reports",
    "Create orders",
    "Work verification files",
    "Override & escalate results",
    "Manage clients",
  ],
  Analyst: ["View dashboards & reports", "Create orders", "Work verification files"],
  Viewer: ["View dashboards & reports"],
};

export function membersOf(role: CompanyUserRole) {
  return COMPANY_USERS.filter((user) => user.role === role).length;
}
