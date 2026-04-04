import type { InnovationsPageData } from '@/lib/api/innovations_layout';
import { fetchMarketingLatestNews, fetchMarketingPressNews } from '@/lib/api';
import InnovationsFeatureCards from '@/components/innovations/InnovationsFeatureCards';
import InnovationsHero from '@/components/innovations/InnovationsHero';
import InnovationsIntro from '@/components/innovations/InnovationsIntro';
import LatestNewsClient, { type MarketingNewsItem } from '@/components/marketing/LatestNewsClient';

export default async function InnovationsLayoutPage({ data }: { data: InnovationsPageData }) {
  const [trendItems, pressItems] = await Promise.all([
    fetchMarketingLatestNews().catch(() => [] as MarketingNewsItem[]),
    fetchMarketingPressNews().catch(() => [] as MarketingNewsItem[]),
  ]);

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
    </main>
  );
}
