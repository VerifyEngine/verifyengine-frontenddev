import Link from "next/link";
import Image from "next/image";

// Standalone brand mark, supplied by the client (Color=Color2.svg) — used for
// the favicon (src/app/icon.svg) and anywhere the icon needs to appear on its
// own, without the wordmark.
export function ShieldMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M24.3474 0.0366543C26.4791 -0.0420071 29.0802 0.0297816 31.2469 0.03394C28.3003 7.46041 25.8117 15.2537 22.9194 22.7232C21.7716 25.6876 20.53 28.9683 19.5417 31.9881C17.1162 31.9861 14.4887 32.0155 12.0456 31.9886C11.7947 31.9859 11.6903 31.9099 11.5608 31.7395C11.287 31.0933 11.0214 30.2856 10.7875 29.6182C9.81629 26.8461 8.66928 24.088 7.77138 21.2954C9.92041 21.3081 12.0695 21.2998 14.2184 21.2706L15.66 25.4204C17.1211 20.4439 19.1487 15.1156 20.8282 10.1697C21.9168 6.96365 23.106 3.10629 24.3474 0.0366543Z"
        fill="#A5F3D4"
      />
      <path
        d="M0 0.039909L6.87436 0.00884535C8.37461 4.56707 10.0738 9.0812 11.5782 13.6399C12.1912 15.4975 12.9985 17.4712 13.5431 19.3214C11.3837 19.3396 9.22416 19.3465 7.06465 19.3422C4.84697 13.7724 2.97843 8.05056 0.815565 2.45783C0.532911 1.72695 0.261346 0.988963 0 0.250246V0.039909Z"
        fill="#233364"
      />
    </svg>
  );
}

// Full "VerifyEngine" wordmark image, cropped from the client's brand file
// (Color=Defualt.png). The mark's stylized "V" already reads as the brand
// icon, so this is the whole logo lockup — no separate icon glyph is placed
// beside it. The source only ships an "Engine ink navy" variant meant for
// light backgrounds; since this site only ever shows the logo on the dark
// navy header/footer, "Engine" has been recolored white here for contrast
// (see the recolor step run against the source PNG — "Verify" is untouched).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="Verify Engine — home">
      <Image
        src="/images/verifyengine-wordmark-dark.png"
        alt="Verify Engine"
        width={684}
        height={128}
        priority
        className="h-7 w-auto sm:h-8"
      />
    </Link>
  );
}
