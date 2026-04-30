'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ConvocationEvent = {
  day: string;
  month: string;
  title: string;
  location: string;
  time: string;
};

type GalleryImage = {
  src: string;
  alt: string;
};

const UPCOMING_EVENTS: ConvocationEvent[] = [
  {
    day: '14',
    month: 'Oct 2024',
    title: 'The Youth Peace Summit: Horizon 2050',
    location: 'Oslo, Norway',
    time: '09:00 AM - 18:00 PM',
  },
  {
    day: '03',
    month: 'Dec 2024',
    title: 'Digital Peace & Cybersecurity Governance',
    location: 'Singapore City',
    time: '10:30 AM - 16:30 PM',
  },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/hero_images.png',
    alt: 'Youth peace participants standing together',
  },
  {
    src: '/solidarity_images.webp',
    alt: 'Hands joined in solidarity',
  },
  {
    src: '/diplomatic_image1.jpg',
    alt: 'Public peace march in a city square',
  },
  {
    src: '/calltoaction_images.webp',
    alt: 'People celebrating peace at sunset',
  },
  {
    src: '/peace_images.webp',
    alt: 'Peace volunteers gathered around a globe',
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

function MapPinIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SummitsConvocationsSection() {
  const [galleryPage, setGalleryPage] = useState(0);
  const maxGalleryPage = Math.max(0, GALLERY_IMAGES.length - 4);
  const visibleImages = useMemo(
    () => GALLERY_IMAGES.slice(galleryPage, galleryPage + 4),
    [galleryPage],
  );

  return (
    <>
      <section className="bg-[#E5F6FD] py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#1A1A2E] lg:text-[34px]">
                Upcoming Convocations
              </h2>
              <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#526477]">
                Secure your place in the next chapter of global diplomatic history.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-black text-[#009FE3] transition-colors hover:text-[#007eb5]"
            >
              View All Events
              <span aria-hidden>-&gt;</span>
            </Link>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-2">
            {UPCOMING_EVENTS.map((event) => (
              <article
                key={event.title}
                className="flex flex-col gap-5 rounded-md bg-white p-6 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.4)] sm:flex-row sm:items-center"
              >
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-[8px] bg-[#EF7D00] text-white">
                  <span className="text-[28px] font-black leading-none">{event.day}</span>
                  <span className="mt-2 text-[10px] font-black uppercase">{event.month}</span>
                </div>
                <div>
                  <h3 className="text-lg font-black leading-tight text-[#1A1A2E]">
                    {event.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#607082]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon />
                      {event.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon />
                      {event.time}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-2xl font-black text-[#1A1A2E] lg:text-[34px]">
                The Global Peace Chains
              </h2>
              <p className="mt-6 text-sm leading-8 text-[#526477] lg:text-base">
                Beyond conference rooms, our movement takes to the streets. The Peace Chains are
                synchronized global marches where thousands join hands to symbolize human
                connectivity and our shared commitment to non-violence.
              </p>
              <blockquote className="mt-7 border-l-4 border-[#EF7D00] pl-5 text-xl font-black leading-snug text-[#1A1A2E]">
                &quot;Peace is not a destination, it is the path we walk together.&quot;
              </blockquote>
              <div className="mt-8 flex flex-wrap gap-10">
                <div>
                  <p className="text-[34px] font-light leading-none text-[#EF7D00]">12M+</p>
                  <p className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#607082]">
                    Steps Taken
                  </p>
                </div>
                <div>
                  <p className="text-[34px] font-light leading-none text-[#EF7D00]">85</p>
                  <p className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#607082]">
                    Cities Participated
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-[#E8EEF5] shadow-[0_24px_55px_-34px_rgba(15,23,42,0.5)]">
              <Image
                src="/global_images.webp"
                alt="Hands holding a globe as a symbol of global peace"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#E8EEF5] shadow-[0_14px_24px_-20px_rgba(15,23,42,0.55)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-7 flex justify-center gap-3">
            <button
              type="button"
              aria-label="Previous peace chain image"
              onClick={() => setGalleryPage((current) => Math.max(0, current - 1))}
              disabled={galleryPage === 0}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white disabled:cursor-not-allowed disabled:border-[#BFDDEF] disabled:text-[#BFDDEF] disabled:hover:bg-transparent"
            >
              <ArrowIcon direction="previous" />
            </button>
            <button
              type="button"
              aria-label="Next peace chain image"
              onClick={() => setGalleryPage((current) => Math.min(maxGalleryPage, current + 1))}
              disabled={galleryPage === maxGalleryPage}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white disabled:cursor-not-allowed disabled:border-[#BFDDEF] disabled:text-[#BFDDEF] disabled:hover:bg-transparent"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
