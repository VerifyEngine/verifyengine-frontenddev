import { IconShieldCheck } from "@tabler/icons-react";
import {
  MockBadge,
  MockCheck,
  MockPanel,
  MockRing,
  MockShell,
  MockTile,
  MockTopBar,
} from "@/components/marketing/PlatformMock";

/*
 * The product visual behind the resource heroes — Blog and Guides.
 *
 * Both pages used to carry a hand-built collage: a white card, a marketing
 * score gauge and Lucide ticks. It was the last visual on the site still doing
 * that, and beside the platform-drawn heroes everywhere else it read as an
 * older screenshot of a different product.
 *
 * Same content the approved design puts there — the score, the checks that
 * produced it, the strapline — drawn in the platform's own vocabulary instead:
 * the app bar, a glass panel, Satoshi, Tabler icons and the score ring the
 * signed-in product uses. MockShell sizes it the way every other hero mockup
 * is sized, so it is painted large on a desktop and lays out at 1:1 on a phone
 * rather than being hidden there.
 *
 * A Server Component: no icon components cross a client boundary.
 */
export function ResourceHeroCard({
  title,
  badge,
  score,
  caption,
  checks,
  note,
}: {
  /** Panel heading — what this screen is showing. */
  title: string;
  /** Badge beside it, naming the artefact. */
  badge: string;
  score: number;
  /** Under the score, e.g. "Low Risk". */
  caption: string;
  checks: string[];
  /** The line the panel closes on. */
  note: string;
}) {
  return (
    <MockShell nativeWidth={460} nativeHeight={300} maxZoom={1.45}>
      <MockTopBar right={<MockBadge tone="success">Verified</MockBadge>} />
      <MockPanel title={title} badge={<MockBadge tone="brand">{badge}</MockBadge>}>
        <div className="flex flex-1 items-center gap-4">
          <MockRing percent={score} label={String(score)} caption={caption} />
          <ul className="flex min-w-px flex-1 flex-col gap-2">
            {checks.map((check) => (
              <MockCheck key={check} label={check} value="Verified" />
            ))}
          </ul>
        </div>
        <MockTile className="mt-auto flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-app-12xl bg-app-success text-app-text-inverse">
            <IconShieldCheck size={15} stroke={1.8} aria-hidden />
          </span>
          <span className="text-label-2xs text-app-text">{note}</span>
        </MockTile>
      </MockPanel>
    </MockShell>
  );
}
