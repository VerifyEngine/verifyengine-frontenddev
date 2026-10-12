import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The preview card WhatsApp, LinkedIn, Slack, iMessage and X show when a link
// to the site is shared. Every page inherits it, since none sets its own.
// It is drawn like the home hero: navy ground, the white-on-navy wordmark, the
// hero headline with its mint highlight.

export const alt = "Verify Engine — AI-Powered Landlord Verification for Faster, Smarter Tenant Screening";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY_900 = "#071d45";
const NAVY_700 = "#123a72";
const MINT_200 = "#8fe9d9";

export default async function Image() {
  const [wordmark, poppinsBold, poppinsSemiBold] = await Promise.all([
    readFile(join(process.cwd(), "public/images/verifyengine-wordmark-dark.png")),
    readFile(join(process.cwd(), "src/fonts/Poppins-Bold.ttf")),
    readFile(join(process.cwd(), "src/fonts/Poppins-SemiBold.ttf")),
  ]);
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: `radial-gradient(circle at 100% 0%, ${NAVY_700} 0%, ${NAVY_900} 55%)`,
          fontFamily: "Poppins",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
        <img src={wordmarkSrc} width={385} height={72} alt="" />

        {/* Broken into lines by hand: the renderer would otherwise wrap the
            highlighted phrase as one block and leave a stray space. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "white",
          }}
        >
          <span>AI-Powered Landlord</span>
          <span>Verification for</span>
          <span style={{ color: MINT_200 }}>Faster, Smarter</span>
          <span>Tenant Screening</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.65)" }}>
            AI voice agents · Fraud detection · Human reviewed
          </span>
          <span style={{ color: MINT_200 }}>verifyengine.ai</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
        { name: "Poppins", data: poppinsSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
