import Image from 'next/image';
import Link from 'next/link';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import VideoBanner from '@/components/home/VideoBanner';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import VerticalTabsFeatures from '@/components/technical-services/VerticalTabsFeatures';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import type { TechnicalServiceDetailPageData } from '@/lib/api/technical_service_detail_layout';

export default function TechnicalServiceDetailLayoutPage({
  data,
}: {
  data: TechnicalServiceDetailPageData;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative lg:pt-[220px] pt-[150px] lg:pb-[150px] pb-[50px] overflow-hidden">
        <div className="absolute inset-0">
          {data.heroBackgroundImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.heroBackgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
            <div className="text-center">
              <h1 className="text-[30px] md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight uppercase">
                {data.title}
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
              { label: data.breadcrumbParentLabel, href: data.breadcrumbParentHref },
              { label: data.title },
            ]}
          />
        </div>
      </section>

      {/* Intro Section with Circular Graphic */}
      <section className="bg-gray-50 py-12 pt-12 pb-4 md:pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 lg:gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full">
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    {data.introImage ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={data.introImage}
                          alt={data.introImageAlt || data.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 240px, 304px"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 uppercase">
                {data.title}
              </h2>
              {data.introDescriptionHtml ? (
                <div
                  className="text-lg md:text-xl text-black leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.introDescriptionHtml }}
                />
              ) : (
                <p className="text-lg md:text-xl text-black leading-relaxed">{data.introDescription}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Tabs Features Section */}
      {data.detailedFeatures.length > 0 ? (
        <VerticalTabsFeatures features={data.detailedFeatures} />
      ) : null}

      <VideoBanner videoOnly={true} />

      {/* Operational blocks (from meta.page_blocks) */}
      {data.operationalBlocks.length > 0 ? (
        <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                {data.operationalTitle || 'Driving Operational Success'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {data.operationalBlocks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="bg-white rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px] hover:shadow-md"
                >
                  <div className="relative w-full h-auto overflow-hidden bg-gray-100 rounded-[50px]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-gray-200" />
                    )}
                  </div>

                  <div className="pl-[15px] pr-[15px] pt-[25px] pb-[15px] flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-[#009FE8] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-black mb-2 flex-1 leading-relaxed">{item.description}</p>
                    <div className="inline-flex items-center text-[#009FE8] font-medium hover:text-[#0077B6] transition-colors group">
                      Discover More
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ConnectTechnicalExperts
        heading={data.connectSection.heading}
        headingHighlight={data.connectSection.headingHighlight}
        formTitle={data.connectSection.formTitle}
        illustrationImage={data.connectSection.illustrationImage}
        illustrationAlt={data.connectSection.illustrationAlt}
      />

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

