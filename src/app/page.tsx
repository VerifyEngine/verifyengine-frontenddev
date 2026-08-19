import { HeroHome } from "@/components/marketing/HeroHome";
import { TrustBar } from "@/components/marketing/TrustBar";
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
      <TrustBar />
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
