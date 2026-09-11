"use client";

import { useId, useRef, useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { iconProps } from "./icon";

/*
 * Upload Proof — Figma node 18176:14180.
 *
 * A dashed 1px Border/Brand 1 box on Surface/Brand 2/Tertiary, 64px of
 * vertical padding. Figma draws it as a button; it is a label wrapping a file
 * input here so the keyboard and screen readers get the real control, and so
 * the browser's own file picker opens without any script.
 *
 * The design has no drawn state for a chosen file. Rather than invent one, the
 * chosen name replaces the second line in the same style, which is the
 * smallest thing that still tells the user the file took.
 */
export function UploadDropzone({
  hint = "Drag and drop a copy of the lease here, or click to browse. PDF, JPG, PNG.",
  label = "Upload Proof (optional)",
}: {
  hint?: string;
  label?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);

  function takeFiles(files: FileList | null) {
    setFileName(files && files.length > 0 ? files[0].name : null);
  }

  return (
    <label
      htmlFor={inputId}
      onDragOver={(event) => {
        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsOver(false);
        if (inputRef.current) inputRef.current.files = event.dataTransfer.files;
        takeFiles(event.dataTransfer.files);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-app-xl border-w-s border-dashed border-app-line-brand1 bg-app-brand2-tertiary px-5 py-10 text-center transition-opacity sm:py-16 ${
        isOver ? "opacity-70" : ""
      }`}
    >
      <span className="text-app-text">
        <IconUpload {...iconProps(20)} />
      </span>
      <span className="flex flex-col items-center justify-center gap-2">
        <span className="text-label-xs text-app-text">{label}</span>
        <span className="text-body-s text-app-text-secondary">{fileName ?? hint}</span>
      </span>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        name="proof"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(event) => takeFiles(event.target.files)}
      />
    </label>
  );
}
