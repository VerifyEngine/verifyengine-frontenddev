import { HeroHome } from "@/components/marketing/HeroHome";
import { LogosRow } from "@/components/sections/LogosRow";
import { NewStandard } from "@/components/marketing/NewStandard";
import { IndustriesWeServe } from "@/components/marketing/IndustriesWeServe";
import { HowItWorksStrip } from "@/components/marketing/HowItWorksStrip";
import { ExperienceCards } from "@/components/marketing/ExperienceCards";
import { PlatformStrip } from "@/components/marketing/PlatformStrip";
import { ProvenResults } from "@/components/marketing/ProvenResults";
import { HomeCta } from "@/components/marketing/HomeCta";

export default function Home() {
  return (
    <>
      <HeroHome />
      {/* The same partner band the other pages use — the capability badges
          that used to sit above it now close the hero itself. */}
      <LogosRow
        label="Trusted by innovative companies"
        logos={["RentPrep", "ProScreen", "appfolio", "RentCheck", "Certn", "snappt"]}
        background="white"
      />
      <NewStandard />
      {/* The platform section further down now carries "One Platform. Multiple
          Verification Workflows." as its H2, so this band — which used the same
          line by default — takes the headline that matches its own eyebrow. */}
      <IndustriesWeServe title="Verification Built for Your Industry." />
      <HowItWorksStrip />
      <ExperienceCards />
      <PlatformStrip />
      <ProvenResults />
      <HomeCta />
    </>
  );
}
