'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { summitDetailPath } from '@/config/publicRoutes';

import 'swiper/css';

type SummitCard = {
  location: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
};

const SUMMIT_CARDS: SummitCard[] = [
  {
    location: 'Geneva, Switzerland',
    title: 'Neutrality & Global Ethics',
    description:
      'A landmark summit focused on non-aligned diplomacy and the role of neutral intermediaries in 21st century conflict resolution.',
    image: {
      src: '/diplomatic_image1.jpg',
      alt: 'International diplomatic dialogue venue',
    },
    href: summitDetailPath('neutrality-global-ethics'),
  },
  {
    location: 'Erding, Germany',
    title: 'The Bavarian Peace Accord',
    description:
      'Bringing together local governments and international NGOs to create community-based peace structures in Europe.',
    image: {
      src: '/comminuty_core_images.jpg',
      alt: 'Community gathering for peace dialogue',
    },
    href: summitDetailPath('the-bavarian-peace-accord'),
  },
  {
    location: 'Dubai, UAE',
    title: 'Innovation For Stability',
    description:
      'Exploring how emerging technologies and sustainable development can act as deterrents to systemic global unrest.',
    image: {
      src: '/future_images.jpg',
      alt: 'Modern Dubai skyline beside the water',
    },
    href: summitDetailPath('innovation-for-stability'),
  },
  {
    location: 'Nairobi, Kenya',
    title: 'Grassroots Horizons',
    description:
      'Connecting regional leaders and youth networks to scale peace initiatives from local communities to the continent.',
    image: {
      src: '/solidarity_images.webp',
      alt: 'Peace leaders working together',
    },
    href: summitDetailPath('grassroots-horizons'),
  },
];

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

export default function SummitsLegacySection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const infinite = SUMMIT_CARDS.length > 1;

  return (
    <section className="bg-white py-8 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[640px]">
            <h2 className="text-2xl font-black tracking-tight text-[#1A1A2E] lg:text-[36px]">
              Our Legacy Of Dialogue
            </h2>
            <p className="mt-3 text-[18px] leading-relaxed text-[#3E4850]">
              Reflecting on the international milestones where leaders and activists converged to draft the
              blueprints of a more peaceful future.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous summit"
              onClick={() => swiperRef.current?.slidePrev()}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] bg-white text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009FE3]"
            >
              <ArrowIcon direction="previous" />
            </button>
            <button
              type="button"
              aria-label="Next summit"
              onClick={() => swiperRef.current?.slideNext()}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] bg-white text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009FE3]"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>

        <div className="relative z-0 mt-10 w-full min-w-0 md:mt-12">
          <Swiper
            className="summits-legacy-swiper w-full !pb-1"
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
            {SUMMIT_CARDS.map((summit) => (
              <SwiperSlide key={summit.title} className="h-auto">
                <article className="flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_10px_26px_-16px_rgba(15,23,42,0.45)] ring-1 ring-[#E5ECF3]">
                  {/* <div className="h-2 bg-[#009FE3]" /> */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F7FB]">
                    <Image
                      src={summit.image.src}
                      alt={summit.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 90vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#009FE3]">
                      {summit.location}
                    </p>
                    <h3 className="mt-3 text-[24px] font-black leading-tight text-[#1A1A2E]">
                      {summit.title}
                    </h3>
                    <p className="mt-4 text-[16px] leading-relaxed text-[#3E4850] text-ellipsis line-clamp-3">
                      {summit.description}
                    </p>
                    <Link
                      href={summit.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-[#EF7D00] transition-colors hover:text-[#cf6800]"
                    >
                      Read More
                      <span aria-hidden>-&gt;</span>
                    </Link>
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
