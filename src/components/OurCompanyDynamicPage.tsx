import CompanyHero from '@/components/company/CompanyHero';
import CompanyNavigation from '@/components/company/CompanyNavigation';
import CompanyStatistics from '@/components/company/CompanyStatistics';
import JourneyClient from '@/components/company/JourneyClient';
import VideoBanner from '@/components/home/VideoBanner';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { getCanonicalUrl } from '@/config/site';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface OurCompanyDynamicPageProps {
  data: DynamicPageData;
}

export default function OurCompanyDynamicPage({ data }: OurCompanyDynamicPageProps) {
  const companyData = data.ourCompanyData;

  if (!companyData) return null;

  const schemaData = companyData.seo.schema
    ? {
        ...companyData.seo.schema,
        url: companyData.seo.canonical_url
          ? getCanonicalUrl(companyData.seo.canonical_url)
          : getCanonicalUrl('/our-company'),
      }
    : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <main className="min-h-screen bg-gray-50">
        <CompanyHero data={companyData.hero} />
        <CompanyStatistics statistics={companyData.statistics} />
        <JourneyClient data={companyData.journey} />
        <VideoBanner videoOnly={true} />
        <CompanyNavigation data={companyData.navigation} activePath="/our-company" />

        <CallToAction />
        <NewsletterSubscription />
      </main>
    </>
  );
}

