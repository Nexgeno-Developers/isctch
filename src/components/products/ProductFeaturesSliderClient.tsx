'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { ProductData } from '@/fake-api/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

type Feature = NonNullable<ProductData['productFeatures']>[number];

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
  // Determine if loop should be enabled (need at least 3 slides for loop to work properly)
  const shouldLoop = features.length >= 3;

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Swiper Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
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
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        className="product-features-swiper"
      >
        {features.map((feature) => (
          <SwiperSlide key={feature.id}>
            <div className="bg-[#EDF0F1] rounded-[50px] overflow-hidden flex flex-col p-[15px] h-full">
              {/* Feature Image */}
              <div className="relative w-full overflow-hidden bg-gray-100 rounded-[50px] h-[350px]">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  width={400}
                  height={400}
                  className="rounded-[50px] object-contain w-full h-full object-top"
                  sizes=""
                />
              </div>

              {/* Feature Content */}
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-2xl md:text-[24px] font-bold text-black mb-1 mt-3">
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

        `
      }} />
    </div>
  );
}
