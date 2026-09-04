import {
  IconChartBar,
  IconCheck,
  IconFileAnalytics,
  IconHome,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconUser,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import type { CSSProperties, ReactNode } from "react";
import { ShieldMark } from "@/components/layout/Logo";

/*
 * Shared building blocks for the marketing mockups that depict the signed-in
 * Verify Engine platform.
 *
 * Everything here is drawn with the platform's own design tokens — the `app-*`
 * utilities from src/styles/platform.css, Satoshi, the Tabler icon set, the
 * Figma radius scale and the 0.6px hairlines — so a mockup on the public site
 * reads as a slice of the real product rather than as a generic card. It is
 * the same vocabulary the homepage hero mock (WorkflowShowcase) is built from.
 *
 * `data-ve-theme="light"` sits on the shell itself rather than on <html>, so
 * the tokens resolve without the platform's ThemeScript or a session: these are
 * static marketing snapshots and stay site-only components (nothing is imported
 * from the platform's own component tree).
 *
 * Sizing: each mockup is composed at a fixed native width and `mock-fit` then
 * paints that whole composition at whatever width its column actually has. So
 * on a desktop it scales *up* — type, padding, icons and radii all grow by the
 * same factor, which is what keeps it looking like a screenshot instead of a
 * blown-up card. Below `sm` the zoom is dropped and the composition lays out
 * fluid at the phone's own width, so its text stays readable.
 *
 * No applicant data appears in any mockup built from these: the product is
 * shown through statuses, checks and role labels rather than invented names,
 * addresses or phone numbers.
 */

export function MockShell({
  nativeWidth = 460,
  nativeHeight = 300,
  maxZoom = 1.5,
  className = "",
  children,
}: {
  nativeWidth?: number;
  /**
   * The height the composition is drawn to before scaling. Every mockup in a
   * set shares one value so they all paint at the same height and switching
   * between them never resizes the panel around them.
   */
  nativeHeight?: number;
  maxZoom?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    // `mock-fit` measures the container, so the @container has to be the parent.
    <div
      className="@container w-full"
      style={{ "--mock-max-zoom": maxZoom } as CSSProperties}
    >
      <div
        data-ve-theme="light"
        // The last panel takes the slack, so a shorter mockup fills its shell
        // instead of leaving bare canvas under it.
        className={`mock-type mock-fit font-app flex flex-col gap-2 rounded-app-xl bg-[var(--ve-canvas)] p-2 shadow-[0_2px_8px_rgba(11,18,32,0.06),0_24px_60px_rgba(11,18,32,0.14)] [&>*:last-child]:flex-1 ${className}`}
        style={
          {
            "--mock-native-width": `${nativeWidth}px`,
            // A floor, so switching mockups never resizes the panel around
            // them. `--mock-min-height` lets a caller lift it where the
            // reserved space costs more than it buys — a phone, where the
            // mockup lays out at 1:1 and every pixel is one the pinned step
            // panel does not have.
            minHeight: `var(--mock-min-height, ${nativeHeight}px)`,
            // The platform's own type scale on a desktop, where the whole
            // composition is magnified; a touch larger on a phone, where it is
            // painted 1:1 and would otherwise sit at the Figma sizes.
            "--mock-type-lg": 1.2,
            "--mock-type-sm": 1.15,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

/** The app bar, trimmed to what a small mockup can carry. */
export function MockTopBar({ right }: { right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-2 backdrop-blur-[12px]">
      <span className="flex shrink-0 items-center gap-1.5 px-1">
        <ShieldMark className="size-5" />
        <span className="text-label-xs whitespace-nowrap text-app-text">
          <span className="text-app-text-brand1">Verify</span>Engine
        </span>
      </span>
      <span className="hidden min-w-px flex-1 items-center gap-2 rounded-app-l border-w-xs border-app-line bg-app-fade-48 px-2.5 py-1.5 sm:flex">
        <IconSearch
          size={13}
          stroke={1.6}
          className="shrink-0 text-app-text"
          aria-hidden
        />
        <span className="min-w-px flex-1 truncate text-body-2xs text-app-text-tertiary">
          Search by keywords...
        </span>
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-1.5">
        {right}
      </span>
    </div>
  );
}

/** The side rail, as its own floating panel — the platform's shell signature. */
export function MockRail({
  icons,
  className = "",
}: {
  icons: TablerIcon[];
  className?: string;
}) {
  return (
    <nav
      className={`flex shrink-0 flex-col items-center gap-1.5 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 px-1.5 py-2.5 backdrop-blur-[12px] ${className}`}
    >
      {icons.map((Icon, i) => (
        <span
          key={i}
          className={`flex size-7 items-center justify-center rounded-app-m ${
            i === 0
              ? "bg-app-brand1-16 text-app-nav-active"
              : "bg-app-fade-48 text-app-text-tertiary"
          }`}
        >
          <Icon size={14} stroke={1.6} aria-hidden />
        </span>
      ))}
    </nav>
  );
}

/**
 * The same navigation as MockRail, in the shape a phone would carry it.
 *
 * A mockup stops reading as software the moment its chrome disappears, and the
 * side rail is the piece doing most of that work. On a phone the rail cannot
 * stay — it takes an eighth of the width the content needs — so the navigation
 * moves to the bottom, which is where an app would put it anyway. The mockup
 * keeps saying "this is a product" without spending the width to say it.
 */
export function MockTabBar({ icons }: { icons: TablerIcon[] }) {
  return (
    <nav className="flex items-center justify-between rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 px-2 py-1.5 backdrop-blur-[12px]">
      {icons.map((Icon, i) => (
        <span
          key={i}
          className={`flex size-8 items-center justify-center rounded-app-m ${
            i === 0
              ? "bg-app-brand1-16 text-app-nav-active"
              : "bg-app-fade-48 text-app-text-tertiary"
          }`}
        >
          <Icon size={16} stroke={1.6} aria-hidden />
        </span>
      ))}
    </nav>
  );
}

/** A glass panel: the surface every piece of platform content sits on. */
export function MockPanel({
  title,
  badge,
  className = "",
  bodyClassName = "",
  children,
}: {
  title?: string;
  badge?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`flex flex-col gap-2.5 rounded-app-xl border-w-2xs border-app-line-brand2 bg-app-brand2-16 p-3 backdrop-blur-[12px] ${className}`}
    >
      {title || badge ? (
        <div className="flex items-center justify-between gap-2">
          {title ? (
            <h3 className="text-label-xs text-app-text-brand1">{title}</h3>
          ) : (
            <span />
          )}
          {badge}
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col gap-2 ${bodyClassName}`}>
        {children}
      </div>
    </section>
  );
}

type BadgeTone = "success" | "neutral" | "brand" | "quiet";

const badgeTones: Record<BadgeTone, string> = {
  success: "bg-app-success text-app-text-inverse",
  neutral: "bg-app-neutral text-app-text-inverse",
  brand: "bg-app-brand2-64 text-app-text-brand1",
  quiet: "border-w-2xs border-app-line bg-app-fade-48 text-app-text-secondary",
};

export function MockBadge({
  tone = "brand",
  live = false,
  children,
}: {
  tone?: BadgeTone;
  live?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-app-4xl px-2 py-1 text-body-2xs whitespace-nowrap ${badgeTones[tone]}`}
    >
      {live ? (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-app-12xl bg-current opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex size-1.5 rounded-app-12xl bg-current" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

/** The green tick the platform marks a completed check with. */
export function MockTick({ size = 17 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse"
      style={{ width: size, height: size }}
    >
      <IconCheck size={Math.round(size * 0.62)} stroke={3} aria-hidden />
    </span>
  );
}

export function MockCheck({
  label,
  caption,
  value,
  className = "",
}: {
  label: string;
  caption?: string;
  value?: string;
  className?: string;
}) {
  return (
    <li className={`flex items-center gap-2.5 ${className}`}>
      <MockTick />
      <span className="min-w-px flex-1">
        <span className="block text-label-2xs text-app-text">{label}</span>
        {caption ? (
          <span className="block text-body-2xs text-app-text-tertiary">
            {caption}
          </span>
        ) : null}
      </span>
      {value ? (
        <span className="shrink-0 text-body-2xs text-app-success">{value}</span>
      ) : null}
    </li>
  );
}

/** A label/value line, the way the platform lays out a record. */
export function MockRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-body-2xs text-app-text-tertiary">{label}</span>
      {children}
    </div>
  );
}

/** An inset tile — the lighter surface the platform uses inside a panel. */
export function MockTile({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-app-l border-w-2xs border-app-line bg-app-fade-48 px-3 py-2.5 ${className}`}
    >
      {children}
    </div>
  );
}

export function MockTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-app-4xl border-w-2xs border-app-line-brand2 bg-app-brand2-40 px-2 py-1 text-body-2xs text-app-text-brand1">
      {children}
    </span>
  );
}

/** Stands in for body copy without inventing any. */
export function MockBar({ width = "w-full" }: { width?: string }) {
  return (
    <span className={`block h-1.5 rounded-app-12xl bg-app-line ${width}`} />
  );
}

export function MockDivider({ className = "" }: { className?: string }) {
  return <span className={`block h-px bg-app-line ${className}`} />;
}

export function MockAvatar({
  initials,
  size = 32,
}: {
  initials: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-app-12xl bg-gradient-to-br from-app-brand2-64 to-app-brand1 text-body-2xs font-bold text-app-text-inverse"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

/** Progress bar in the platform's own colours. */
export function MockProgress({ percent }: { percent: number }) {
  return (
    <span className="block h-1.5 overflow-hidden rounded-app-12xl bg-app-line">
      <span
        className="block h-full rounded-app-12xl bg-app-brand1"
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

/** The score ring the platform draws beside a verification result. */
export function MockRing({
  percent,
  label,
  caption,
}: {
  percent: number;
  label: string;
  caption: string;
}) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative flex size-[86px] shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 80 80"
        className="size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="var(--ve-border-line)"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="var(--ve-success)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(circumference * percent) / 100} ${circumference}`}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-heading-s text-app-text-brand1">{label}</span>
        <span className="text-body-2xs text-app-text-tertiary">{caption}</span>
      </span>
    </div>
  );
}

/*
 * The app frame: top bar, side rail, and a content well.
 *
 * The hero mockups on the industry pages were built before these primitives
 * existed, so they read as a card floating on the navy hero rather than as a
 * slice of the product. Wrapping their existing composition in this frame is
 * what brings them up to the treatment the newer mockups use — the shell they
 * gain is the Verify Engine app itself, and `MockShell` then paints the whole
 * thing at the width its column actually has, so it grows instead of sitting
 * small.
 *
 * Server-safe: it declares its own rail icons rather than taking them as a
 * prop, so a Server Component can render it without any icon component
 * crossing the server/client boundary.
 */
const frameRailIcons = [
  IconHome,
  IconUser,
  IconShieldCheck,
  IconFileAnalytics,
  IconChartBar,
  IconSettings,
];

export function MockAppFrame({
  right,
  nativeWidth = 620,
  nativeHeight = 360,
  maxZoom = 1.35,
  children,
}: {
  /** Trailing content in the app bar — a status badge, a range picker. */
  right?: ReactNode;
  nativeWidth?: number;
  nativeHeight?: number;
  maxZoom?: number;
  children: ReactNode;
}) {
  return (
    <MockShell
      nativeWidth={nativeWidth}
      nativeHeight={nativeHeight}
      maxZoom={maxZoom}
    >
      <MockTopBar right={right} />
      <div className="flex gap-2">
        {/* The rail is the platform's shell signature; on a phone it would eat
            a fifth of the width the content needs, so it steps out. */}
        <div className="hidden sm:block">
          <MockRail icons={frameRailIcons} />
        </div>
        <div className="flex min-w-px flex-1 flex-col gap-2">{children}</div>
      </div>
    </MockShell>
  );
}
