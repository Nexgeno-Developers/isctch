import type { InnovationsPageData } from '@/lib/api/innovations_layout';
// import { fetchMarketingLatestNews, fetchMarketingPressNews } from '@/lib/api';
import { plainTextFromMaybeHtml } from '@/lib/htmlText';
import InnovationsFeatureCards from '@/components/innovations/InnovationsFeatureCards';
import InnovationsHero from '@/components/innovations/InnovationsHero';
import InnovationsIntro from '@/components/innovations/InnovationsIntro';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import LatestNewsClient from '@/components/marketing/LatestNewsClient';

export default async function InnovationsLayoutPage({ data }: { data: InnovationsPageData }) {
  const trendItems = data.latestInsights || [];
  const pressItems = data.latestNews || [];

  const breadcrumbLabel = plainTextFromMaybeHtml(data.title).trim() || 'Innovations';

  return (
    <main className="min-h-screen bg-white">
      <InnovationsHero heroTitle={data.heroTitle} heroBackgroundImage={data.heroBackgroundImage} />
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} />
        </div>
      </section>
      <InnovationsIntro
        introHeadingBlack={data.introHeadingBlack}
        introHeadingBlue={data.introHeadingBlue}
        introBody={data.introBody}
      />
      <InnovationsFeatureCards cards={data.featureCards} />
      <LatestNewsClient trendItems={trendItems} pressItems={pressItems} />

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}
