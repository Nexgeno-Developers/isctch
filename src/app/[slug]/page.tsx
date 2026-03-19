import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import LamiraPage from '@/components/LamiraPage';
import GreenEffortsPage from '@/components/GreenEffortsPage';
import CmsPage from '@/components/CmsPage';
import { getDynamicPageBySlug, type DynamicPageData } from '@/fake-api/dynamic-pages';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const componentMap: Record<string, ComponentType<{ data: DynamicPageData }>> = {
  lamira: LamiraPage,
  green: GreenEffortsPage,
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

  return {
    title: data.title,
    description: data.content?.toString().slice(0, 150) || undefined,
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
