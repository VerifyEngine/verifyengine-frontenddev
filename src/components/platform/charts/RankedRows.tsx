/*
 * The fading row ladder shared by Top Clients (Figma 18176:37625) and Top US
 * States (18176:37570): each row steps Surface/Fade (Brand 2) down from 80% to
 * 8%, so the list reads as a ranking before any number is read.
 *
 * Written out in full so Tailwind can see every class.
 */
export const RANK_FADES = [
  "bg-app-brand2/80",
  "bg-app-brand2/72",
  "bg-app-brand2/64",
  "bg-app-brand2/56",
  "bg-app-brand2/48",
  "bg-app-brand2/40",
  "bg-app-brand2/32",
  "bg-app-brand2/24",
  "bg-app-brand2/16",
  "bg-app-brand2/8",
] as const;

export function rankFade(index: number) {
  return RANK_FADES[Math.min(index, RANK_FADES.length - 1)];
}
