import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  ABOUT_US_PAGE_SLUG,
  CONTACT_US_PAGE_SLUG,
} from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';

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
  return { title: 'Not Found' };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (fullSlug === ABOUT_US_PAGE_SLUG || fullSlug === CONTACT_US_PAGE_SLUG) {
    return <main className="min-h-[40vh]" />;
  }

  notFound();
}
