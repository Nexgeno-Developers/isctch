import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ContactUsPage from '@/components/ContactUsPage';
import { AboutUsPageSection } from '@/components/sections/AboutUsPageSection';
import { buildApiMetadata } from '@/components/seo/buildApiMetadata';
import {
  ABOUT_US_PAGE_SLUG,
  CONTACT_US_PAGE_SLUG,
  aboutUsPath,
} from '@/config/publicRoutes';
import { fetchAboutUsLayout1Page } from '@/lib/api/about_us_layout_1';
import {
  fetchContactUsLayoutPage,
  type ContactUsLayoutPageData,
} from '@/lib/api/contact_us_layout';

const FALLBACK_CONTACT: ContactUsLayoutPageData = {
  title: 'Contact Us',
  heroBackgroundImage: '/about_banner.jpg',
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function fullSlugFromParams(slug: string[] | undefined): string {
  return (slug?.filter(Boolean).join('/') || '').replace(/^\/+|\/+$/g, '');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (fullSlug === ABOUT_US_PAGE_SLUG) {
    const resolved = await fetchAboutUsLayout1Page(ABOUT_US_PAGE_SLUG);
    if (!resolved) {
      return { title: 'About Us' };
    }
    return buildApiMetadata({
      slug: resolved.slug,
      title: resolved.title,
      seo: resolved.seo as Record<string, unknown>,
    });
  }

  if (fullSlug === CONTACT_US_PAGE_SLUG) {
    const resolved = await fetchContactUsLayoutPage(CONTACT_US_PAGE_SLUG);
    if (!resolved) {
      return { title: 'Contact Us' };
    }
    return buildApiMetadata({
      slug: resolved.slug,
      title: resolved.title,
      seo: resolved.seo as Record<string, unknown>,
    });
  }

  return { title: 'Not Found' };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (fullSlug === ABOUT_US_PAGE_SLUG) {
    const resolved = await fetchAboutUsLayout1Page(ABOUT_US_PAGE_SLUG);
    if (!resolved) notFound();

    const { page } = resolved;
    return (
      <AboutUsPageSection
        hero={page.hero}
        statistics={page.statistics}
        journey={page.journey}
        videoUrl={page.videoUrl}
        navigation={page.navigation}
        activePath={aboutUsPath()}
      />
    );
  }

  if (fullSlug === CONTACT_US_PAGE_SLUG) {
    const resolved = await fetchContactUsLayoutPage(CONTACT_US_PAGE_SLUG);
    const data = resolved?.page ?? FALLBACK_CONTACT;
    return <ContactUsPage data={data} />;
  }

  notFound();
}
