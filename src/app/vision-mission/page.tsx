import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCanonicalUrl } from '@/config/site';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyNavigation from '@/components/company/CompanyNavigation';
import VisionMission from '@/components/company/VisionMission';
import OurValues from '@/components/company/OurValues';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { getDynamicPageBySlug } from '@/fake-api/dynamic-pages';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getDynamicPageBySlug('vision-mission');
  if (!data?.seo) return { title: 'Vision & Mission' };

  const seo = data.seo;
  const canonicalUrl = seo.canonical_path
    ? getCanonicalUrl(seo.canonical_path)
    : getCanonicalUrl('/vision-mission');

  return {
    title: seo.meta_title || data.title,
    description: seo.meta_description || data.content,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.og_title || seo.meta_title || data.title,
      description: seo.og_description || seo.meta_description || data.content,
      images: seo.og_image ? [seo.og_image] : [],
      url: canonicalUrl,
      type: seo.og_type || 'website',
    },
    twitter: {
      card: seo.twitter_card || 'summary_large_image',
      title: seo.twitter_title || seo.meta_title || data.title,
      description: seo.twitter_description || seo.meta_description || data.content,
      images: seo.twitter_image ? [seo.twitter_image] : [],
    },
  };
}

export default async function VisionMissionPage() {
  const data = await getDynamicPageBySlug('vision-mission');
  if (!data || !data.ourCompanyData) notFound();

  const companyData = data.ourCompanyData;

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
    data={{
      ...companyData.hero,
      title: data.title,
    }}
  />
<section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: data.title }]} />
        </div>
      </section>
            

      <CompanyNavigation
        data={companyData.navigation}
        activePath={`/${data.slug}`}
      />

      

      {companyData.visionMission ? <VisionMission data={companyData.visionMission} /> : null}
      {companyData.ourValues ? <OurValues data={companyData.ourValues} /> : null}

      <div className="pt-0 md:pt-12 bg-gray-50">
        <CallToAction />
      </div>
      <NewsletterSubscription />
    </main>
  );
}
