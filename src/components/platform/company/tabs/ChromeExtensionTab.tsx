import { IconBrandChrome, IconCircleCheck, IconDownload } from "@tabler/icons-react";
import { ToggleSwitch } from "@/components/platform/client-profile/ToggleSwitch";
import { OUTLINE_BUTTON, Panel, SettingText } from "@/components/platform/company/CompanyTabs";
import { iconProps } from "@/components/platform/icon";
import {
  CHROME_EXTENSION_INFO,
  CHROME_EXTENSION_SETTINGS,
  CHROME_EXTENSION_STATS,
} from "@/lib/platform/company";

/*
 * Chrome Extension — Figma node 18514:52318.
 *
 * The extension card — name, version, three usage figures and the package
 * download — beside its settings, one per line with a navy switch.
 */
export function ChromeExtensionTab() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Panel>
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-app-m bg-app-brand2-16 text-app-neutral">
            <IconBrandChrome {...iconProps(20)} />
          </span>
          <div className="flex min-w-px flex-1 flex-col gap-0.5">
            <p className="text-label-xs text-app-heading">{CHROME_EXTENSION_INFO.name}</p>
            <p className="text-body-2xs text-app-text-tertiary">{CHROME_EXTENSION_INFO.version}</p>
          </div>
          {CHROME_EXTENSION_INFO.active ? (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-app-success/10 px-2 py-0.5 text-body-2xs font-semibold text-app-success">
              <IconCircleCheck {...iconProps(12)} />
              Active
            </span>
          ) : null}
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {CHROME_EXTENSION_STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 rounded-app-m bg-app-brand1-quaternary/40 px-3 py-8 text-center"
            >
              <span className="text-heading-xs text-app-heading">{stat.value}</span>
              <span className="text-body-2xs text-app-text-tertiary">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div>
          <button type="button" className={`${OUTLINE_BUTTON} py-2.5`}>
            <IconDownload {...iconProps(12)} />
            Download Extension Package
          </button>
        </div>
      </Panel>

      <Panel title="Extension Settings">
        <ul className="flex flex-col">
          {CHROME_EXTENSION_SETTINGS.map((setting) => (
            <li
              key={setting.label}
              className="flex items-center gap-3 border-b border-app-line-brand2 py-3 first:pt-0 last:border-b-0"
            >
              <SettingText label={setting.label} description={setting.description} />
              <ToggleSwitch label={setting.label} defaultOn={setting.defaultOn} tone="brand1" />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
