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
import HomeSupportMovement from '@/components/home/HomeSupportMovement';
import HomeEngagement from '@/components/home/HomeEngagement';

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getHomePageData();
  return {
    title: 'iSCTH — Home',
    description: hero.description.slice(0, 160),
    alternates: { canonical: getCanonicalUrl('/') },
  };
}

export default async function HomePage() {
  const [{ hero, impactStats, aboutCoreValues, actionPillars, peaceSummits, supportMovement, engagement }, donate] =
    await Promise.all([getHomePageData(), getDonatePageData(DONATE_PAGE_SLUG)]);

  return (
    <main>
      <HomeHero data={hero} />
      <HomeImpactStats data={impactStats} />
      <HomeAboutCoreValues data={aboutCoreValues} />
      <HomeActionPillars data={actionPillars} />
      <HomePeaceSummits data={peaceSummits} />
      <HomeSupportMovement data={supportMovement} donationForm={donate.contribution} />
      <HomeEngagement data={engagement} />
    </main>
  );
}
