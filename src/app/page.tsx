import type { Metadata } from 'next';
import { fetchHomepageData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Hero from '@/components/home/Hero';
import VideoBanner from '@/components/home/VideoBanner';
import Approach from '@/components/home/Approach';
import CommercialServices from '@/components/home/CommercialServices';
import LatestInsights from '@/components/home/LatestInsights';
import ProductSustainabilitySeries from '@/components/home/ProductSustainabilitySeries';
import WorkInSustainability from '@/components/home/WorkInSustainability';
import InnovationInPackaging from '@/components/home/InnovationInPackaging';
import LatestPressRelease from '@/components/home/LatestPressRelease';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import FAQ from '@/components/home/FAQ';

/**
 * Generate metadata for homepage
 */
export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await fetchHomepageData();
  
  const seo = homepageData.seo || {
    meta_title: 'Lamipak - Your Platform',
    meta_description: 'Building the future with innovative solutions',
  };

  const canonicalUrl = seo.canonical_url 
    ? getCanonicalUrl(seo.canonical_url)
    : getCanonicalUrl('/');

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Homepage Component
 * 
 * Server Component that fetches all homepage data in a single API call
 * and passes section data to child components.
 */
export default async function HomePage() {
  // Single API call to fetch all homepage sections
  const homepageData = await fetchHomepageData();

  // Prepare schema data with canonical URL
  const schemaData = homepageData.seo?.schema ? {
    ...homepageData.seo.schema,
    url: homepageData.seo.canonical_url 
      ? getCanonicalUrl(homepageData.seo.canonical_url)
      : getCanonicalUrl('/'),
  } : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <main>
        <Hero data={homepageData.hero} />
        
        <Approach />
        <VideoBanner />
        <CommercialServices />
        <LatestInsights />
        <ProductSustainabilitySeries />
        <WorkInSustainability />
        <FAQ />
        <InnovationInPackaging />
        <LatestPressRelease />
        <div className="bg-gray-50 pt-12 pb-20">
<CallToAction />
        </div>
        
        <NewsletterSubscription />
      </main>
    </>
  );
}
