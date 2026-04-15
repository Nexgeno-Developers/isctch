import Image from 'next/image';
import Link from 'next/link';
import type { ProductIndustriesPageData } from '@/lib/api/product_industries_layout';
import { RichText } from '@/components/common/RichText';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import IndustriesFeaturedCarousel from '@/components/industries/IndustriesFeaturedCarousel';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { formatBoldText } from '@/lib/htmlText';

export default function ProductIndustriesLayoutPage({ data }: { data: ProductIndustriesPageData }) {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[110px] pb-8 md:pt-[150px] md:pb-12 lg:pt-[200px] lg:pb-28">
        <div className="absolute inset-0">
          {data.heroBackgroundImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.heroBackgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0e233c]" />
          )}
          <div className="absolute inset-0 bg-[#0e233c]/45" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          {data.heroSubtitle ? (
            <p className="mx-auto lg:mt-6 mt-2 max-w-3xl text-base leading-relaxed text-white/95 md:text-lg">
              {data.heroSubtitle}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-[#f8f8f8]">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: data.title }]} />
        </div>
      </section>

      {/* Industrial Segments */}
      {data.industries.length > 0 ? (
        <section className="bg-[#f8f8f8] py-8 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2
              className="lg:mb-10 mb-6 text-center text-[22px] font-bold md:mb-14 md:text-4xl lg:text-5xl text-black"
              dangerouslySetInnerHTML={{
                __html: formatBoldText(data.industriesTitle || '*Industrial* Segments'),
              }}
            />
            <div className="grid grid-cols-1 gap-6 md:gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.industries.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group flex flex-col rounded-[20px] bg-white p-6 transition md:pt-8 md:pb-8 md:pr-8 md:pl-8 lg:pt-12 lg:pb-12 lg:pr-12 lg:pl-12"
                >
                  {item.iconUrl ? (
                    <div className="mb-4 flex h-[100px] w-[100px] items-center justify-center md:h-[200px] md:w-[200px]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- CMS icons may be SVG/webp */}
                      <img
                        src={item.iconUrl}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                        aria-hidden
                      />
                    </div>
                  ) : null}
                  <h3 className="text-lg font-bold text-[#0E233C] md:text-xl">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-black md:text-base md:pr-12">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Latest insights */}
      {data.insights ? (
        <section className="relative overflow-hidden py-8 md:py-20">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/technical_bg.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-[#0a1628]/55" aria-hidden />
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="relative w-full overflow-hidden rounded-[50px]">
                {data.insights.image ? (
                  <Image
                    src={data.insights.image}
                    alt=""
                    height={700}
                    width={700}
                    className="object-cover rounded-[50px]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/10" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-[#009FE8] md:text-sm">
                  {data.insights.eyebrow}
                </p>
                {data.insights.title ? (
                  <h2 className="mt-3 text-[22px] font-bold uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                    {data.insights.title}
                  </h2>
                ) : null}
                {data.insights.descriptionHtml ? (
                  <RichText
                    as="div"
                    html={data.insights.descriptionHtml}
                    className="mt-6 text-sm leading-relaxed text-white/90 md:text-lg"
                  />
                ) : null}
                {data.insights.ctaHref ? (
                  <Link
                    href={data.insights.ctaHref}
                    className="mt-8 inline-flex items-center text-sm font-semibold uppercase tracking-wide text-white transition hover:text-[#009FE8]"
                  >
                    {data.insights.ctaText}
                    <span className="ml-2" aria-hidden>
                      →
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Featured products */}
      {data.featuredProducts.length > 0 ? (
        <section className="relative overflow-hidden py-8 md:py-16 lg:py-20">
          
          <div className="relative z-10 container mx-auto px-4">
            <IndustriesFeaturedCarousel products={data.featuredProducts} />
          </div>
        </section>
      ) : null}

      <NewsletterSubscription />
    </main>
  );
}
