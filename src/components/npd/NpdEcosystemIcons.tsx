/** Line icons for ecosystem cards (blue) — used when CMS does not supply an icon URL. */

export function NpdEcosystemIcon({ variant }: { variant: number }) {
  const c = 'h-10 w-10 text-[#009FE8]';
  switch (variant % 4) {
    case 0:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth={1.5} strokeLinecap="round" d="M6 28h6v6H6zM14 22h6v12h-6M22 16h6v18h-6M30 10h4v24h-4" />
          <circle cx={31} cy={9} r={3.2} strokeWidth={1.5} />
          <path strokeWidth={1.5} strokeLinecap="round" d="M33 11l3 3" />
        </svg>
      );
    case 1:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 26c2-8 8-14 18-16M14 22h10l-2-6 2-6h-8l2 6-2 6z"
          />
          <rect x={22} y={8} width={10} height={12} rx={1} strokeWidth={1.5} />
        </svg>
      );
    case 2:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 6l2 4h4l-3 3 1 5-4-3-4 3 1-5-3-3h4z"
          />
          <circle cx={28} cy={26} r={5} strokeWidth={1.5} />
          <path strokeWidth={1.2} d="M26 26h4M28 24v4" />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <rect x={10} y={14} width={20} height={14} rx={2} strokeWidth={1.5} />
          <path strokeWidth={1.5} strokeLinecap="round" d="M14 22h12M14 26h8" />
          <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" d="M16 10h12l-2 4h-8z" />
        </svg>
      );
  }
}
