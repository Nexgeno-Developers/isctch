'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { CompanyStatistic } from '@/fake-api/company';

interface CompanyStatisticsProps {
  statistics: CompanyStatistic[];
}

/**
 * Company Statistics Component (Client Component)
 *
 * Displays statistics cards with animated counters when the section enters the viewport.
 */
export default function CompanyStatistics({ statistics }: CompanyStatisticsProps) {
  const [counters, setCounters] = useState<Record<string, number | string>>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = document.getElementById('company-statistics');
    if (!el || statistics.length === 0) return;

    const intervals: ReturnType<typeof setInterval>[] = [];
    let started = false;

    const startCounters = () => {
      if (started) return;
      started = true;
      setHasAnimated(true);

      statistics.forEach((stat) => {
        const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
        if (Number.isNaN(numericValue)) {
          setCounters((prev) => ({
            ...prev,
            [stat.id]: stat.value,
          }));
          return;
        }

        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        let stepCount = 0;

        const timer = setInterval(() => {
          stepCount++;
          current += increment;

          if (current >= numericValue || stepCount >= steps) {
            current = numericValue;
            clearInterval(timer);
          }

          setCounters((prev) => ({
            ...prev,
            [stat.id]: Math.floor(current),
          }));
        }, duration / steps);

        intervals.push(timer);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCounters();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      intervals.forEach(clearInterval);
      observer.disconnect();
    };
  }, [statistics]);

  const formatValue = (stat: CompanyStatistic): string => {
    if (hasAnimated && counters[stat.id] !== undefined) {
      const value = counters[stat.id];
      if (stat.value.includes('+')) {
        return `${value}+`;
      }
      if (stat.value.includes('%')) {
        return `${value}%`;
      }
      return value.toString();
    }

    const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(numericValue)) {
      if (stat.value.includes('+')) {
        return '0+';
      }
      if (stat.value.includes('%')) {
        return '0%';
      }
      return '0';
    }
    return stat.value;
  };

  return (
    <section id="company-statistics" className="py-4 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] p-4 md:p-10 duration-300 flex flex-col text-center"
            >
              <div className="mb-4 md:mb-6 w-12 h-12 flex items-center justify-center w-full">
                {stat.icon ? (
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain "
                  />
                ) : (
                  <div className="w-16 h-16 bg-[#009FE8] rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                )}
              </div>

              <div className="mb-1 md:mb-4">
                <span className="text-[28px] md:text-5xl lg:text-6xl font-bold text-[#000]">
                  {formatValue(stat)}
                </span>
              </div>

              <div>
                <p className="text-[14px] md:text-xl text-black font-medium leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
