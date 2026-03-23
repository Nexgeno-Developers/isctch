import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCareersListingData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import VideoModalClient from '@/components/common/VideoModalClient';
import VerticalTabsFeatures from '@/components/technical-services/VerticalTabsFeatures';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import CareerListingClient from '@/components/career/CareerListingClient';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchCareersListingData();
  const canonicalUrl = getCanonicalUrl('/career');

  return {
    title: data.seo.meta_title,
    description: data.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.seo.meta_title,
      description: data.seo.meta_description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CareerPage() {
  const data = await fetchCareersListingData();

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.heroTitle,
          backgroundImage: data.heroBackgroundImage || '/about_banner.jpg',
        }}
      />

      {/* Breadcrumbs */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: 'Career' }]} />
        </div>
      </section>

      {/* Hero split section (like reference design) */}
      {data.heroSplit && (
        <section className="bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left: content */}
            <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-20">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E233C] leading-[1.15] mb-6">
                  {data.heroSplit.heading}{' '}
                  <span className="text-[#009FE8]">{data.heroSplit.headingHighlight}</span>
                </h2>

                <div className="space-y-5 text-sm md:text-base text-black leading-relaxed">
                  {data.heroSplit.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <p className="mt-8 text-base md:text-lg font-semibold text-[#0E233C]">
                  {data.heroSplit.emphasis}
                </p>

                <Link
                  href={data.heroSplit.ctaLink}
                  className="mt-10 inline-flex items-center text-sm md:text-base font-bold uppercase text-[#009FE8] hover:text-[#0077B6] transition-colors"
                >
                  {data.heroSplit.ctaText}
                  <span className="ml-2 text-lg leading-none">→</span>
                </Link>
              </div>
            </div>

            {/* Right: media */}
            <div className="relative min-h-[320px] lg:min-h-[560px] overflow-hidden">
              {data.heroSplit.mediaLink ? (
                <VideoModalClient
                  videoUrl={data.heroSplit.mediaLink}
                  posterUrl={data.heroSplit.mediaImage}
                  posterAlt={data.heroSplit.mediaAlt}
                  className="absolute inset-0"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.heroSplit.mediaImage}
                  alt={data.heroSplit.mediaAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}


<CareerListingClient jobs={data.jobs} jobsSection={data.jobsSection} />
     

      {/* Leadership message section (like reference design) */}
      {data.leadershipMessage && (
        <section className="bg-gray-50 py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-[50px] md:rounded-[50px] p-6 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start">
                {/* Left: photo + name */}
                <div>
                  <div className="">
                    <div className="relative w-full overflow-hidden rounded-[50px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={data.leadershipMessage.image}
                        alt={data.leadershipMessage.imageAlt}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-center font-semibold text-[#0E233C] mt-5">
                    {data.leadershipMessage.name}{' '}
                    <span className="font-normal text-gray-600">
                      {data.leadershipMessage.role ? `| ${data.leadershipMessage.role}` : ''}
                    </span>
                  </p>
                </div>

                {/* Right: content */}
                <div className="max-w-3xl">
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#0E233C] mb-5">
                    {data.leadershipMessage.heading}{' '}
                    <span className="text-[#009FE8]">
                      {data.leadershipMessage.headingHighlight}
                    </span>{' '}
                    To Packaging
                  </h2>
                  <div className="space-y-5 text-sm md:text-base text-black leading-relaxed">
                    {data.leadershipMessage.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vertical Tabs Features Section (reused from Technical Services) */}
      {data.verticalFeatures && data.verticalFeatures.length > 0 && (
        <>
          {data.verticalFeaturesHeader && (
            <section className="bg-gray-50 pt-10 md:pt-8">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#0E233C]">
                    <span className="text-[#009FE8]">
                      {data.verticalFeaturesHeader.heading}
                    </span>{' '}
                    {data.verticalFeaturesHeader.headingHighlight}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 mt-3">
                    {data.verticalFeaturesHeader.description}
                  </p>
                </div>
              </div>
            </section>
          )}
          <VerticalTabsFeatures features={data.verticalFeatures} />
        </>
      )}

      {/* Experts video gallery section (like reference design) */}
      {data.expertsSection && data.expertsSection.videos.length > 0 && (
        <section className="bg-gray-50 py-8 md:py-12 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#0E233C] leading-tight">
                <span className="text-[#009FE8]">{data.expertsSection.heading}</span>{' '}
                {data.expertsSection.headingHighlight},{' '}
                {data.expertsSection.headingSuffix}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-4">
                {data.expertsSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {data.expertsSection.videos.map((v) => (
                <div
                  key={v.id}
                  className=""
                >
                  <div className="relative rounded-[50px] overflow-hidden">
                    <div className="relative w-full pt-[56.25%]">
                      <VideoModalClient
                        videoUrl={v.videoUrl}
                        posterUrl={v.thumbnail}
                        posterAlt={v.thumbnailAlt}
                        className="absolute inset-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Connect section (reused component) */}
      {data.connectSection && (
        <ConnectTechnicalExperts
          heading={data.connectSection.heading}
          headingHighlight={data.connectSection.headingHighlight}
          formTitle={data.connectSection.formTitle}
          illustrationImage={data.connectSection.illustrationImage}
          illustrationAlt={data.connectSection.illustrationAlt}
        />
      )}

      

<div className="bg-gray-50 pt-12">
<CallToAction />
</div>
      
      <NewsletterSubscription />
    </main>
  );
}

