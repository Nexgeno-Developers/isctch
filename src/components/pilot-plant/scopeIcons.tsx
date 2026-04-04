import type { PilotPlantScopeIconId } from '@/lib/api/pilot_plant_layout';

const iconClass = 'h-7 w-7 text-[#009FE8]';

export function PilotPlantScopeIcon({ id }: { id: PilotPlantScopeIconId }) {
  switch (id) {
    case 'leaf':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M14 3C8 8 4 14 4 20c0 3 2.5 5 5 5 4 0 7-4 9-9 2-6 3-13-4-13z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M9 18c3-1 6-4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'glass':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M8 6h12l-1 14a3 3 0 01-3 2.8H12a3 3 0 01-3-2.8L8 6z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M10 6V4h8v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M11 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'mug':
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M6 10h12v8a3 3 0 01-3 3h-6a3 3 0 01-3-3v-8z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M18 12h3a2 2 0 012 2v2a2 2 0 01-2 2h-3" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 7V6a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 22h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case 'drop':
    default:
      return (
        <svg className={iconClass} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M14 4c-4 6-8 10-8 15a8 8 0 1016 0c0-5-4-9-8-15z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <ellipse cx="14" cy="17" rx="3" ry="4" fill="currentColor" opacity="0.25" />
        </svg>
      );
  }
}
