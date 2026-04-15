import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { HeroWithBreadcrumbsSection } from '@/components/sections/HeroWithBreadcrumbsSection';
import Image from 'next/image';
import Link from 'next/link';
import LatestNewsClient, { type MarketingNewsItem } from '@/components/marketing/LatestNewsClient';
import { RichText } from '@/components/common/RichText';
import { formatBoldText } from '@/lib/htmlText';
export type MarketingHighlight = {
  id: string;
  icon?: string;
  value?: string;
  title: string;
};

export type MarketingServiceListItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  href: string;
};

export type MarketingServicesLayoutPageData = {
  title: string;
  heroBackgroundImage?: string;
  heroTitle: string;
  heroDescriptionHtml?: string;
  introImage?: string;
  introImageAlt?: string;
  highlightsTitle?: string;
  highlights: MarketingHighlight[];
  servicesHeading?: string;
  services: MarketingServiceListItem[];
  latestInsights?: MarketingNewsItem[];
  latestNews?: MarketingNewsItem[];
};

export default async function MarketingServicesLayoutPage({
  data,
}: {
  data: MarketingServicesLayoutPageData;
}) {
  const trendItems = data.latestInsights ?? [];
  const pressItems = data.latestNews ?? [];

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroWithBreadcrumbsSection
        data={{
          title: data.title,
          backgroundImage: data.heroBackgroundImage,
          breadcrumbs: [{ label: data.title }],
        }}
      />

      {/* Landing (intro + highlights) */}
      <section className="bg-gray-50 py-8 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_50%] gap-4 md:gap-[80px] items-center">
            <div className="w-full order-2 lg:order-1">
              {data.introImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.introImage}
                  alt={data.introImageAlt || data.heroTitle}
                  className="w-full h-auto object-cover rounded-2xl md:rounded-[32px]"
                />
              ) : null}
            </div>

            <div className="text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-[22px] md:text-4xl lg:text-5xl text-black font-bold mb-3 md:mb-6 leading-tight md:leading-[70px]" 
                dangerouslySetInnerHTML={{ __html: formatBoldText(data.heroTitle) }} />
             
              {data.heroDescriptionHtml ? (
                <RichText
                  as="div"
                  html={data.heroDescriptionHtml}
                  className="lg:text-base text-sm text-black leading-relaxed mb-4 md:mb-6"
                />
              ) : null}
            </div>
          </div>

          {(data.highlightsTitle || data.highlights.length > 0) && (
            <div className="bg-gray-50 pt-10 md:pt-20">
              {data.highlightsTitle && (
                <div className="text-center lg:mb-8 mb-4">
                  <h3 className="text-[22px] md:text-4xl text-black lg:text-5xl font-bold mb-3 md:mb-2 text-center leading-tight md:leading-[65px]"
                    dangerouslySetInnerHTML={{ __html: formatBoldText(data.highlightsTitle) }} />
                  
                </div>
              )}

              {data.highlights.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {data.highlights.map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-[#EDF0F1] rounded-3xl md:rounded-[50px] p-6 md:p-10 duration-300 flex flex-col text-start"
                    >
                      {stat.icon ? (
                        <div className="mb-6 lg:w-12 w-8 lg:h-12 h-8 flex items-center justify-start">
                          <Image
                            src={stat.icon}
                            alt={stat.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : null}

                      {stat.value ? (
                        <p className="text-[26px] md:text-4xl lg:text-5xl font-bold text-[#000] lg:mb-2">
                          {stat.value}
                        </p>
                      ) : null}

                      <p className="lg:text-lg text-sm md:text-xl text-black font-medium">
                        {stat.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Services list (full width split rows) */}
      {data.services.length > 0 && (
        <section className="bg-gray-50 pb-8 md:pb-0">
          <div className="container mx-auto px-4">
            <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold mb-0 md:mb-8 text-black text-center">
              Are You Looking For?
            </h2>
          </div>

          <div className="bg-gray-50">
            {data.services.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch ${
                      !isEven
                        ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center p-4 md:p-12 lg:p-16 xl:p-16">
                      <div className="max-w-xl">
                        <h3 className="text-[20px] md:text-xl lg:text-[36px] font-bold text-black lg:mb-3 mb-2"
                          dangerouslySetInnerHTML={{ __html: formatBoldText(item.title) }} />
                       
                        {item.description ? (
                          <RichText
                            as="div"
                            html={item.description}
                            className="lg:text-base text-sm text-black leading-relaxed mb-4 md:mb-6"
                          />
                        ) : null}
                        <Link
                          href={item.href}
                          className="inline-flex items-center text-sm md:text-[16px] font-bold text-[#009FE8] hover:text-[#0077B6] transition-colors"
                        >
                          Find out more <span className="ml-2 text-lg leading-none">→</span>
                        </Link>
                      </div>
                    </div>

                    <div className="relative min-h-[240px] md:min-h-[520px]">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(trendItems.length > 0 || pressItems.length > 0) ? (
        <LatestNewsClient trendItems={trendItems} pressItems={pressItems} />
      ) : null}

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

