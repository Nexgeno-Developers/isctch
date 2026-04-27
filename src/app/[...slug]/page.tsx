import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  ABOUT_US_PAGE_SLUG,
  CONTACT_US_PAGE_SLUG,
  DONATE_PAGE_SLUG,
  WHAT_WE_DO_PAGE_SLUG,
  fullSlugFromParams,
  matchesRouteSlug,
} from '@/config/publicRoutes';
import { DonatePageView } from '@/app/donate/page';
import { WhatWeDoPageView } from '@/app/what-we-do/page';
import { getCanonicalUrl } from '@/config/site';
import { getDonatePageData } from '@/lib/api/donate';
import { getWhatWeDoPageData } from '@/lib/api/whatWeDo';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (fullSlug === ABOUT_US_PAGE_SLUG) {
    return {
      title: 'About Us',
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (fullSlug === CONTACT_US_PAGE_SLUG) {
    return {
      title: 'Contact Us',
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

  if (fullSlug === ABOUT_US_PAGE_SLUG || fullSlug === CONTACT_US_PAGE_SLUG) {
    return <main className="min-h-[40vh]" />;
  }

  if (matchesRouteSlug(fullSlug, WHAT_WE_DO_PAGE_SLUG, 'last-segment')) {
    return <WhatWeDoPageView slug={fullSlug} />;
  }

  if (matchesRouteSlug(fullSlug, DONATE_PAGE_SLUG, 'last-segment')) {
    return <DonatePageView slug={fullSlug} />;
  }

  notFound();
}
