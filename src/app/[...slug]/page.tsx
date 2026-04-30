import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  ABOUT_US_PAGE_SLUG,
  CONTACT_US_PAGE_SLUG,
  DONATE_PAGE_SLUG,
  GET_INVOLVED_PAGE_SLUG,
  SUMMITS_PAGE_SLUG,
  WHAT_WE_DO_PAGE_SLUG,
  fullSlugFromParams,
  matchesRouteSlug,
} from '@/config/publicRoutes';
import { AboutPageView } from '@/app/about-us/page';
import { ContactPageView } from '@/app/contact-us/page';
import { DonatePageView } from '@/app/donate/page';
import { GetInvolvedPageView } from '@/app/get-involved/page';
import { SummitDetailPageView } from '@/app/summits/[slug]/page';
import { SummitsPageView } from '@/app/summits/page';
import { WhatWeDoPageView } from '@/app/what-we-do/page';
import { getCanonicalUrl } from '@/config/site';
import { getAboutPageData } from '@/lib/api/about';
import { getContactPageData } from '@/lib/api/contact';
import { getDonatePageData } from '@/lib/api/donate';
import { getGetInvolvedPageData } from '@/lib/api/getInvolved';
import { getSummitDetailPageData, isSummitDetailPath } from '@/lib/api/summits';
import { getWhatWeDoPageData } from '@/lib/api/whatWeDo';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (matchesRouteSlug(fullSlug, ABOUT_US_PAGE_SLUG, 'last-segment')) {
    const data = await getAboutPageData(fullSlug);
    return {
      title: data.hero.breadcrumbCurrentLabel,
      description: data.story.body[0]?.slice(0, 160),
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (fullSlug === CONTACT_US_PAGE_SLUG) {
    const data = await getContactPageData(fullSlug);
    return {
      title: data.hero.breadcrumbCurrentLabel,
      description: data.secretariat.description.slice(0, 160),
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (matchesRouteSlug(fullSlug, WHAT_WE_DO_PAGE_SLUG, 'last-segment')) {
    const data = await getWhatWeDoPageData(fullSlug);
    return {
      title: 'What we do',
      description: data.peaceSummits.title.slice(0, 160),
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (matchesRouteSlug(fullSlug, SUMMITS_PAGE_SLUG, 'last-segment')) {
    return {
      title: 'Summits',
      description:
        'Explore global summits and events convening leaders, activists, and communities for peace.',
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (isSummitDetailPath(fullSlug)) {
    const data = await getSummitDetailPageData(fullSlug);
    return {
      title: data.detail.title,
      description: data.detail.summary.slice(0, 160),
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (matchesRouteSlug(fullSlug, GET_INVOLVED_PAGE_SLUG, 'last-segment')) {
    const data = await getGetInvolvedPageData();
    return {
      title: 'Get Involved',
      description: data.program.description[0]?.slice(0, 160),
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (matchesRouteSlug(fullSlug, DONATE_PAGE_SLUG, 'last-segment')) {
    const data = await getDonatePageData(fullSlug);
    return {
      title: 'Donate',
      description: data.contribution.paragraphOne.slice(0, 160),
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  return { title: 'Not Found' };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (matchesRouteSlug(fullSlug, ABOUT_US_PAGE_SLUG, 'last-segment')) {
    return <AboutPageView slug={fullSlug} />;
  }

  if (fullSlug === CONTACT_US_PAGE_SLUG) {
    return <ContactPageView slug={fullSlug} />;
  }

  if (matchesRouteSlug(fullSlug, WHAT_WE_DO_PAGE_SLUG, 'last-segment')) {
    return <WhatWeDoPageView slug={fullSlug} />;
  }

  if (matchesRouteSlug(fullSlug, SUMMITS_PAGE_SLUG, 'last-segment')) {
    return <SummitsPageView />;
  }

  if (isSummitDetailPath(fullSlug)) {
    return <SummitDetailPageView slug={fullSlug} />;
  }

  if (matchesRouteSlug(fullSlug, GET_INVOLVED_PAGE_SLUG, 'last-segment')) {
    return <GetInvolvedPageView />;
  }

  if (matchesRouteSlug(fullSlug, DONATE_PAGE_SLUG, 'last-segment')) {
    return <DonatePageView slug={fullSlug} />;
  }

  notFound();
}
