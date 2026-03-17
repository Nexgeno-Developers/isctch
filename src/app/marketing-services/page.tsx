import type { Metadata } from 'next';
import Link from 'next/link';
import CompanyHero from '@/components/company/CompanyHero';
import { fetchCompanyData, getAllMarketingServices } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

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
  const [companyData, marketingServices] = await Promise.all([
    fetchCompanyData(),
    getAllMarketingServices(),
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

      {/* 360° Marketing Support Section (inspired by reference image) */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 items-center">
            {/* Left – Circular marketing diagram / image placeholder */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-br from-[#00B4FF] via-[#3DDC97] to-[#0E233C] p-[10px] shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-center px-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] text-[#0E233C] mb-2 uppercase">
                      Marketing Intelligence
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0E233C] leading-snug mb-1">
                      360° Marketing
                    </h2>
                    <p className="text-sm text-gray-600">
                      Connecting insight, packaging and commercial execution for stronger brand growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right – Heading + pills similar to reference design */}
            <div>
              <p className="text-sm font-semibold tracking-[0.15em] text-[#009FE8] uppercase mb-3">
                360 Marketing Support Service
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E233C] mb-4">
                Integrated Marketing Support
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl">
                Lamipak Marketing Support Service is designed as a 360‑degree solution that blends
                customer insights, creative storytelling, and commercial activation. We work with your
                teams to transform packaging and campaigns into consistent brand experiences across every
                touchpoint.
              </p>

              {/* Pills / key areas */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-[#009FE8] text-white px-4 py-2 text-sm font-semibold shadow-md">
                  Brand Strategy
                </span>
                <span className="inline-flex items-center rounded-full bg-[#13C38B] text-white px-4 py-2 text-sm font-semibold shadow-md">
                  360° Campaigns
                </span>
                <span className="inline-flex items-center rounded-full bg-[#FF7043] text-white px-4 py-2 text-sm font-semibold shadow-md">
                  Shopper Activation
                </span>
                <span className="inline-flex items-center rounded-full bg-[#4CAF50] text-white px-4 py-2 text-sm font-semibold shadow-md">
                  Insights & Design
                </span>
              </div>

              <p className="text-sm md:text-base text-gray-600 max-w-2xl">
                From idea to shelf, our specialists collaborate with commercial and technical teams to
                ensure that every campaign and every pack contributes to measurable, sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing services listing – "What Are You Looking For?" */}
      <section className="bg-gray-50">
       
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-[70px] text-center">
            What <span className="text-[#009FE8]">Are You</span> Looking For?
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
                      <p className="text-sm md:text-base text-black leading-[32px] mb-4">
                        {service.shortDescription}
                      </p>
                      <Link
                        href={`/marketing-services/${service.slug}`}
                        className="inline-flex items-center text-sm md:text-base font-semibold text-[#009FE8] hover:text-[#0077B6] transition-colors"
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

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

