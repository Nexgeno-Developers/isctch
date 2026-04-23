'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { HomePeaceSummitsData } from '@/lib/api/homepage/types';

import 'swiper/css';

type Props = {
  data: HomePeaceSummitsData;
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

const SECTION_PAD = 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16';

/**
 * Peace summits carousel: left/right arrows both step the track; `rewind` wraps
 * last→first and first→last (infinite in both directions). Autoplay continues after manual use.
 */
export default function HomePeaceSummits({ data }: Props) {
  const { summits, kicker, title } = data;
  const total = summits.length;
  const swiperRef = useRef<SwiperClass | null>(null);

  if (total === 0) return null;

  const infinite = total > 1;

  return (
    <section 
      className="w-full bg-white py-8 lg:py-20"
    >
      <div className='container mx-auto px-4'>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em]  text-[#EF7D00] sm:text-sm">
              {kicker}
            </p>
            <h2
              id="peace-summits-heading"
              className="mt-3 text-3xl font-black tracking-tight text-[#009fe3] lg:text-[36px]"
            >
              {title}
            </h2>
          </div>
          <div className="relative z-20 flex items-center justify-center gap-2 sm:justify-end">
            <button
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
              aria-label="Previous summit"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowIcon direction="prev" />
            </button>
            <button 
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
              aria-label="Next summit"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>

        <div className="relative z-0 mt-10 md:mt-12 w-full min-w-0">
          <Swiper
            className="peace-summits-swiper w-full !pb-1"
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
            {summits.map((summit, index) => (
              <SwiperSlide key={`${summit.title}-${index}`} className="h-auto">
                <article className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={summit.image.src}
                      alt={summit.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 90vw, 33vw"
                    />
                    <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-[#00AEEF] px-3 py-1.5 text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-white sm:text-xs">
                      {summit.location}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col pt-7">
                    <h3 className="text-lg font-black text-[#1A1A2E] lg:text-[24px]">{summit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#3E4850] lg:text-[18px] mb-0 mb-0 ">
                      {summit.description}
                    </p>
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
