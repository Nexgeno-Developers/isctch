import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchTechnicalServiceData, getAllTechnicalServiceSlugs } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import TechnicalConsultationCTA from '@/components/products/TechnicalConsultationCTA';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

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
            <div className="absolute inset-0 bg-[#0e233ce8] opacity-90" />
            {/* Blur Effect */}
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
              <div className="text-center">
                {/* Service Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white mb-6 tracking-tight">
                  {serviceData.title}
                </h1>

                {/* Description */}
                {serviceData.shortDescription && (
                  <p className="text-center text-lg md:text-xl lg:text-2xl text-white mb-8 leading-relaxed max-w-3xl mx-auto">
                    {serviceData.shortDescription}
                  </p>
                )}
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
                ...(serviceData.category ? [{ label: serviceData.category }] : []),
                { label: serviceData.title },
              ]}
            />
          </div>
        </section>

        {/* Description Section */}
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed">
                  {serviceData.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {serviceData.features && serviceData.features.length > 0 && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceData.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#009FE8] mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-gray-700 text-lg">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {serviceData.benefits && serviceData.benefits.length > 0 && (
          <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#009FE8] flex items-center justify-center mr-3 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        {serviceData.process && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {serviceData.process.title}
                </h2>
                {serviceData.process.description && (
                  <p className="text-xl text-gray-700 mb-8">
                    {serviceData.process.description}
                  </p>
                )}
                {serviceData.process.steps && serviceData.process.steps.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {serviceData.process.steps.map((step, index) => (
                      <div key={index} className="bg-white rounded-[20px] p-6 shadow-sm">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#009FE8] text-white font-bold text-xl mb-4">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {serviceData.cta && serviceData.cta.ctaText && serviceData.cta.ctaLink && (
          <TechnicalConsultationCTA
            data={{
              label: serviceData.cta.label,
              heading: serviceData.cta.heading,
              ctaText: serviceData.cta.ctaText,
              ctaLink: serviceData.cta.ctaLink,
            }}
          />
        )}

        {/* Newsletter Subscription Section */}
        <NewsletterSubscription />
      </main>
    </>
  );
}
