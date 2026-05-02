'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperClass } from 'swiper';
import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { AboutManagementTeamData } from '@/lib/api/about/types';

import 'swiper/css';

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

export default function AboutManagementTeamSection({
  team,
}: {
  team: AboutManagementTeamData;
}) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const infinite = team.members.length > 1;

  return (
    <section className="bg-white py-8 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="flex items-center gap-4">
            <span className="h-px w-14 bg-[#EF7D00]" aria-hidden />
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#EF7D00]">
              {team.kicker}
            </p>
          </div>
          <h2 className="mt-5 text-2xl font-black text-[#1A1A2E] lg:text-[36px]">
            {team.heading}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[#3E4850] lg:text-[18px]">
            {team.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Swiper
            className="about-management-team-swiper w-full !pb-1"
            modules={[A11y]}
            spaceBetween={28}
            slidesPerView={1.12}
            slidesPerGroup={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 22, slidesPerGroup: 1 },
              1024: { slidesPerView: 4, spaceBetween: 28, slidesPerGroup: 1 },
            }}
            rewind={infinite}
            speed={650}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {team.members.map((member, index) => (
              <SwiperSlide key={`${member.name}-${index}`} className="h-auto">
                <article>
                  <div className="relative aspect-[1/1] overflow-hidden rounded-[12px] bg-[#E8EEF5]">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-[#1A1A2E] text-[24px]">{member.name}</h3>
                  <p className="mt-1 text-[18px] font-bold text-[#009FE3]">{member.designation}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            aria-label="Previous team member"
            onClick={() => swiperRef.current?.slidePrev()}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] bg-white text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009FE3]"
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            type="button"
            aria-label="Next team member"
            onClick={() => swiperRef.current?.slideNext()}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] bg-white text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009FE3]"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
