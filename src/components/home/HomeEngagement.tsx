'use client';

import Link from 'next/link';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { HomeEngagementData } from '@/lib/api/homepage/types';

import 'swiper/css';

type Props = {
  data: HomeEngagementData;
};

/**
 * Join Our Global Family — pale lavender section, numbered cards, Swiper (3-up + rewind), orange CTA.
 */
export default function HomeEngagement({ data }: Props) {
  const { kicker, title, cards, cta } = data;
  const total = cards.length;
  const infinite = total > 1;

  if (total === 0) return null;

  return (
    <section 
      className="w-full bg-[#EFECFF] py-8 lg:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em]  text-[#EF7D00] sm:text-sm">
            {kicker}
          </p>
          <h2
            id="engagement-heading"
            className="mt-3 text-center text-3xl font-black tracking-tight text-[#009fe3] lg:text-[36px]"
          >
            {title}
          </h2>
        </div>

        <div className="mt-10 md:mt-12">
          <div className="min-w-0">
            <Swiper
              className="engagement-swiper w-full !pb-1"
              modules={[Autoplay, A11y]}
              spaceBetween={20}
              slidesPerView={1.08}
              slidesPerGroup={1}
              breakpoints={{
                640: { slidesPerView: 1.25, spaceBetween: 20, slidesPerGroup: 1 },
                768: { slidesPerView: 2, spaceBetween: 20, slidesPerGroup: 1 },
                1024: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 1 },
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
            >
              {cards.map((card, index) => (
                <SwiperSlide key={`${card.title}-${index}`} className="!h-auto">
                  <article className="flex h-full min-h-[245px] flex-col rounded-[8px] border-b-[4px] border-b-[#F28500] bg-white px-7 py-8 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] lg:min-h-[285px]">
                    <span className="text-3xl font-semibold tabular-nums text-[#00649133] sm:text-4xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 text-base font-black capitalize leading-snug tracking-wide text-[#1A1A2E] lg:text-[20px]">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3E4850] lg:text-[16px]">
                      {card.description}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href={cta.href}
            className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#EF7D00] px-10 py-4 text-center text-sm font-bold uppercase tracking-wide text-white  transition-opacity hover:opacity-95"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
