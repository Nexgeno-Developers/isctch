import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMainCategoryPage } from '@/fake-api/page-builder';
import { getCanonicalUrl } from '@/config/site';
import { PageBuilder } from '@/components/pageBuilder/PageBuilder';

interface MainCategoryPageProps {
  params: Promise<{
    mainCategory: string;
  }>;
}

export async function generateMetadata({ params }: MainCategoryPageProps): Promise<Metadata> {
  const { mainCategory } = await params;

  const page = await getMainCategoryPage(mainCategory);
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const canonicalUrl = page.seo?.canonical_path ? getCanonicalUrl(page.seo.canonical_path) : getCanonicalUrl(`/${mainCategory}`);

  return {
    title: page.seo?.meta_title || page.title,
    description: page.seo?.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function MainCategoryRoute({ params }: MainCategoryPageProps) {
  const { mainCategory } = await params;
  const page = await getMainCategoryPage(mainCategory);
  if (!page) notFound();

  return (
    <PageBuilder
      pageData={page}
      pageContext={{
        mainCategory,
      }}
    />
  );
}

