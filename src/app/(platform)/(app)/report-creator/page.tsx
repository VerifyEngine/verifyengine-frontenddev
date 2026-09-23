import type { Metadata } from "next";
import { CreateReportDialog } from "@/components/platform/CreateReportDialog";
import { FilterField } from "@/components/platform/FilterField";
import { PageHeader } from "@/components/platform/PageHeader";
import { SavedReportsTable } from "@/components/platform/SavedReportsTable";
import { SAVED_REPORTS } from "@/lib/platform/report-creator";

export const metadata: Metadata = { title: "Report Creator" };

/*
 * Report Creator — Figma node 18541:58001, with the Create Report dialog
 * (18545:95100) open over it when the URL carries ?create=1.
 *
 * Page header, then one glass panel holding a 360px search field and the list
 * of saved reports. Below lg the search takes the full width.
 */
export default async function ReportCreatorPage({
  searchParams,
}: {
  searchParams: Promise<{ create?: string }>;
}) {
  const { create } = await searchParams;

  return (
    <div className="flex flex-col gap-2 pb-2">
      <PageHeader
        title="Report Creator"
        description="Build, schedule & export custom reports"
        actions={[
          { label: "View Templates", icon: "file-report" },
          { label: "New Report", icon: "plus", primary: true, href: "/report-creator?create=1" },
        ]}
      />

      <section
        aria-label="Saved reports"
        className="flex flex-col gap-4 overflow-hidden rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-4 backdrop-blur-[12px]"
      >
        <FilterField
          label="Search"
          placeholder="Search by keywords..."
          variant="search"
          className="w-full lg:w-[calc(360px*var(--ve-type-scale))]"
        />
        <SavedReportsTable rows={SAVED_REPORTS} />
      </section>

      {create === "1" ? <CreateReportDialog /> : null}
    </div>
  );
}
