import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getCanonicalUrl } from '@/config/site';
import LamiraPage from '@/components/LamiraPage';
import GreenEffortsPage from '@/components/GreenEffortsPage';
import CmsPage from '@/components/CmsPage';
import PickCartoonPage from '@/components/PickCartoonPage';
import CertificationsAchievementsPage from '@/components/CertificationsAchievementsPage';
import NgosPage from '@/components/NgosPage';
import CarbonNetZeroRoadmapPage from '@/components/CarbonNetZeroRoadmapPage';
import { getDynamicPageBySlug, type DynamicPageData } from '@/fake-api/dynamic-pages';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const componentMap: Record<string, ComponentType<{ data: DynamicPageData }>> = {
  lamira: LamiraPage,
  green: GreenEffortsPage,
  certifications: CertificationsAchievementsPage,
  ngos: NgosPage,
  'carbon-roadmap': CarbonNetZeroRoadmapPage,
  'pick-carton': PickCartoonPage,
};

async function fetchPageData(slug: string) {
  return getDynamicPageBySlug(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPageData(slug);

  if (!data) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const seo = data.seo;
  const canonicalPath = seo?.canonical_path || `/${slug}`;
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  const title = seo?.meta_title || data.title;
  const description =
    seo?.meta_description || data.content?.toString().slice(0, 150) || undefined;

  return {
    title,
    description,
    keywords: seo?.keywords,
    authors: seo?.author ? [{ name: seo.author }] : undefined,
    robots: seo?.robots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonicalUrl,
      type: seo?.og_type || 'website',
      images: seo?.og_image ? [seo.og_image] : undefined,
    },
    twitter: {
      card: seo?.twitter_card || 'summary_large_image',
      title: seo?.twitter_title || title,
      description: seo?.twitter_description || description,
      images: seo?.twitter_image ? [seo.twitter_image] : undefined,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchPageData(slug);

  if (!data) {
    notFound();
  }

  const Component = componentMap[data.type] || CmsPage;

  return <Component data={data} />;
}
