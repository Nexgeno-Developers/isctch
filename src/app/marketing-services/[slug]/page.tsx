import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchMarketingServiceData, getAllMarketingServiceSlugs } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

interface MarketingServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllMarketingServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: MarketingServicePageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const serviceData = await fetchMarketingServiceData(slug);

  if (!serviceData) {
    return {
      title: 'Marketing Service Not Found',
      description: 'The requested marketing service could not be found.',
    };
  }

  const canonicalUrl = serviceData.seo.canonical_url
    ? getCanonicalUrl(serviceData.seo.canonical_url)
    : getCanonicalUrl(`/marketing-services/${slug}`);

  return {
    title: serviceData.seo.meta_title,
    description: serviceData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: serviceData.seo.meta_title,
      description: serviceData.seo.meta_description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function MarketingServiceDetailsPage(
  { params }: MarketingServicePageProps,
) {
  const { slug } = await params;
  const serviceData = await fetchMarketingServiceData(slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-[220px] pb-[150px] overflow-hidden">
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
          <div className="absolute inset-0 bg-[#0e233ce8] opacity-90" />
        </div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase">
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
              { label: 'Marketing Services', href: '/marketing-services' },
              { label: serviceData.title },
            ]}
          />
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#009FE8] uppercase mb-3">
              Marketing Service
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E233C] mb-4">
              {serviceData.title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              {serviceData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section – inspired by 360 layout */}
      {serviceData.highlights.length > 0 && (
        <section className="bg-gray-50 py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-[32%_68%] gap-8 items-start">
              <div className="rounded-[32px] bg-[#0E233C] text-white p-6 md:p-8 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  360° Service View
                </h3>
                <p className="text-sm md:text-base text-gray-200">
                  Each service is designed to connect brand, commercial, and technical teams so
                  that every activation contributes to long‑term growth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceData.highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-6 flex flex-col"
                  >
                    <h4 className="text-lg font-semibold text-[#0E233C] mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simple back link and CTA */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link
            href="/marketing-services"
            className="inline-flex items-center text-sm md:text-base text-[#009FE8] font-semibold hover:text-[#0077B6] transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to all marketing services
          </Link>
        </div>
      </section>

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

