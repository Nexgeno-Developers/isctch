'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { LatestInsightsData } from '@/lib/api/home';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface LatestInsightsClientProps {
  data: LatestInsightsData;
}

export default function LatestInsightsClient({ data }: LatestInsightsClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!data.cards || data.cards.length === 0) {
    return null;
  }

  // Enable loop if we have more than 3 cards
  const shouldLoop = data.cards.length > 3;

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Title and Navigation */}
        <div className="flex items-center justify-between mb-6 md:mb-12">
          <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold">
            <span className="text-black">Latest</span>{' '}
            <span className="text-[#009FE8]">Insights</span>
          </h2>

          {/* Navigation Arrows */}
          {data.cards.length > 3 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="cursor-pointer  lg:w-12 lg:h-12 w-8 h-8 rounded-full lg:border-2 border-1 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center 
                transition-all group"
                aria-label="Previous insights"
              >
                <svg
                  className="lg:w-6 lg:h-6 w-4 h-4 text-[#009FE8] group-hover:text-white transition-colors"
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
                className="cursor-pointer lg:w-12 lg:h-12 w-8 h-8 rounded-full lg:border-2 border-1 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group shadow-lg"
                aria-label="Next insights"
              >
                <svg
                  className="lg:w-6 lg:h-6 w-4 h-4 text-[#009FE8] group-hover:text-white transition-colors"
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
            bulletClass: 'swiper-pagination-bullet-insights',
            bulletActiveClass: 'swiper-pagination-bullet-active-insights',
          }}
          className="latest-insights-swiper"
        >
          {data.cards.map((card) => (
            <SwiperSlide key={card.id}>
              <Link
                href={card.link}
                className="block group h-full"
              >
                <div className="rounded-[50px] overflow-hidden transition-shadow duration-300 h-full bg-[#009FE8] p-[15px]">
                  {/* Image */}
                  <div className="relative aspect-[16/10] md:h-72 md:aspect-auto overflow-hidden rounded-t-[50px]">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content - Blue Background */}
                  <div className="bg-[#009FE8] p-4 md:p-6 h-full">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white text-sm md:text-base font-medium uppercase tracking-wide">
                        {card.category}
                      </span>
                      <span className="text-white text-sm md:text-base font-medium">
                        {card.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[18px] md:text-[20px] lg:text-[24px] font-bold text-white line-clamp-2">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .latest-insights-swiper {
              padding-bottom: 2rem;
            }

            .latest-insights-swiper .swiper-pagination {
              position: relative;
              margin-top: 1.5rem;
              bottom: 0;
            }

            .latest-insights-swiper .swiper-pagination-bullet-insights {
              width: 0.5rem;
              height: 0.5rem;
              background: #d1d5db;
              opacity: 1;
              transition: all 0.3s ease;
              margin: 0 0.25rem;
              border-radius: 9999px;
              cursor: pointer;
            }

            .latest-insights-swiper .swiper-pagination-bullet-active-insights {
              width: 2rem;
              background: #009FE8;
            }
          `
        }} />
      </div>
    </section>
  );
}
