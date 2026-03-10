'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductData } from '@/fake-api/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Feature = ProductData['productFeatures'][number];

interface ProductFeaturesSliderClientProps {
  features: Feature[];
}

/**
 * Product Features Slider Component (Client Component)
 *
 * Swiper.js slider with smooth transitions and navigation controls.
 */
export default function ProductFeaturesSliderClient({
  features,
}: ProductFeaturesSliderClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!features || features.length === 0) {
    return null;
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative">
      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 32,
          },
        }}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        className="product-features-swiper"
      >
        {features.map((feature) => (
          <SwiperSlide key={feature.id}>
            <div className="bg-white rounded-[25px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              {/* Feature Image */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Feature Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      {features.length > 3 && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            aria-label="Previous features"
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
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className="swiper-button-next-custom w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            aria-label="Next features"
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

      {/* Custom Swiper Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .product-features-swiper {
            padding-bottom: 2rem;
          }

          .product-features-swiper .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
            bottom: 0;
          }

          .product-features-swiper .swiper-pagination-bullet-custom {
            width: 0.5rem;
            height: 0.5rem;
            background: #d1d5db;
            opacity: 1;
            transition: all 0.3s ease;
            margin: 0 0.25rem;
            border-radius: 9999px;
            cursor: pointer;
          }

          .product-features-swiper .swiper-pagination-bullet-active-custom {
            width: 2rem;
            background: #009FE8;
          }

          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
          }

          .swiper-button-prev-custom {
            left: -1rem;
          }

          .swiper-button-next-custom {
            right: -1rem;
          }

          @media (max-width: 768px) {
            .swiper-button-prev-custom {
              left: 0.5rem;
            }

            .swiper-button-next-custom {
              right: 0.5rem;
            }
          }

        `
      }} />
    </div>
  );
}
