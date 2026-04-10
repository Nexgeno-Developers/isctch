import type { NpdPageData } from '@/lib/api/npd_layout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import VideoBanner from '@/components/home/VideoBanner';
import NpdHero from '@/components/npd/NpdHero';
import NpdInnovationEcosystem from '@/components/npd/NpdInnovationEcosystem';
import NpdIntroSection from '@/components/npd/NpdIntroSection';
import { NPD_STATIC_VIDEO_BANNER } from '@/components/npd/npdVideoBannerData';

export default function NpdLayoutPage({ data }: { data: NpdPageData }) {
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
      <VideoBanner prefetchedData={videoBannerPrefetched} />

      <div className="bg-gray-50 pt-8 lg:pt-24">
        <CallToAction />
      </div>

      <NewsletterSubscription />
    </main>
  );
}
