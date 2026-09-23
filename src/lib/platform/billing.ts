import type { ClientContact } from "./clients";
import type { Metric } from "./dashboard";

/*
 * Billing Summary — Figma node 18502:17787.
 *
 * The rows are the design's own, in its order, standing in for the billing
 * endpoint. As on Clients and Invoices, the company logos are artwork the API
 * will supply, so the mock shows a monogram tile in their place.
 */

export const BILLING_METRICS: Metric[] = [
  { label: "Ready for Invoice", value: "$136,960" },
  { label: "Pending Review", value: "$104,940" },
  { label: "Adjustments Needed", value: "$7,930" },
  { label: "Invoice Generated", value: "$22,890" },
];

export type BillingStatus = "Ready for Invoice" | "Pending Review" | "Adjustments Needed" | "Invoice Generated";

export type BillingRow = {
  clientId: string;
  company: ClientContact;
  contact: ClientContact;
  nonInvoiced: string;
  ordersWithCharges: string;
  periodStart: string;
  periodEnd: string;
  pendingAdjustments: string;
  status: BillingStatus;
  dateAdded: string;
  lastInvoice: string;
};

const row = (
  clientId: string,
  company: [string, string, string],
  contact: [string, string, string],
  nonInvoiced: string,
  ordersWithCharges: string,
  period: [string, string],
  pendingAdjustments: string,
  status: BillingStatus,
  dateAdded: string,
  lastInvoice: string,
): BillingRow => ({
  clientId,
  company: { name: company[0], email: company[1], phone: company[2] },
  contact: { name: contact[0], email: contact[1], phone: contact[2] },
  nonInvoiced,
  ordersWithCharges,
  periodStart: period[0],
  periodEnd: period[1],
  pendingAdjustments,
  status,
  dateAdded,
  lastInvoice,
});

export const BILLING_ROWS: readonly BillingRow[] = [
  row("CLNT-1679", ["Grey Fade", "jerry73@aol.com", "(818) 313-7673"], ["Chris Glasser", "katie63@aol.com", "(617) 623-2338"], "$1,642.75", "$11,442.51", ["Feb 6, 2026 10:44 pm", "Jan 9, 2026 12:30 am"], "$14,807.35", "Ready for Invoice", "Jun 2, 2026 1:47 am", "Jun 5, 2026 4:28 am"),
  row("CLNT-1878", ["J. Brannam", "eddie_lake@gmail.com", "(843) 461-5941"], ["Bradley Lawlor", "patricia651@outlook.com", "(636) 296-7838"], "$13,274.94", "$5,914.30", ["Apr 5, 2026 2:06 am", "Apr 8, 2026 1:14 am"], "$19,353.58", "Pending Review", "Mar 25, 2026 10:49 am", "May 8, 2026 7:36 pm"),
  row("CLNT-1385", ["Cut Rite Lawn Care", "Daniel_hamilton@aol.com", "(267) 739-6240"], ["Corina McCoy", "m.k.freund@aol.com", "(708) 813-8989"], "$15,670.07", "$17,129.64", ["Feb 8, 2026 10:20 pm", "Apr 26, 2026 12:44 pm"], "$18,312.81", "Adjustments Needed", "Feb 5, 2026 7:58 am", "Apr 9, 2026 10:27 am"),
  row("CLNT-1410", ["Rainbow Bay Crafts", "rodger913@aol.com", "(917) 339-6416"], ["David Elson", "k.p.allen@aol.com", "(814) 413-9191"], "$4,267.83", "$17,470.50", ["Mar 24, 2026 8:11 am", "Mar 23, 2026 11:01 pm"], "$10,812.43", "Invoice Generated", "Jun 11, 2026 11:10 pm", "May 11, 2026 1:09 am"),
  row("CLNT-1402", ["Total Network Development", "r.m.smith@gmail.com", "(618) 474-9169"], ["Judith Rodriguez", "f.j.swann@aol.com", "(347) 438-7215"], "$17,882.40", "$14,285.88", ["Mar 30, 2026 9:04 pm", "Jan 20, 2026 4:54 am"], "$22.74", "Ready for Invoice", "Feb 16, 2026 2:55 am", "Dec 22, 2025 10:28 am"),
  row("CLNT-1312", ["Rhodes Furniture", "alex941@outlook.com", "(303) 420-4261"], ["Kenneth Allen", "kurt_bates@outlook.com", "(765) 322-1399"], "$5,535.31", "$318.14", ["Feb 9, 2026 8:36 am", "Apr 25, 2026 5:59 am"], "$17,489.83", "Pending Review", "Jun 7, 2026 2:08 am", "May 26, 2026 11:59 pm"),
  row("CLNT-1137", ["Sofa Express", "j.e.dukes@aol.com", "(830) 556-6651"], ["Lorri Warf", "judith403@gmail.com", "(406) 382-2670"], "$2,177.04", "$8,582.08", ["Mar 18, 2026 3:20 am", "May 3, 2026 3:05 am"], "$1,743.78", "Adjustments Needed", "Feb 8, 2026 7:31 am", "May 19, 2026 7:14 pm"),
  row("CLNT-1681", ["Pro Property Maintenance", "iva838@outlook.com", "(504) 896-6913"], ["Iva Ryan", "j.jones@outlook.com", "(920) 948-1722"], "$12,630.19", "$1,515.39", ["Apr 1, 2026 2:01 am", "Apr 8, 2026 9:24 am"], "$12,806.49", "Invoice Generated", "Apr 2, 2026 12:40 am", "Jan 20, 2026 10:42 am"),
  row("CLNT-1707", ["Cala Foods", "paula611@gmail.com", "(401) 715-3344"], ["Patricia Sanders", "b.b.lawlor@outlook.com", "(256) 289-9707"], "$16,448.84", "$17,329.91", ["Jan 23, 2026 10:56 pm", "May 3, 2026 2:22 am"], "$19,404.12", "Ready for Invoice", "Apr 15, 2026 10:22 am", "May 20, 2026 1:32 pm"),
  row("CLNT-1920", ["Pacific Stereo", "autumn_philips@aol.com", "(785) 712-6532"], ["Autumn Phillips", "lorri73@gmail.com", "(813) 752-5611"], "$8,923.70", "$12,427.89", ["Apr 12, 2026 11:23 am", "Dec 29, 2025 3:48 pm"], "$2,233.77", "Pending Review", "Feb 10, 2026 5:48 pm", "Apr 26, 2026 10:18 pm"),
  row("CLNT-1975", ["Mostow Co.", "k.r.mastrangelo@outlook.com", "(215) 424-7763"], ["Katie Sims", "stephanienicol@outlook.com", "(978) 444-4055"], "$15,345.99", "$2,248.04", ["May 25, 2026 7:29 pm", "Mar 9, 2026 4:47 am"], "$1,762.41", "Adjustments Needed", "Apr 15, 2026 3:51 am", "Apr 10, 2026 9:11 pm"),
  row("CLNT-1929", ["Auto Works", "dennis416@gmail.com", "(907) 248-8330"], ["Dennis Callis", "s.t.sharkey@outlook.com", "(301) 580-7410"], "$17,947.45", "$19,768.24", ["Feb 17, 2026 1:01 am", "Feb 6, 2026 9:34 pm"], "$3,961.73", "Invoice Generated", "May 2, 2026 12:12 pm", "Feb 24, 2026 12:59 am"),
  row("CLNT-1277", ["Ezhe Source", "david291@gmail.com", "(303) 569-1279"], ["Rhonda Rhodes", "r.g.rhodes@aol.com", "(214) 390-8650"], "$12,203.56", "$6,926.60", ["Jan 20, 2026 2:32 am", "Dec 24, 2025 2:37 pm"], "$7,790.87", "Ready for Invoice", "Jan 9, 2026 5:05 am", "Dec 17, 2025 12:42 pm"),
  row("CLNT-1540", ["Stratacard", "c.a.glasser@outlook.com", "(904) 335-2403"], ["Joshua Jones", "k_pacheco@gmail.com", "(602) 309-9604"], "$15,444.02", "$10,158.99", ["Jan 1, 2026 8:09 am", "Feb 1, 2026 2:07 am"], "$12,093.42", "Pending Review", "Feb 2, 2026 5:16 am", "Dec 27, 2025 1:24 am"),
  row("CLNT-1812", ["Rink's", "james_hall@gmail.com", "(503) 338-2573"], ["Alex Buckmaster", "c_j_mccoy@gmail.com", "(518) 744-6291"], "$2,845.31", "$15,724.43", ["Feb 20, 2026 7:14 am", "May 10, 2026 7:28 pm"], "$19,930.21", "Adjustments Needed", "Feb 10, 2026 5:23 am", "Jan 30, 2026 11:12 pm"),
];

export const BILLING_FILTERS = [
  { label: "Company", placeholder: "Select an option..." },
  { label: "Client", placeholder: "Select an option..." },
  { label: "Charge Status", placeholder: "Select an option..." },
  { label: "Invoice Status", placeholder: "Select an option..." },
  { label: "Order Type", placeholder: "Select an option..." },
  { label: "Date Added", placeholder: "Select Date Range--" },
  { label: "Last Invoice", placeholder: "Select Date Range--" },
] as const;
