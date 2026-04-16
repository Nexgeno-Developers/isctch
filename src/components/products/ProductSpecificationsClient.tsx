'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import CircularImage from '@/components/common/CircularImage';
import { formatBoldText } from '@/lib/htmlText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductData } from '@/fake-api/products';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductSpecificationsClientProps {
  product: ProductData;
}

export default function ProductSpecificationsClient({ product }: ProductSpecificationsClientProps) {
  const variants = product.sizes || [];
  const imagesByVariant = product.sizeFormatImages || {};

  const slides = useMemo(() => {
    if (variants.length > 0) {
      const urls = variants
        .map((v) => imagesByVariant[v])
        .filter((u): u is string => typeof u === 'string' && !!u.trim());
      if (urls.length > 0) return urls;
    }
    return [product.productImage3D || product.image || '/product_image_1.jpg'];
  }, [variants, imagesByVariant, product.productImage3D, product.image]);

  const initialVariant =
    variants.length > 0
      ? variants.find((v) => !!imagesByVariant[v]) || variants[0]
      : '';
  const [activeVariant, setActiveVariant] = useState<string>(initialVariant);

  const swiperRef = useRef<SwiperType | null>(null);
  const prevElRef = useRef<HTMLButtonElement | null>(null);
  const nextElRef = useRef<HTMLButtonElement | null>(null);

  const slideIndexByVariant = useMemo(() => {
    const map = new Map<string, number>();
    variants.forEach((v, idx) => {
      if (imagesByVariant[v]) map.set(v, idx);
    });
    return map;
  }, [variants, imagesByVariant]);

  const onSelectVariant = (variant: string) => {
    setActiveVariant(variant);
    const idx = slideIndexByVariant.get(variant);
    if (typeof idx === 'number') {
      swiperRef.current?.slideToLoop?.(idx);
      swiperRef.current?.slideTo?.(idx);
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    const prev = prevElRef.current;
    const next = nextElRef.current;
    if (!swiper || !prev || !next) return;

    // Swiper may initialize before refs are set on first render.
    // Re-attach navigation elements and re-init.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navParams = (swiper.params.navigation || {}) as any;
    navParams.prevEl = prev;
    navParams.nextEl = next;
    swiper.params.navigation = navParams;

    swiper.navigation?.destroy?.();
    swiper.navigation?.init?.();
    swiper.navigation?.update?.();
  }, [slides.length]);

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Product Visualization */}
          <div className="flex flex-col items-center lg:items-start bg-white rounded-[50px] p-4 sm:p-6 md:p-8">
            <div className="relative w-full max-w-md mx-auto">
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation
                onSwiper={(s) => {
                  swiperRef.current = s;
                }}
                className="w-full product-image-swiper"
              >
                {slides.map((url, idx) => (
                  <SwiperSlide key={`${url}-${idx}`}>
                    <div className="relative w-full aspect-[3/4]">
                      <CircularImage
                        src={url}
                        alt={product.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Hide Swiper's default nav buttons; we use custom ones above. */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .product-image-swiper .swiper-button-next,
                    .product-image-swiper .swiper-button-prev {
                      display: none !important;
                    }
                  `,
                }}
              />

              {/* Swiper navigation buttons */}
              <button
                ref={prevElRef}
                type="button"
                aria-label="Previous image"
                className="cursor-pointer absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/90 ring-1 ring-black/10 grid place-items-center text-black/70 hover:text-black hover:bg-white transition"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                ref={nextElRef}
                type="button"
                aria-label="Next image"
                className="cursor-pointer absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/90 ring-1 ring-black/10 grid place-items-center text-black/70 hover:text-black hover:bg-white transition"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Product Information */}
          <div>
            <h2 className="text-[22px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-bold text-black pb-2">
              {product.title}
            </h2>

            {product.description && (
              <p className="text-sm sm:text-base md:text-base text-black mb-6 md:mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Size & Formats (clickable) */}
            {variants.length > 0 && (
              <div className="mb-8 md:mb-12">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-3 md:mb-4">
                  Size & Formats
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {variants.map((size) => {
                    const isActive = activeVariant === size;
                    const hasImage = !!imagesByVariant[size];
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onSelectVariant(size)}
                        className={[
                          'cursor-pointer px-5 sm:px-8 md:px-12 py-2 rounded-full text-sm sm:text-base md:text-lg font-medium transition-colors',
                          isActive
                            ? 'bg-[#009FE8] text-white border border-[#009FE8]'
                            : 'border border-[#009FE8] text-[#000] hover:bg-[#009FE8]/10',
                          hasImage ? '' : 'opacity-60',
                        ].join(' ')}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Specifications */}
            {product.quickSpecifications && product.quickSpecifications.length > 0 && (
              <div className="mb-8 pb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-6">
                  Quick Specifications
                </h3>
                <dl className="space-y-3">
                  {product.quickSpecifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start border-b border-[#EEEEEE] pb-4"
                    >
                      <dt className="text-base md:text-lg text-black font-medium pr-4">
                        {spec.label}:
                      </dt>
                      <dd className="text-base md:text-lg text-[#009FE8] font-semibold text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Compatible With */}
            {product.compatibilityDescription && (
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">
                  Compatible With
                </h3>
                <p className="text-sm md:text-base text-black mb-4 leading-relaxed">
                  {product.compatibilityDescription}
                </p>
              </div>
            )}

            {/* Industries Support */}
            {product.relatedIndustries && product.relatedIndustries.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">
                  Industries Support
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.relatedIndustries.map((ind) => (
                    ind.slug ? (
                      <Link
                        key={ind.id}
                        href={ind.slug.startsWith('/') ? ind.slug : `/${ind.slug}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F1FAFF] ring-1 ring-[#BFE5F7] text-[12px] md:text-sm font-semibold text-[#0A4A7A] transition-colors hover:bg-[#E6F6FF]"
                      >
                        {ind.title}
                      </Link>
                    ) : (
                      <span
                        key={ind.id}
                        className="inline-flex items-center rounded-full border border-[#009FE8]/35 bg-white px-4 py-2 text-sm font-semibold text-[#0E233C]"
                      >
                        {ind.title}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

