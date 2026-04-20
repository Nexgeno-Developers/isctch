'use client';

import { useEffect, useRef, useState } from 'react';
import type { HomeImpactStatsData, HomeImpactStatItem } from '@/lib/api/homepage/types';

const DURATION_MS = 1200;

function useCountUp(end: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start: number | null = null;
    let frame = 0;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setValue(Math.round(eased * end));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, end]);

  return value;
}

function StatItem({ item, active }: { item: HomeImpactStatItem; active: boolean }) {
  const isCount = item.mode === 'count';
  const count = useCountUp(isCount ? item.end : 0, active && isCount);

  if (item.mode === 'symbol') {
    return (
      <div className="flex flex-col items-center px-2 text-center">
        <span
          className="text-4xl font-bold tabular-nums sm:text-5xl md:text-6xl"
          aria-hidden
        >
          {item.symbol}
        </span>
        <span className="mt-3 max-w-[12rem] text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-xs">
          {item.label}
        </span>
      </div>
    );
  }

  const formatted =
    item.pad !== undefined ? String(count).padStart(item.pad, '0') : String(count);

  return (
    <div className="flex flex-col items-center px-2 text-center">
      <span
        className="text-4xl font-bold tabular-nums sm:text-5xl md:text-6xl"
        aria-live={active ? 'polite' : 'off'}
      >
        {item.prefix ?? ''}
        {formatted}
        {item.suffix ?? ''}
      </span>
      <span className="mt-3 max-w-[12rem] text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-xs">
        {item.label}
      </span>
    </div>
  );
}

/**
 * Cyan impact bar — counts animate from 0 when the section enters the viewport.
 * Data: `getHomeImpactStats()` / `getHomePageData().impactStats`.
 */
export default function HomeImpactStats({ data }: { data: HomeImpactStatsData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#00AEEF] lg:py-20 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-4">
          {data.items.map((item, index) => (
            <StatItem key={`${item.mode}-${index}`} item={item} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
