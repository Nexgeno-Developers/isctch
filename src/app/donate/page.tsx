import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import DonationContributionSection from '@/components/donate/DonationContributionSection';
import DonationBeyondSupportSection from '@/components/donate/DonationBeyondSupportSection';
import DonationHero from '@/components/donate/DonationHero';
import DonationJoinMovementSection from '@/components/donate/DonationJoinMovementSection';
import HomeImpactStats from '@/components/home/HomeImpactStats';
import { DONATE_PAGE_SLUG, donatePath } from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';
import { getDonatePageData } from '@/lib/api/donate';
import { getHomePageData } from '@/lib/api/homepage';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDonatePageData(DONATE_PAGE_SLUG);
  return {
    title: 'Donate',
    description: data.contribution.paragraphOne.slice(0, 160),
    alternates: { canonical: getCanonicalUrl(donatePath()) },
  };
}

export async function DonatePageView({ slug = DONATE_PAGE_SLUG }: { slug?: string }) {
  const { impactStats } = await getHomePageData();
  const data = await getDonatePageData(slug);

  return (
    <main>
      <DonationHero data={data.hero} />
      <HomeImpactStats data={impactStats} />
      <DonationContributionSection data={data.contribution} />
      <DonationBeyondSupportSection data={data.beyondSupport} />
      <DonationJoinMovementSection data={data.joinMovement} />
    </main>
  );
}

export default async function DonatePage() {
  if (DONATE_PAGE_SLUG !== 'donate') {
    redirect(donatePath());
  }
  return <DonatePageView slug={DONATE_PAGE_SLUG} />;
}
