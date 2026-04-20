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
    <section className="bg-[#f5f6f8] px-4 py-12 sm:px-6 md:px-8 lg:px-12 lg:py-14 xl:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#1f233b] sm:text-5xl">
            {data.heading}
          </h2>
          <p className="mt-7 text-base leading-relaxed text-[#5f667c]">
            {data.paragraphOne}
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#5f667c]">
            {data.paragraphTwo}
          </p>
          <blockquote className="mt-8 border-l-4 border-[#f28500] bg-[#f2ece5] px-5 py-5 text-2xl font-semibold leading-snug text-[#1f233b]">
            "{data.quote}"
          </blockquote>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.2)] sm:p-7">
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
              className={`rounded-md py-2 text-sm font-semibold transition-colors ${
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
              className={`rounded-md py-2 text-sm font-semibold transition-colors ${
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
                className={`rounded-lg border px-4 py-3 text-sm font-bold transition-colors ${
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
                className={`rounded-lg border px-4 py-3 text-sm font-bold transition-colors ${
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
              className={`rounded-lg border px-4 py-3 text-sm font-bold transition-colors ${
                selectedAmount === null
                  ? 'border-[#009fe8] bg-[#eaf7ff] text-[#009fe8]'
                  : 'border-[#d9dee7] text-[#1f233b] hover:border-[#bfc8d8]'
              }`}
            >
              {data.otherLabel}
            </button>
          </div>

          <div className="mt-4 rounded-lg border border-[#e1e6ef] bg-[#f8fafc] px-4 py-3">
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
            className="mt-5 w-full rounded-lg bg-[#f28500] py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_10px_25px_-10px_rgba(242,133,0,0.8)] transition-colors hover:bg-[#df7a00]"
          >
            {submitLabel}
          </button>

          <p className="mt-3 text-center text-[11px] text-[#9aa3b2]">
            {data.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
