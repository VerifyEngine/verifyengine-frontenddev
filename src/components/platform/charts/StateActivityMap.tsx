import Image from "next/image";
import { rankFade } from "./RankedRows";

/*
 * Verification Activity by State — Figma node 18176:37374.
 *
 * Two panels at 1.5fr / 0.5fr: the United States in Brand 2 over a watery
 * texture, a count pinned on every state, and a Top US States ranking beside
 * it.
 *
 * The outline is the design's own export (`/platform/reports/us-map.svg`),
 * not a map drawn here: a coastline is not geometry that can be computed, and
 * a public atlas would have meant another data file to maintain. Its states are
 * all #A5F3D4 at different opacities, which is Surface/Brand 2 in both themes,
 * so the fixed colours in the file follow the palette anyway.
 *
 * The counts use Text/Emphasis: Brand 2 mint on the dark surface, as drawn,
 * and navy in light, where mint on white would all but vanish.
 *
 * The counts are placed as percentages of the drawn map, so they stay on
 * their states however wide the panel is. Each is anchored at its centre, not
 * its top-left corner as in Figma, so the larger platform type grows around
 * the state instead of drifting off it. On a phone the map is too small for
 * forty-six badges to be anything but a pile, so they are dropped there and the
 * ranking beside it carries the numbers.
 */

export type StateCount = {
  value: string;
  /** Centre of the badge in the design's 778 × 548 map, in px. */
  x: number;
  y: number;
};

export type StateRank = { name: string; share: string; value: string };

const MAP_WIDTH = 778.162;
const MAP_HEIGHT = 548;

export function StateActivityMap({
  counts,
  ranking,
}: {
  counts: readonly StateCount[];
  ranking: readonly StateRank[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 px-5 pb-5 xl:grid-cols-[1.5fr_0.5fr]">
      <div className="relative flex items-center justify-center overflow-hidden rounded-app-l border-w-2xs border-app-line bg-app-brand2-tertiary p-5">
        <div
          aria-hidden
          className="absolute inset-0 opacity-16 mix-blend-difference"
          style={{
            backgroundImage: "url(/platform/reports/map-water.png)",
            backgroundSize: "321px 320.84px",
            backgroundPosition: "top left",
          }}
        />

        <div className="relative w-full max-w-[778px]" style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}>
          <Image
            src="/platform/reports/us-map.svg"
            alt="Map of the United States with verification counts by state"
            width={778.566}
            height={548.434}
            className="size-full"
            unoptimized
          />
          {counts.map((state) => (
            <span
              key={`${state.x}-${state.y}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-app-s max-sm:hidden border-w-2xs border-app-line bg-app-surface px-2 py-1 text-body-2xs whitespace-nowrap text-app-text-emphasis"
              style={{ left: `${(state.x / MAP_WIDTH) * 100}%`, top: `${(state.y / MAP_HEIGHT) * 100}%` }}
            >
              {state.value}
            </span>
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-2 self-start rounded-app-l border-w-2xs border-app-line bg-app-surface p-2">
        <h3 className="p-3 text-heading-xs text-app-text">Top US States</h3>
        <ol className="overflow-hidden rounded-app-m border-w-2xs border-app-line bg-app-surface">
          {ranking.map((row, index) => (
            <li key={row.name} className={`flex items-center gap-4 p-4 ${rankFade(index)}`}>
              <span className="w-[calc(18px*var(--ve-type-scale))] shrink-0 text-center text-body-2xs text-app-text-secondary">
                #{index + 1}
              </span>
              <span className="min-w-px flex-1 text-label-2xs text-app-text">{row.name}</span>
              <span className="min-w-px flex-1 text-right text-body-2xs text-app-text-secondary">
                {row.share}
              </span>
              <span className="min-w-px flex-1 text-right text-heading-xs text-app-text-brand1">
                {row.value}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
