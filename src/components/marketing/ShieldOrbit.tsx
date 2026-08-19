"use client";

import { motion } from "motion/react";
import { UserRound, FileCheck2, UploadCloud, BarChart3, Check } from "lucide-react";

const tiles = [
  { icon: UserRound, position: "top-2 left-6 sm:left-10" },
  { icon: FileCheck2, position: "top-2 right-6 sm:right-10" },
  { icon: UploadCloud, position: "bottom-2 left-2 sm:left-4" },
  { icon: BarChart3, position: "bottom-2 right-2 sm:right-4" },
];

/** Decorative shield with orbiting capability tiles, used in the FAQ hero. */
export function ShieldOrbit() {
  return (
    <div className="relative mx-auto aspect-4/3 w-full max-w-md" aria-hidden="true">
      {/* orbit arcs */}
      <svg viewBox="0 0 320 240" className="absolute inset-0 size-full" fill="none">
        <ellipse
          cx="160"
          cy="120"
          rx="132"
          ry="82"
          stroke="var(--color-teal-500)"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <ellipse
          cx="160"
          cy="120"
          rx="132"
          ry="82"
          stroke="var(--color-teal-500)"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="3 5"
          transform="rotate(38 160 120)"
        />
      </svg>

      {/* shield */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex size-32 items-center justify-center sm:size-36">
          <svg viewBox="0 0 100 112" className="size-full drop-shadow-2xl">
            <defs>
              <linearGradient id="shield-face" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3FDCC6" />
                <stop offset="100%" stopColor="#0E8A7D" />
              </linearGradient>
            </defs>
            <path
              d="M50 2 96 20v40c0 30-20 44-46 50C24 104 4 90 4 60V20L50 2Z"
              fill="var(--color-navy-800)"
            />
            <path
              d="M50 9 89 24v36c0 26-17 38-39 43C28 98 11 86 11 60V24L50 9Z"
              fill="url(#shield-face)"
            />
          </svg>
          <span className="absolute flex size-12 items-center justify-center rounded-full border-2 border-white/90 sm:size-14">
            <Check className="size-6 text-white sm:size-7" strokeWidth={3} />
          </span>
        </div>
      </motion.div>

      {/* orbiting tiles */}
      {tiles.map((tile, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          className={`absolute flex size-12 items-center justify-center rounded-xl border border-white/15 bg-navy-800/80 text-mint-200 backdrop-blur sm:size-14 ${tile.position}`}
        >
          <tile.icon className="size-5 sm:size-6" strokeWidth={1.75} />
        </motion.span>
      ))}
    </div>
  );
}
