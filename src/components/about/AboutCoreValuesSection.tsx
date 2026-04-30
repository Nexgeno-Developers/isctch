'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';

import type { AboutCoreValue, AboutCoreValuesData } from '@/lib/api/about/types';

type Props = {
  data?: AboutCoreValuesData;
};

const verticalLabelStyle: CSSProperties = {
  writingMode: 'vertical-rl',
};

function OpenValueCard({
  value,
  className = '',
}: {
  value: AboutCoreValue;
  className?: string;
}) {
  return (
    <article className={`rounded-[34px] bg-[#DFF4FD] p-5 sm:p-6 lg:p-7 ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] bg-[#CFE8F4]">
        <Image
          key={value.image.src}
          src={value.image.src}
          alt={value.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 520px"
        />
      </div>
      <h3 className="mt-8 text-[25px] font-black leading-tight text-[#1A1A2E]">
        {value.title}
      </h3>
      <p className="mt-5 text-base leading-7 text-[#1A1A2E]">
        {value.description}
      </p>
    </article>
  );
}

export default function AboutCoreValuesSection({ data }: Props) {
  const values = data?.values?.filter((value) => value.title) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || values.length === 0) return null;

  const activeValue = values[activeIndex] ?? values[0];
  const tabValues = values
    .map((value, index) => ({ value, index }))
    .filter((item) => item.index !== activeIndex);

  return (
    <section className="bg-[#F4F8FC] py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#005F8F]">
            {data.kicker}
          </p>
          <h2 className="mt-4 text-[32px] font-black leading-tight text-[#1A1A2E] lg:text-[46px]">
            {data.heading}
          </h2>
        </div>

        <div
          className="mt-10 hidden gap-5 lg:flex lg:items-stretch xl:gap-7"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {values.map((value, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={value.title}
                className={`min-h-[430px] min-w-0 overflow-hidden ${
                  isActive
                    ? 'flex-[3_1_360px] xl:flex-[3_1_390px]'
                    : 'flex-[1_1_92px] xl:flex-[1_1_112px]'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {isActive ? (
                  <OpenValueCard
                    value={value}
                    className="h-full min-h-[430px] opacity-100 shadow-[0_22px_45px_-34px_rgba(15,23,42,0.45)]"
                  />
                ) : (
                  <button
                    type="button"
                    className="group flex h-full min-h-[430px] w-full items-center justify-center rounded-[34px] bg-[#009FE3] px-4 text-white shadow-[0_20px_45px_-35px_rgba(0,95,143,0.85)] hover:bg-[#008ED0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#009FE3]"
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Open ${value.title}`}
                  >
                    <span
                      className="rotate-180 whitespace-nowrap text-[21px] font-black leading-none xl:text-[24px]"
                      style={verticalLabelStyle}
                    >
                      {value.title}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:hidden">
          <OpenValueCard value={activeValue} />
          {tabValues.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {tabValues.map(({ value, index }) => (
                <button
                  key={value.title}
                  type="button"
                  className="rounded-[18px] bg-[#009FE3] px-5 py-4 text-left text-base font-black text-white transition hover:bg-[#008ED0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#009FE3]"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {value.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
