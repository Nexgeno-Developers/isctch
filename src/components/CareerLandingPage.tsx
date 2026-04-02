import Link from 'next/link';
import type { CareersListingData } from '@/lib/api';
import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import VideoModalClient from '@/components/common/VideoModalClient';
import VerticalTabsFeatures from '@/components/technical-services/VerticalTabsFeatures';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import CareerListingClient from '@/components/career/CareerListingClient';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

export interface CareerLandingPageProps {
  data: CareersListingData;
}

export default function CareerLandingPage({ data }: CareerLandingPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.heroTitle,
          backgroundImage: data.heroBackgroundImage || '/about_banner.jpg',
        }}
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: 'Career' }]} />
        </div>
      </section>

      {data.heroSplit && (
        <section className="bg-gray-50">
          <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-2">
            <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-20">
              <div className="max-w-xl">
                <h2 className="mb-6 text-3xl font-bold leading-[1.15] text-[#0E233C] md:text-4xl lg:text-5xl">
                  {data.heroSplit.heading}{' '}
                  <span className="text-[#009FE8]">{data.heroSplit.headingHighlight}</span>
                </h2>

                <div className="space-y-5 text-sm leading-relaxed text-black md:text-base">
                  {data.heroSplit.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <p className="mt-8 text-base font-semibold text-[#0E233C] md:text-lg">
                  {data.heroSplit.emphasis}
                </p>

                <Link
                  href={data.heroSplit.ctaLink}
                  className="mt-10 inline-flex items-center text-sm font-bold uppercase text-[#009FE8] transition-colors hover:text-[#0077B6] md:text-base"
                >
                  {data.heroSplit.ctaText}
                  <span className="ml-2 text-lg leading-none">→</span>
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[560px]">
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
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}

      <CareerListingClient jobs={data.jobs} jobsSection={data.jobsSection} />

      {data.leadershipMessage && (
        <section className="bg-gray-50 py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="rounded-[50px] bg-white p-6 md:rounded-[50px] md:p-10 lg:p-12">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
                <div>
                  <div className="">
                    <div className="relative w-full overflow-hidden rounded-[50px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={data.leadershipMessage.image}
                        alt={data.leadershipMessage.imageAlt}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="mt-5 text-center font-semibold text-[#0E233C]">
                    {data.leadershipMessage.name}{' '}
                    <span className="font-normal text-gray-600">
                      {data.leadershipMessage.role ? `| ${data.leadershipMessage.role}` : ''}
                    </span>
                  </p>
                </div>

                <div className="max-w-3xl">
                  <h2 className="mb-5 text-2xl font-bold text-[#0E233C] md:text-3xl lg:text-5xl">
                    {data.leadershipMessage.heading}{' '}
                    <span className="text-[#009FE8]">{data.leadershipMessage.headingHighlight}</span> To
                    Packaging
                  </h2>
                  <div className="space-y-5 text-sm leading-relaxed text-black md:text-base">
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

      {data.verticalFeatures && data.verticalFeatures.length > 0 && (
        <>
          {data.verticalFeaturesHeader && (
            <section className="bg-gray-50 pt-10 md:pt-8">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-2xl font-bold text-[#0E233C] md:text-3xl lg:text-5xl">
                    <span className="text-[#009FE8]">{data.verticalFeaturesHeader.heading}</span>{' '}
                    {data.verticalFeaturesHeader.headingHighlight}
                  </h2>
                  <p className="mt-3 text-sm text-gray-600 md:text-base">
                    {data.verticalFeaturesHeader.description}
                  </p>
                </div>
              </div>
            </section>
          )}
          <VerticalTabsFeatures features={data.verticalFeatures} />
        </>
      )}

      {data.expertsSection && data.expertsSection.videos.length > 0 && (
        <section className="bg-gray-50 py-8 md:py-12 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
              <h2 className="text-2xl font-bold leading-tight text-[#0E233C] md:text-3xl lg:text-5xl">
                <span className="text-[#009FE8]">{data.expertsSection.heading}</span>{' '}
                {data.expertsSection.headingHighlight}, {data.expertsSection.headingSuffix}
              </h2>
              <p className="mt-4 text-sm text-gray-600 md:text-base">{data.expertsSection.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {data.expertsSection.videos.map((v) => (
                <div key={v.id} className="">
                  <div className="relative overflow-hidden rounded-[50px]">
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
