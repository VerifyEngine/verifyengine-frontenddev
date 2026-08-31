import { HeroHome } from "@/components/marketing/HeroHome";
import { LogosRow } from "@/components/sections/LogosRow";
import { NewStandard } from "@/components/marketing/NewStandard";
import { IndustriesWeServe } from "@/components/marketing/IndustriesWeServe";
import { HowItWorksStrip } from "@/components/marketing/HowItWorksStrip";
import { ExperienceCards } from "@/components/marketing/ExperienceCards";
import { PlatformStrip } from "@/components/marketing/PlatformStrip";
import { ProvenResults } from "@/components/marketing/ProvenResults";
import { FinalCta } from "@/components/sections/FinalCta";

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
      <IndustriesWeServe />
      <HowItWorksStrip />
      <ExperienceCards />
      <PlatformStrip />
      <ProvenResults />
      <FinalCta />
    </>
  );
}
