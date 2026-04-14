import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import VideoBanner from '@/components/home/VideoBanner';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import VerticalTabsFeatures from '@/components/technical-services/VerticalTabsFeatures';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import type { TechnicalServiceDetailPageData } from '@/lib/api/technical_service_detail_layout';
import { RichText } from '@/components/common/RichText';

export default function TechnicalServiceDetailLayoutPage({
  data,
}: {
  data: TechnicalServiceDetailPageData;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative lg:pt-[220px] md:pt-[150px] pt-[110px] lg:pb-[150px] md:pb-[50px] pb-[30px] overflow-hidden">
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
          {/* <div className="absolute inset-0 bg-[#0e233c52] opacity-90" /> */}
          {/* <div className="absolute inset-0 backdrop-blur-sm" /> */}
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
            <div className="text-center">
              <h1 className="text-[22px] md:text-3xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight uppercase leading-tight md:leading-normal">
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
      <section className="bg-gray-50 pt-8 pb-0 md:pt-20 md:pb-8">
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
              <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-black lg:mb-6 mb-2 uppercase leading-tight md:leading-normal">
                {data.title}
              </h2>
              {data.introDescriptionHtml ? (
                <RichText
                  as="div"
                  html={data.introDescriptionHtml}
                  className="text-sm md:text-base text-black leading-relaxed"
                />
              ) : (
                <RichText
                  as="div"
                  html={data.introDescription}
                  className="text-base md:text-base text-black leading-relaxed"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Tabs Features Section */}
      {data.detailedFeatures.length > 0 ? (
        <VerticalTabsFeatures features={data.detailedFeatures} />
      ) : null}

      <section className="bg-gray-50 pt-0 lg:pt-12">
      <VideoBanner videoOnly={true} />
      </section>

     

      {/* Operational blocks (from meta.page_blocks) */}
      {data.operationalBlocks.length > 0 ? (
        <section className="bg-gray-50 pt-8 pb-4 md:py-16 md:pt-16 md:pb-8 lg:pt-20 lg:pb-8">
          <div className="container mx-auto px-4">
            <div className="mb-4 md:mb-14">
              <h2 className="text-black text-[22px] md:text-4xl lg:text-5xl font-bold text-center leading-tight md:leading-normal" dangerouslySetInnerHTML={{ __html: formatBoldText(data.operationalTitle || 'Driving Operational Success') }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {data.operationalBlocks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group bg-white rounded-[20px] p-4 md:p-5 transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="relative w-full md:h-[230px] lg:h-[430px] overflow-hidden rounded-2xl">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        height={1000}
                        width={1000}
                        className="object-contain h-full object-top w-full"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200" />
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-6 md:pt-8 pb-2 px-2">
                    
                    <h3 className="text-lg md:text-xl font-bold text-black text-center">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ConnectTechnicalExperts />

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

