import { RadarChart, type RadarPoint } from "./charts/RadarChart";

/*
 * Score Radar — Figma node 18216:28611.
 *
 * The glass card the radar sits in on Order Details. The plot itself lives in
 * charts/RadarChart, shared with the Escalation Radar on Reports; this screen
 * is the one that prints the ring scale up the vertical axis.
 */

export type RadarAxis = RadarPoint;

export function ScoreRadarCard({
  title,
  axes,
}: {
  title: string;
  axes: readonly RadarAxis[];
}) {
  return (
    <section className="flex flex-col gap-3 rounded-app-xl border-w-2xs border-app-line bg-app-brand2-16 p-4 backdrop-blur-[12px]">
      <h2 className="text-heading-xs text-app-text">{title}</h2>

      <div className="flex min-h-px flex-1 items-center justify-center rounded-app-xl border-w-2xs border-app-line bg-app-fade-64 p-4">
        <RadarChart points={axes} max={100} showRingScale />
      </div>
    </section>
  );
}
