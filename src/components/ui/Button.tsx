import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "primary" | "outline-dark" | "outline-light" | "dark" | "ghost-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  // Solid mint fill, navy text — the "Book Demo" primary CTA everywhere.
  primary: "bg-mint-200 text-navy-900 hover:bg-mint-300",
  // Outline for use on the dark navy hero sections (e.g. "See How It Works").
  "outline-dark": "border border-white/30 text-white hover:bg-white/10",
  // Outline for use on light/white backgrounds (e.g. header "Get Started").
  "outline-light": "border border-navy-900/20 text-navy-900 hover:bg-navy-900/5",
  // Solid navy fill, white text (e.g. "Create Account", featured pricing card CTA).
  dark: "bg-navy-900 text-white hover:bg-navy-800",
  "ghost-dark": "text-white/90 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
};

type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonOwnProps>;

export function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}

export function ArrowRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 5.5 11 8l-4.5 2.5v-5Z" fill="currentColor" />
    </svg>
  );
}

export function Section({
  as: Tag = "section",
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"section">) {
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--site-max-width)] px-6 lg:px-10 xl:px-14 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A band that runs the full width of the viewport.
 *
 * Unlike <Container> it is not held to the site's centred column: it takes the
 * whole viewport with matching space on both sides, and only stops widening at
 * --site-hero-max-width so a line of copy does not run the length of an
 * ultrawide monitor. The heroes and the partner bands share it, so the product
 * mockups all get the same generous column.
 */
export function FullBleedContainer({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[var(--site-hero-max-width)] px-6 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

/** A <FullBleedContainer> that is itself the copy/mockup grid of a hero. */
export function HeroRow({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <FullBleedContainer className={`grid grid-cols-1 items-center ${className}`}>
      {children}
    </FullBleedContainer>
  );
}
