'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductData } from '@/fake-api/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Accessory = NonNullable<ProductData['accessories']>[number];

interface ProductAccessoriesSliderClientProps {
  accessories: Accessory[];
}

/**
 * Product Accessories Slider Component (Client Component)
 *
 * Swiper.js slider with autoplay functionality and links to product detail pages.
 */
export default function ProductAccessoriesSliderClient({
  accessories,
}: ProductAccessoriesSliderClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!accessories || accessories.length === 0) {
    return null;
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Enable loop for smooth infinite scrolling (need at least as many slides as visible)
  const shouldLoop = accessories.length > 3;

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {accessories.length > 1 && (
        <>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group shadow-lg"
            aria-label="Previous accessories"
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
            className="swiper-button-next-custom w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group shadow-lg"
            aria-label="Next accessories"
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
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={shouldLoop}
        loopAdditionalSlides={shouldLoop ? 2 : 0}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 32,
            loop: shouldLoop,
            loopAdditionalSlides: shouldLoop ? 2 : 0,
          },
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        className="product-accessories-swiper"
      >
        {accessories.map((accessory) => {
          const content = (
            <div className="bg-white rounded-[25px] border-2 border-[#009FE8] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              {/* Accessory Image */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-white p-6">
                <Image
                  src={accessory.image}
                  alt={accessory.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Accessory Footer */}
              <div className="bg-[#009FE8] px-6 py-4">
                <h3 className="text-lg md:text-xl font-semibold text-white text-center">
                  {accessory.name}
                </h3>
              </div>
            </div>
          );

          return (
            <SwiperSlide key={accessory.id}>
              {accessory.slug ? (
                <Link href={`/products/${accessory.slug}`} className="block h-full">
                  {content}
                </Link>
              ) : (
                content
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Swiper Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .product-accessories-swiper {
            padding-bottom: 2rem;
          }

          .product-accessories-swiper .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
            bottom: 0;
          }

          .product-accessories-swiper .swiper-pagination-bullet-custom {
            width: 0.5rem;
            height: 0.5rem;
            background: #d1d5db;
            opacity: 1;
            transition: all 0.3s ease;
            margin: 0 0.25rem;
            border-radius: 9999px;
            cursor: pointer;
          }

          .product-accessories-swiper .swiper-pagination-bullet-active-custom {
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
