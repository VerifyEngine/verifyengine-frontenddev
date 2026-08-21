import type { Metric } from "./dashboard";

/**
 * Clients screen data — Figma node 18250:13416.
 *
 * Same contract as the dashboard module: shaped like the API response so the
 * components never change when the backend arrives.
 */

export type ClientStatus = "Active" | "Suspended" | "Trial";

export type ClientContact = {
  name: string;
  email: string;
  phone: string;
};

export type ClientRow = {
  clientId: string;
  company: ClientContact;
  contact: ClientContact;
  orderCount: string;
  permissions: string;
  subscription: string;
  api: string;
  whiteLabel: string;
  status: ClientStatus;
  dateAdded: string;
  lastUpdated: string;
};

export const CLIENT_METRICS: Metric[] = [
  { label: "Total Active Clients", value: "646" },
  { label: "Suspended Clients", value: "725" },
  { label: "Trial Clients", value: "940" },
  { label: "Enterprise Clients", value: "348" },
  { label: "Monthly Revenue", value: "151" },
  // Figma spells this "Porfolio"; corrected here.
  { label: "Avg. VE Score Across Portfolio", value: "294" },
  { label: "API Enabled Clients", value: "95" },
  { label: "White-Label Clients", value: "533" },
];

export const CLIENTS: ClientRow[] = [
  {
    clientId: "CLNT-9080",
    company: { name: "Stratacard", email: "r.m.smith@gmail.com", phone: "(406) 382-2670" },
    contact: { name: "Eddie Lake", email: "k.p.allen@aol.com", phone: "(830) 556-6651" },
    orderCount: "1,023",
    permissions: "Permissions",
    subscription: "Enterprise",
    api: "Enabled",
    whiteLabel: "No",
    status: "Active",
    dateAdded: "May 18, 2026 5:30 am",
    lastUpdated: "May 17, 2026 10:30 pm",
  },
  {
    clientId: "CLNT-4412",
    company: { name: "Rainbow Bay Crafts", email: "hello@rainbowbay.com", phone: "(215) 774-1180" },
    contact: { name: "Lorri Warf", email: "l.warf@rainbowbay.com", phone: "(215) 774-1181" },
    orderCount: "864",
    permissions: "Permissions",
    subscription: "Growth",
    api: "Enabled",
    whiteLabel: "Yes",
    status: "Active",
    dateAdded: "Apr 2, 2026 9:15 am",
    lastUpdated: "May 12, 2026 4:02 pm",
  },
  {
    clientId: "CLNT-7731",
    company: { name: "Electronic Geek", email: "support@egeek.io", phone: "(785) 233-0904" },
    contact: { name: "John Dukes", email: "j.dukes@egeek.io", phone: "(785) 233-0905" },
    orderCount: "412",
    permissions: "Permissions",
    subscription: "Starter",
    api: "Disabled",
    whiteLabel: "No",
    status: "Trial",
    dateAdded: "Mar 22, 2026 1:44 pm",
    lastUpdated: "May 9, 2026 8:20 am",
  },
  {
    clientId: "CLNT-2298",
    company: { name: "Tams Stationers", email: "orders@tams.co", phone: "(818) 991-3320" },
    contact: { name: "Daniel Hamilton", email: "d.hamilton@tams.co", phone: "(818) 991-3321" },
    orderCount: "1,540",
    permissions: "Permissions",
    subscription: "Enterprise",
    api: "Enabled",
    whiteLabel: "Yes",
    status: "Active",
    dateAdded: "Jan 14, 2026 7:05 am",
    lastUpdated: "May 15, 2026 11:47 am",
  },
  {
    clientId: "CLNT-6605",
    company: { name: "Auto Works", email: "contact@autoworks.com", phone: "(210) 448-7712" },
    contact: { name: "Frances Swann", email: "f.swann@autoworks.com", phone: "(210) 448-7713" },
    orderCount: "298",
    permissions: "Permissions",
    subscription: "Growth",
    api: "Disabled",
    whiteLabel: "No",
    status: "Suspended",
    dateAdded: "Feb 8, 2026 3:31 pm",
    lastUpdated: "Apr 30, 2026 6:12 pm",
  },
  {
    clientId: "CLNT-1187",
    company: { name: "Britches of Georgetown", email: "info@britches.com", phone: "(480) 663-2210" },
    contact: { name: "Ricky Smith", email: "r.smith@britches.com", phone: "(480) 663-2211" },
    orderCount: "735",
    permissions: "Permissions",
    subscription: "Enterprise",
    api: "Enabled",
    whiteLabel: "No",
    status: "Active",
    dateAdded: "Dec 3, 2025 10:20 am",
    lastUpdated: "May 16, 2026 2:55 pm",
  },
  {
    clientId: "CLNT-8842",
    company: { name: "Specialty Restaurant Group", email: "ops@srg.com", phone: "(303) 771-5560" },
    contact: { name: "Stephanie Nicol", email: "s.nicol@srg.com", phone: "(303) 771-5561" },
    orderCount: "1,190",
    permissions: "Permissions",
    subscription: "Enterprise",
    api: "Enabled",
    whiteLabel: "Yes",
    status: "Active",
    dateAdded: "Nov 19, 2025 8:48 am",
    lastUpdated: "May 11, 2026 9:33 am",
  },
  {
    clientId: "CLNT-3376",
    company: { name: "Super Duper", email: "hey@superduper.com", phone: "(504) 220-8891" },
    contact: { name: "Rodger Struck", email: "r.struck@superduper.com", phone: "(504) 220-8892" },
    orderCount: "156",
    permissions: "Permissions",
    subscription: "Starter",
    api: "Disabled",
    whiteLabel: "No",
    status: "Trial",
    dateAdded: "Apr 27, 2026 4:10 pm",
    lastUpdated: "May 14, 2026 7:26 pm",
  },
  {
    clientId: "CLNT-5520",
    company: { name: "Bugle Boy", email: "team@bugleboy.com", phone: "(617) 335-0042" },
    contact: { name: "Alex Buckmaster", email: "a.buck@bugleboy.com", phone: "(617) 335-0043" },
    orderCount: "623",
    permissions: "Permissions",
    subscription: "Growth",
    api: "Enabled",
    whiteLabel: "No",
    status: "Active",
    dateAdded: "Feb 25, 2026 12:02 pm",
    lastUpdated: "May 10, 2026 5:41 pm",
  },
  {
    clientId: "CLNT-9914",
    company: { name: "Giant", email: "corporate@giant.com", phone: "(718) 442-6600" },
    contact: { name: "Jerry Helfer", email: "j.helfer@giant.com", phone: "(718) 442-6601" },
    orderCount: "2,067",
    permissions: "Permissions",
    subscription: "Enterprise",
    api: "Enabled",
    whiteLabel: "Yes",
    status: "Active",
    dateAdded: "Oct 7, 2025 6:30 am",
    lastUpdated: "May 18, 2026 1:19 am",
  },
  {
    clientId: "CLNT-2041",
    company: { name: "Finast", email: "hello@finast.com", phone: "(301) 887-4415" },
    contact: { name: "Katie Sims", email: "k.sims@finast.com", phone: "(301) 887-4416" },
    orderCount: "489",
    permissions: "Permissions",
    subscription: "Growth",
    api: "Disabled",
    whiteLabel: "No",
    status: "Suspended",
    dateAdded: "Mar 5, 2026 2:24 pm",
    lastUpdated: "Apr 22, 2026 10:08 am",
  },
  {
    clientId: "CLNT-7758",
    company: { name: "Pro Property Maintenance", email: "admin@propro.com", phone: "(970) 512-3378" },
    contact: { name: "Bradley Lawlor", email: "b.lawlor@propro.com", phone: "(970) 512-3379" },
    orderCount: "911",
    permissions: "Permissions",
    subscription: "Enterprise",
    api: "Enabled",
    whiteLabel: "No",
    status: "Active",
    dateAdded: "Jan 30, 2026 11:52 am",
    lastUpdated: "May 13, 2026 3:47 pm",
  },
];
