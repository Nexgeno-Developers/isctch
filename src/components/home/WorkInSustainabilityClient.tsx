'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { WorkInSustainabilityData, SustainabilityWorkCard } from '@/fake-api/homepage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface WorkInSustainabilityClientProps {
  data: WorkInSustainabilityData;
}

export default function WorkInSustainabilityClient({ data }: WorkInSustainabilityClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!data.cards || data.cards.length === 0) {
    return null;
  }

  // Enable loop if we have more than 3 cards
  const shouldLoop = data.cards.length > 3;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Title and Navigation */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-gray-900">Work in</span>{' '}
            <span className="text-[#009FE8]">Sustainability</span>
          </h2>

          {/* Navigation Arrows */}
          {data.cards.length > 3 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="cursor-pointer w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group shadow-lg"
                aria-label="Previous sustainability work"
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
                className="cursor-pointer w-12 h-12 rounded-full border-2 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group shadow-lg"
                aria-label="Next sustainability work"
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
            bulletClass: 'swiper-pagination-bullet-sustainability',
            bulletActiveClass: 'swiper-pagination-bullet-active-sustainability',
          }}
          className="work-sustainability-swiper"
        >
          {data.cards.map((card) => (
            <SwiperSlide key={card.id}>
              <WorkCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .work-sustainability-swiper {
              padding-bottom: 2rem;
            }

            .work-sustainability-swiper .swiper-pagination {
              position: relative;
              margin-top: 1.5rem;
              bottom: 0;
            }

            .work-sustainability-swiper .swiper-pagination-bullet-sustainability {
              width: 0.5rem;
              height: 0.5rem;
              background: #d1d5db;
              opacity: 1;
              transition: all 0.3s ease;
              margin: 0 0.25rem;
              border-radius: 9999px;
              cursor: pointer;
            }

            .work-sustainability-swiper .swiper-pagination-bullet-active-sustainability {
              width: 2rem;
              background: #009FE8;
            }
          `
        }} />
      </div>
    </section>
  );
}

/**
 * Work Card Component
 */
function WorkCard({ card }: { card: SustainabilityWorkCard }) {
  return (
    <div className="bg-[#EDF0F1] rounded-[50px] px-6 py-[60px] md:px-8 md:py-[80px] h-full">
      {/* Icon */}
      <div className="mb-6">
        <div className={`w-16 h-16 ${card.iconShape === 'square' ? 'rounded-lg' : card.iconShape === 'circle' ? 'rounded-full' : 'rounded-t-lg rounded-b-sm'} bg-[#009FE8] flex items-center justify-center`}>
          {card.icon === 'A+' ? (
            <span className="text-white text-2xl font-bold">A+</span>
          ) : card.icon === 'star' ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ) : card.icon === 'checkmark' ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : null}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
        {card.description}
      </p>

      {/* CTA Link */}
      <Link
        href={card.link}
        className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-medium hover:text-[#0077B6] transition-colors group"
      >
        {card.ctaText}
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
  );
}
