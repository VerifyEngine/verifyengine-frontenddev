/*
 * The page background, exactly as the Figma frames compose it (node
 * 18110:24887 on dark, 18110:24715 on light).
 *
 * It is three layers, not a colour:
 *   1. the canvas fill                        (--ve-canvas, on .ve-canvas)
 *   2. a full-bleed image, flipped vertically, blended with `overlay`
 *   3. a 640px grain tile, blended with `difference` at 10%
 *
 * Both themes use the *same* two images; only the opacity of the image layer
 * changes — 100% on dark, 50% on light — which is why that value is a token
 * rather than a second asset.
 *
 * These two layers are returned as siblings on purpose. Wrapping them in a
 * positioned element with a z-index would give that wrapper its own stacking
 * context, and `mix-blend-mode` only reaches the backdrop *within* its
 * stacking context — the layers would blend with each other over transparency
 * instead of with the canvas fill, showing the raw image. The parent supplies
 * `isolate`, which keeps the blending from escaping the shell.
 */
export function PlatformBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 -scale-y-100 bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: "url(/images/platform-bg-layer.jpg)",
          opacity: "var(--ve-bg-layer-opacity)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-10 mix-blend-difference"
        style={{
          backgroundImage: "url(/images/platform-grain.jpg)",
          backgroundSize: "640px 639.6875px",
          backgroundPosition: "top left",
        }}
      />
    </>
  );
}
