'use client';

import Link from 'next/link';
import { useRef, type ReactElement } from 'react';
import type { CategoryShowcaseSectionData, CategoryShowcaseItem } from '@/fake-api/page-builder';

function IconRoll() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
    </svg>
  );
}

function IconSleeve() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="5" y="6" width="14" height="12" rx="2" />
      <path d="M9 6V4M15 6V4" />
    </svg>
  );
}

function IconCap() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 14h12v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z" />
      <path d="M8 14V10a4 4 0 018 0v4" />
    </svg>
  );
}

function IconStraw() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 20L20 4M8 4h3v3M13 17h3v3" />
    </svg>
  );
}

function IconWater() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3c-3 6-6 9-6 12a6 6 0 1012 0c0-3-3-6-6-12z" />
    </svg>
  );
}

function IconInnovation() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9 18h6M10 22h4M12 2v1M12 18v4M4 12H3M21 12h-1M5.6 5.6l-.7-.7M19.1 19.1l-.7-.7M5.6 18.4l-.7.7M19.1 4.9l-.7.7" />
      <circle cx="12" cy="10" r="4" />
    </svg>
  );
}

const iconById: Record<NonNullable<CategoryShowcaseItem['iconId']>, () => ReactElement> = {
  roll: IconRoll,
  sleeve: IconSleeve,
  cap: IconCap,
  straw: IconStraw,
  water: IconWater,
  innovation: IconInnovation,
};

function ShowcaseCard({ item }: { item: CategoryShowcaseItem }) {
  const Icon = item.iconId ? iconById[item.iconId] : IconRoll;
  const isHighlight = item.variant === 'highlight';

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={isHighlight ? 'text-white' : 'text-[#009FE8]'}>
          <Icon />
        </span>
        <div className="flex flex-col items-end gap-1">
          {item.badge ? (
            <span
              className={
                isHighlight
                  ? 'text-[10px] font-bold uppercase tracking-widest bg-white text-black px-2.5 py-1 rounded-md'
                  : 'text-xs font-medium text-gray-400 tracking-wide'
              }
            >
              {item.badge}
            </span>
          ) : item.code ? (
            <span className={`text-xs font-medium tracking-wide ${isHighlight ? 'text-white/80' : 'text-gray-400'}`}>
              {item.code}
            </span>
          ) : null}
        </div>
      </div>
      <h3
        className={`text-lg md:text-xl font-bold uppercase tracking-tight mb-3 leading-snug ${
          isHighlight ? 'text-white' : 'text-black'
        }`}
      >
        {item.title}
      </h3>
      <p className={`text-sm leading-relaxed flex-1 ${isHighlight ? 'text-white/90' : 'text-[#4A4A4A]'}`}>
        {item.description}
      </p>
      <div className={`mt-5 pt-2 text-sm font-bold uppercase tracking-wider ${isHighlight ? 'text-white' : 'text-[#009FE8]'}`}>
        {item.ctaLabel}
        <span className="inline-block ml-1" aria-hidden>
          →
        </span>
      </div>
    </>
  );

  const cardClass = `flex flex-col h-full min-h-[280px] rounded-2xl p-6 md:p-7 text-left transition-shadow duration-300 ${
    isHighlight
      ? 'bg-[#009FE8] shadow-lg shadow-[#009FE8]/25'
      : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
  }`;

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${cardClass} block`}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.href} className={cardClass}>
      {inner}
    </Link>
  );
}

export function CategoryShowcaseSection({ data }: { data: CategoryShowcaseSectionData }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 400) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#F8F9FA] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {(data.headline || data.intro) && (
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            {data.eyebrow && (
              <p className="text-[#009FE8] text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                {data.eyebrow}
              </p>
            )}
            {data.headline && (
              <h1 className="text-2xl md:text-4xl lg:text-[2.5rem] font-bold text-black tracking-tight mb-4">
                {data.headline}
              </h1>
            )}
            {data.intro && <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed">{data.intro}</p>}
          </div>
        )}

        <div className="flex justify-end gap-2 mb-4 md:mb-6">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="h-10 w-10 rounded-lg border border-[#009FE8]/40 bg-white text-[#009FE8] flex items-center justify-center hover:bg-[#009FE8]/5 transition-colors"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="h-10 w-10 rounded-lg border border-[#009FE8]/40 bg-white text-[#009FE8] flex items-center justify-center hover:bg-[#009FE8]/5 transition-colors"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide -mx-1 px-1"
        >
          {data.items.map((item) => (
            <div key={item.id} className="min-w-[min(100%,320px)] md:min-w-0 snap-center shrink-0 md:shrink">
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
