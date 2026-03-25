import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCanonicalUrl } from '@/config/site';
import { PageBuilder } from '@/components/pageBuilder/PageBuilder';
import { getProductDetailPage } from '@/fake-api/page-builder';

interface ProductDetailRouteProps {
  params: Promise<{
    mainCategory: string;
    subCategory: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailRouteProps): Promise<Metadata> {
  const { mainCategory, subCategory, slug } = await params;
  const page = await getProductDetailPage(mainCategory, subCategory, slug);

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const canonicalUrl = page.seo?.canonical_path ? getCanonicalUrl(page.seo.canonical_path) : getCanonicalUrl(`/${mainCategory}/${subCategory}/${slug}`);

  return {
    title: page.seo?.meta_title || page.title,
    description: page.seo?.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductDetailRoute({ params }: ProductDetailRouteProps) {
  const { mainCategory, subCategory, slug } = await params;
  const page = await getProductDetailPage(mainCategory, subCategory, slug);
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

