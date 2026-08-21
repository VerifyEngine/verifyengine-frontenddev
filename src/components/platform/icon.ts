/**
 * Icon sizing for the platform.
 *
 * The design is drawn with Tabler icons, and the exported SVGs pin down two
 * things the eye would otherwise get wrong:
 *
 *   - a 20px icon carries a 1.2px stroke  (Figma token Width/M)
 *   - a 12px icon carries a 0.8px stroke  (Figma token Width/XS)
 *
 * The stroke is an absolute width chosen per size, not a value that scales
 * with the icon, so it cannot be expressed as one number.
 *
 * Tabler measures `stroke` in its own 24-unit viewBox, so a stroke that should
 * render at Npx on a Spx icon must be passed as N * 24 / S. Tabler's default
 * of 2 would render 1.67px at 20px — a third too heavy across every screen.
 *
 * This module deliberately exports plain values rather than a wrapper
 * component that takes an icon as a prop: passing icon *components* across the
 * server/client boundary is what previously hung a route in this project.
 * Icons are imported and rendered directly in the module that uses them.
 */

const STROKE_PX_BY_SIZE: Record<number, number> = {
  20: 1.2, // Width/M
  16: 1.0, // Width/S
  12: 0.8, // Width/XS
};

export function iconProps(size: 12 | 16 | 20 = 20) {
  return {
    size,
    stroke: (STROKE_PX_BY_SIZE[size] * 24) / size,
    "aria-hidden": true,
  } as const;
}
