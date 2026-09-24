"use client";

import { IconCheck, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { iconProps } from "./icon";
import type { CompanyUserRole } from "@/lib/platform/company";
import { DEFAULT_GRANTS, PERMISSIONS, ROLES, type Permission } from "@/lib/platform/roles";

/*
 * Permission matrix — one column per role, one row per area. Super Admin is
 * locked on, so the account can never lose the last role able to edit roles.
 */

type Grants = Record<CompanyUserRole, readonly Permission[]>;

export function RolesMatrix() {
  const [grants, setGrants] = useState<Grants>(DEFAULT_GRANTS);
  const [dirty, setDirty] = useState(false);

  function toggle(role: CompanyUserRole, permission: Permission) {
    setGrants((current) => {
      const has = current[role].includes(permission);
      return {
        ...current,
        [role]: has
          ? current[role].filter((value) => value !== permission)
          : [...current[role], permission],
      };
    });
    setDirty(true);
  }

  return (
    <section
      aria-label="Permissions"
      className="flex flex-col gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-heading-xs text-app-heading">Permissions</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!dirty}
            onClick={() => {
              setGrants(DEFAULT_GRANTS);
              setDirty(false);
            }}
            className="rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-2 text-label-2xs text-app-text transition-colors hover:bg-app-fade-48 disabled:opacity-40"
          >
            Reset
          </button>
          <button
            type="button"
            disabled={!dirty}
            onClick={() => setDirty(false)}
            className="rounded-app-l bg-app-brand1 px-4 py-2 text-label-2xs text-app-text-inverse transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-app-l border-w-2xs border-app-line">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-app-brand1">
            <tr>
              <th className="px-4 py-3 text-table-heading text-app-text-inverse">Area</th>
              {ROLES.map(({ role }) => (
                <th key={role} className="px-4 py-3 text-center text-table-heading text-app-text-inverse">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((permission) => (
              <tr key={permission} className="border-t-[0.6px] border-app-line bg-app-fade-48">
                <th scope="row" className="px-4 py-3 text-body-xs font-normal text-app-text">
                  {permission}
                </th>
                {ROLES.map(({ role }) => {
                  const on = grants[role].includes(permission);
                  const locked = role === "Super Admin";
                  return (
                    <td key={role} className="px-4 py-3 text-center">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        aria-label={`${role}: ${permission}`}
                        disabled={locked}
                        onClick={() => toggle(role, permission)}
                        className={`inline-flex size-6 items-center justify-center rounded-app-xs border-w-s transition-colors ${
                          on
                            ? "border-app-line-brand1 bg-app-brand1 text-app-text-inverse"
                            : "border-app-line bg-app-surface text-transparent hover:border-app-line-brand1"
                        } ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                      >
                        {locked ? <IconLock {...iconProps(12)} /> : <IconCheck {...iconProps(12)} />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
