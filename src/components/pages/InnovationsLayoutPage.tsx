import type { InnovationsPageData } from '@/lib/api/innovations_layout';
import InnovationsFeatureCards from '@/components/innovations/InnovationsFeatureCards';
import InnovationsHero from '@/components/innovations/InnovationsHero';
import InnovationsIntro from '@/components/innovations/InnovationsIntro';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import LatestNewsClient from '@/components/marketing/LatestNewsClient';

export default async function InnovationsLayoutPage({ data }: { data: InnovationsPageData }) {
  const trendItems = data.latestInsights || [];
  const pressItems = data.latestNews || [];

  return (
    <main className="min-h-screen bg-white">
      <InnovationsHero heroTitle={data.heroTitle} heroBackgroundImage={data.heroBackgroundImage} />
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
