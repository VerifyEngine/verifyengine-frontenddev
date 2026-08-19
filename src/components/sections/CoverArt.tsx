import {
  LineChart,
  Scale,
  Sparkles,
  ClipboardCheck,
  Quote,
  type LucideIcon,
} from "lucide-react";

/**
 * Stand-in cover art for articles, guides and case studies.
 *
 * The design shows photography here, but no image assets were supplied with
 * the design package. Rather than ship broken images or grey boxes, each
 * category gets a deterministic gradient and mark so the grid still reads as
 * distinct cards. Swap this for real imagery when the assets arrive — every
 * card renders through this one component.
 */

const themes: Record<string, { from: string; to: string; icon: LucideIcon }> = {
  "Industry Insights": { from: "#0B2A5C", to: "#14B8A6", icon: LineChart },
  "Compliance & Regulations": { from: "#071D45", to: "#3B82F6", icon: Scale },
  "Product Updates": { from: "#0B2A5C", to: "#8FE9D9", icon: Sparkles },
  "Best Practices": { from: "#123A72", to: "#2DD4BF", icon: ClipboardCheck },
  "Customer Stories": { from: "#05122B", to: "#0D9488", icon: Quote },
};

const fallback = { from: "#071D45", to: "#14B8A6", icon: Sparkles };

export function CoverArt({
  category,
  className = "aspect-16/10",
}: {
  category: string;
  className?: string;
}) {
  const theme = themes[category] ?? fallback;
  const Icon = theme.icon;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <Icon
        className="absolute -right-4 -bottom-4 size-28 text-white/15"
        strokeWidth={1.25}
      />
      <Icon className="absolute top-1/2 left-6 size-9 -translate-y-1/2 text-white/85" strokeWidth={1.5} />
    </div>
  );
}
