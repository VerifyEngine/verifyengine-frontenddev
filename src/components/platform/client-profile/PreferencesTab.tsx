import { IconMail, IconMessage, IconPhone } from "@tabler/icons-react";
import { iconProps } from "../icon";
import { FieldGrid, TabSection } from "./ProfileTabs";
import { ROW_CARD } from "./TabParts";
import {
  CHANNEL_PRIORITY,
  DECISION_DEFAULTS,
  OUTREACH_CADENCE,
} from "@/lib/platform/client-profile";

/*
 * Preferences tab — Figma node 18397:218500.
 *
 * Outreach cadence and decision defaults as two-column field grids, with the
 * communication channels between them in priority order.
 */

const CHANNEL_ICON = {
  phone: <IconPhone {...iconProps(16)} />,
  message: <IconMessage {...iconProps(16)} />,
  mail: <IconMail {...iconProps(16)} />,
} as const;

export function PreferencesTab() {
  return (
    <div className="flex flex-col gap-6">
      <TabSection title="Outreach Cadence" first>
        <FieldGrid fields={OUTREACH_CADENCE} columns={2} />
      </TabSection>

      <TabSection title="Communication Channels (Priority Order)">
        <ol className="flex flex-col gap-1">
          {CHANNEL_PRIORITY.map((channel, index) => (
            <li key={channel.label} className={`flex items-center gap-3 ${ROW_CARD}`}>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-app-xs bg-app-brand2-40 text-body-2xs font-bold text-app-heading">
                {index + 1}
              </span>
              <span className="text-app-heading">{CHANNEL_ICON[channel.icon]}</span>
              <span className="min-w-px flex-1 text-label-2xs text-app-heading">{channel.label}</span>
              <span
                className={`text-body-2xs font-semibold ${
                  channel.enabled ? "text-app-success" : "text-app-text-tertiary"
                }`}
              >
                {channel.enabled ? "Enabled" : "Disabled"}
              </span>
            </li>
          ))}
        </ol>
      </TabSection>

      <TabSection title="Decision Defaults">
        <FieldGrid fields={DECISION_DEFAULTS} columns={2} />
      </TabSection>
    </div>
  );
}
