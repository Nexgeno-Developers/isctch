import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import PageBreadcrumbHero from '@/components/common/PageBreadcrumbHero';
import HomeActionPillars from '@/components/home/HomeActionPillars';
import HomePeaceSummits from '@/components/home/HomePeaceSummits';
import { WHAT_WE_DO_PAGE_SLUG, whatWeDoPath } from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';
import { getWhatWeDoPageData } from '@/lib/api/whatWeDo';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWhatWeDoPageData(WHAT_WE_DO_PAGE_SLUG);
  return {
    title: 'What we do',
    description: data.actionPillars.title.slice(0, 160),
    alternates: { canonical: getCanonicalUrl(whatWeDoPath()) },
  };
}

export async function WhatWeDoPageView({ slug = WHAT_WE_DO_PAGE_SLUG }: { slug?: string }) {
  const data = await getWhatWeDoPageData(slug);

  return (
    <main>
      <PageBreadcrumbHero
        breadcrumbHomeLabel={data.hero.breadcrumbHomeLabel}
        breadcrumbCurrentLabel={data.hero.breadcrumbCurrentLabel}
        kicker={data.hero.kicker}
        titleBlue={data.hero.titleBlue}
        titleOrange={data.hero.titleOrange}
      />
      <section id="programs">
        <HomeActionPillars data={data.actionPillars} />
      </section>
      <section id="initiatives">
        <HomePeaceSummits data={data.peaceSummits} />
      </section>
    </main>
  );
}

export default async function WhatWeDoPage() {
  if (WHAT_WE_DO_PAGE_SLUG !== 'what-we-do') {
    redirect(whatWeDoPath());
  }
  return <WhatWeDoPageView slug={WHAT_WE_DO_PAGE_SLUG} />;
}
