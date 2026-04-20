import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/config/site';
import { getHomePageData } from '@/lib/api/homepage';
import HomeHero from '@/components/home/HomeHero';
import HomeImpactStats from '@/components/home/HomeImpactStats';
import HomeAboutCoreValues from '@/components/home/HomeAboutCoreValues';
import HomeActionPillars from '@/components/home/HomeActionPillars';

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getHomePageData();
  return {
    title: 'iSCTH — Home',
    description: hero.description.slice(0, 160),
    alternates: { canonical: getCanonicalUrl('/') },
  };
}

export default async function HomePage() {
  const { hero, impactStats, aboutCoreValues, actionPillars } = await getHomePageData();

  return (
    <main>
      <HomeHero data={hero} />
      <HomeImpactStats data={impactStats} />
      <HomeAboutCoreValues data={aboutCoreValues} />
      <HomeActionPillars data={actionPillars} />
    </main>
  );
}
