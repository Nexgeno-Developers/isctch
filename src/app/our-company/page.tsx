import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCanonicalUrl } from '@/config/site';
import OurCompanyDynamicPage from '@/components/OurCompanyDynamicPage';
import { getDynamicPageBySlug } from '@/fake-api/dynamic-pages';

/**
 * Generate metadata for Our Company page
 */
export async function generateMetadata(): Promise<Metadata> {
  const data = await getDynamicPageBySlug('our-company');
  if (!data?.seo) return { title: 'Our Company' };

  const seo = data.seo;
  const canonicalUrl = seo.canonical_path
    ? getCanonicalUrl(seo.canonical_path)
    : getCanonicalUrl('/our-company');

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      images: seo.og_image ? [seo.og_image] : [],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: seo.twitter_card || 'summary_large_image',
      title: seo.twitter_title || seo.meta_title,
      description: seo.twitter_description || seo.meta_description,
      images: seo.twitter_image ? [seo.twitter_image] : [],
    },
  };
}

/**
 * Our Company Page Component
 * 
 * Server Component that fetches company data server-side
 * and displays hero section and statistics.
 */
export default async function OurCompanyPage() {
  const data = await getDynamicPageBySlug('our-company');

  if (!data) {
    notFound();
  }

  return <OurCompanyDynamicPage data={data} />;
}
