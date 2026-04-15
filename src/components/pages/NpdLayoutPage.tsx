import type { NpdPageData } from '@/lib/api/npd_layout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import LatestNewsClient from '@/components/marketing/LatestNewsClient';
import VideoBanner from '@/components/home/VideoBanner';
import NpdHero from '@/components/npd/NpdHero';
import NpdInnovationEcosystem from '@/components/npd/NpdInnovationEcosystem';
import NpdIntroSection from '@/components/npd/NpdIntroSection';
import { NPD_STATIC_VIDEO_BANNER } from '@/components/npd/npdVideoBannerData';
import { fetchInnovationsLayoutPage } from '@/lib/api/innovations_layout';
import { formatBoldText } from '@/lib/htmlText';

export default async function NpdLayoutPage({ data }: { data: NpdPageData }) {
  const innovationsData = await fetchInnovationsLayoutPage('innovations');
  const trendItems = innovationsData?.page.latestInsights || [];
  const pressItems = innovationsData?.page.latestNews || [];

  const videoBannerPrefetched = {
    ...NPD_STATIC_VIDEO_BANNER,
    preTitle: data.title,
    ...(data.videoUrl ? { videoUrl: data.videoUrl } : {}),
  };

  return (
    <main className="min-h-screen bg-white">
      <NpdHero heroBackgroundImage={data.heroBackgroundImage} title={data.title} />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: data.title }]} />
        </div>
      </section>

      <NpdIntroSection
        heroTitle={data.heroTitle}
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
      {(data.packagingSolutionTitle || data.packagingSolutionDescription) && (
        <section className="bg-gray-50 pb-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              {data.packagingSolutionTitle ? (
                <h2
                  className="text-[22px] font-bold leading-tight text-black md:text-4xl lg:text-5xl lg:leading-snug"
                  dangerouslySetInnerHTML={{ __html: formatBoldText(data.packagingSolutionTitle) }}
                />
              ) : null}
              {data.packagingSolutionDescription ? (
                <p className="mt-2 text-sm leading-relaxed text-black md:mt-3 md:text-base">
                  {data.packagingSolutionDescription}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      )}
      <VideoBanner prefetchedData={videoBannerPrefetched} />
      <LatestNewsClient trendItems={trendItems} pressItems={pressItems} />

      <div className="bg-gray-50 pt-0 lg:pt-0">
        <CallToAction />
      </div>

      <NewsletterSubscription />
    </main>
  );
}
