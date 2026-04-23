'use client';

import { useState } from 'react';
import Image from 'next/image';

import type { HomeSupportMovementData } from '@/lib/api/homepage/types';

type Props = {
  data: HomeSupportMovementData;
};

function StarIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" />
    </svg>
  );
}

/**
 * #IamPEACE header + Support the Movement donation panel. Data from `getHomePageData().supportMovement`.
 */
export default function HomeSupportMovement({ data }: Props) {
  const { header, panel, form } = data;
  const [amount, setAmount] = useState(form.defaultAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="donate" className="w-full" aria-labelledby="support-movement-heading">
      <div className="bg-[#FFF5E6] lg:py-20 py-8">
       
        <div className="container mx-auto px-4 text-center">
          <p className="text-3xl font-black tracking-tight lg:text-[52px]">
            <span className="text-[#009FE3]">{header.titleCyan}</span>
            <span className="text-[#EF7D00]">{header.titleOrange}</span>
          </p>
          <p className="mt-2 text-base text-[#3E4850] lg:text-[24px]">{header.subline}</p>
          <div className="relative mx-auto mt-10 max-w-xl px-4">
           
           <Image src="/devider.svg" className="mx-auto w-[210px]" alt="Peace" width={100} height={100} />

          </div>
        </div>
      </div>

      <div className="bg-[#0a8cc9] lg:py-24 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex h-full flex-col justify-center">
            <h2
              id="support-movement-heading"
              className="mt-3 text-3xl font-black tracking-tight text-[#fff] lg:text-[36px]"
            >
              {panel.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white sm:text-[18px]">{panel.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                {panel.avatars.map((a, i) => (
                  <div
                    key={`${a.src}-${i}`}
                    className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#0a8cc9] ring-2 ring-white/30"
                  >
                    <Image src={a.src} alt={a.alt} fill className="object-cover" sizes="48px" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white sm:text-sm">
                {panel.donorsLine}
              </p>
            </div>
          </div>
          

          <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                {form.amounts.map((n) => {
                  const selected = amount === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setAmount(n)}
                      className={`cursor-pointer rounded-lg border-2 py-3 text-center text-base font-semibold transition-colors ${
                        selected
                          ? 'border-[#0a8cc9] bg-[#e8f6fc] text-[#0a8cc9]'
                          : 'border-[#d1d5db] bg-white text-[#1a1a2e] hover:border-[#9ca3af]'
                      }`}
                    >
                      ${n}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder={form.namePlaceholder}
                className="w-full rounded-xl border-0 bg-[#f3f0f9] px-4 py-3.5 text-[#1a1a2e] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#0a8cc9]/40 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder={form.emailPlaceholder}
                className="w-full rounded-xl border-0 bg-[#f3f0f9] px-4 py-3.5 text-[#1a1a2e] placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#0a8cc9]/40 focus:outline-none"
              />
              <input type="hidden" name="amount" value={amount} readOnly />
              <button
                type="submit"
                className="w-full rounded-xl bg-[#e87722] py-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-[#d96a18]"
              >
                {form.submitLabel}
              </button>
              <p className="text-center text-xs text-[#6b7280]">{form.footnote}</p>
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
