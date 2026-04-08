'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { WorkInSustainabilityData, SustainabilityWorkCard } from '@/lib/api/home';

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
    <section className="relative mt-12 mb-12 py-12 md:py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <Image
          src="/sustanibility_bg_image.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        {/* Soften background for readability */}
        <div className="absolute inset-0" />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        {/* Header with Title and Navigation */}
        <div className="flex items-center justify-between mb-4 md:mb-12">
          <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-white">
          Our Contributions <span className="text-[#009FE8]">Sustainability</span>
          </h2>

          {/* Navigation Arrows */}
          {data.cards.length > 3 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="cursor-pointer lg:w-12 lg:h-12 w-8 h-8 rounded-full lg:border-2 border-1 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group shadow-lg"
                aria-label="Previous sustainability work"
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
                aria-label="Next sustainability work"
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
            bulletClass: 'swiper-pagination-bullet-sustainability',
            bulletActiveClass: 'swiper-pagination-bullet-active-sustainability',
          }}
          className="work-sustainability-swiper"
        >
          {data.cards.map((card) => (
            <SwiperSlide key={card.id} className="h-auto">
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

            .work-sustainability-swiper .swiper-slide {
              height: auto;
              display: flex;
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
    <div className="bg-[#EDF0F1] rounded-[28px] p-4 md:p-5 h-full flex flex-col min-h-[340px] md:min-h-[390px]">
      <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="pt-4 px-0 pb-2 flex flex-col flex-1">
        <h3 className="text-[18px] md:text-[26px] mt-2 font-bold text-black mb-3 leading-tight">
          {card.title}
        </h3>

        <p className="text-black text-sm md:text-base lg:mb-4 mb-0 leading-relaxed flex-1 line-clamp-3">
          {card.description}
        </p>

        <Link
          href={card.link}
          className="inline-flex items-center text-[#009FE8] text-sm md:text-base font-semibold hover:text-[#0077B6] transition-colors group"
        >
          {card.ctaText}
          <svg
            className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform"
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
