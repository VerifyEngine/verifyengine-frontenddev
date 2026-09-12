/*
 * Rule Examples aside — Figma node 18176:28420.
 *
 * A mint card at Surface/Fade (Brand 2)/80%, holding two headed lists of
 * shorthand rules.
 *
 * Figma paints the title with Text/Inverse/Primary. That token is white in the
 * light theme, and this card stays mint in both — white on mint would be
 * unreadable, and the screen is only drawn in dark, where the token happens to
 * resolve to a dark grey. The navy brand text is used instead so the card
 * works in both themes. Raised with the designer, along with the same problem
 * on the New Order process card.
 */
export function RuleExamplesCard({
  title,
  groups,
}: {
  title: string;
  groups: readonly { heading: string; examples: readonly string[] }[];
}) {
  return (
    <aside className="flex flex-col gap-6 rounded-app-xl border-w-2xs border-app-line bg-app-brand2-80 p-6 backdrop-blur-[12px]">
      <h2 className="text-heading-xs text-app-text-brand1">{title}</h2>

      {groups.map((group) => (
        <div key={group.heading} className="flex flex-col gap-2 text-app-text-brand1-secondary">
          <h3 className="text-label-xs">{group.heading}</h3>
          <ul className="list-disc space-y-1.5 ps-5">
            {group.examples.map((example) => (
              <li key={example} className="text-body-xs">
                {example}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
