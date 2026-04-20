'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Autoplay, A11y, Navigation } from 'swiper/modules';
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
 * Global Peace Summits — Swiper with Navigation-bound arrows (reliable clicks), loop + autoplay.
 */
export default function HomePeaceSummits({ data }: Props) {
  const { summits, kicker, title } = data;
  const total = summits.length;
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (total === 0) return null;

  const canLoop = total > 1;

  return (
    <section className="w-full bg-white py-14 md:py-18 lg:py-20" aria-labelledby="peace-summits-heading">
      <div className={`mx-auto w-full max-w-[100vw] ${SECTION_PAD}`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d98a29] sm:text-sm">
              {kicker}
            </p>
            <h2
              id="peace-summits-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#00AEEF] sm:text-4xl md:text-[2.35rem]"
            >
              {title}
            </h2>
          </div>
          <div className="relative z-20 flex items-center justify-center gap-2 sm:justify-end">
            <button
              ref={prevRef}
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
              aria-label="Previous summit"
            >
              <ArrowIcon direction="prev" />
            </button>
            <button
              ref={nextRef}
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
              aria-label="Next summit"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>

        <div className="relative z-0 mt-10 md:mt-12 w-full min-w-0">
          <Swiper
            className="peace-summits-swiper w-full !pb-1"
            modules={[Autoplay, A11y, Navigation]}
            spaceBetween={18}
            slidesPerView={1.1}
            slidesPerGroup={1}
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 20, slidesPerGroup: 1 },
              768: { slidesPerView: 3, spaceBetween: 22, slidesPerGroup: 1 },
            }}
            loop={canLoop}
            loopAdditionalSlides={canLoop ? total : 0}
            loopPreventsSliding={false}
            speed={750}
            autoplay={
              canLoop
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: false,
                  }
                : false
            }
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            onSwiper={(swiper) => {
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.navigation.init();
                swiper.navigation.update();
              }
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
                  <div className="flex flex-1 flex-col pt-4">
                    <h3 className="text-lg font-bold text-[#1a1a2e]">{summit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6d7d] sm:text-[15px]">
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
