import { TONE_VAR, type ChartSeries } from "./tones";

/*
 * The horizontal bar charts on Reports — Figma nodes 18176:36384 (stacked,
 * "Poli Wrap Bar") and 18176:36533 (grouped, "Triple Bar").
 *
 * Both are built from divs rather than SVG: the bars are plain rectangles on a
 * proportional width, which CSS does natively and which keeps the rounded caps
 * and the clipped stack exactly as drawn. The gridlines behind them are an
 * absolutely positioned row of hairlines on the same scale.
 *
 * Widths are percentages of the axis maximum, so the plot reflows with the
 * card instead of pinning the pixel widths the design happens to draw at 1920.
 */

export type BarRow = {
  label: string;
  /** One value per series, in the same order as the card's legend. */
  values: readonly number[];
};

function Gridlines({ ticks, format }: { ticks: readonly number[]; format: (n: number) => string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex">
      {ticks.map((tick, index) => (
        <div
          key={tick}
          className="relative flex flex-1 justify-start"
          style={index === 0 ? undefined : { flex: "1 0 0" }}
        >
          <span className="absolute inset-y-0 left-0 w-px bg-app-line opacity-40" />
          <span className="absolute -bottom-5 left-0 -translate-x-1/2 whitespace-nowrap text-body-2xs text-app-text">
            {format(tick)}
          </span>
        </div>
      ))}
    </div>
  );
}

function axisTicks(max: number, steps: number) {
  return Array.from({ length: steps + 1 }, (_, index) => (max / steps) * index);
}

/** Segments of one row laid end to end, as on Monthly Volume. */
export function StackedBarChart({
  rows,
  series,
  max,
  ticks = 8,
  format,
}: {
  rows: readonly BarRow[];
  series: readonly ChartSeries[];
  max: number;
  ticks?: number;
  format: (value: number) => string;
}) {
  return (
    <div className="px-5 pb-8">
      <div className="relative">
        {/* The gridlines start after the row labels so they line up with the bars. */}
        <div className="absolute inset-y-0 right-4 left-16">
          <Gridlines ticks={axisTicks(max, ticks)} format={format} />
        </div>

        <div className="relative flex flex-col justify-between gap-4 py-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-4">
              <span className="w-12 shrink-0 text-right text-body-2xs text-app-text-secondary">
                {row.label}
              </span>
              <div className="min-w-px flex-1 pr-4">
                <div
                  className="flex h-8 items-center overflow-hidden rounded-r-md"
                  style={{
                    width: `${(row.values.reduce((a, b) => a + b, 0) / max) * 100}%`,
                  }}
                >
                  {row.values.map((value, index) => (
                    <span
                      key={series[index].label}
                      className="h-full shrink-0 rounded-app-s"
                      style={{
                        width: `${(value / row.values.reduce((a, b) => a + b, 0)) * 100}%`,
                        backgroundColor: TONE_VAR[series[index].tone],
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** One bar per series stacked vertically inside each row, as on Operational Workload. */
export function GroupedBarChart({
  rows,
  series,
  max,
  ticks = 7,
  format,
}: {
  rows: readonly BarRow[];
  series: readonly ChartSeries[];
  max: number;
  ticks?: number;
  format: (value: number) => string;
}) {
  return (
    <div className="px-5 pb-8">
      <div className="relative">
        <div className="absolute inset-y-0 right-4 left-16">
          <Gridlines ticks={axisTicks(max, ticks)} format={format} />
        </div>

        <div className="relative flex flex-col gap-5 py-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-4">
              <span className="w-12 shrink-0 text-right text-body-2xs text-app-text-secondary">
                {row.label}
              </span>
              <div className="flex min-w-px flex-1 flex-col gap-1.5 pr-4">
                {row.values.map((value, index) => (
                  <span
                    key={series[index].label}
                    className="h-2.5 rounded-app-4xl"
                    style={{
                      width: `${(value / max) * 100}%`,
                      backgroundColor: TONE_VAR[series[index].tone],
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Vertical columns, as on the "Double Column" block. */
export function ColumnChart({
  rows,
  series,
  max,
  format,
}: {
  rows: readonly BarRow[];
  series: readonly ChartSeries[];
  max: number;
  format: (value: number) => string;
}) {
  const ticks = axisTicks(max, 5).reverse();

  return (
    <div className="flex gap-3 px-5 pb-5">
      <div className="flex w-12 shrink-0 flex-col justify-between py-1 text-right">
        {ticks.map((tick) => (
          <span key={tick} className="text-body-2xs text-app-text">
            {format(tick)}
          </span>
        ))}
      </div>

      <div className="relative min-w-px flex-1">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {ticks.map((tick) => (
            <span key={tick} className="h-px w-full bg-app-line opacity-40" />
          ))}
        </div>

        {/* Columns stretch to the plot height so each bar can be a percentage of it;
            aligned to the end instead, a column has no height to take a share of
            and every bar collapsed to nothing. */}
        <div className="relative flex h-64 justify-around gap-4">
          {rows.map((row) => (
            <div key={row.label} className="flex min-w-px flex-1 flex-col items-center gap-2">
              <div className="flex min-h-px w-full flex-1 items-end justify-center gap-1">
                {row.values.map((value, index) => (
                  <span
                    key={series[index].label}
                    className="w-3 rounded-t-md sm:w-5"
                    style={{
                      height: `${(value / max) * 100}%`,
                      backgroundColor: TONE_VAR[series[index].tone],
                    }}
                  />
                ))}
              </div>
              <span className="text-body-2xs text-app-text-secondary">{row.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
