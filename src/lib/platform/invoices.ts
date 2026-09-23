import type { Metric } from "./dashboard";
import type { ClientContact } from "./clients";

/*
 * Invoices — Figma node 18540:22351.
 *
 * The rows are the design's own, in its order, standing in for the invoices
 * endpoint. Two things in them are not taken as drawn:
 *
 *   - Each row prints its dollar figure under "Billing Period" and the literal
 *     words "Amount", "Usage Charges" and "Payment Method" under those columns
 *     — the component's placeholder text, never filled in. The figure is moved
 *     to Amount, and the three unfilled columns are left empty (null) rather
 *     than invented. Flagged.
 *   - The company logos are artwork the API will supply; like the Clients
 *     table, the mock shows a monogram tile in their place.
 */

export const INVOICE_METRICS: Metric[] = [
  { label: "Total Outstanding Balance", value: "$183,892" },
  { label: "Paid This Month", value: "$142,720" },
  { label: "Overdue Invoices", value: "$20,000" },
  { label: "Pending Invoices", value: "$10,000" },
  { label: "Total Revenue", value: "$5,000" },
  { label: "Avg. Invoice Amount", value: "$2,000" },
  { label: "Failed Payments", value: "$198,000" },
  { label: "Upcoming Renewals", value: "$5,219" },
];

export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Failed" | "Draft";

export type InvoiceRow = {
  invoice: string;
  company: ClientContact;
  contact: ClientContact;
  billingPeriod: string | null;
  amount: string;
  usageCharges: string | null;
  status: InvoiceStatus;
  paymentMethod: string | null;
  generatedAt: string;
  dueAt: string;
};

const row = (
  invoice: string,
  company: [string, string, string],
  contact: [string, string, string],
  amount: string,
  status: InvoiceStatus,
  generatedAt: string,
  dueAt: string,
): InvoiceRow => ({
  invoice,
  company: { name: company[0], email: company[1], phone: company[2] },
  contact: { name: contact[0], email: contact[1], phone: contact[2] },
  billingPeriod: null,
  amount,
  usageCharges: null,
  status,
  paymentMethod: null,
  generatedAt,
  dueAt,
});

export const INVOICES: readonly InvoiceRow[] = [
  row("INV-5171", ["Stratacard", "r.m.smith@gmail.com", "(406) 382-2670"], ["Eddie Lake", "k.p.allen@aol.com", "(830) 556-6651"], "$1,043.46", "Paid", "May 27, 2026 10:17 am", "Apr 28, 2026 5:49 am"),
  row("INV-7092", ["Ezhe Source", "c_j_mccoy@gmail.com", "(618) 474-9169"], ["Judith Rodriguez", "judith403@gmail.com", "(503) 338-2573"], "$6,161.72", "Pending", "Feb 23, 2026 5:34 am", "Dec 30, 2025 12:09 pm"),
  row("INV-3564", ["Rainbow Bay Crafts", "alex941@outlook.com", "(708) 813-8989"], ["Lorri Warf", "autumn_philips@aol.com", "(917) 339-6416"], "$4,916.22", "Overdue", "Feb 6, 2026 8:24 pm", "Dec 9, 2025 11:33 pm"),
  row("INV-1833", ["Pacific Stereo", "k.r.mastrangelo@outlook.com", "(518) 744-6291"], ["Kathy Pacheco", "f.j.swann@aol.com", "(920) 948-1722"], "$5,069.87", "Failed", "Jun 3, 2026 8:04 am", "May 16, 2026 10:51 am"),
  row("INV-2169", ["J. Brannam", "j.jones@outlook.com", "(301) 580-7410"], ["Kimberly Mastrangelo", "katie63@aol.com", "(214) 390-8650"], "$7,065.65", "Paid", "Feb 18, 2026 5:16 pm", "Mar 8, 2026 1:32 pm"),
  row("INV-6023", ["Johnson's General Stores", "kurt_bates@outlook.com", "(256) 289-9707"], ["Autumn Phillips", "patricia651@outlook.com", "(907) 248-8330"], "$5,528.67", "Draft", "Mar 10, 2026 10:23 am", "Dec 21, 2025 12:57 am"),
  row("INV-7541", ["Rhodes Furniture", "eddie_lake@gmail.com", "(785) 712-6532"], ["Daniel Hamilton", "stephanienicol@outlook.com", "(347) 438-7215"], "$3,735.71", "Pending", "Apr 2, 2026 8:39 am", "May 26, 2026 7:26 pm"),
  row("INV-4490", ["Magna Architectural Design", "dennis416@gmail.com", "(267) 739-6240"], ["Iva Ryan", "s.t.sharkey@outlook.com", "(636) 296-7838"], "$3,736.36", "Overdue", "Apr 19, 2026 7:30 am", "Jan 2, 2026 8:24 am"),
  row("INV-3049", ["Giant", "paula611@gmail.com", "(617) 623-2338"], ["Frances Swann", "r.g.rhodes@aol.com", "(215) 424-7763"], "$7,122.20", "Failed", "Feb 23, 2026 11:26 pm", "Jun 3, 2026 8:59 pm"),
  row("INV-1285", ["Britches of Georgetown", "Daniel_hamilton@aol.com", "(303) 420-4261"], ["Rhonda Rhodes", "b.b.lawlor@outlook.com", "(303) 569-1279"], "$2,276.06", "Paid", "Feb 20, 2026 7:40 pm", "Jan 8, 2026 8:25 pm"),
  row("INV-3788", ["Pro Property Maintenance", "j.e.dukes@aol.com", "(813) 752-5611"], ["Joshua Jones", "iva838@outlook.com", "(904) 335-2403"], "$7,626.43", "Draft", "Dec 13, 2025 11:37 am", "Jan 2, 2026 9:03 pm"),
  row("INV-6424", ["Total Network Development", "jerry73@aol.com", "(401) 715-3344"], ["Paula Mora", "lorri73@gmail.com", "(978) 444-4055"], "$2,971.33", "Pending", "Mar 25, 2026 1:50 am", "Mar 21, 2026 7:17 am"),
  row("INV-2352", ["Finast", "david291@gmail.com", "(818) 313-7673"], ["Jerry Helfer", "james_hall@gmail.com", "(814) 413-9191"], "$6,605.26", "Overdue", "May 1, 2026 11:21 am", "Feb 18, 2026 2:24 pm"),
  row("INV-1625", ["Auto Works", "c.a.glasser@outlook.com", "(765) 322-1399"], ["Alex Buckmaster", "k_pacheco@gmail.com", "(843) 461-5941"], "$5,603.40", "Failed", "Mar 11, 2026 5:48 am", "Jan 3, 2026 2:20 pm"),
  row("INV-3621", ["Western Auto", "rodger913@aol.com", "(602) 309-9604"], ["Katie Sims", "m.k.freund@aol.com", "(504) 896-6913"], "$7,505.18", "Paid", "Apr 14, 2026 7:35 pm", "Jan 5, 2026 9:47 pm"),
];

/** First filter row: search, then four selects; the second row is five selects. */
export const INVOICE_FILTERS_TOP = ["Invoice#", "Company Name", "Billing Contact", "Payment Method"] as const;
export const INVOICE_FILTERS_BOTTOM = [
  { label: "Subscription", placeholder: "Select an option..." },
  { label: "Status", placeholder: "Select an option..." },
  { label: "Invoice Type", placeholder: "Select an option..." },
  { label: "Date Added", placeholder: "Select Date Range--" },
  { label: "Last Updated", placeholder: "Select Date Range--" },
] as const;
