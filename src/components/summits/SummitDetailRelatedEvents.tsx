'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { SummitRelatedCard } from '@/lib/api/summits/types';

import 'swiper/css';

function ReadMoreChevronIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      {direction === 'previous' ? (
        <path
          d="m15 18-6-6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9 18 6-6-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function RelatedCard({ card }: { card: SummitRelatedCard }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_10px_26px_-16px_rgba(15,23,42,0.45)] ring-1 ring-[#E5ECF3]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F7FB]">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#009FE3]">{card.location}</p>
        <h3 className="mt-3 text-xl font-black leading-tight text-[#1A1A2E]">{card.title}</h3>
        <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#526477]">{card.description}</p>
        <Link
          href={card.href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-[#EF7D00] transition-colors hover:text-[#cf6800]"
        >
          Read More
          <ReadMoreChevronIcon />
        </Link>
      </div>
    </article>
  );
}

type Props = {
  cards: SummitRelatedCard[];
};

export default function SummitDetailRelatedEvents({ cards }: Props) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const total = cards.length;
  const infinite = total > 1;

  if (total === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          {/* <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EF7D00] sm:text-sm">Events</p> */}
          <h2
            id="summit-detail-related-events-heading"
            className="mt-2 text-2xl font-black tracking-tight text-[#009fe3] lg:text-[32px]"
          >
            Related Events
          </h2>
        </div>
        <div className="relative z-20 flex w-full items-center justify-end gap-2 sm:w-auto">
          <button
            type="button"
            aria-label="Previous related event"
            onClick={() => swiperRef.current?.slidePrev()}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            type="button"
            aria-label="Next related event"
            onClick={() => swiperRef.current?.slideNext()}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#00AEEF] bg-white text-[#00AEEF] transition-colors hover:bg-[#00AEEF] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AEEF]"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>

      <div className="relative z-0 mt-3 w-full min-w-0 md:mt-5" aria-labelledby="summit-detail-related-events-heading">
        <Swiper
          className="summit-detail-related-swiper w-full !pb-1"
          modules={[Autoplay, A11y]}
          spaceBetween={28}
          slidesPerView={1.08}
          slidesPerGroup={1}
          breakpoints={{
            640: { slidesPerView: 1.4, spaceBetween: 22, slidesPerGroup: 1 },
            768: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 1 },
            1024: { slidesPerView: 3, spaceBetween: 28, slidesPerGroup: 1 },
          }}
          rewind={infinite}
          speed={750}
          autoplay={
            infinite
              ? {
                  delay: 4200,
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
          {cards.map((card) => (
            <SwiperSlide key={`${card.title}-${card.href}-${card.image.src}`} className="h-auto">
              <RelatedCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
