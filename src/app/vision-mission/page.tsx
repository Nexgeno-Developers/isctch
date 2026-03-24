import type { Metadata } from 'next';
import { fetchCompanyData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyNavigationServer from '@/components/company/CompanyNavigationServer';
import VisionMissionServer from '@/components/company/VisionMissionServer';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import OurValuesServer from '@/components/company/OurValuesServer';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

/**
 * Generate metadata for Vision & Mission page
 */
export async function generateMetadata(): Promise<Metadata> {
  const companyData = await fetchCompanyData();
  
  const canonicalUrl = getCanonicalUrl('/vision-mission');

  return {
    title: 'Vision & Mission - Lamipak',
    description: companyData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Vision & Mission - Lamipak',
      description: companyData.seo.og_description || companyData.seo.meta_description,
      images: companyData.seo.og_image ? [companyData.seo.og_image] : [],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: (companyData.seo.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') || 'summary_large_image',
      title: 'Vision & Mission - Lamipak',
      description: companyData.seo.twitter_description || companyData.seo.meta_description,
      images: companyData.seo.twitter_image ? [companyData.seo.twitter_image] : [],
    },
  };
}

/**
 * Vision & Mission Page Component
 * 
 * Server Component that fetches company data server-side
 * and displays hero section and statistics.
 * This is a duplicate of the About Us page.
 */
export default async function VisionMissionPage() {
  const companyData = await fetchCompanyData();

  // Prepare schema data with canonical URL
  const schemaData = companyData.seo.schema ? {
    ...companyData.seo.schema,
    url: getCanonicalUrl('/vision-mission'),
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
        <section className="bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                
                { label: 'Vision & Mission' },
              ]}
            />
          </div>
        </section>
        <CompanyNavigationServer activePath="/vision-mission" />

       

        <VisionMissionServer />
        
        {/* Our Values Section */}
        <OurValuesServer />
        
        <CallToAction />
        <NewsletterSubscription />
      </main>
    </>
  );
}
