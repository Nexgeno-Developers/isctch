import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';
import PilotPlantFacilitySection from '@/components/pilot-plant/PilotPlantFacilitySection';
import PilotPlantFeatureCards from '@/components/pilot-plant/PilotPlantFeatureCards';
import PilotPlantHero from '@/components/pilot-plant/PilotPlantHero';
import PilotPlantInnovationEcosystem from '@/components/pilot-plant/PilotPlantInnovationEcosystem';
import PilotPlantIntro from '@/components/pilot-plant/PilotPlantIntro';
import PilotPlantScopeAndAgile from '@/components/pilot-plant/PilotPlantScopeAndAgile';
import PilotPlantStatsBanner from '@/components/pilot-plant/PilotPlantStatsBanner';

export default function PilotPlantLayoutPage({ data }: { data: PilotPlantPageData }) {
  return (
    <main className="min-h-screen bg-white">
      <PilotPlantHero heroBackgroundImage={data.heroBackgroundImage} heroTitle={data.heroTitle} />
      <PilotPlantIntro
        introLabel={data.introLabel}
        introHeadingBlack={data.introHeadingBlack}
        introHeadingBlue={data.introHeadingBlue}
        introBody={data.introBody}
        introImage={data.introImage}
        introImageAlt={data.introImageAlt}
        introOverlayTitle={data.introOverlayTitle}
        introOverlaySubtitle={data.introOverlaySubtitle}
        primaryCta={data.primaryCta}
        secondaryCta={data.secondaryCta}
      />
      <PilotPlantFacilitySection
        facilityTitleBlack={data.facilityTitleBlack}
        facilityTitleBlue={data.facilityTitleBlue}
        facilityDescription={data.facilityDescription}
      />
      <PilotPlantFeatureCards cards={data.featureCards} />
      <PilotPlantScopeAndAgile
        scopeLabel={data.scopeLabel}
        scopeTitleBlue={data.scopeTitleBlue}
        scopeTitleBlack={data.scopeTitleBlack}
        scopeGrid={data.scopeGrid}
        agileEyebrow={data.agileEyebrow}
        agileTitle={data.agileTitle}
        agileBody={data.agileBody}
        agileHighlights={data.agileHighlights}
      />
      <PilotPlantInnovationEcosystem
        titleBlack={data.ecosystemTitleBlack}
        titleBlue={data.ecosystemTitleBlue}
        steps={data.ecosystemSteps}
      />
      <PilotPlantStatsBanner stats={data.stats} />
    </main>
  );
}
