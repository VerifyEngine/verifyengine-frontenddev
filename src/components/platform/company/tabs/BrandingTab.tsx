import { IconUpload } from "@tabler/icons-react";
import { iconProps } from "@/components/platform/icon";
import { ColorPicker } from "@/components/platform/company/ColorPicker";

/*
 * Branding — Figma node 18513:30839.
 *
 * Logo drop zone and the two white-label fields on the left; Primary and
 * Accent colour pickers side by side on the right, each a swatch row over a
 * saturation square, hue slider and Hex/R/G/B readout. Both open on the
 * design's #E89623.
 */

const FIELD =
  "w-full rounded-app-m border-w-2xs border-app-line bg-app-surface px-3 py-2.5 text-body-xs text-app-heading outline-none placeholder:text-app-text-tertiary focus:border-app-line-brand1";

export function BrandingTab() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-app-xl border-w-s border-dashed border-app-line-brand1 bg-app-brand2-16 px-5 text-center transition-colors hover:bg-app-brand2-40 sm:w-[52%]"
        >
          <span className="text-app-heading">
            <IconUpload {...iconProps(20)} />
          </span>
          <span className="text-label-xs text-app-heading">Upload Company Logo</span>
          <span className="text-body-2xs text-app-text-tertiary">PNG or SVG, min 200x200px</span>
        </button>

        <label className="flex flex-col gap-1">
          <span className="text-label-2xs text-app-heading">White Label Domain</span>
          <input type="text" name="white-label-domain" placeholder="www.example.com" className={FIELD} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-label-2xs text-app-heading">Email Sender Name</span>
          <input type="text" name="email-sender-name" placeholder="Type here..." className={FIELD} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ColorPicker label="Primary Color" initial="#E89623" />
        <ColorPicker label="Accent Color" initial="#E89623" />
      </div>
    </div>
  );
}
