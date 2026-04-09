import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';
import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { RichText } from '@/components/common/RichText';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface PickCartoonPageProps {
  data: DynamicPageData;
}

export default function PickCartoonPage({ data }: PickCartoonPageProps) {
  const sections = data.sections ?? [];

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.title,
          backgroundImage:
            typeof data.heroBackgroundImage === 'string' ? data.heroBackgroundImage : '/about_banner.jpg',
        }}
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              // Only show current page breadcrumb (remove “Packaging” parent)
              { label: data.title },
            ]}
          />
        </div>
      </section>

      {sections.map((section, idx) => {
        if (section.type === 'sustainability_footprint') {
          return (
            <section key={idx} className="bg-gray-50 py-12 md:pt-20">
              <div className="container mx-auto px-4">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-black" dangerouslySetInnerHTML={{ __html: formatBoldText(section.heading) }} />
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="relative overflow-hidden rounded-3xl md:rounded-[50px] bg-gray-100">
                        {item.image && (
                          <div className="relative w-full pt-[70%]">
                            <Image
                              src={item.image}
                              alt={item.imageAlt || data.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        )}
                      </div>


                      <RichText
                        as="div"
                        html={item.description}
                        className="text-sm sm:text-base md:text-lg text-black leading-relaxed mt-5 md:mt-8"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'image_quote_banner') {
          return (
            <section key={idx} className="bg-gray-50 py-10 md:py-12">
              <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl md:rounded-[50px]">
                  {section.backgroundImage && (
                    <div className="absolute inset-0">
                      <Image
                        src={section.backgroundImage}
                        alt={section.backgroundAlt || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                  )}

                  <div className="relative px-6 py-12 md:px-12 md:pt-[120px] md:pb-[120px]">
                    <p className="mx-auto max-w-5xl text-center text-base sm:text-lg md:text-[32px] font-semibold leading-relaxed text-white">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'why_cartons_matter') {
          return (
            <section key={idx} className="bg-gray-50 py-12 md:py-12">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-2 text-black" dangerouslySetInnerHTML={{ __html: formatBoldText(section.heading) }} />
                  {section.description ? (
                    <RichText
                      as="div"
                      html={section.description}
                      className="mt-3 text-sm sm:text-base text-black mb-6 leading-relaxed"
                    />
                  ) : null}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl md:rounded-[50px] bg-white overflow-hidden"
                    >
                      <div className="px-5 pt-5">
                        <div className="relative w-full overflow-hidden rounded-3xl md:rounded-[50px] bg-gray-100">
                          {item.image && (
                            <div className="relative w-full pt-[58%]">
                              <Image
                                src={item.image}
                                alt={item.imageAlt || item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="px-5 pb-6 pt-4">
                        <h3 className="text-xl sm:text-[22px] md:text-[24px] font-bold text-[#009FE8]">{item.title}</h3>
                        <RichText
                          as="div"
                          html={item.description}
                          className="mt-2 text-sm sm:text-base text-black leading-relaxed mb-4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'impact_product_banner') {
          return (
            <section key={idx} className="bg-gray-50 py-10 md:py-12">
              <div className="container mx-auto px-4">
                <div className="relative px-6 py-12 md:px-12 md:pt-[120px] md:pb-[120px] rounded-3xl md:rounded-[50px]">
                  <div className="absolute inset-0 rounded-3xl md:rounded-[50px]">
                    {section.backgroundImage && (
                      <Image
                        src={section.backgroundImage}
                        alt={section.backgroundAlt || ''}
                        fill
                        className="object-cover rounded-3xl md:rounded-[50px]"
                        sizes="(max-width: 768px) 100vw, 1200px"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/35 rounded-3xl md:rounded-[50px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent rounded-3xl md:rounded-[50px]" />
                  </div>

                  <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-end ">
                    <div className="max-w-xl">
                      <h3 className="text-lg sm:text-xl md:text-[32px] font-semibold leading-snug text-white">
                        {section.headingLines.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'power_of_carton_packaging') {
          return (
            <section key={idx} className="bg-gray-50 py-12 md:py-12">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-2 text-black" dangerouslySetInnerHTML={{ __html: section.heading }} />

                  {(section.introText) && (
                    <p className="mt-3 text-sm sm:text-base text-black mb-6 leading-relaxed">
                      {section.introText}
                    </p>
                  )}
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                  {section.cards.map((card) => (
                    <div
                      key={card.id}
                      className="rounded-3xl md:rounded-[50px] bg-[#EDF0F1] px-6 py-8 text-center"
                    >
                      <div className="mt-1 text-xl md:text-2xl font-extrabold text-black" dangerouslySetInnerHTML={{ __html: card.title }} />

                      <p className="mt-4 text-sm md:text-base text-black leading-relaxed">
                        {card.descriptionEmphasis ? (
                          <span className="font-semibold">{card.descriptionEmphasis} </span>
                        ) : null}
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>

                {section.footnote ? (
                  <p className="mt-10 text-center text-sm md:text-base text-black">
                    {section.footnote}
                  </p>
                ) : null}
              </div>
            </section>
          );
        }

        if (section.type === 'journey_recycling_section') {
          return (
            <section key={idx} className="bg-gray-50 py-12 md:py-12">
              <div className="container mx-auto px-4">
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-10 text-black text-center"
                  dangerouslySetInnerHTML={{ __html: section.heading }}
                />

                <div className="mt-6 overflow-hidden rounded-3xl md:rounded-[50px] border border-gray-100 bg-gray-50">
                  <div className="relative w-full overflow-hidden">
                    {section.image && (
                      <Image
                        src={section.image}
                        alt={section.imageAlt || section.heading}
                        width={1600}
                        height={1200}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    )}
                  </div>
                </div>

                <RichText
                  as="div"
                  html={section.description}
                  className="mx-auto mt-6 max-w-5xl text-center text-sm md:text-base text-black leading-relaxed"
                />

                {section.ctaLink ? (
                  <div className="mt-4 text-center">
                    <Link
                      href={section.ctaLink}
                      className="text-[#009FE8] text-sm md:text-base font-bold hover:underline transition"
                    >
                      {section.ctaText}
                    </Link>
                  </div>
                ) : null}
              </div>
            </section>
          );
        }

        return null;
      })}

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

