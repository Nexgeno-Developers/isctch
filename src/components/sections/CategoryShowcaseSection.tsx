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

function IconSustainable() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M20 4c-6 0-12 5-12 12v4h4c7 0 12-6 8-16z" />
      <path d="M8 16c2-2 5-3 8-3" />
    </svg>
  );
}

function IconMetallic() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 2l8 4v12l-8 4-8-4V6l8-4z" />
      <path d="M8 8l4 2 4-2" />
      <path d="M8 16l4-2 4 2" />
      <path d="M12 6v12" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 9l-3 3 3 3" />
      <path d="M16 9l3 3-3 3" />
      <path d="M10 19l4-14" />
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
  sustainable: IconSustainable,
  metallic: IconMetallic,
  code: IconCode,
};

function ShowcaseCard({ item }: { item: CategoryShowcaseItem }) {
  const Icon = item.iconId ? iconById[item.iconId] : IconRoll;
  const isHighlight = item.variant === 'highlight';

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={isHighlight ? 'text-[#009FE8]' : 'text-[#009FE8]'}>
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
            <span
              className={`text-xs font-medium tracking-wide ${isHighlight ? 'text-black' : 'text-black'}`}
            >
              {item.code}
            </span>
          ) : null}
        </div>
      </div>
      <h3
        className={`text-lg md:text-xl font-bold uppercase tracking-tight mb-3 leading-snug ${
          isHighlight ? 'text-black' : 'text-black'
        }`}
      >
        {item.title}
      </h3>
      <p className={`text-sm leading-relaxed flex-1 mb-5 ${isHighlight ? 'text-black' : 'text-black'}`}>
        {item.description}
      </p>
      <div
        className={`text-sm font-bold uppercase tracking-wider ${
          isHighlight ? 'text-[#009FE8]' : 'text-[#009FE8]'
        }`}
      >
        {item.ctaLabel}
        <span className="inline-block ml-1" aria-hidden>
          →
        </span>
      </div>
    </>
  );

  const cardClass = `flex flex-col h-full min-h-[260px] rounded-[50px] p-6 md:p-7 text-left transition-shadow duration-300 ${
    isHighlight
      ? 'bg-[#EDF0F1] text-black '
      : 'bg-[#EDF0F1] text-black'
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
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {(data.headline || data.intro) && (
          <div className="text-center  mx-auto mb-10 md:mb-14">
           
           
            {data.intro && <p className="text-black text-base md:text-base leading-relaxed">{data.intro}</p>}
          </div>
        )}

       

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
