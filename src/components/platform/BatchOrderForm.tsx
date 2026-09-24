"use client";

import {
  IconAlertTriangle,
  IconCircleCheck,
  IconDownload,
  IconFileSpreadsheet,
} from "@tabler/icons-react";
import { useState } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { EmptyState } from "./EmptyState";
import { FormCard, FormPanel } from "./FormCard";
import { PreferenceRadioList, type PreferenceOption } from "./PreferenceRadioList";
import { UploadDropzone } from "./UploadDropzone";
import { iconProps } from "./icon";
import {
  BATCH_COLUMNS,
  BATCH_LIMIT,
  parseBatch,
  templateCsv,
  type ParsedBatch,
} from "@/lib/platform/batch-order";

/*
 * Batch Order â€” no Figma frame. The New Order screen's cards, dropzone,
 * preferences and consent, around a CSV step: download the template, upload
 * it, and check every row before anything is sent. The file is read in the
 * browser only; nothing leaves the page until the orders endpoint exists.
 */

function downloadTemplate() {
  const url = URL.createObjectURL(new Blob([templateCsv()], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "verifyengine-batch-template.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export function BatchOrderForm({
  preferences,
  consent,
}: {
  preferences: readonly PreferenceOption[];
  consent: string;
}) {
  const [parsed, setParsed] = useState<ParsedBatch | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [consented, setConsented] = useState(false);

  async function readFile(file: File | null) {
    setFileName(file?.name ?? null);
    setParsed(file ? parseBatch(await file.text()) : null);
  }

  const rows = parsed?.ok ? parsed.rows : [];
  const invalid = rows.filter((row) => row.missing.length > 0).length;
  const ready = rows.length - invalid;
  const canSubmit = parsed?.ok === true && invalid === 0 && consented;

  return (
    <form className="flex min-w-px flex-1 flex-col gap-2" onSubmit={(event) => event.preventDefault()}>
      <FormCard id="batch-template" title="1. Prepare Your File">
        <FormPanel label="CSV Template">
          <p className="text-body-s text-app-text">
            One order per row, up to {BATCH_LIMIT} per file. Required columns are marked with an
            asterisk; the rest help the verification finish faster.
          </p>
          <ul className="flex flex-wrap gap-1">
            {BATCH_COLUMNS.map((column) => (
              <li
                key={column.key}
                className="rounded-app-7xl border-w-2xs border-app-line bg-app-fade-48 px-3 py-1 text-body-2xs text-app-text"
              >
                {column.key}
                {column.required ? <span className="text-app-warning"> *</span> : null}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={downloadTemplate}
            className="flex items-center gap-3 self-start rounded-app-l border-w-2xs border-app-line bg-app-fade-40 px-4 py-3 text-app-text transition-colors hover:bg-app-fade-48"
          >
            <IconDownload {...iconProps(20)} />
            <span className="text-label-xs">Download Template</span>
          </button>
        </FormPanel>
      </FormCard>

      <FormCard id="batch-upload" title="2. Upload & Review">
        <FormPanel label="Orders File">
          <UploadDropzone
            label="Upload CSV"
            hint="Drag and drop the completed template here, or click to browse. CSV only."
            accept=".csv,text/csv"
            name="batch"
            onFile={readFile}
          />

          {parsed === null ? (
            <EmptyState
              icon={<IconFileSpreadsheet {...iconProps(20)} />}
              title="No file yet"
              description="Each row is checked here before any order is created."
            />
          ) : !parsed.ok ? (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-app-l border-w-2xs border-app-warning px-4 py-3 text-body-s text-app-warning"
            >
              <IconAlertTriangle {...iconProps(20)} className="shrink-0" />
              {fileName}: {parsed.error}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-2 rounded-app-7xl bg-app-success px-3 py-1 text-label-2xs text-app-text-inverse">
                  <IconCircleCheck {...iconProps(16)} />
                  {ready} ready
                </span>
                {invalid > 0 ? (
                  <span className="flex items-center gap-2 rounded-app-7xl bg-app-warning px-3 py-1 text-label-2xs text-app-text-inverse">
                    <IconAlertTriangle {...iconProps(16)} />
                    {invalid} need attention
                  </span>
                ) : null}
              </div>
              <div className="max-h-96 overflow-auto rounded-app-l border-w-2xs border-app-line">
                <table className="w-full min-w-[640px] text-left">
                  <thead className="sticky top-0 bg-app-brand1">
                    <tr>
                      {["Row", "Tenant", "Property", "Status"].map((label) => (
                        <th key={label} className="px-4 py-2 text-table-heading text-app-text-inverse">
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.line} className="border-t-[0.6px] border-app-line bg-app-fade-48">
                        <td className="px-4 py-2 text-body-2xs text-app-text-secondary">{row.line}</td>
                        <td className="px-4 py-2 text-body-2xs text-app-text">
                          {[row.values.tenant_first_name, row.values.tenant_last_name].filter(Boolean).join(" ") || "â€”"}
                        </td>
                        <td className="px-4 py-2 text-body-2xs text-app-text">
                          {[row.values.property_address, row.values.property_city, row.values.property_state, row.values.property_zip]
                            .filter(Boolean)
                            .join(", ") || "â€”"}
                        </td>
                        <td className="px-4 py-2 text-body-2xs">
                          {row.missing.length === 0 ? (
                            <span className="text-app-success">Ready</span>
                          ) : (
                            <span className="text-app-warning">Missing {row.missing.join(", ")}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </FormPanel>
      </FormCard>

      <FormCard id="batch-preferences" title="3. Verification Preferences">
        <PreferenceRadioList
          name="batch-verification-preference"
          legend="Verification Preferences"
          options={preferences}
          defaultValue="full"
        />
      </FormCard>

      <FormCard id="batch-consent" title="4. Consent & Submit">
        <FormPanel className="gap-2">
          <ConsentCheckbox onChange={setConsented}>
            {`${consent} This applies to every applicant in the file.`}
          </ConsentCheckbox>
        </FormPanel>
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex items-center justify-center gap-3 self-start rounded-app-l bg-app-brand1 px-4 py-3 text-app-text-inverse transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <IconCircleCheck {...iconProps(20)} />
          <span className="text-label-xs">
            {parsed?.ok ? `Create ${rows.length} Orders` : "Create Orders"}
          </span>
        </button>
      </FormCard>
    </form>
  );
}
