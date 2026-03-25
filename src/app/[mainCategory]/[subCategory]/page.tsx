import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCanonicalUrl } from '@/config/site';
import { PageBuilder } from '@/components/pageBuilder/PageBuilder';
import { getSubCategoryPage } from '@/fake-api/page-builder';

interface SubCategoryPageProps {
  params: Promise<{
    mainCategory: string;
    subCategory: string;
  }>;
}

export async function generateMetadata({ params }: SubCategoryPageProps): Promise<Metadata> {
  const { mainCategory, subCategory } = await params;
  const page = await getSubCategoryPage(mainCategory, subCategory);

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const canonicalUrl = page.seo?.canonical_path ? getCanonicalUrl(page.seo.canonical_path) : getCanonicalUrl(`/${mainCategory}/${subCategory}`);

  return {
    title: page.seo?.meta_title || page.title,
    description: page.seo?.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function SubCategoryRoute({ params }: SubCategoryPageProps) {
  const { mainCategory, subCategory } = await params;
  const page = await getSubCategoryPage(mainCategory, subCategory);
  if (!page) notFound();

  return (
    <PageBuilder
      pageData={page}
      pageContext={{
        mainCategory,
        subCategory,
      }}
    />
  );
}

