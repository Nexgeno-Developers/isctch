/** Soft blue “watercolor” style illustration: lab + innovation cycle (no external asset). */
export default function InnovationsProcessIllustration() {
  return (
    <div
      className="relative aspect-[5/4] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#e8f6fc] via-[#f0f9fd] to-[#e3f4fb] p-6 md:p-10"
      aria-hidden
    >
      <svg viewBox="0 0 400 320" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="innov-a" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#009FE8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#009FE8" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="innov-b" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#009FE8" stopOpacity="0.25" />
            <stop offset="1" stopColor="#009FE8" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {/* soft blobs */}
        <ellipse cx="120" cy="200" rx="90" ry="70" fill="url(#innov-a)" />
        <ellipse cx="280" cy="120" rx="100" ry="80" fill="url(#innov-b)" />
        <ellipse cx="200" cy="260" rx="120" ry="40" fill="#009FE8" opacity="0.12" />

        {/* circular arrows — process */}
        <path
          d="M280 180a55 55 0 11-110 0 55 55 0 01110 0z"
          stroke="#009FE8"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          strokeDasharray="8 10"
        />
        <path d="M175 128l-8-4v8l8-4z" fill="#009FE8" fillOpacity="0.5" />
        <path d="M285 175l6 8h-10l4-8z" fill="#009FE8" fillOpacity="0.5" />

        {/* laptop */}
        <rect x="95" y="155" width="120" height="78" rx="6" fill="#009FE8" fillOpacity="0.2" stroke="#009FE8" strokeWidth="2" strokeOpacity="0.5" />
        <rect x="85" y="233" width="140" height="10" rx="2" fill="#009FE8" fillOpacity="0.35" />
        <rect x="105" y="170" width="100" height="52" rx="2" fill="white" fillOpacity="0.85" />
        <path d="M115 188h80M115 198h55M115 208h70" stroke="#009FE8" strokeWidth="2" strokeOpacity="0.35" strokeLinecap="round" />

        {/* flask */}
        <path
          d="M255 140h28v8l-14 52h-14l-14-52v-8h28z"
          fill="#009FE8"
          fillOpacity="0.15"
          stroke="#009FE8"
          strokeWidth="2"
          strokeOpacity="0.55"
        />
        <ellipse cx="269" cy="210" rx="16" ry="6" fill="#009FE8" fillOpacity="0.25" />
        <path d="M262 175h14" stroke="#009FE8" strokeWidth="2" strokeOpacity="0.4" />

        {/* test tubes */}
        <rect x="310" y="165" width="10" height="48" rx="2" fill="#009FE8" fillOpacity="0.2" stroke="#009FE8" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="328" y="155" width="10" height="58" rx="2" fill="#009FE8" fillOpacity="0.18" stroke="#009FE8" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="346" y="172" width="10" height="42" rx="2" fill="#009FE8" fillOpacity="0.22" stroke="#009FE8" strokeWidth="1.5" strokeOpacity="0.5" />

        {/* leaves */}
        <path
          d="M48 120c20-25 55-30 75-10-18 8-35 22-45 40-15-8-28-22-30-30z"
          fill="#009FE8"
          fillOpacity="0.28"
        />
        <path
          d="M62 108c12-18 38-22 52-8"
          stroke="#009FE8"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M335 95c-18-20-48-22-62-2 14 6 28 18 34 32 14-10 24-26 28-30z"
          fill="#009FE8"
          fillOpacity="0.22"
        />
      </svg>
    </div>
  );
}
