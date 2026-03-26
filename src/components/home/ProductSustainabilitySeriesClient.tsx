'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductSustainabilityData, SustainabilityProductCard } from '@/fake-api/homepage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ProductSustainabilitySeriesClientProps {
  data: ProductSustainabilityData;
}

export default function ProductSustainabilitySeriesClient({ data }: ProductSustainabilitySeriesClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!data.products || data.products.length === 0) {
    return null;
  }

  // Enable loop if we have more than 3 products
  const shouldLoop = data.products.length > 3;

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Background Image Container */}
        <div className="relative rounded-[50px] overflow-hidden p-8 md:p-12 lg:p-16">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/product_section_bg_home.webp"
              alt="Product Section Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Content Wrapper */}
          <div className="relative z-10">
          {/* Section Title and Navigation */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Product Sustainability Series
            </h2>

            {/* Navigation Arrows */}
            {data.products.length > 3 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="cursor-pointer w-12 h-12 rounded-full border-2 border-white bg-transparent hover:bg-white flex items-center justify-center transition-all group shadow-lg"
                  aria-label="Previous products"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:text-[#009FE8] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="cursor-pointer w-12 h-12 rounded-full border-2 border-white bg-transparent hover:bg-white flex items-center justify-center transition-all group shadow-lg"
                  aria-label="Next products"
                >
                  <svg
                    className="w-6 h-6 text-white group-hover:text-[#009FE8] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Swiper Slider */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={shouldLoop}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 32,
              },
            }}
            speed={500}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-sustainability-series',
              bulletActiveClass: 'swiper-pagination-bullet-active-sustainability-series',
            }}
            className="product-sustainability-series-swiper"
          >
            {data.products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Swiper Styles */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .product-sustainability-series-swiper {
                padding-bottom: 2rem;
              }

              .product-sustainability-series-swiper .swiper-pagination {
                position: relative;
                margin-top: 1.5rem;
                bottom: 0;
              }

              .product-sustainability-series-swiper .swiper-pagination-bullet-sustainability-series {
                width: 0.5rem;
                height: 0.5rem;
                background: rgba(255, 255, 255, 0.5);
                opacity: 1;
                transition: all 0.3s ease;
                margin: 0 0.25rem;
                border-radius: 9999px;
                cursor: pointer;
              }

              .product-sustainability-series-swiper .swiper-pagination-bullet-active-sustainability-series {
                width: 2rem;
                background: white;
              }
            `
          }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Product Card Component
 */
function ProductCard({ product }: { product: SustainabilityProductCard }) {
  return (
    <div className="bg-white rounded-[50px] overflow-hidden transition-shadow duration-300 h-full p-[15px]">
      {/* Image */}
      <div className="relative overflow-hidden rounded-[50px]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          height={400}
          width={400}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw w-full"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Label */}
        <span className="inline-block text-[#009FE8] text-sm md:text-base font-medium mb-3">
          {product.label}
        </span>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-black text-base  mb-6 leading-relaxed line-clamp-4">
          {product.description}
        </p>

        {/* CTA Link */}
        <Link
          href={product.link}
          className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-medium hover:text-[#0077B6] transition-colors group"
        >
          {product.ctaText}
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
        </Link>
      </div>
    </div>
  );
}
