/*
 * Batch Order — the CSV template and the rules a row must pass before it can
 * be submitted. The columns mirror the New Order form field for field, so a
 * batch row and a single order carry the same information.
 */

export const BATCH_COLUMNS = [
  { key: "tenant_first_name", required: true },
  { key: "tenant_last_name", required: true },
  { key: "tenant_email", required: false },
  { key: "tenant_phone", required: false },
  { key: "applicant_reference", required: false },
  { key: "property_address", required: true },
  { key: "property_city", required: true },
  { key: "property_state", required: true },
  { key: "property_zip", required: true },
  { key: "landlord_name", required: false },
  { key: "landlord_phone", required: false },
  { key: "landlord_email", required: false },
  { key: "lease_start", required: false },
  { key: "lease_end", required: false },
] as const;

export type BatchColumn = (typeof BATCH_COLUMNS)[number]["key"];

export type BatchRow = {
  line: number;
  values: Partial<Record<BatchColumn, string>>;
  missing: BatchColumn[];
};

export const BATCH_LIMIT = 500;

export function templateCsv() {
  return `${BATCH_COLUMNS.map((column) => column.key).join(",")}\n`;
}

/** Splits one CSV line, honouring double-quoted fields and escaped quotes. */
function splitLine(line: string) {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted) {
      if (char === '"' && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells.map((value) => value.trim());
}

export type ParsedBatch =
  | { ok: true; rows: BatchRow[] }
  | { ok: false; error: string };

export function parseBatch(text: string): ParsedBatch {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length === 0) return { ok: false, error: "The file is empty." };

  const header = splitLine(lines[0]).map((cell) => cell.toLowerCase());
  const known = new Set<string>(BATCH_COLUMNS.map((column) => column.key));
  const absent = BATCH_COLUMNS.filter((column) => column.required && !header.includes(column.key));
  if (absent.length > 0) {
    return {
      ok: false,
      error: `Missing columns: ${absent.map((column) => column.key).join(", ")}. Start from the template.`,
    };
  }
  if (lines.length - 1 > BATCH_LIMIT) {
    return { ok: false, error: `A batch can hold up to ${BATCH_LIMIT} orders; this file has ${lines.length - 1}.` };
  }
  if (lines.length === 1) return { ok: false, error: "The file has a header but no orders." };

  const rows = lines.slice(1).map((line, index) => {
    const cells = splitLine(line);
    const values: BatchRow["values"] = {};
    header.forEach((key, column) => {
      if (known.has(key) && cells[column]) values[key as BatchColumn] = cells[column];
    });
    const missing = BATCH_COLUMNS.filter((column) => column.required && !values[column.key]).map(
      (column) => column.key,
    );
    return { line: index + 2, values, missing };
  });

  return { ok: true, rows };
}
