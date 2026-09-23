/*
 * Report Creator — Figma nodes 18541:58001 (the list) and 18545:95100 (the
 * Create Report dialog over it).
 *
 * The rows are the design's own, in its order. They stand in for the saved
 * reports endpoint, which will return the same shape.
 */

export type ReportType = "Compliance" | "Applicant" | "Financial" | "Client" | "Operations";

export type SavedReport = {
  id: string;
  name: string;
  type: ReportType;
  createdAt: string;
  /** The design prints a single timestamp under "Date Range". */
  dateRange: string;
};

export const SAVED_REPORTS: readonly SavedReport[] = [
  { id: "RPT-1700", name: "Financial Insights Report", type: "Compliance", createdAt: "Mar 16, 2026 5:02 pm", dateRange: "Mar 1, 2026 1:03 am" },
  { id: "RPT-2218", name: "Client Engagement Analysis", type: "Applicant", createdAt: "Mar 8, 2026 6:33 pm", dateRange: "Mar 15, 2026 4:34 pm" },
  { id: "RPT-1495", name: "Operations Strategy Report", type: "Financial", createdAt: "May 19, 2026 8:05 am", dateRange: "Feb 11, 2026 5:27 pm" },
  { id: "RPT-5524", name: "Applicant Experience Evaluation", type: "Compliance", createdAt: "Apr 29, 2026 12:56 am", dateRange: "Dec 13, 2025 3:07 pm" },
  { id: "RPT-3219", name: "Operations Improvement Plan", type: "Client", createdAt: "Jan 28, 2026 10:36 am", dateRange: "Mar 21, 2026 1:17 pm" },
  { id: "RPT-5625", name: "Compliance Audit Findings", type: "Client", createdAt: "May 6, 2026 9:59 pm", dateRange: "Feb 15, 2026 8:43 am" },
  { id: "RPT-2128", name: "Financial Trends and Forecasts", type: "Applicant", createdAt: "Mar 7, 2026 12:49 am", dateRange: "Mar 12, 2026 4:18 am" },
  { id: "RPT-2399", name: "Operations Performance Metrics", type: "Operations", createdAt: "Feb 20, 2026 10:25 am", dateRange: "Mar 17, 2026 12:28 am" },
  { id: "RPT-1416", name: "Client Satisfaction Survey Results", type: "Financial", createdAt: "Jan 7, 2026 2:56 am", dateRange: "May 18, 2026 2:32 pm" },
  { id: "RPT-1996", name: "Applicant Tracking Summary", type: "Compliance", createdAt: "Apr 11, 2026 7:57 am", dateRange: "Feb 8, 2026 1:02 pm" },
  { id: "RPT-1218", name: "Compliance Review Summary", type: "Client", createdAt: "Jan 18, 2026 8:04 am", dateRange: "Dec 31, 2025 11:03 am" },
  { id: "RPT-3192", name: "Operations Efficiency Review", type: "Applicant", createdAt: "May 19, 2026 5:00 am", dateRange: "Feb 26, 2026 7:35 pm" },
  { id: "RPT-1349", name: "Financial Performance Analysis", type: "Operations", createdAt: "Apr 8, 2026 10:03 pm", dateRange: "Dec 11, 2025 4:43 am" },
  { id: "RPT-7610", name: "Annual Financial Overview", type: "Client", createdAt: "Apr 6, 2026 9:20 pm", dateRange: "May 30, 2026 6:28 pm" },
  { id: "RPT-7776", name: "Compliance Risk Assessment", type: "Applicant", createdAt: "Jan 6, 2026 5:30 am", dateRange: "Mar 21, 2026 9:21 pm" },
];

/* ---- Create Report dialog ---------------------------------------------- */

/** The dialog's header shortcuts, left to right. */
export const REPORT_SHORTCUTS = [
  { label: "Schedule Report", icon: "history" },
  { label: "Email Report", icon: "mail" },
  { label: "Print", icon: "printer" },
  { label: "Export PDF", icon: "download" },
  { label: "Save Template", icon: "check" },
] as const;

export const REPORT_TYPES: readonly ReportType[] = ["Applicant", "Client", "Compliance", "Financial", "Operations"];

export const DATE_PRESETS = ["Last 7 Days", "Last 30 Days", "Last Quarter", "Custom"] as const;

/** Columns a report can carry. The design shows all nine ticked. */
export const REPORT_COLUMNS = [
  "Applicant Name",
  "SSN (masked)",
  "Client",
  "Submission Date",
  "VE Score",
  "Decision",
  "TAT (hrs)",
  "Fraud Flag",
  "Analyst",
] as const;

export const OUTPUT_FORMATS = [
  { label: "PDF", icon: "file-text" },
  { label: "CSV", icon: "table" },
  { label: "EXCEL", icon: "file-spreadsheet" },
  { label: "JSON", icon: "braces" },
] as const;

/** Group By and Sort By are drawn empty; these are the columns they will offer. */
export const GROUPING_OPTIONS = ["Client", "Decision", "Analyst", "Submission Date"] as const;
