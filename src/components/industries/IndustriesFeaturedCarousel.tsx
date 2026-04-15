'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';
import type { ProductIndustriesFeaturedProduct } from '@/lib/api/product_industries_layout';

const GAP_PX = 24; // gap-6
const AUTOPLAY_MS = 5000;

export default function IndustriesFeaturedCarousel({
  products,
}: {
  products: ProductIndustriesFeaturedProduct[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const getStepWidth = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const first = el.querySelector('[data-carousel-card]') as HTMLElement | null;
    return (first?.offsetWidth ?? 0) + GAP_PX;
  }, []);

  const scrollByDir = useCallback(
    (dir: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const step = getStepWidth();
      if (!step) return;
      el.scrollBy({ left: dir * step, behavior: 'smooth' });
    },
    [getStepWidth],
  );

  const advanceNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || products.length <= 1) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const step = getStepWidth();
    if (!step) return;
    if (el.scrollLeft + 2 >= maxScroll) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, [getStepWidth, products.length]);

  useEffect(() => {
    if (products.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      advanceNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [advanceNext, paused, products.length]);

  if (!products.length) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="lg:mb-8 mb-4 flex flex-row flex-wrap items-center justify-between lg:gap-4 gap-2">
        <h2 className="min-w-0 text-left text-[22px] font-bold md:text-4xl lg:text-5xl">
          <span className="text-black">Featured</span>{' '}
          <span className="text-[#009FE8]">Products</span>
        </h2>
        <div className="flex shrink-0 items-center lg:gap-3 gap-1">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            className="cursor-pointer flex lg:h-12 lg:w-12 h-6 w-6 items-center justify-center rounded-full lg:border-2 border-1 border-[#009FE8] text-[#009FE8] transition hover:bg-[#009FE8] hover:text-white"
            aria-label="Previous products"
          >
            <svg className="lg:h-5 lg:w-5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            className="cursor-pointer flex lg:h-12 lg:w-12 h-6 w-6 items-center justify-center rounded-full lg:border-2 border-1 border-[#009FE8] text-[#009FE8] transition hover:bg-[#009FE8] hover:text-white"
            aria-label="Next products"
          >
            <svg className="lg:h-5 lg:w-5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory lg:snap-none"
      >
        {products.map((p) => (
          <div
            key={p.id}
            data-carousel-card
            className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-[#EDF0F1]">
              <div className="relative aspect-square w-full bg-white">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-4 text-left md:px-6">
                <h3 className="text-lg font-bold text-black md:text-xl">{p.title}</h3>
                {p.description ? (
                  <p className="mt-2 line-clamp-2 text-left text-sm leading-relaxed text-black">
                    {p.description}
                  </p>
                ) : p.subtitle ? (
                  <p className="mt-1 text-sm text-black/80">{p.subtitle}</p>
                ) : null}
                <Link
                  href={p.href}
                  className="mt-2 inline-block text-sm font-semibold text-[#009FE8] hover:text-[#0077B6]"
                >
                  View product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
