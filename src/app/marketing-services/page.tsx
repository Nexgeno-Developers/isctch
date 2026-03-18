import type { Metadata } from 'next';
import Link from 'next/link';
import CompanyHero from '@/components/company/CompanyHero';
import Image from 'next/image';
import LatestNewsClient from '@/components/marketing/LatestNewsClient';
import {
  fetchCompanyData,
  getAllMarketingServices,
  fetchMarketingServicesOverviewData,
  fetchMarketingLatestNews,
  fetchMarketingPressNews,
} from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';

export const metadata: Metadata = {
  title: 'Marketing Services | Lamipak',
  description:
    'Discover Lamipak marketing support services including brand strategy, 360° go‑to‑market campaigns, and insight‑driven packaging design.',
  alternates: {
    canonical: getCanonicalUrl('/marketing-services'),
  },
  openGraph: {
    title: 'Marketing Services | Lamipak',
    description:
      'Explore Lamipak 360° marketing services that connect brand, packaging, and commercial activation.',
    url: getCanonicalUrl('/marketing-services'),
    type: 'website',
  },
};

/**
 * Marketing Services Listing Page
 *
 * Reuses the About Us hero styling via `CompanyHero`
 * and lists all marketing services using server‑side data.
 */
export default async function MarketingServicesPage() {
  const [companyData, marketingServices, overview, marketingNews, marketingPress] = await Promise.all([
    fetchCompanyData(),
    getAllMarketingServices(),
    fetchMarketingServicesOverviewData(),
    fetchMarketingLatestNews(),
    fetchMarketingPressNews(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero section reused from About Us */}
      <CompanyHero
        data={{
          ...companyData.hero,
          title: 'Marketing Service',
        }}
      />

      {/* 360° Marketing Support Section (driven by API) */}
      <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_50%] gap-[80px] items-center">
            {/* Left – Image from API */}
            <div className="w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={overview.image}
                alt={overview.imageAlt}
                className="w-full h-auto object-cover rounded-[32px]"
              />
            </div>

            {/* Right – Heading + description from API */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-6 leading-[70px]">
                {overview.heading}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                {overview.description}
              </p>
            </div>
          </div>

          {/* Stats strip – heading/subheading driven by API */}
          <div className="bg-gray-50 pt-20">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-2 text-center">
                {overview.statsHeading}
              </h3>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-6 text-[#009FE8] text-center">
                {overview.statsSubheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {overview.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[#EDF0F1] rounded-[50px] p-8 md:p-10  duration-300 flex flex-col text-start"
                >
                  {/* Icon */}
                  <div className="mb-6 w-12 h-12 flex items-center justify-start">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                  
                    <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                  </div>

                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-lg md:text-xl text-black font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marketing services listing – "What Are You Looking For?" heading from API */}
      <section className="bg-gray-50">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-[70px] text-center">
          {overview.listingHeading.replace(overview.listingHeadingHighlight, '').trim()}{' '}
          <span className="text-[#009FE8]">
            {overview.listingHeadingHighlight}
          </span>{' '}
        </h2>

        <div className="">
          {marketingServices.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.slug}
                className=""
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch ${
                    !isEven ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1' : ''
                  }`}
                >
                  {/* Text column */}
                  <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-16">
                    <div className="px-6 md:px-10 py-8 md:py-10">
                      <h3 className="text-lg md:text-xl lg:text-[36px] font-bold text-[#0E233C] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-base md:text-lg text-black leading-relaxed mb-4 md:mb-6">
                        {service.shortDescription}
                      </p>
                      <Link
                        href={`/marketing-services/${service.slug}`}
                        className="inline-flex items-center text-sm md:text-[20px] uppercase font-bold text-[#009FE8] hover:text-[#0077B6] transition-colors"
                      >
                        Find out more
                        <span className="ml-2 text-lg leading-none">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Image column */}
                  <div className="relative ">
                    <img
                      src={service.listingImage}
                      alt={service.listingImageAlt}
                      width={1000}
                      height={1000}
                      className=" w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest News Section – marketing themed slider */}
      <LatestNewsClient trendItems={marketingNews} pressItems={marketingPress} />

      {/* Connect with Marketing Experts – reuse technical experts component */}
      <ConnectTechnicalExperts
        heading={overview.connectSection.heading}
        headingHighlight={overview.connectSection.headingHighlight}
        formTitle={overview.connectSection.formTitle}
        illustrationImage={overview.connectSection.illustrationImage}
        illustrationAlt={overview.connectSection.illustrationAlt}
      />

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

