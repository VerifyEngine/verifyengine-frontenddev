import { IconMapSearch } from "@tabler/icons-react";
import Link from "next/link";
import { iconProps } from "@/components/platform/icon";

/* Not-found state inside the platform shell — no Figma frame. */
export default function PlatformNotFound() {
  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="flex max-w-md flex-col items-center gap-4 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-8 text-center backdrop-blur-[12px]">
        <span className="flex size-12 items-center justify-center rounded-app-12xl bg-app-brand1 text-app-text-inverse">
          <IconMapSearch {...iconProps(20)} />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-s text-app-text">Page not found</h1>
          <p className="text-body-s text-app-text-secondary">
            The link may be old, or the record may have been removed.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/dashboard"
            className="rounded-app-l bg-app-brand1 px-4 py-3 text-label-xs text-app-text-inverse transition-opacity hover:opacity-90"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/verifications"
            className="rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-label-xs text-app-text transition-colors hover:bg-app-fade-48"
          >
            Find a Verification
          </Link>
        </div>
      </div>
    </div>
  );
}
