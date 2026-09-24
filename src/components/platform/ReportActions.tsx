"use client";

import { IconArrowLeft, IconPrinter } from "@tabler/icons-react";
import Link from "next/link";
import { iconProps } from "./icon";

/** Back to the file, and print — which is also how the browser saves a PDF. */
export function ReportActions({ backHref }: { backHref: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
      <Link
        href={backHref}
        className="flex items-center gap-2 rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-app-text transition-colors hover:bg-app-fade-48"
      >
        <IconArrowLeft {...iconProps(20)} />
        <span className="text-label-xs">Back to File</span>
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-3 rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90"
      >
        <IconPrinter {...iconProps(20)} />
        <span className="text-label-xs">Print / Save as PDF</span>
      </button>
    </div>
  );
}
