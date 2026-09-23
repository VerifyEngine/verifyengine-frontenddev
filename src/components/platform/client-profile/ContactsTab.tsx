import { IconMail, IconPhone, IconPlus } from "@tabler/icons-react";
import { iconProps } from "../icon";
import { CARD, Eyebrow, EyebrowAction, Initials, Pill } from "./TabParts";
import { KEY_CONTACTS, TEAM_MEMBERS, TEAM_TOTAL } from "@/lib/platform/client-profile";

/*
 * Contacts tab — Figma node 18397:219237.
 *
 * Four key-contact cards in a row, then the first team members as a list of
 * rows with their role, last login and a Remove action.
 */
export function ContactsTab() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Eyebrow>Key Contacts</Eyebrow>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {KEY_CONTACTS.map((contact) => (
            <li key={contact.email} className={`flex gap-3 p-4 ${CARD}`}>
              <Initials name={contact.name} />
              <div className="flex min-w-px flex-1 flex-col gap-1">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-label-2xs font-bold text-app-heading">{contact.name}</span>
                  <span className="rounded-app-xs bg-app-brand2-16 px-1.5 py-0.5 text-body-2xs font-bold text-app-heading">
                    {contact.role}
                  </span>
                </p>
                <p className="text-body-2xs text-app-text-tertiary">{contact.title}</p>
                <p className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-body-2xs text-app-text-secondary">
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-app-heading">
                    <IconMail {...iconProps(12)} />
                    {contact.email}
                  </a>
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="flex items-center gap-1 hover:text-app-heading">
                    <IconPhone {...iconProps(12)} />
                    {contact.phone}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 border-t border-app-line-brand2 pt-5">
        <Eyebrow action={<EyebrowAction icon={<IconPlus {...iconProps(12)} />} label="Add Member" />}>
          Team Members ({TEAM_MEMBERS.length} of {TEAM_TOTAL})
        </Eyebrow>
        <ul className={`flex flex-col overflow-hidden ${CARD}`}>
          {TEAM_MEMBERS.map((member) => (
            <li
              key={member.email}
              className="flex flex-wrap items-center gap-3 border-b border-app-line-brand2 px-4 py-3 last:border-b-0"
            >
              <Initials name={member.name} size="s" />
              <div className="flex min-w-px flex-1 flex-col">
                <p className="text-label-2xs text-app-heading">{member.name}</p>
                <p className="text-body-2xs text-app-text-tertiary">{member.email}</p>
              </div>
              {/* Full width on phones, so it drops under the name instead of squeezing it. */}
              <div className="flex w-full items-center gap-4 pl-11 sm:w-auto sm:pl-0">
                <Pill tone="neutral">{member.role}</Pill>
                <span className="whitespace-nowrap text-body-2xs text-app-text-tertiary">
                  Last login: {member.lastLogin}
                </span>
                <button type="button" className="text-body-2xs font-semibold text-app-warning hover:opacity-70">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
