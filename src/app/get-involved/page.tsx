import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import PageBreadcrumbHero from '@/components/common/PageBreadcrumbHero';
import GetInvolvedApplicationSection from '@/components/get-involved/GetInvolvedApplicationSection';
import { GET_INVOLVED_PAGE_SLUG, getInvolvedPath } from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';
import { getGetInvolvedPageData } from '@/lib/api/getInvolved';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGetInvolvedPageData();
  return {
    title: 'Get Involved',
    description: data.program.description[0]?.slice(0, 160),
    alternates: { canonical: getCanonicalUrl(getInvolvedPath()) },
  };
}

export async function GetInvolvedPageView() {
  const data = await getGetInvolvedPageData();

  return (
    <main>
      <PageBreadcrumbHero
        breadcrumbHomeLabel={data.hero.breadcrumbHomeLabel}
        breadcrumbCurrentLabel={data.hero.breadcrumbCurrentLabel}
        kicker={data.hero.kicker}
        titleBlue={data.hero.titleBlue}
        titleOrange={data.hero.titleOrange}
      />
      <GetInvolvedApplicationSection program={data.program} application={data.application} />
    </main>
  );
}

export default async function GetInvolvedPage() {
  if (GET_INVOLVED_PAGE_SLUG !== 'get-involved') {
    redirect(getInvolvedPath());
  }
  return <GetInvolvedPageView />;
}
