"use client";

import { useState } from "react";
import { IconDownload, IconFileText, IconSearch, IconTrash, IconUpload } from "@tabler/icons-react";
import { CARD } from "@/components/platform/company/CompanyTabs";
import { iconProps } from "@/components/platform/icon";
import { COMPANY_DOCUMENTS, DOCUMENT_CATEGORIES, type CompanyDocument } from "@/lib/platform/company";

/*
 * Document Library — Figma node 18514:53139.
 *
 * Search and upload, the category chips, then the documents table. The
 * search and the chips filter the list in place; the list itself is mock.
 */

const CATEGORY_OF: Record<CompanyDocument["type"], (typeof DOCUMENT_CATEGORIES)[number]> = {
  Contract: "Contracts",
  Compliance: "Compliance",
  Template: "Templates",
  Report: "Reports",
};

const COLUMNS = ["Document", "Type", "Size", "Uploaded By", "Date", "Actions"] as const;

export function DocumentLibraryTab() {
  const [category, setCategory] = useState<(typeof DOCUMENT_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const rows = COMPANY_DOCUMENTS.filter(
    (doc) =>
      (category === "All" || CATEGORY_OF[doc.type] === category) &&
      (!needle || doc.name.toLowerCase().includes(needle)),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex min-w-px flex-1 items-center gap-2 rounded-app-m border-w-2xs border-app-line bg-app-surface px-3 py-2 lg:max-w-[60%]">
          <span className="text-app-text-tertiary">
            <IconSearch {...iconProps(16)} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents..."
            aria-label="Search documents"
            className="min-w-px flex-1 bg-transparent text-body-xs text-app-heading outline-none placeholder:text-app-text-tertiary"
          />
        </label>
        <button
          type="button"
          className="flex shrink-0 items-center justify-center gap-2 rounded-app-m bg-app-brand1 px-4 py-2.5 text-label-2xs text-app-text-inverse transition-opacity hover:opacity-90"
        >
          <IconUpload {...iconProps(12)} />
          Upload Document
        </button>
      </div>

      <div role="group" aria-label="Document category" className="flex flex-wrap gap-1.5">
        {DOCUMENT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={`rounded-app-m px-3 py-1 text-body-2xs transition-colors ${
              category === cat
                ? "bg-app-brand1 text-app-text-inverse"
                : "border-w-2xs border-app-line bg-app-surface text-app-text-secondary hover:text-app-heading"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={`overflow-x-auto ${CARD}`}>
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className={`border-b border-app-line-brand2 px-4 py-2.5 text-nav-heading font-normal tracking-[0.05em] text-app-text-tertiary uppercase ${
                    column === "Actions" ? "text-right" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((doc) => (
              <tr key={doc.name} className="border-b border-app-line-brand2 last:border-b-0">
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-2 text-body-2xs text-app-heading">
                    <span className="text-app-neutral">
                      <IconFileText {...iconProps(16)} />
                    </span>
                    {doc.name}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="rounded-app-xs bg-app-brand2-40 px-2 py-0.5 text-body-2xs text-app-heading">{doc.type}</span>
                </td>
                <td className="px-4 py-2.5 text-body-2xs text-app-text-tertiary">{doc.size}</td>
                <td className="px-4 py-2.5 text-body-2xs text-app-text-secondary">{doc.uploadedBy}</td>
                <td className="px-4 py-2.5 text-body-2xs text-app-text-tertiary">{doc.date}</td>
                <td className="px-4 py-2.5">
                  <span className="flex justify-end gap-1">
                    <button type="button" aria-label={`Download ${doc.name}`} className="rounded-app-m p-1 text-app-neutral hover:bg-app-brand2-16">
                      <IconDownload {...iconProps(16)} />
                    </button>
                    <button type="button" aria-label={`Delete ${doc.name}`} className="rounded-app-m p-1 text-app-warning hover:bg-app-brand2-16">
                      <IconTrash {...iconProps(16)} />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-4 py-6 text-center text-body-2xs text-app-text-tertiary">
                  No documents match.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
