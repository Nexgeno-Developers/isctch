import type { Metadata } from 'next';
import { fetchCompanyData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyStatistics from '@/components/company/CompanyStatistics';
import Journey from '@/components/company/Journey';
import CompanyNavigationServer from '@/components/company/CompanyNavigationServer';
import VideoBanner from '@/components/home/VideoBanner';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

/**
 * Generate metadata for Our Company page
 */
export async function generateMetadata(): Promise<Metadata> {
  const companyData = await fetchCompanyData();
  
  const canonicalUrl = companyData.seo.canonical_url 
    ? getCanonicalUrl(companyData.seo.canonical_url)
    : getCanonicalUrl('/our-company');

  return {
    title: companyData.seo.meta_title,
    description: companyData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: companyData.seo.og_title || companyData.seo.meta_title,
      description: companyData.seo.og_description || companyData.seo.meta_description,
      images: companyData.seo.og_image ? [companyData.seo.og_image] : [],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: (companyData.seo.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') || 'summary_large_image',
      title: companyData.seo.twitter_title || companyData.seo.meta_title,
      description: companyData.seo.twitter_description || companyData.seo.meta_description,
      images: companyData.seo.twitter_image ? [companyData.seo.twitter_image] : [],
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
  const companyData = await fetchCompanyData();

  // Prepare schema data with canonical URL
  const schemaData = companyData.seo.schema ? {
    ...companyData.seo.schema,
    url: companyData.seo.canonical_url 
      ? getCanonicalUrl(companyData.seo.canonical_url)
      : getCanonicalUrl('/our-company'),
  } : null;

  return (
    <>
      {/* JSON-LD Schema */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <CompanyHero data={companyData.hero} />

        {/* Statistics Section */}
        <CompanyStatistics statistics={companyData.statistics} />

        {/* Journey Section */}
        <Journey />


<VideoBanner videoOnly={true} />
        {/* Navigation Section */}
        <CompanyNavigationServer />

        <CallToAction />
        <NewsletterSubscription />

        
      </main>
    </>
  );
}
