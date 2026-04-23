'use client';

import { useState } from 'react';
import type { DonateContributionData } from '@/lib/api/donate/types';

export default function DonationContributionSection({ data }: { data: DonateContributionData }) {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(data.defaultAmount);
  const [customAmount, setCustomAmount] = useState('');

  const submitLabel =
    frequency === 'monthly' ? data.submitMonthlyLabel : data.submitOneTimeLabel;

  return (
    <section className="bg-[#F8F9FA] py-10 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="">
          <h2 className="mt-3 text-left text-3xl font-black tracking-tight text-[#1A1A2E] lg:text-[36px]">
            {data.heading}
          </h2>
          <p className="mt-7 text-base leading-relaxed text-[#3E4850] lg:text-[18px]">
            {data.paragraphOne}
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#3E4850] lg:text-[18px]">
            {data.paragraphTwo}
          </p>
          <blockquote className="mt-8 border-l-4 border-[#EF7D00] bg-[#FFF8F0] px-5 py-5 lg:text-[24px] font-semibold leading-snug text-[#1f233b]">
            "{data.quote}"
          </blockquote>
          </div>
       

        <div className="rounded-[15px] bg-white p-6 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.2)] sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#1f233b]">{data.formTitle}</h3>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#00a3e8]">
              {data.secureLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 rounded-lg bg-[#f0f2f5] p-1">
            <button
              type="button"
              onClick={() => setFrequency('one-time')}
              className={`cursor-pointer rounded-md py-3 text-sm font-semibold transition-colors ${
                frequency === 'one-time'
                  ? 'bg-white text-[#009fe8] shadow-sm'
                  : 'text-[#8a93a6]'
              }`}
            >
              {data.oneTimeLabel}
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`cursor-pointer rounded-md py-3 text-sm font-semibold transition-colors ${
                frequency === 'monthly'
                  ? 'bg-white text-[#009fe8] shadow-sm'
                  : 'text-[#8a93a6]'
              }`}
            >
              {data.monthlyLabel}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {data.amounts.slice(0, 3).map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`cursor-pointer rounded-lg border px-4 py-4 text-base font-bold transition-colors ${
                  selectedAmount === amount
                    ? 'border-[#009fe8] bg-[#eaf7ff] text-[#009fe8]'
                    : 'border-[#d9dee7] text-[#1f233b] hover:border-[#bfc8d8]'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {data.amounts.slice(3).map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`cursor-pointer rounded-lg border px-4 py-4 text-base font-bold transition-colors ${
                  selectedAmount === amount
                    ? 'border-[#009fe8] bg-[#eaf7ff] text-[#009fe8]'
                    : 'border-[#d9dee7] text-[#1f233b] hover:border-[#bfc8d8]'
                }`}
              >
                ${amount}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelectedAmount(null)}
              className={`cursor-pointer rounded-lg border px-4 py-4 text-base font-bold transition-colors ${
                selectedAmount === null
                  ? 'border-[#009fe8] bg-[#eaf7ff] text-[#009fe8]'
                  : 'border-[#d9dee7] text-[#1f233b] hover:border-[#bfc8d8]'
              }`}
            >
              {data.otherLabel}
            </button>
          </div>

          <div className="mt-4 rounded-lg border border-[#e1e6ef] bg-[#f8fafc] px-4 py-4">
            <label className="block text-sm text-[#8a93a6]">
              <span className="mr-2 font-semibold">$</span>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => {
                  setSelectedAmount(null);
                  setCustomAmount(e.target.value);
                }}
                placeholder={data.customAmountPlaceholder}
                className="w-[calc(100%-1.5rem)] border-none bg-transparent text-[#1f233b] outline-none placeholder:text-[#a3adbf]"
              />
            </label>
          </div>

          <button
            type="button"
            className="cursor-pointer mt-8 w-full rounded-lg bg-[#EF7D00] py-4 text-[18px] font-semibold capitalize tracking-wide text-white shadow-[0_10px_25px_-10px_rgba(242,133,0,0.8)] transition-colors hover:bg-[#df7a00]"
          >
            {submitLabel}
          </button>

          <p className="mt-8 text-center text-[11px] text-[#9aa3b2]">
            {data.footnote}
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
