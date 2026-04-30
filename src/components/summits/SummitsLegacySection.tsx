'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    href: '#',
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
    href: '#',
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
    href: '#',
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
    href: '#',
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
  const [page, setPage] = useState(0);
  const maxPage = Math.max(0, SUMMIT_CARDS.length - 3);
  const visibleCards = useMemo(() => SUMMIT_CARDS.slice(page, page + 3), [page]);

  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[640px]">
            <h2 className="text-2xl font-black tracking-tight text-[#1A1A2E] lg:text-[32px]">
              Our Legacy Of Dialogue
            </h2>
            <p className="mt-3 text-base leading-7 text-[#526477] lg:text-[17px]">
              Reflecting on the international milestones where leaders and activists converged to draft the
              blueprints of a more peaceful future.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous summit"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white disabled:cursor-not-allowed disabled:border-[#BFDDEF] disabled:text-[#BFDDEF] disabled:hover:bg-transparent"
            >
              <ArrowIcon direction="previous" />
            </button>
            <button
              type="button"
              aria-label="Next summit"
              onClick={() => setPage((current) => Math.min(maxPage, current + 1))}
              disabled={page === maxPage}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#009FE3] text-[#009FE3] transition-colors hover:bg-[#009FE3] hover:text-white disabled:cursor-not-allowed disabled:border-[#BFDDEF] disabled:text-[#BFDDEF] disabled:hover:bg-transparent"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {visibleCards.map((summit) => (
            <article
              key={summit.title}
              className="overflow-hidden rounded-md bg-white shadow-[0_10px_26px_-16px_rgba(15,23,42,0.45)] ring-1 ring-[#E5ECF3]"
            >
              <div className="h-2 bg-[#009FE3]" />
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F7FB]">
                <Image
                  src={summit.image.src}
                  alt={summit.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
              </div>
              <div className="p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#009FE3]">
                  {summit.location}
                </p>
                <h3 className="mt-3 text-[22px] font-black leading-tight text-[#1A1A2E]">
                  {summit.title}
                </h3>
                <p className="mt-4 min-h-[96px] text-sm leading-7 text-[#526477]">
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
          ))}
        </div>
      </div>
    </section>
  );
}
