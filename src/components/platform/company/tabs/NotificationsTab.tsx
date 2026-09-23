import { ToggleSwitch } from "@/components/platform/client-profile/ToggleSwitch";
import { Panel, SettingText } from "@/components/platform/company/CompanyTabs";
import {
  DIGEST_FREQUENCIES,
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_CHANNELS,
} from "@/lib/platform/company";

/*
 * Notifications — Figma node 18513:29727.
 *
 * Channels three to a row, alert categories three to a row on Brand 2 tinted
 * tiles, then the digest frequency. Daily is the design's chosen digest.
 */

const TILE = "flex items-center gap-3 rounded-app-l border-w-2xs border-app-line-brand2 bg-app-brand2-16 px-3 py-2.5";

export function NotificationsTab() {
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Notification Channels">
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {NOTIFICATION_CHANNELS.map((channel) => (
            <li key={channel.label} className={TILE}>
              <SettingText label={channel.label} description={channel.description} />
              <ToggleSwitch label={channel.label} defaultOn={channel.defaultOn} tone="brand1" />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Alert Categories">
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {NOTIFICATION_CATEGORIES.map((category) => (
            <li key={category.label} className={TILE}>
              <SettingText label={category.label} description={category.description} />
              <ToggleSwitch label={category.label} defaultOn={category.defaultOn} tone="brand1" />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Email Digest Frequency">
        <fieldset className="flex flex-wrap gap-5">
          <legend className="sr-only">Email digest frequency</legend>
          {DIGEST_FREQUENCIES.map((frequency) => (
            <label key={frequency} className="flex items-center gap-1.5 text-body-xs text-app-heading">
              <input
                type="radio"
                name="digest-frequency"
                defaultChecked={frequency === "Daily"}
                className="size-4 accent-app-brand1"
              />
              {frequency}
            </label>
          ))}
        </fieldset>
      </Panel>
    </div>
  );
}
