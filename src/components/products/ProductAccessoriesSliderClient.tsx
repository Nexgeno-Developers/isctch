'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { ProductData } from '@/fake-api/products';

// Import Swiper styles
import 'swiper/css';
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
  if (!accessories || accessories.length === 0) {
    return null;
  }

  // Enable loop for smooth infinite scrolling (need at least as many slides as visible)
  const shouldLoop = accessories.length > 3;

  return (
    <div className="relative">
      {/* Swiper Slider */}
      <Swiper
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
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 32,
            loop: shouldLoop,
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
            <div className="bg-[#009FE8] rounded-[50px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full p-[15px]">
              {/* Accessory Image */}
              <div className="relative w-full overflow-hidden rounded-[50px] h-[350px]">
                <Image
                  src={accessory.image}
                  alt={accessory.imageAlt}
                  width={800}
                  height={800}
                  className="object-contain w-full h-full object-top rounded-[50px]"
                  sizes=""
                />
              </div>

              {/* Accessory Footer */}
              <div className="bg-[#009FE8] px-6 py-4">
                <h3 className="text-lg md:text-[24px] font-semibold text-white text-center">
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

        `
      }} />
    </div>
  );
}
