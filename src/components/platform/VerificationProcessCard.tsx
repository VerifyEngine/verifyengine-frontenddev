/*
 * Verification Process aside — Figma node 18117:24844.
 *
 * The one purple surface in the platform: Surface/Fade (Brand 1)/80%, which is
 * #5026a2 at 80% — the same base the Brand 1 fades elsewhere are built from.
 * Steps are mint 24px discs with the number in navy; the closing tip is mint
 * text.
 *
 * The card keeps white text in both themes. Figma maps this text to
 * Text/Inverse/Primary, which its dark section redefines as #333333 — on a
 * purple that stays purple in dark, that would be unreadable, so the token is
 * not used here. Raised with the designer.
 */
export function VerificationProcessCard({
  title,
  description,
  steps,
  tip,
}: {
  title: string;
  description: string;
  steps: readonly string[];
  tip: string;
}) {
  return (
    <aside className="flex flex-col gap-6 rounded-app-xl border-w-2xs border-app-line bg-app-brand1-80 p-4 backdrop-blur-[12px]">
      <div className="flex flex-col gap-1">
        <h2 className="text-heading-xs text-white">{title}</h2>
        <p className="text-body-xs text-app-text-tertiary">{description}</p>
      </div>

      <ol className="flex flex-col gap-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-app-xl bg-app-brand2 text-label-2xs text-app-text-brand1">
              {index + 1}
            </span>
            <span className="min-w-px flex-1 text-label-2xs text-white">{step}</span>
          </li>
        ))}
      </ol>

      <p className="text-body-xs text-app-text-brand2">{tip}</p>
    </aside>
  );
}
