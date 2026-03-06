import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPageData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Dynamic Page Component
 * 
 * Server Component that fetches page data by slug.
 * Returns 404 if page doesn't exist.
 * Implements dynamic SEO metadata.
 */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await fetchPageData(slug);

  if (!pageData) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const canonicalUrl = pageData.seo.canonical_url 
    ? getCanonicalUrl(pageData.seo.canonical_url)
    : getCanonicalUrl(`/${slug}`);

  const metadata: Metadata = {
    title: pageData.seo.meta_title,
    description: pageData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
  };

  return metadata;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await fetchPageData(slug);

  if (!pageData) {
    notFound();
  }

  // Prepare schema data with canonical URL
  const schemaData = pageData.seo.schema ? {
    ...pageData.seo.schema,
    url: pageData.seo.canonical_url 
      ? getCanonicalUrl(pageData.seo.canonical_url)
      : getCanonicalUrl(`/${slug}`),
  } : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            {pageData.title}
          </h1>
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>
      </main>
    </>
  );
}
