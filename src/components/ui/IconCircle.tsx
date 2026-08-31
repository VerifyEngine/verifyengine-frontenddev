import type { LucideIcon } from "lucide-react";

type Tone = "mint" | "navy";

const tones: Record<Tone, string> = {
  mint: "bg-mint-100 text-teal-600",
  navy: "bg-white/10 text-mint-200",
};

export function IconCircle({
  icon: Icon,
  tone = "mint",
  size = "md",
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "size-12" : "size-14";
  const iconDim = size === "sm" ? "size-6" : "size-7";
  return (
    <div className={`flex ${dim} shrink-0 items-center justify-center rounded-full ${tones[tone]}`}>
      <Icon className={iconDim} strokeWidth={1.75} />
    </div>
  );
}
