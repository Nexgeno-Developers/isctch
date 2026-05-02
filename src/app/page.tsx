import type { Metadata } from 'next';
import { DONATE_PAGE_SLUG } from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';
import { getDonatePageData } from '@/lib/api/donate';
import { getHomePageData } from '@/lib/api/homepage';
import HomeHero from '@/components/home/HomeHero';
import HomeImpactStats from '@/components/home/HomeImpactStats';
import HomeAboutCoreValues from '@/components/home/HomeAboutCoreValues';
import HomeActionPillars from '@/components/home/HomeActionPillars';
import HomePeaceSummits from '@/components/home/HomePeaceSummits';
import HomeHappyClients from '@/components/home/HomeHappyClients';
import HomeSupportMovement from '@/components/home/HomeSupportMovement';
import HomeEngagement from '@/components/home/HomeEngagement';

export async function generateMetadata(): Promise<Metadata> {
  const { hero, seo } = await getHomePageData();
  const title = seo?.title?.trim() || 'iSCTH — Home';
  const description = (seo?.description?.trim() || hero.description || '').slice(0, 160);
  const keywords = seo?.keywords
    ?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const canonical = seo?.canonical_url?.trim() || getCanonicalUrl('/');
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
  };
}

export default async function HomePage() {
  const [
    { hero, impactStats, aboutCoreValues, actionPillars, peaceSummits, happyClients, supportMovement, engagement },
    donate,
  ] = await Promise.all([getHomePageData(), getDonatePageData(DONATE_PAGE_SLUG)]);

  return (
    <main>
      <HomeHero data={hero} />
      <HomeImpactStats data={impactStats} />
      <HomeAboutCoreValues data={aboutCoreValues} />
      <HomeActionPillars data={actionPillars} />
      <HomePeaceSummits data={peaceSummits} />
      <HomeSupportMovement data={supportMovement} donationForm={donate.contribution} />
      <HomeHappyClients data={happyClients} />
      <HomeEngagement data={engagement} />
    </main>
  );
}
