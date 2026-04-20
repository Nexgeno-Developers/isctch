'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { HomeEngagementData } from '@/lib/api/homepage/types';

import 'swiper/css';

type Props = {
  data: HomeEngagementData;
};

const SECTION_PAD = 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16';

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

/**
 * Join Our Global Family — pale lavender section, numbered cards, Swiper (3-up + rewind), orange CTA.
 */
export default function HomeEngagement({ data }: Props) {
  const { kicker, title, cards, cta } = data;
  const swiperRef = useRef<SwiperClass | null>(null);
  const total = cards.length;
  const infinite = total > 1;

  if (total === 0) return null;

  return (
    <section
      id="get-involved"
      className="w-full bg-[#F0F0FF] py-14 md:py-16 lg:py-20"
      aria-labelledby="engagement-heading"
    >
      <div className={`mx-auto w-full max-w-6xl ${SECTION_PAD}`}>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F28500] sm:text-sm">
            {kicker}
          </p>
          <h2
            id="engagement-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#0099DD] sm:text-4xl md:text-[2.35rem]"
          >
            {title}
          </h2>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 md:mt-12">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#0099DD] bg-white text-[#0099DD] transition-colors hover:bg-[#0099DD] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099DD]"
            aria-label="Previous roles"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowIcon direction="prev" />
          </button>
          <div className="min-w-0 flex-1">
            <Swiper
              className="engagement-swiper w-full !pb-1"
              modules={[Autoplay, A11y]}
              spaceBetween={20}
              slidesPerView={1.08}
              slidesPerGroup={1}
              breakpoints={{
                640: { slidesPerView: 1.25, spaceBetween: 20, slidesPerGroup: 1 },
                768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 1 },
              }}
              rewind={infinite}
              speed={700}
              autoplay={
                infinite
                  ? {
                      delay: 5000,
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
              {cards.map((card, index) => (
                <SwiperSlide key={`${card.title}-${index}`} className="h-auto">
                  <article className="flex h-full flex-col rounded-2xl border-b-[5px] border-b-[#F28500] bg-white px-7 py-8 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]">
                    <span className="text-3xl font-semibold tabular-nums text-[#9ebdd9] sm:text-4xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 text-base font-bold uppercase leading-snug tracking-wide text-[#1a1a2e] sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5a6d7d] sm:text-[15px]">
                      {card.description}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#0099DD] bg-white text-[#0099DD] transition-colors hover:bg-[#0099DD] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0099DD]"
            aria-label="Next roles"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowIcon direction="next" />
          </button>
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href={cta.href}
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#F28500] px-10 py-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(242,133,0,0.55)] transition-opacity hover:opacity-95"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
