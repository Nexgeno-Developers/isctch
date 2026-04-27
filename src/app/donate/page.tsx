import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import DonationBeyondSupportSection from '@/components/donate/DonationBeyondSupportSection';
import DonationContributionSection from '@/components/donate/DonationContributionSection';
import DonationJoinMovementSection from '@/components/donate/DonationJoinMovementSection';
import PageBreadcrumbHero from '@/components/common/PageBreadcrumbHero';
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
      <PageBreadcrumbHero
        breadcrumbHomeLabel={data.hero.breadcrumbHomeLabel}
        breadcrumbCurrentLabel={data.hero.breadcrumbCurrentLabel}
        kicker={data.hero.kicker}
        titleBlue={data.hero.titleBlue}
        titleOrange={data.hero.titleOrange}
      />
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
