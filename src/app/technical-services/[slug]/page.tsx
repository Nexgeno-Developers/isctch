import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchTechnicalServiceData, getAllTechnicalServiceSlugs } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import TechnicalConsultationCTA from '@/components/products/TechnicalConsultationCTA';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import VerticalTabsFeatures from '@/components/technical-services/VerticalTabsFeatures';
import VideoBanner from '@/components/home/VideoBanner';
import OperationalSuccess from '@/components/technical-services/OperationalSuccess';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import CallToAction from '@/components/home/CallToAction';

interface TechnicalServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all technical services
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const slugs = await getAllTechnicalServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for technical service page
 * All SEO fields come from the API
 */
export async function generateMetadata(
  { params }: TechnicalServicePageProps
): Promise<Metadata> {
  const { slug } = await params;
  const serviceData = await fetchTechnicalServiceData(slug);

  if (!serviceData) {
    return {
      title: 'Technical Service Not Found',
      description: 'The requested technical service could not be found.',
    };
  }

  const canonicalUrl = serviceData.seo.canonical_url 
    ? getCanonicalUrl(serviceData.seo.canonical_url)
    : getCanonicalUrl(`/technical-services/${slug}`);

  const metadata: Metadata = {
    title: serviceData.seo.meta_title,
    description: serviceData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: serviceData.seo.og_title || serviceData.seo.meta_title,
      description: serviceData.seo.og_description || serviceData.seo.meta_description,
      images: serviceData.seo.og_image ? [serviceData.seo.og_image] : [serviceData.image],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: (serviceData.seo.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') || 'summary_large_image',
      title: serviceData.seo.twitter_title || serviceData.seo.meta_title,
      description: serviceData.seo.twitter_description || serviceData.seo.meta_description,
      images: serviceData.seo.twitter_image ? [serviceData.seo.twitter_image] : [serviceData.image],
    },
  };

  return metadata;
}

/**
 * Technical Service Details Page Component
 * 
 * Server Component that fetches technical service data by slug.
 * Returns 404 if service doesn't exist.
 * Implements full SEO with metadata from API.
 */
export default async function TechnicalServicePage({ params }: TechnicalServicePageProps) {
  const { slug } = await params;
  const serviceData = await fetchTechnicalServiceData(slug);

  if (!serviceData) {
    notFound();
  }

  // Prepare schema data with canonical URL
  const schemaData = serviceData.seo.schema ? {
    ...serviceData.seo.schema,
    url: serviceData.seo.canonical_url 
      ? getCanonicalUrl(serviceData.seo.canonical_url)
      : getCanonicalUrl(`/technical-services/${slug}`),
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
        <section className="relative pt-[220px] pb-[150px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {serviceData.heroBackgroundImage ? (
              <img
                src={serviceData.heroBackgroundImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800" />
            )}
            {/* Dark Blue Overlay */}
            <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
            {/* Blur Effect */}
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
              <div className="text-center">
                {/* Service Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight uppercase">
                  {serviceData.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                { label: 'Technical Services', href: '/technical-services' },
                { label: serviceData.title },
              ]}
            />
          </div>
        </section>

        {/* Intro Section with Circular Graphic */}
        {serviceData.introSection && (
          <section className="bg-gray-50 py-12 pt-12 pb-4 md:pt-20 pb-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 lg:gap-12 items-center">
                {/* Left Column - Circular Graphic */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* Gradient Border Circle */}
                    <div className="absolute inset-0 rounded-full">
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        {/* Image */}
                        {serviceData.introSection.image && (
                          <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                              src={serviceData.introSection.image}
                              alt={serviceData.introSection.imageAlt || serviceData.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 240px, 304px"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 uppercase">
                    {serviceData.title}
                  </h2>
                  {serviceData.introSection.detailedDescription ? (
                    <p className="text-lg md:text-xl text-black leading-relaxed">
                      {serviceData.introSection.detailedDescription}
                    </p>
                  ) : (
                    <p className="text-xl text-black leading-relaxed">
                      {serviceData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Description Section (Fallback if no introSection) */}
        {!serviceData.introSection && (
          <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-black leading-relaxed">
                    {serviceData.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Vertical Tabs Features Section */}
        {serviceData.detailedFeatures && serviceData.detailedFeatures.length > 0 && (
          <VerticalTabsFeatures features={serviceData.detailedFeatures} />
        )}

      <VideoBanner videoOnly={true} />

        {/* Driving Operational Success Section */}
        {serviceData.operationalSuccess && (
          <OperationalSuccess data={serviceData.operationalSuccess} />
        )}

        {/* Connect with Technical Experts Section */}
        {serviceData.connectSection && (
          <ConnectTechnicalExperts
            heading={serviceData.connectSection.heading}
            headingHighlight={serviceData.connectSection.headingHighlight}
            formTitle={serviceData.connectSection.formTitle}
            illustrationImage={serviceData.connectSection.illustrationImage}
            illustrationAlt={serviceData.connectSection.illustrationAlt}
          />
        )}
       
       <CallToAction />
        {/* Newsletter Subscription Section */}
        <NewsletterSubscription />
      </main>
    </>
  );
}
