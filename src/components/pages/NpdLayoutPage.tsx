import type { NpdPageData } from '@/lib/api/npd_layout';
import VideoBanner from '@/components/home/VideoBanner';
import NpdHero from '@/components/npd/NpdHero';
import NpdInnovationEcosystem from '@/components/npd/NpdInnovationEcosystem';
import NpdIntroSection from '@/components/npd/NpdIntroSection';
import { NPD_STATIC_VIDEO_BANNER } from '@/components/npd/npdVideoBannerData';

export default function NpdLayoutPage({ data }: { data: NpdPageData }) {
  return (
    <main className="min-h-screen bg-white">
      <NpdHero heroBackgroundImage={data.heroBackgroundImage} heroTitle={data.heroTitle} />
      <NpdIntroSection
        introHeadingBlack={data.introHeadingBlack}
        introHeadingBlue={data.introHeadingBlue}
        introBody={data.introBody}
        introImage={data.introImage}
        introImageAlt={data.introImageAlt}
        primaryCta={data.primaryCta}
        secondaryCta={data.secondaryCta}
      />
     
      <NpdInnovationEcosystem
        ecosystemTitleBlack={data.ecosystemTitleBlack}
        ecosystemTitleBlue={data.ecosystemTitleBlue}
        ecosystemCards={data.ecosystemCards}
      />
       <VideoBanner prefetchedData={NPD_STATIC_VIDEO_BANNER} />
    </main>
  );
}
