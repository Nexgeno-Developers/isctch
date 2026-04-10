import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';
import LatestInsights from '@/components/home/LatestInsights';
import ContactSustainability from '@/components/products/ContactSustainability';
import TechnicalConsultationCTA from '@/components/products/TechnicalConsultationCTA';
import CategoryGlobalImpact from '@/components/products/CategoryGlobalImpact';
import type { ProductIndustryDetailPageData } from '@/lib/api/product_industry_detail_layout';
import { RichText } from '@/components/common/RichText';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { plainTextFromMaybeHtml } from '@/lib/htmlText';

export default function ProductIndustryDetailLayoutPageSection({
  data,
}: {
  data: ProductIndustryDetailPageData;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative lg:pt-[220px] pt-[110px] lg:pb-[150px] pb-[0px] overflow-hidden">
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
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
            <div className="text-center">
              <h1 className="text-[30px] md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white tracking-tight">
                {data.title}
              </h1>
              {/* {data.shortDescription ? (
                <RichText
                  as="div"
                  html={data.shortDescription}
                  className="text-center text-base md:text-base text-white mb-8 leading-relaxed max-w-3xl mx-auto lg:mt-6 mt-2"
                />
              ) : null} */}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Industries', href: '/industries' },
              { label: plainTextFromMaybeHtml(data.title) },
            ]}
          />
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gray-50 py-8 md:pt-24 md:pb-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm md:text-base text-[#009FE8] uppercase tracking-wide mb-2">
              {data.support.subtitle}
            </p>

            <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold lg:mb-6 mb-2" dangerouslySetInnerHTML={{ __html: data.support.title }} />

            {data.support.description ? (
              <RichText
                as="div"
                html={data.support.description}
                className="text-sm md:text-base text-black mb-8 md:mb-12 mx-auto leading-relaxed"
              />
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
              {data.support.items.map((item) => (
                <div
                  key={item.id}
                  className="text-start group bg-[#EDF0F1] rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px] w-full"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-white rounded-[50px] mb-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col pl-0 pr-0">
                    <h3 className="capitalize text-lg md:text-[18px] font-bold text-black mb-2 pt-0 text-center">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <RichText
                        as="div"
                        html={item.description}
                        className="text-sm md:text-base text-black mb-2 flex-1 line-clamp-2 text-center"
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Plant CTA */}
      {data.pilotPlantCta ? <TechnicalConsultationCTA data={data.pilotPlantCta} /> : null}

      {/* Global Impact */}
      {data.globalImpact ? (
        <CategoryGlobalImpact
          data={{
            label: data.globalImpact.label,
            heading: data.globalImpact.heading,
            image: data.globalImpact.image,
            imageAlt: data.globalImpact.imageAlt,
            features: data.globalImpact.features,
          }}
        />
      ) : null}

      {/* Recommended Products */}
      {data.recommendedProducts.length ? (
        <section className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4 md:mb-12 relative">
              <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold">
                <span className="text-black">Recommended Products</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {data.recommendedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.slug}`}
                  className="text-start group bg-[#EDF0F1] rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px] w-full"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-white rounded-[50px] mb-4">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col pl-3 pr-3">
                    <h3 className="capitalize text-lg md:text-xl font-bold text-black mb-2 group-hover:text-[#009FE8] transition-colors pt-3">
                      {p.title}
                    </h3>
                    {p.description ? (
                      <RichText
                        as="div"
                        html={p.description}
                        className="text-sm md:text-base text-black mb-2 flex-1 line-clamp-2"
                      />
                    ) : null}
                    <div className="mt-1 flex items-center text-[#009FE8] text-sm md:text-[15px] font-medium group-hover:text-[#0077B6] transition-colors mb-4">
                      View Product
                      
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LatestInsights />
      <ContactSustainability />
    </main>
  );
}

