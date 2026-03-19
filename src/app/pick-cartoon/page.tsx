import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPageData } from '@/lib/api';
import { fetchPackagingPageData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Link from 'next/link';
import Image from 'next/image';
import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Dynamic Page Component
 * 
 * Server Component that fetches page data by slug.
 * Returns 404 if page doesn't exist.
 * Implements dynamic SEO metadata.
 */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const packagingPage = await fetchPackagingPageData(slug);
  if (packagingPage) {
    const canonicalUrl = packagingPage.seo.canonical_url
      ? getCanonicalUrl(packagingPage.seo.canonical_url)
      : getCanonicalUrl(`/${slug}`);

    return {
      title: packagingPage.seo.meta_title,
      description: packagingPage.seo.meta_description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: packagingPage.seo.og_title || packagingPage.seo.meta_title,
        description: packagingPage.seo.og_description || packagingPage.seo.meta_description,
        images: packagingPage.seo.og_image ? [packagingPage.seo.og_image] : [],
        url: canonicalUrl,
        type: 'website',
      },
      twitter: {
        card:
          (packagingPage.seo.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') ||
          'summary_large_image',
        title: packagingPage.seo.twitter_title || packagingPage.seo.meta_title,
        description: packagingPage.seo.twitter_description || packagingPage.seo.meta_description,
        images: packagingPage.seo.twitter_image ? [packagingPage.seo.twitter_image] : [],
      },
    };
  }

  const pageData = await fetchPageData(slug);

  if (!pageData) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const canonicalUrl = pageData.seo.canonical_url 
    ? getCanonicalUrl(pageData.seo.canonical_url)
    : getCanonicalUrl(`/${slug}`);

  const metadata: Metadata = {
    title: pageData.seo.meta_title,
    description: pageData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
  };

  return metadata;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const packagingPage = await fetchPackagingPageData(slug);
  if (packagingPage) {
    const schemaData = packagingPage.seo.schema
      ? {
          ...packagingPage.seo.schema,
          url: packagingPage.seo.canonical_url
            ? getCanonicalUrl(packagingPage.seo.canonical_url)
            : getCanonicalUrl(`/${slug}`),
        }
      : null;

    return (
      <>
        {schemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
        )}
        <main className="min-h-screen bg-gray-50">
          <CompanyHero
            data={{
              title: packagingPage.title,
              backgroundImage: packagingPage.heroBackgroundImage || '/about_banner.jpg',
            }}
          />

          <section className="bg-gray-50">
            <div className="container mx-auto px-4 py-4">
              <Breadcrumbs
                items={[
                  {
                    label: packagingPage.breadcrumbs.parentLabel,
                    href: packagingPage.breadcrumbs.parentHref,
                  },
                  { label: packagingPage.title },
                ]}
              />
            </div>
          </section>

          {packagingPage.sections.map((section, idx) => {
            if (section.type === 'sustainability_footprint') {
              return (
                <section key={idx} className="bg-white py-12 md:py-16">
                  <div className="container mx-auto px-4">
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {section.heading}{' '}
                        {section.headingHighlight ? (
                          <span className="text-[#009FE8]">{section.headingHighlight}</span>
                        ) : null}{' '}
                        {section.headingSuffix ? (
                          <span className="text-gray-900">{section.headingSuffix}</span>
                        ) : null}
                      </h2>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.items.map((item) => (
                        <div key={item.id}>
                          <div className="relative overflow-hidden rounded-[28px] bg-gray-100">
                            <div className="relative w-full pt-[70%]">
                              <Image
                                src={item.image}
                                alt={item.imageAlt || packagingPage.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          </div>

                          {item.title ? (
                            <h3 className="mt-5 text-sm font-semibold text-gray-900">{item.title}</h3>
                          ) : null}
                          <p className="mt-4 text-xs md:text-sm leading-relaxed text-gray-700">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }

            if (section.type === 'image_quote_banner') {
              return (
                <section key={idx} className="bg-white py-10 md:py-14">
                  <div className="container mx-auto px-4">
                    <div className="relative overflow-hidden rounded-[28px] md:rounded-[34px]">
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

                      <div className="relative px-6 py-10 md:px-12 md:py-14">
                        <p className="mx-auto max-w-4xl text-center text-sm md:text-lg font-semibold leading-relaxed text-white">
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
                <section key={idx} className="bg-white py-12 md:py-16">
                  <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {section.heading}{' '}
                        {section.headingHighlight ? (
                          <span className="text-[#009FE8]">{section.headingHighlight}</span>
                        ) : null}
                      </h2>
                      {section.description ? (
                        <p className="mt-3 text-xs md:text-sm text-gray-600 leading-relaxed">
                          {section.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-[26px] bg-white shadow-sm border border-gray-100 overflow-hidden"
                        >
                          <div className="px-5 pt-5">
                            <div className="relative w-full overflow-hidden rounded-[18px] bg-gray-100">
                              <div className="relative w-full pt-[58%]">
                                <Image
                                  src={item.image}
                                  alt={item.imageAlt || item.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="px-5 pb-6 pt-4">
                            <h3 className="text-sm font-bold text-[#009FE8]">{item.title}</h3>
                            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
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
                <section key={idx} className="bg-white py-10 md:py-14">
                  <div className="container mx-auto px-4">
                    <div className="relative overflow-hidden rounded-[28px] md:rounded-[34px]">
                      <div className="absolute inset-0">
                        <Image
                          src={section.backgroundImage}
                          alt={section.backgroundAlt || ''}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-black/35" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
                      </div>

                      <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-end px-6 py-10 md:px-12 md:py-14">
                        <div className="max-w-xl">
                          <h3 className="text-xl md:text-2xl font-semibold leading-snug text-white">
                            {section.headingLines.map((line, i) => (
                              <span key={i} className="block">
                                {line}
                              </span>
                            ))}
                          </h3>
                        </div>

                        {section.productImage ? (
                          <div className="relative h-[180px] md:h-[240px] lg:h-[260px]">
                            <Image
                              src={section.productImage}
                              alt={section.productAlt || ''}
                              fill
                              className="object-contain object-bottom"
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            if (section.type === 'power_of_carton_packaging') {
              return (
                <section key={idx} className="bg-white py-12 md:py-16">
                  <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                      <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                        {section.heading}{' '}
                        {section.headingHighlight ? (
                          <span className="text-[#009FE8]">{section.headingHighlight}</span>
                        ) : null}{' '}
                        {section.headingSuffix ? (
                          <span className="text-gray-900">{section.headingSuffix}</span>
                        ) : null}
                      </h2>

                      {(section.introBold || section.introText) && (
                        <p className="mt-3 text-xs md:text-sm text-gray-700 leading-relaxed">
                          {section.introBold ? (
                            <span className="font-semibold">{section.introBold} </span>
                          ) : null}
                          {section.introText}
                        </p>
                      )}
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {section.cards.map((card) => (
                        <div
                          key={card.id}
                          className="rounded-[28px] bg-[#F2F5F6] px-6 py-8 text-center"
                        >
                          <div className="text-xl md:text-2xl font-extrabold text-gray-900">
                            <span className="text-[#009FE8]">{card.valueHighlight}</span>{' '}
                            {card.valueRest ? <span>{card.valueRest}</span> : null}
                          </div>
                          <div className="mt-1 text-xl md:text-2xl font-extrabold text-gray-900">
                            {card.title}
                          </div>

                          <p className="mt-4 text-xs md:text-sm text-gray-700 leading-relaxed">
                            {card.descriptionEmphasis ? (
                              <span className="font-semibold">{card.descriptionEmphasis} </span>
                            ) : null}
                            {card.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {section.footnote ? (
                      <p className="mt-10 text-center text-xs md:text-sm text-gray-700">
                        {section.footnote}
                      </p>
                    ) : null}
                  </div>
                </section>
              );
            }

            if (section.type === 'journey_recycling_section') {
              return (
                <section key={idx} className="bg-white py-12 md:py-16">
                  <div className="container mx-auto px-4">
                    <h2 className="text-center text-[#009FE8] text-xl md:text-3xl font-bold">
                      {section.heading}
                    </h2>

                    <div className="mt-6 overflow-hidden rounded-[26px] border border-gray-100 bg-gray-50">
                      <div className="relative w-full pt-[56%] md:pt-[50%]">
                        <Image
                          src={section.image}
                          alt={section.imageAlt || section.heading}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 1200px"
                          priority
                        />
                      </div>
                    </div>

                    <p className="mx-auto mt-6 max-w-5xl text-center text-[10px] md:text-xs text-gray-700 leading-relaxed">
                      {section.description}
                    </p>

                    {section.ctaLink ? (
                      <div className="mt-4 text-center">
                        <Link
                          href={section.ctaLink}
                          className="text-[#009FE8] text-xs md:text-sm font-semibold hover:underline transition"
                        >
                          {section.ctaText}
                        </Link>
                      </div>
                    ) : (
                      <div className="mt-4 text-center">
                        <span className="text-[#009FE8] text-xs md:text-sm font-semibold">
                          {section.ctaText}
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            return null;
          })}

          <CallToAction />
          <NewsletterSubscription />
        </main>
      </>
    );
  }

  const pageData = await fetchPageData(slug);

  if (!pageData) {
    notFound();
  }

  // Prepare schema data with canonical URL
  const schemaData = pageData.seo.schema ? {
    ...pageData.seo.schema,
    url: pageData.seo.canonical_url 
      ? getCanonicalUrl(pageData.seo.canonical_url)
      : getCanonicalUrl(`/${slug}`),
  } : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            {pageData.title}
          </h1>
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>
      </main>
    </>
  );
}
