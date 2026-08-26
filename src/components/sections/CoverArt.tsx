import {
  Building2,
  ClipboardCheck,
  GraduationCap,
  HeartPulse,
  Landmark,
  LineChart,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
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

  // Guide categories.
  "Getting Started": { from: "#0B2A5C", to: "#5EEAD4", icon: Sparkles },
  Compliance: { from: "#071D45", to: "#60A5FA", icon: Scale },
  "Industry-Specific": { from: "#0E2E63", to: "#0EA5A4", icon: Building2 },
  "Product How-To's": { from: "#123A72", to: "#34D399", icon: ClipboardCheck },

  // Case study industries.
  "Property Management": { from: "#0B2A5C", to: "#2DD4BF", icon: Building2 },
  "Employment Services": { from: "#123A72", to: "#38BDF8", icon: Users },
  "Financial Services": { from: "#071D45", to: "#4F8EF7", icon: Landmark },
  Healthcare: { from: "#0A2350", to: "#22C7B8", icon: HeartPulse },
  Education: { from: "#0E2E63", to: "#7DD3FC", icon: GraduationCap },
  "Background Screening": { from: "#05122B", to: "#0D9488", icon: ShieldCheck },
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
