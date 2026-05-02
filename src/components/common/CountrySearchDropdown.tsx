'use client';

import { useId, useMemo, useState } from 'react';

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

function getCountryNames(): string[] {
  if (typeof Intl.DisplayNames !== 'function') return COUNTRY_CODES;

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return COUNTRY_CODES.map((code) => regionNames.of(code) || code).sort((a, b) =>
    a.localeCompare(b),
  );
}

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

export type CountrySearchDropdownProps = {
  placeholder: string;
  /** Tailwind classes for the text input (include right padding for the chevron, e.g. `pr-12`). */
  inputClassName: string;
  name?: string;
  required?: boolean;
};

/**
 * Searchable country combobox — same behavior as the donation form country field.
 */
export default function CountrySearchDropdown({
  placeholder,
  inputClassName,
  name = 'country',
  required = false,
}: CountrySearchDropdownProps) {
  const listId = useId();
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
        name={name}
        autoComplete="country-name"
        required={required}
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
        aria-controls={listId}
        className={inputClassName}
      />
      <DropdownChevron open={open} />

      {open && (
        <div
          id={listId}
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
            <div className="px-4 py-3 text-sm font-semibold text-[#8a93a6]">No countries found</div>
          )}
        </div>
      )}
    </div>
  );
}
