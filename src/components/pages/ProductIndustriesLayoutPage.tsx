import Image from 'next/image';
import Link from 'next/link';

import type { ProductIndustriesPageData } from '@/lib/api/product_industries_layout';
import { RichText } from '@/components/common/RichText';
import IndustriesFeaturedCarousel from '@/components/industries/IndustriesFeaturedCarousel';

export default function ProductIndustriesLayoutPage({ data }: { data: ProductIndustriesPageData }) {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[140px] pb-16 md:pt-[200px] md:pb-24 lg:pt-[220px] lg:pb-28">
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
        <div className="relative z-10 container mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          {data.heroSubtitle ? (
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/95 md:text-lg">
              {data.heroSubtitle}
            </p>
          ) : null}
        </div>
      </section>   

      {/* Industrial Segments */}
      {data.industries.length > 0 ? (
        <section className="bg-[#f8f8f8] py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold md:mb-14 md:text-4xl lg:text-5xl">
              <span className="text-[#009FE8]">Industrial</span>{' '}
              <span className="text-black">Segments</span>
            </h2>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.industries.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group flex flex-col rounded-[20px] bg-white p-6 transition md:pt-12 md:pb-12 md:pr-12 md:pl-12"
                >
                  {item.iconUrl ? (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
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
        <section className="relative overflow-hidden py-14 md:py-20">
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
              <div className="relative w-full overflow-hidden rounded-2xl">
                {data.insights.image ? (
                  <Image
                    src={data.insights.image}
                    alt=""
                    height={500}
                    width={500}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/10" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#009FE8] md:text-sm">
                  {data.insights.eyebrow}
                </p>
                {data.insights.title ? (
                  <h2 className="mt-3 text-2xl font-bold uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                    {data.insights.title}
                  </h2>
                ) : null}
                {data.insights.descriptionHtml ? (
                  <RichText
                    as="div"
                    html={data.insights.descriptionHtml}
                    className="mt-6 text-base leading-relaxed text-white/90 md:text-lg"
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
        <section className="bg-[#f8f8f8] py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl lg:text-5xl">
              <span className="text-black">Featured</span>{' '}
              <span className="text-[#009FE8]">Products</span>
            </h2>
            <IndustriesFeaturedCarousel products={data.featuredProducts} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
