import type { Metadata } from "next";
import Link from "next/link";
import { InviteUserDialog } from "@/components/platform/InviteUserDialog";
import { PageHeader } from "@/components/platform/PageHeader";
import { RolesMatrix } from "@/components/platform/RolesMatrix";
import { ROLES, membersOf } from "@/lib/platform/roles";

export const metadata: Metadata = { title: "Roles & Permissions" };

/*
 * Roles & Permissions — no Figma frame. A card per role with its member
 * count, the permission matrix, and the Invite User dialog on ?invite=1.
 */
export default async function RolesPage({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string }>;
}) {
  const { invite } = await searchParams;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        breadcrumb={["Company", "Roles & Permissions"]}
        title="Roles & Permissions"
        description="Decide what each role can see and do, and invite people into the company."
        showSearch={false}
        actions={[
          { label: "View Users", icon: "review", href: "/company?tab=users" },
          { label: "Invite User", icon: "users-plus", primary: true, href: "/roles?invite=1" },
        ]}
        utilities={[]}
      />

      <section aria-label="Roles" className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {ROLES.map(({ role, summary }) => (
          <div
            key={role}
            className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-heading-xs text-app-heading">{role}</h2>
              <span className="rounded-app-7xl bg-app-brand1-16 px-2 py-0.5 text-label-2xs text-app-text">
                {membersOf(role)} {membersOf(role) === 1 ? "user" : "users"}
              </span>
            </div>
            <p className="text-body-xs text-app-text-secondary">{summary}</p>
            <Link
              href="/company?tab=users"
              className="mt-auto self-start text-label-2xs text-app-text-brand1 underline-offset-2 hover:underline [[data-ve-theme=dark]_&]:text-app-text-brand2"
            >
              See members
            </Link>
          </div>
        ))}
      </section>

      <RolesMatrix />

      {invite === "1" ? <InviteUserDialog /> : null}
    </div>
  );
}
