'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { HomeHappyClientsData } from '@/lib/api/homepage/types';

import 'swiper/css';

type Props = {
  data: HomeHappyClientsData;
};

function ArrowIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === 'prev' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 text-amber-400 sm:h-4 sm:w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function formatRating(rating: number): string {
  if (rating >= 5) return '5/5';
  return `${rating.toFixed(1)}/5`;
}

/**
 * Testimonial carousel — same Swiper behavior and header/nav row as {@link HomePeaceSummits}.
 */
export default function HomeHappyClients({ data }: Props) {
  const { title, testimonials } = data;
  const total = testimonials.length;
  const swiperRef = useRef<SwiperClass | null>(null);

  if (total === 0) return null;

  const infinite = total > 1;

  return (
    <section
      className="w-full bg-[#fff] py-10 lg:py-20"
      aria-labelledby="happy-clients-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <h2
              id="happy-clients-heading"
              className="text-3xl font-black tracking-tight text-[#009fe3] lg:text-[36px]"
            >
              {title}
            </h2>
          </div>
          <div className="relative z-20 flex w-full items-center justify-end gap-2 sm:w-auto">
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
              aria-label="Previous testimonial"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowIcon direction="prev" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
              aria-label="Next testimonial"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>

        <div className="relative z-0 mt-10 md:mt-12 w-full min-w-0">
          <Swiper
            className="happy-clients-swiper w-full !pb-1"
            modules={[Autoplay, A11y]}
            spaceBetween={22}
            slidesPerView={1.1}
            slidesPerGroup={1}
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 20, slidesPerGroup: 1 },
              768: { slidesPerView: 3, spaceBetween: 22, slidesPerGroup: 1 },
            }}
            rewind={infinite}
            speed={750}
            autoplay={
              infinite
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: false,
                  }
                : false
            }
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={`${item.authorName}-${index}`} className="h-auto">
                <article className="flex h-full min-h-[280px] flex-col rounded-2xl bg-[#FBECE5] p-5 sm:min-h-[300px] sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <StarRow />
                    <span className="text-xs font-semibold text-[#6b7280] sm:text-sm">
                      {formatRating(item.rating)}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#3E4850] lg:text-[18px] mb-2 ">
                    {item.quote}
                  </p>
                  <div className="mt-5 border-t border-[#fcdcc4] pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {item.avatar ? (
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#e8e4ef]">
                            <Image
                              src={item.avatar.src}
                              alt={item.avatar.alt}
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          </div>
                        ) : (
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9] text-[20px] font-bold text-[#1A1A2E]"
                            aria-hidden
                          >
                            {item.authorInitial}
                          </div>
                        )}
                        <span className="truncate font-bold text-[#1A1A2E]">{item.authorName}</span>
                      </div>
                      {/* <QuoteMarkIcon /> */}
                      <Image src="/quote_icon.svg" alt="Divider" width={42} height={42} className="hidden sm:block" />
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
