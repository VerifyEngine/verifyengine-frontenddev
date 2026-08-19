"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";

const stats = [
  { label: "Total Verifications", value: "2,456", delta: "+12.5%", up: true },
  { label: "Completed", value: "1,892", delta: "+15.3%", up: true },
  { label: "In Progress", value: "385", delta: "-3.7%", up: false },
  { label: "Under Review", value: "179", delta: "+1.2%", up: true },
];

/**
 * Series colours are brand teal-600 and a blue picked to clear the categorical
 * checks against a light chart surface (lightness band, chroma floor, CVD
 * separation ΔE 21 protan / 8.9 tritan, normal-vision ΔE 21.6). teal-600 sits
 * just under the 3:1 contrast target, so the legend below is mandatory relief,
 * not decoration — identity is never carried by colour alone here.
 */
const SERIES = [
  { key: "completed", label: "Completed", color: "#14B8A6" },
  { key: "inProgress", label: "In Progress", color: "#3B82F6" },
] as const;

const xLabels = ["May 1", "May 8", "May 15", "May 22", "May 29"];

// completed / inProgress counts across the five sample weeks.
const points = [
  { completed: 300, inProgress: 150 },
  { completed: 420, inProgress: 210 },
  { completed: 390, inProgress: 180 },
  { completed: 560, inProgress: 300 },
  { completed: 520, inProgress: 260 },
];

const recent = [
  { name: "John Smith", type: "Landlord Verification", status: "Completed" },
  { name: "Sarah Johnson", type: "Employment Verification", status: "Completed" },
  { name: "Michael Brown", type: "Income Verification", status: "Under Review" },
  { name: "Emily Davis", type: "Employment Verification", status: "In Progress" },
];

const statusTone: Record<string, string> = {
  Completed: "bg-mint-100 text-teal-700",
  "Under Review": "bg-amber-50 text-amber-700",
  "In Progress": "bg-sky-50 text-sky-700",
};

export function AnalyticsBody() {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-base font-bold text-ink-900 sm:text-lg">Dashboard</p>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-100 p-3.5">
            <p className="text-xs text-slate-400">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-ink-900">{stat.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
                stat.up ? "text-teal-600" : "text-rose-500"
              }`}
            >
              {stat.up ? (
                <ArrowUpRight className="size-3" strokeWidth={2.5} />
              ) : (
                <ArrowDownRight className="size-3" strokeWidth={2.5} />
              )}
              {stat.delta}
              <span className="text-slate-400">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <ActivityChart />

        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-sm font-bold text-ink-900">Recent Verifications</p>
          <ul className="mt-3 space-y-3">
            {recent.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-900">{item.name}</p>
                  <p className="truncate text-xs text-slate-400">{item.type}</p>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold whitespace-nowrap ${statusTone[item.status]}`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-xs font-semibold text-teal-600">View All →</p>
        </div>
      </div>
    </div>
  );
}

function ActivityChart() {
  const gradientId = useId();
  const [hover, setHover] = useState<number | null>(null);

  const w = 460;
  const h = 190;
  const padX = 38;
  const padTop = 14;
  const padBottom = 26;
  const maxY = 600;
  const yTicks = [0, 150, 300, 450, 600];

  const x = (i: number) => padX + (i / (points.length - 1)) * (w - padX - 12);
  const y = (v: number) => padTop + (1 - v / maxY) * (h - padTop - padBottom);

  const linePath = (key: "completed" | "inProgress") =>
    points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p[key])}`).join(" ");

  const areaPath =
    points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.completed)}`).join(" ") +
    ` L${x(points.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-ink-900">Verification Activity</p>
        {/* Legend is required relief for the teal contrast warning — identity
            is never carried by colour alone. */}
        <div className="flex items-center gap-4">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-3 w-full overflow-visible"
        role="img"
        aria-label="Verification activity over five weeks: completed rising from 300 to 520, in progress from 150 to 260."
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* recessive gridlines + y axis */}
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padX} y1={y(t)} x2={w - 12} y2={y(t)} stroke="#F1F5F9" strokeWidth="1" />
            <text x={padX - 8} y={y(t) + 3} textAnchor="end" fontSize="9" fill="#94A3B8">
              {t}
            </text>
          </g>
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} />

        {SERIES.map((s) => (
          <motion.path
            key={s.key}
            d={linePath(s.key as "completed" | "inProgress")}
            fill="none"
            stroke={s.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        ))}

        {/* markers, plus an invisible hit area per week for the hover readout */}
        {points.map((p, i) => (
          <g key={i}>
            {SERIES.map((s) => (
              <circle
                key={s.key}
                cx={x(i)}
                cy={y(p[s.key as "completed" | "inProgress"])}
                r={hover === i ? 5 : 3.5}
                fill="#fff"
                stroke={s.color}
                strokeWidth="2"
              />
            ))}
            <text x={x(i)} y={h - 8} textAnchor="middle" fontSize="9" fill="#94A3B8">
              {xLabels[i]}
            </text>
            <rect
              x={x(i) - 22}
              y={0}
              width={44}
              height={h - padBottom}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
          </g>
        ))}

        {hover !== null && (
          <g>
            <line
              x1={x(hover)}
              y1={padTop}
              x2={x(hover)}
              y2={h - padBottom}
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </g>
        )}
      </svg>

      {/* Hover readout doubles as the accessible value table for this sample. */}
      <p className="mt-1 text-center text-[11px] text-slate-400">
        {hover === null ? (
          "Hover the chart to read weekly totals"
        ) : (
          <>
            <span className="font-semibold text-ink-900">{xLabels[hover]}</span>
            {" · "}
            {SERIES.map((s, si) => (
              <span key={s.key}>
                {si > 0 && " · "}
                {s.label}{" "}
                <span className="font-semibold text-ink-900">
                  {points[hover][s.key as "completed" | "inProgress"]}
                </span>
              </span>
            ))}
          </>
        )}
      </p>
    </div>
  );
}
