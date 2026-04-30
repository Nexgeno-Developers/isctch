'use client';

import { useMemo, useState } from 'react';
import type { DonateContributionData } from '@/lib/api/donate/types';

const COUNTRY_CODES = [
  'AD',
  'AE',
  'AF',
  'AG',
  'AI',
  'AL',
  'AM',
  'AO',
  'AQ',
  'AR',
  'AS',
  'AT',
  'AU',
  'AW',
  'AX',
  'AZ',
  'BA',
  'BB',
  'BD',
  'BE',
  'BF',
  'BG',
  'BH',
  'BI',
  'BJ',
  'BL',
  'BM',
  'BN',
  'BO',
  'BQ',
  'BR',
  'BS',
  'BT',
  'BV',
  'BW',
  'BY',
  'BZ',
  'CA',
  'CC',
  'CD',
  'CF',
  'CG',
  'CH',
  'CI',
  'CK',
  'CL',
  'CM',
  'CN',
  'CO',
  'CR',
  'CU',
  'CV',
  'CW',
  'CX',
  'CY',
  'CZ',
  'DE',
  'DJ',
  'DK',
  'DM',
  'DO',
  'DZ',
  'EC',
  'EE',
  'EG',
  'EH',
  'ER',
  'ES',
  'ET',
  'FI',
  'FJ',
  'FK',
  'FM',
  'FO',
  'FR',
  'GA',
  'GB',
  'GD',
  'GE',
  'GF',
  'GG',
  'GH',
  'GI',
  'GL',
  'GM',
  'GN',
  'GP',
  'GQ',
  'GR',
  'GS',
  'GT',
  'GU',
  'GW',
  'GY',
  'HK',
  'HM',
  'HN',
  'HR',
  'HT',
  'HU',
  'ID',
  'IE',
  'IL',
  'IM',
  'IN',
  'IO',
  'IQ',
  'IR',
  'IS',
  'IT',
  'JE',
  'JM',
  'JO',
  'JP',
  'KE',
  'KG',
  'KH',
  'KI',
  'KM',
  'KN',
  'KP',
  'KR',
  'KW',
  'KY',
  'KZ',
  'LA',
  'LB',
  'LC',
  'LI',
  'LK',
  'LR',
  'LS',
  'LT',
  'LU',
  'LV',
  'LY',
  'MA',
  'MC',
  'MD',
  'ME',
  'MF',
  'MG',
  'MH',
  'MK',
  'ML',
  'MM',
  'MN',
  'MO',
  'MP',
  'MQ',
  'MR',
  'MS',
  'MT',
  'MU',
  'MV',
  'MW',
  'MX',
  'MY',
  'MZ',
  'NA',
  'NC',
  'NE',
  'NF',
  'NG',
  'NI',
  'NL',
  'NO',
  'NP',
  'NR',
  'NU',
  'NZ',
  'OM',
  'PA',
  'PE',
  'PF',
  'PG',
  'PH',
  'PK',
  'PL',
  'PM',
  'PN',
  'PR',
  'PS',
  'PT',
  'PW',
  'PY',
  'QA',
  'RE',
  'RO',
  'RS',
  'RU',
  'RW',
  'SA',
  'SB',
  'SC',
  'SD',
  'SE',
  'SG',
  'SH',
  'SI',
  'SJ',
  'SK',
  'SL',
  'SM',
  'SN',
  'SO',
  'SR',
  'SS',
  'ST',
  'SV',
  'SX',
  'SY',
  'SZ',
  'TC',
  'TD',
  'TF',
  'TG',
  'TH',
  'TJ',
  'TK',
  'TL',
  'TM',
  'TN',
  'TO',
  'TR',
  'TT',
  'TV',
  'TW',
  'TZ',
  'UA',
  'UG',
  'UM',
  'US',
  'UY',
  'UZ',
  'VA',
  'VC',
  'VE',
  'VG',
  'VI',
  'VN',
  'VU',
  'WF',
  'WS',
  'XK',
  'YE',
  'YT',
  'ZA',
  'ZM',
  'ZW',
];

const CURRENCY_OPTIONS = [
  { code: 'USD', label: 'USD - US Dollar', symbol: '$' },
  { code: 'INR', label: 'INR - Indian Rupee', symbol: 'INR' },
  { code: 'AED', label: 'AED - UAE Dirham', symbol: 'AED' },
  { code: 'EUR', label: 'EUR - Euro', symbol: 'EUR' },
  { code: 'GBP', label: 'GBP - Pound Sterling', symbol: 'GBP' },
];

const fieldClass =
  'h-12 w-full rounded-lg border-0 bg-[#f8fafc] px-4 text-sm font-semibold text-[#1f233b] outline-none transition-shadow placeholder:text-[#c3ccda] focus:ring-2 focus:ring-[#009fe8]/30';

function getCountryNames(): string[] {
  if (typeof Intl.DisplayNames !== 'function') return COUNTRY_CODES;

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return COUNTRY_CODES.map((code) => regionNames.of(code) || code).sort((a, b) =>
    a.localeCompare(b),
  );
}

function CountrySearchDropdown({ placeholder }: { placeholder: string }) {
  const countries = useMemo(() => getCountryNames(), []);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return countries;
    return countries.filter((country) => country.toLowerCase().includes(search));
  }, [countries, query]);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <input
        type="text"
        name="country"
        autoComplete="country-name"
        required
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-controls="donation-country-list"
        className={`${fieldClass} pr-10`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b8c2d0]"
      >
        v
      </span>

      {open && (
        <div
          id="donation-country-list"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-lg border border-[#e1e6ef] bg-white py-1 shadow-[0_16px_30px_-18px_rgba(15,23,42,0.45)]"
        >
          {filteredCountries.length ? (
            filteredCountries.map((country) => (
              <button
                key={country}
                type="button"
                role="option"
                aria-selected={query === country}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setQuery(country);
                  setOpen(false);
                }}
                className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-semibold text-[#1f233b] transition-colors hover:bg-[#eaf7ff] hover:text-[#009fe8]"
              >
                {country}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm font-semibold text-[#8a93a6]">
              No countries found
            </div>
          )}
        </div>
      )}
    </div>
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
        className={`${fieldClass} pr-10`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b8c2d0]"
      >
        v
      </span>

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

export default function DonationContributionSection({ data }: { data: DonateContributionData }) {
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
            &ldquo;{data.quote}&rdquo;
          </blockquote>
          </div>
       

        <form
          onSubmit={handleSubmit}
          className="rounded-[15px] bg-white p-6 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.2)] sm:p-7"
        >
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

          <div className="mt-5 space-y-3">
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

            <CountrySearchDropdown placeholder={data.countryPlaceholder} />

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

          <p className="mt-8 text-center text-[11px] text-[#9aa3b2]">
            {data.footnote}
          </p>
        </form>
        </div>
      </div>
    </section>
  );
}
