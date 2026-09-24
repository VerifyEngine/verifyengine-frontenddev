/*
 * Loading state for every platform screen — no Figma frame. A skeleton in the
 * shape most screens share (header panel, a metric row, a list panel), so the
 * layout does not jump when the content arrives.
 */

const BLOCK = "animate-pulse rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16";
const BAR = "animate-pulse rounded-app-7xl bg-app-brand1-16";

export default function PlatformLoading() {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-2 pb-2">
      <div className={`${BLOCK} flex flex-col gap-3 p-4`}>
        <span className={`${BAR} h-6 w-64`} />
        <span className={`${BAR} h-4 w-96 max-w-full`} />
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className={`${BLOCK} flex h-24 flex-col justify-between p-4`}>
            <span className={`${BAR} h-3 w-24`} />
            <span className={`${BAR} h-7 w-16`} />
          </div>
        ))}
      </div>
      <div className={`${BLOCK} flex flex-col gap-2 p-4`}>
        <span className="h-10 animate-pulse rounded-app-l bg-app-brand1" />
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className={`${BAR} h-12 rounded-app-m`} />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
