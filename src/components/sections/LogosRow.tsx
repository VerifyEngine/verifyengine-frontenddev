"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { FullBleedContainer } from "@/components/ui/Button";

export function LogosRow({
  label = "Trusted by innovative companies",
  logos,
  background = "muted",
  /** Show scroll arrows flanking the row, as on the Book Demo design. */
  arrows = false,
}: {
  label?: string;
  logos: string[];
  background?: "muted" | "white";
  arrows?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: -1 | 1) {
    trackRef.current?.scrollBy({ left: direction * 260, behavior: "smooth" });
  }

  const arrowButton =
    "hidden size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white hover:text-teal-600 sm:flex";

  return (
    <div className={`py-10 ${background === "muted" ? "bg-bg-muted" : "bg-white"}`}>
      {/*
        Full width, and one row instead of a centred heading stacked on top of
        a centred row: the label sits at the left and the logos take the rest
        of the band. Below lg it falls back to the stacked, centred
        arrangement, where a side label would leave the logos no room.
      */}
      <FullBleedContainer>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14">
          <p className="text-center text-xs font-semibold tracking-wide text-slate-400 uppercase lg:max-w-36 lg:shrink-0 lg:text-left">
            {label}
          </p>

          <div className="flex flex-1 items-center gap-2">
            {arrows && (
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous logos"
                className={arrowButton}
              >
                <ChevronLeft className="size-5" strokeWidth={2} />
              </button>
            )}

            <div
              ref={trackRef}
              className={`flex flex-1 items-center gap-x-12 gap-y-4 overflow-x-auto ${
                arrows
                  ? "justify-start sm:justify-between"
                  : "flex-wrap justify-center lg:justify-between"
              }`}
            >
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="shrink-0 text-xl font-bold tracking-tight text-slate-400 select-none sm:text-2xl"
                >
                  {logo}
                </span>
              ))}
            </div>

            {arrows && (
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next logos"
                className={arrowButton}
              >
                <ChevronRight className="size-5" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </FullBleedContainer>
    </div>
  );
}
