'use client';

import { useMemo, useState } from 'react';

import CountrySearchDropdown from '@/components/common/CountrySearchDropdown';
import type { DonateContributionData } from '@/lib/api/donate/types';

const CURRENCY_OPTIONS = [
  { code: 'USD', label: 'USD - US Dollar', symbol: '$' },
  { code: 'INR', label: 'INR - Indian Rupee', symbol: 'INR' },
  { code: 'AED', label: 'AED - UAE Dirham', symbol: 'AED' },
  { code: 'EUR', label: 'EUR - Euro', symbol: 'EUR' },
  { code: 'GBP', label: 'GBP - Pound Sterling', symbol: 'GBP' },
];

const fieldClass =
  'h-12 w-full rounded-lg border-0 bg-[#f8fafc] px-4 text-sm font-semibold text-[#1f233b] outline-none transition-shadow placeholder:text-[#c3ccda] focus:ring-2 focus:ring-[#009fe8]/30';

const defaultFormClassName =
  'w-full lg:w-1/2 rounded-[15px] bg-white p-6 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.2)] sm:p-7';

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#b8c2d0]"
    >
      <svg
        className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="m6 9 6 6 6-6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CurrencySearchDropdown({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedCurrency = CURRENCY_OPTIONS.find((item) => item.code === value);
  const [query, setQuery] = useState(selectedCurrency?.label ?? '');
  const [open, setOpen] = useState(false);

  const filteredCurrencies = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return CURRENCY_OPTIONS;
    return CURRENCY_OPTIONS.filter(
      (currencyOption) =>
        currencyOption.code.toLowerCase().includes(search) ||
        currencyOption.label.toLowerCase().includes(search),
    );
  }, [query]);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
          setQuery(selectedCurrency?.label ?? query);
        }
      }}
    >
      <input type="hidden" name="currency" value={value} readOnly />
      <input
        type="text"
        autoComplete="off"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          onChange('');
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-controls="donation-currency-list"
        className={`${fieldClass} pr-12`}
      />
      <DropdownChevron open={open} />

      {open && (
        <div
          id="donation-currency-list"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-lg border border-[#e1e6ef] bg-white py-1 shadow-[0_16px_30px_-18px_rgba(15,23,42,0.45)]"
        >
          {filteredCurrencies.length ? (
            filteredCurrencies.map((currencyOption) => (
              <button
                key={currencyOption.code}
                type="button"
                role="option"
                aria-selected={value === currencyOption.code}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setQuery(currencyOption.label);
                  onChange(currencyOption.code);
                  setOpen(false);
                }}
                className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-semibold text-[#1f233b] transition-colors hover:bg-[#eaf7ff] hover:text-[#009fe8]"
              >
                {currencyOption.label}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm font-semibold text-[#8a93a6]">
              No currencies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type Props = {
  data: DonateContributionData;
  /** Tailwind classes for the outer `<form>` (layout, card, padding). */
  formClassName?: string;
};

export default function DonationPaymentForm({ data, formClassName }: Props) {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(data.defaultAmount);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('');

  const submitLabel =
    frequency === 'monthly' ? data.submitMonthlyLabel : data.submitOneTimeLabel;
  const selectedCurrency = CURRENCY_OPTIONS.find((item) => item.code === currency);
  const currencySymbol = selectedCurrency?.symbol ?? '$';
  const donationAmount = customAmount || selectedAmount || '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const formClass = formClassName ?? defaultFormClassName;

  return (
    <form onSubmit={handleSubmit} className={formClass}>
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
            frequency === 'one-time' ? 'bg-white text-[#009fe8] shadow-sm' : 'text-[#8a93a6]'
          }`}
        >
          {data.oneTimeLabel}
        </button>
        <button
          type="button"
          onClick={() => setFrequency('monthly')}
          className={`cursor-pointer rounded-md py-3 text-sm font-semibold transition-colors ${
            frequency === 'monthly' ? 'bg-white text-[#009fe8] shadow-sm' : 'text-[#8a93a6]'
          }`}
        >
          {data.monthlyLabel}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          name="fullName"
          autoComplete="name"
          required
          placeholder={data.fullNamePlaceholder}
          className={fieldClass}
        />

        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={data.emailPlaceholder}
          className={fieldClass}
        />

        <CountrySearchDropdown
          placeholder={data.countryPlaceholder}
          inputClassName={`${fieldClass} pr-12`}
          required
        />

        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder={data.phonePlaceholder}
          className={fieldClass}
        />

        <CurrencySearchDropdown
          placeholder={data.currencyPlaceholder}
          value={currency}
          onChange={setCurrency}
        />

        <label className="flex h-12 items-center rounded-lg border-0 bg-[#f8fafc] px-4 text-sm font-semibold text-[#8a93a6] focus-within:ring-2 focus-within:ring-[#009fe8]/30">
          <span className="mr-3 text-[#1f233b]">{currencySymbol}</span>
          <input
            type="number"
            min="1"
            name="customAmount"
            inputMode="decimal"
            value={customAmount}
            onChange={(event) => {
              setSelectedAmount(null);
              setCustomAmount(event.target.value);
            }}
            placeholder={data.customAmountPlaceholder}
            className="h-full min-w-0 flex-1 border-none bg-transparent text-[#1f233b] outline-none placeholder:text-[#c3ccda]"
          />
        </label>
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

      <input type="hidden" name="amount" value={donationAmount} readOnly />

      <button
        type="submit"
        className="cursor-pointer mt-8 w-full rounded-lg bg-[#EF7D00] py-4 text-[18px] font-semibold capitalize tracking-wide text-white shadow-[0_10px_25px_-10px_rgba(242,133,0,0.8)] transition-colors hover:bg-[#df7a00]"
      >
        {submitLabel}
      </button>

      <p className="mt-8 text-center text-[11px] text-[#9aa3b2]">{data.footnote}</p>
    </form>
  );
}
