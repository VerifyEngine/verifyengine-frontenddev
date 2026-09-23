"use client";

import { useRef, useState, type PointerEvent } from "react";
import { BRAND_COLOR_SWATCHES } from "@/lib/platform/company";

/*
 * The Branding colour picker — Figma node 18513:30839, right-hand column.
 *
 * A row of swatches (the first opens the system picker), then a saturation /
 * brightness square, a hue slider and editable Hex, R, G, B fields. Kept in
 * HSV so dragging the square never shifts the hue. No library: the picker is
 * small enough to own.
 */

type Hsv = { h: number; s: number; v: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function hsvToRgb({ h, s, v }: Hsv) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return { r: f(5), g: f(3), b: f(1) };
}

function rgbToHsv(r: number, g: number, b: number): Hsv {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn);
  const delta = max - Math.min(rn, gn, bn);
  let h = 0;
  if (delta) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
  }
  return { h: (h * 60 + 360) % 360, s: max ? delta / max : 0, v: max };
}

const toHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();

function hexToHsv(hex: string): Hsv | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const n = parseInt(match[1], 16);
  return rgbToHsv((n >> 16) & 255, (n >> 8) & 255, n & 255);
}

const BOX = "rounded-app-l border-w-2xs border-app-line-brand2 bg-app-surface";
const INPUT =
  "w-full rounded-app-m border-w-2xs border-app-line bg-app-surface px-2 py-2 text-center text-body-xs text-app-heading outline-none focus:border-app-line-brand1";

export function ColorPicker({ label, initial }: { label: string; initial: string }) {
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(initial) ?? { h: 35, s: 0.85, v: 0.91 });
  const [hexDraft, setHexDraft] = useState<string | null>(null);
  const square = useRef<HTMLDivElement>(null);
  const rgb = hsvToRgb(hsv);
  const hex = toHex(rgb);

  function pickFrom(event: PointerEvent<HTMLDivElement>) {
    const box = square.current?.getBoundingClientRect();
    if (!box) return;
    setHsv((current) => ({
      ...current,
      s: clamp((event.clientX - box.left) / box.width, 0, 1),
      v: 1 - clamp((event.clientY - box.top) / box.height, 0, 1),
    }));
  }

  function setChannel(channel: "r" | "g" | "b", raw: string) {
    const next = { ...rgb, [channel]: clamp(Number(raw) || 0, 0, 255) };
    setHsv(rgbToHsv(next.r, next.g, next.b));
  }

  return (
    <div className="flex min-w-px flex-col gap-2">
      <p className="text-label-2xs text-app-heading">
        {label} <span className="text-app-warning">*</span>
      </p>

      <div className={`grid grid-cols-7 gap-2 p-3 ${BOX}`}>
        <label
          aria-label={`Custom ${label.toLowerCase()}`}
          className="relative aspect-square cursor-pointer overflow-hidden rounded-full"
          style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
        >
          <input
            type="color"
            value={hex.toLowerCase()}
            onChange={(event) => setHsv(hexToHsv(event.target.value) ?? hsv)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        {BRAND_COLOR_SWATCHES.map((swatch) => (
          <button
            key={swatch}
            type="button"
            aria-label={`Use ${swatch}`}
            aria-pressed={hex === swatch.toUpperCase()}
            onClick={() => setHsv(hexToHsv(swatch) ?? hsv)}
            style={{ backgroundColor: swatch }}
            className={`aspect-square rounded-full transition-transform hover:scale-105 ${
              hex === swatch.toUpperCase() ? "ring-2 ring-app-line-brand1 ring-offset-2 ring-offset-app-surface" : ""
            }`}
          />
        ))}
      </div>

      <div className={`flex flex-col gap-3 p-3 ${BOX}`}>
        <div
          ref={square}
          role="slider"
          tabIndex={0}
          aria-label={`${label} saturation and brightness`}
          aria-valuenow={Math.round(hsv.s * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={hex}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            pickFrom(event);
          }}
          onPointerMove={(event) => {
            if (event.buttons === 1) pickFrom(event);
          }}
          onKeyDown={(event) => {
            const step = 0.02;
            const moves: Record<string, Partial<Hsv>> = {
              ArrowLeft: { s: clamp(hsv.s - step, 0, 1) },
              ArrowRight: { s: clamp(hsv.s + step, 0, 1) },
              ArrowUp: { v: clamp(hsv.v + step, 0, 1) },
              ArrowDown: { v: clamp(hsv.v - step, 0, 1) },
            };
            if (moves[event.key]) {
              event.preventDefault();
              setHsv({ ...hsv, ...moves[event.key] });
            }
          }}
          className="relative aspect-[3/2] cursor-crosshair touch-none overflow-hidden rounded-app-m"
          style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <span
            aria-hidden
            className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow"
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, backgroundColor: hex }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={359}
          value={Math.round(hsv.h)}
          onChange={(event) => setHsv({ ...hsv, h: Number(event.target.value) })}
          aria-label={`${label} hue`}
          className="ve-hue-slider h-2 w-full cursor-pointer appearance-none rounded-full"
          style={{
            background: "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
          }}
        />

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-center text-body-2xs text-app-text-tertiary">Hex</span>
            <input
              value={hexDraft ?? hex}
              onChange={(event) => {
                setHexDraft(event.target.value);
                const next = hexToHsv(event.target.value);
                if (next) setHsv(next);
              }}
              onBlur={() => setHexDraft(null)}
              className={INPUT}
            />
          </label>
          {(["r", "g", "b"] as const).map((channel) => (
            <label key={channel} className="flex flex-col gap-1">
              <span className="text-center text-body-2xs text-app-text-tertiary">{channel.toUpperCase()}</span>
              <input
                type="number"
                min={0}
                max={255}
                value={rgb[channel]}
                onChange={(event) => setChannel(channel, event.target.value)}
                className={INPUT}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
