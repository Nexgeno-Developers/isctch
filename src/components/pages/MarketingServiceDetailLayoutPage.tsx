import Image from 'next/image';
import Link from 'next/link';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { HeroWithBreadcrumbsSection } from '@/components/sections/HeroWithBreadcrumbsSection';
import type { MarketingServiceDetailPageData } from '@/lib/api/marketing_service_detail_layout';
import VideoBanner from '@/components/home/VideoBanner';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import { RichText } from '@/components/common/RichText';
import { formatBoldText } from '@/lib/htmlText';


export default function MarketingServiceDetailLayoutPage({
  data,
  parentHref = '/marketing-support-service',
  parentLabel = 'Marketing Service',
}: {
  data: MarketingServiceDetailPageData;
  parentHref?: string;
  parentLabel?: string;
}) {
  const connect = {
    formTitle: 'Send Us A Message',
    illustrationImage: '/connected_image.jpg',
    illustrationAlt: 'Connect with experts',
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroWithBreadcrumbsSection
        data={{
          title: data.title,
          backgroundImage: data.heroBackgroundImage,
          breadcrumbs: [
            { label: parentLabel, href: parentHref },
            { label: data.title },
          ],
        }}
      />

      {/* Intro split section */}
      <section className="bg-gray-50 py-12 md:py-16 lg:pt-20 lg:pb-8">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex items-center">
            <div className="">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E233C] mb-4 leading-snug"
                dangerouslySetInnerHTML={{ __html: formatBoldText(data.introTitle) }} />
              {data.heroDescriptionHtml ? (
                <RichText
                  as="div"
                  className="text-base md:text-lg text-black leading-relaxed mb-6"
                  html={data.heroDescriptionHtml}
                />
              ) : (
                <p className="text-base md:text-lg text-black leading-relaxed mb-6">
                  {data.introDescription}
                </p>
              )}
              {data.introCtaHref ? (
                <Link
                  href={data.introCtaHref}
                  className="inline-flex items-center text-sm md:text-base font-semibold text-[#009FE8] hover:text-[#0077B6] transition-colors"
                >
                  Find out more <span className="ml-2 text-lg leading-none">→</span>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative w-full overflow-hidden min-h-[320px] md:min-h-[520px]">
            {data.introImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.introImage}
                alt={data.introImageAlt || data.title}
                className="absolute inset-0 w-full h-full object-cover rounded-[50px]"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
          </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      {data.highlights.length > 0 && (
        <section className="bg-gray-50 py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {data.highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="bg-[#EDF0F1] rounded-[50px] py-10 px-8 md:py-16 md:px-10 duration-300 flex flex-col text-start"
                >
                  {highlight.icon ? (
                    <div className="mb-6 w-12 h-12 flex items-center justify-start">
                      <Image
                        src={highlight.icon}
                        alt={highlight.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}
                  <h4 className="text-base md:text-[20px] font-bold text-[#0E233C] mb-2">
                    {highlight.title}
                  </h4>
                  {highlight.description ? (
                    <p className="text-xs md:text-base text-black leading-relaxed">
                      {highlight.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video — same UX as homepage VideoBanner (background + modal play) */}
      {data.videoUrl ? (
        <VideoBanner
          prefetchedData={{
            title: '',
            preTitle: '',
            ctaText: '',
            ctaLink: '',
            videoUrl: data.videoUrl,
          }}
        />
      ) : null}

      {/* Brand journey */}
      {data.brandJourneyItems.length > 0 && (
        <section className="bg-gray-50 pt-10 md:pt-16">
          <div className="container mx-auto px-4">
            {data.brandJourneyTitle ? (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 text-center"
                
                 dangerouslySetInnerHTML={{ __html: formatBoldText(data.brandJourneyTitle) }} />
           
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {data.brandJourneyItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#EDF0F1] rounded-[50px] px-8 text-center py-8 md:px-6 duration-300 flex flex-col"
                >
                  {item.icon ? (
                    <div className="mb-4 w-12 h-12 flex items-center justify-center w-full">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}
                  <h3 className="text-sm md:text-[20px] font-bold text-[#0E233C] leading-snug">
                    {item.title}
                  </h3>
                  {item.subtitle ? (
                    <p className="text-xs md:text-base text-gray-600 mt-1 mb-0 pb-0">
                      {item.subtitle}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="mt-10">
        <ConnectTechnicalExperts
          heading=""
          formTitle={connect.formTitle}
          illustrationImage={connect.illustrationImage}
          illustrationAlt={connect.illustrationAlt}
        />
      </div>

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

