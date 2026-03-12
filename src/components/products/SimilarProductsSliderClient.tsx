'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductData } from '@/fake-api/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface SimilarProductsSliderClientProps {
  products: ProductData[];
}

/**
 * Similar Products Slider Component (Client Component)
 *
 * Swiper.js slider with navigation arrows and product cards.
 */
export default function SimilarProductsSliderClient({
  products,
}: SimilarProductsSliderClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!products || products.length === 0) {
    return null;
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Enable loop if we have enough products
  const shouldLoop = products.length > 4;

  return (
    <div className="relative">
      {/* Navigation Arrows - Positioned in header via absolute positioning */}
      {products.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            disabled={isBeginning && !shouldLoop}
            className="cursor-pointer swiper-button-prev-similar w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous products"
          >
            <svg
              className="w-6 h-6 text-[#009FE8] group-hover:text-white transition-colors"
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
            onClick={handleNext}
            disabled={isEnd && !shouldLoop}
            className="cursor-pointer swiper-button-next-similar w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            aria-label="Next products"
          >
            <svg
              className="w-6 h-6 text-[#009FE8] group-hover:text-white transition-colors"
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
        </>
      )}

      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={shouldLoop}
        watchSlidesProgress={true}
        speed={500}
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 24,
          },
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-similar',
          bulletActiveClass: 'swiper-pagination-bullet-active-similar',
        }}
        className="similar-products-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-[#EDF0F1] rounded-[50px] p-[15px] h-full">
              {/* Product Image Container */}
              <div className="mb-4 aspect-square flex items-center justify-center">
                <div className="relative w-full h-full rounded-[50px]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-contain rounded-[50px]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 md:p-4 flex-1 flex flex-col">
                {/* Product Name */}
                <h3 className="text-2xl md:text-[24px] font-bold text-gray-900 mb-1">
                  {product.title}
                </h3>

                {/* Volume Range */}
                {product.sizes && product.sizes.length > 0 && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>{product.sizes[0].includes('ml') ? product.sizes[0] : `${product.sizes[0]}ml`}</span>
                    <svg
                      className="w-4 h-4 text-gray-600"
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
                    <span>{product.sizes[product.sizes.length - 1].includes('ml') ? product.sizes[product.sizes.length - 1] : `${product.sizes[product.sizes.length - 1]}ml`}</span>
                  </p>
                )}

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-2 justify-between pt-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm font-medium text-[#009FE8] hover:text-[#0077B6] transition-colors"
                  >
                    Compare
                  </Link>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm font-medium text-[#009FE8] hover:text-[#0077B6] transition-colors"
                  >
                    Request Sample
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .similar-products-swiper {
            padding-bottom: 2rem;
          }

          .similar-products-swiper .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
            bottom: 0;
          }

          .similar-products-swiper .swiper-pagination-bullet-similar {
            width: 0.5rem;
            height: 0.5rem;
            background: #d1d5db;
            opacity: 1;
            transition: all 0.3s ease;
            margin: 0 0.25rem;
            border-radius: 9999px;
            cursor: pointer;
          }

          .similar-products-swiper .swiper-pagination-bullet-active-similar {
            width: 2rem;
            background: #009FE8;
          }

          .swiper-button-prev-similar,
          .swiper-button-next-similar {
            position: absolute;
            top: -5.5rem;
            z-index: 10;
          }

          .swiper-button-prev-similar {
            right: 3.5rem;
          }

          .swiper-button-next-similar {
            right: 0;
          }

          @media (max-width: 768px) {
            .swiper-button-prev-similar,
            .swiper-button-next-similar {
              top: -4.5rem;
            }

            .swiper-button-prev-similar {
              right: 3rem;
            }

            .swiper-button-next-similar {
              right: 0;
            }
          }

        `
      }} />
    </div>
  );
}
