import type { HomeActionPillarIconId, HomeActionPillarsData } from '@/lib/api/homepage/types';

type Props = {
  data: HomeActionPillarsData;
};

const CYAN = '#00AEEF';
const ORANGE = '#d98a29';

function PillarIcon({
  id,
  accent,
}: {
  id: HomeActionPillarIconId;
  accent: 'cyan' | 'orange';
}) {
  const color = accent === 'cyan' ? CYAN : ORANGE;
  const stroke = {
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (id) {
    case 'people':
      return (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path {...stroke} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle {...stroke} cx="9" cy="7" r="3.5" />
          <path {...stroke} d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'meditation':
      return (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <circle {...stroke} cx="12" cy="5" r="2" />
          <path
            {...stroke}
            d="M12 21v-6M8 15h8M9 15c0-2 1.5-3 3-3s3 1 3 3M7 21h10"
          />
        </svg>
      );
    case 'graduation':
      return (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path {...stroke} d="M2 12l10-5 10 5-10 5-10-5z" />
          <path {...stroke} d="M6 15v2.5c0 1.5 3 2.5 6 2.5s6-1 6-2.5V15" />
        </svg>
      );
    case 'megaphone':
      return (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path {...stroke} d="M3 11l4-2v8l-4-2V11zM7 9v6l10 4V5L7 9z" />
          <path {...stroke} d="M18 9a3 3 0 0 1 0 6" />
        </svg>
      );
    case 'book':
      return (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path {...stroke} d="M4 5c0-1 1.5-2 4-2s4 1 4 2v14c-1.5-1-2.5-1-4-1s-2.5 0-4 1V5z" />
          <path {...stroke} d="M12 5c0-1 1.5-2 4-2s4 1 4 2v14c-1.5-1-2.5-1-4-1s-2.5 0-4 1" />
        </svg>
      );
    case 'scales-policy':
      return (
        <svg className="h-9 w-9 shrink-0" viewBox="0 0 24 24" aria-hidden>
          <path {...stroke} d="M12 3v18M5 7l-2 5h4L5 7zm14 0l-2 5h4l-2-5z" />
          <path {...stroke} d="M7 12h10M9 19h6" />
        </svg>
      );
    default: {
      const _n: never = id;
      return _n;
    }
  }
}

/**
 * Six-card grid: alternating top border (cyan / orange) with icon in the opposite accent.
 * Data: `getHomePageData().actionPillars`.
 */
export default function HomeActionPillars({ data }: Props) {
  return (
    <section
      className="bg-[#E6F4FA] py-14 md:py-18 lg:py-20"
      aria-labelledby="action-pillars-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#d98a29] sm:text-sm">
          {data.kicker}
        </p>
        <h2
          id="action-pillars-heading"
          className="mt-3 text-center text-3xl font-bold tracking-tight text-[#00AEEF] sm:text-4xl md:text-[2.35rem]"
        >
          {data.title}
        </h2>

        <ul
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {data.pillars.map((pillar, index) => {
            const topBlue = index % 2 === 0;
            return (
              <li
                key={`pillar-${index}`}
                className={`flex flex-col rounded-xl bg-white px-5 pb-6 pt-0 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] ${
                  topBlue ? 'border-t-4 border-[#00AEEF]' : 'border-t-4 border-[#d98a29]'
                }`}
              >
                <div className="pt-5">
                  <PillarIcon
                    id={pillar.icon}
                    accent={topBlue ? 'orange' : 'cyan'}
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#1a1a2e]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a6d7d] sm:text-[15px]">
                  {pillar.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
