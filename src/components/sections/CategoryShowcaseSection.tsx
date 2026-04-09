'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type ReactElement } from 'react';
import type { CategoryShowcaseSectionData, CategoryShowcaseItem } from '@/fake-api/page-builder';
import { RichText } from '@/components/common/RichText';
import { normalizePackagingCategoryHref } from '@/lib/normalizePackagingCategoryHref';

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
  const rawHref = item.href?.trim() || '';
  const normalizedHref = normalizePackagingCategoryHref(rawHref);

  const Icon = item.iconId ? iconById[item.iconId] : IconRoll;
  const isHighlight = item.variant === 'highlight';

  const inner = (
    <>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[28px]">
        {/* Top image tile */}
        <div className="relative  overflow-hidden rounded-[22px] bg-[#D9D9D9]">
          {item.badge ? (
            <div className="absolute right-3 top-3 z-10">
              <span className="rounded-md bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                {item.badge}
              </span>
            </div>
          ) : null}

          <div className="flex items-center justify-center px-4 pb-12">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.imageAlt || item.title}
                width={520}
                height={520}
                className="mx-auto lg:h-[310px] h-[210px] w-auto object-contain object-top"
                sizes=""
              />
            ) : (
              <div className="flex h-[210px] w-full items-center justify-center text-[#009FE8]">
                <Icon />
              </div>
            )}
          </div>
        </div>

        {/* CTA pill */}
        <div className="relative z-[999] top-[-35px] flex justify-center">
          <span className="inline-flex min-h-[34px] items-center justify-center rounded-full bg-white px-6 text-[11px] font-bold uppercase tracking-widest text-[#0E233C]">
            {item.ctaLabel || 'VIEW PRODUCTS'}
          </span>
        </div>

        {/* Bottom blue panel */}
        <div className="mt-[-50px] flex flex-1 flex-col rounded-t-[22px] bg-[#009FE8] px-6 pb-8 pt-10 text-center text-white relative z-10 ">
          <h3 className="text-[18px] font-bold uppercase leading-tight tracking-wide md:text-[20px]">
            {item.title}
          </h3>
          <RichText
            html={item.description}
            className="mx-auto mt-3 max-w-[22rem] text-xs leading-relaxed text-white/95 md:text-sm line-clamp-2"
          />
        </div>
      </div>
    </>
  );

  const cardClass = `block h-full min-h-[280px] text-left ${
    isHighlight ? '' : ''
  }`;

  if (item.external) {
    return (
      <a href={normalizedHref} target="_blank" rel="noopener noreferrer" className={`${cardClass} block`}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={normalizedHref} className={cardClass}>
      {inner}
    </Link>
    
  );
}

export function CategoryShowcaseSection({ data }: { data: CategoryShowcaseSectionData }) {
  return (
    <section className="bg-gray-50 py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {(data.headline || data.intro) && (
          <div className="text-center  mx-auto mb-10 md:mb-14">
            {data.intro && (
              <RichText
                as="div"
                html={data.intro}
                className="text-black text-[14px] md:text-base leading-relaxed"
              />
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {data.items.map((item) => (
            <div key={item.id}>
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
