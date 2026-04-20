import type { HomeAboutCoreValuesData, HomeCoreValueIconId } from '@/lib/api/homepage/types';

type Props = {
  data: HomeAboutCoreValuesData;
};

const iconClass = 'h-10 w-10 shrink-0 text-[#00AEEF]';

function CoreValueGlyph({ id }: { id: HomeCoreValueIconId }) {
  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (id) {
    case 'hand-heart':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden>
          <path
            {...stroke}
            d="M12 18.5C8.5 15.2 5 12.1 5 8.5 5 6.5 6.4 5 8.2 5c1.4 0 2.7.8 3.4 2 .2.4.8.4 1 0C13.3 5.8 14.6 5 16 5 17.8 5 19 6.5 19 8.5c0 3.6-3.5 6.7-7 10"
          />
          <path {...stroke} d="M8 20c1.2-2.2 3.5-3.5 4-3.5s2.8 1.3 4 3.5" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden>
          <path
            {...stroke}
            d="M12 3C7 6 4 10 4 14c0 3.3 2.7 6 6 6 4 0 8-4 8-10 0-3-1.5-5.5-4-7"
          />
          <path {...stroke} d="M12 20V10M12 10c2 1.5 4 4 5 7" />
        </svg>
      );
    case 'handshake':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden>
          <path
            {...stroke}
            d="M4 14l2.5 2.5c.8.8 2.1.9 3 .2l.5-.4c.9-.7 2.2-.6 3 .2v0c.8.8 2 .9 2.8.2L21 14"
          />
          <path {...stroke} d="M3 10l4-2 3 3-2 4M21 10l-4-2-3 3 2 4" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden>
          <path
            {...stroke}
            d="M12 21s-7-4.35-7-10a5 5 0 0 1 9.9-1 5 5 0 0 1 9.9 1c0 5.65-7 10-7 10z"
          />
        </svg>
      );
    case 'scales':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" aria-hidden>
          <path {...stroke} d="M12 3v18M5 7h14M5 7l-2 5h4L5 7zm14 0l-2 5h4l-2-5z" />
          <path {...stroke} d="M7 12h10" />
        </svg>
      );
    default: {
      const _never: never = id;
      return _never;
    }
  }
}

/**
 * About copy + vision quote (left) and core value cards (right).
 * Data is resolved on the server via `getHomePageData().aboutCoreValues`.
 */
export default function HomeAboutCoreValues({ data }: Props) {
  return (
    <section
      className="bg-white py-14 md:py-18 lg:py-22"
      aria-labelledby="about-core-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d98a29] sm:text-sm">
              {data.aboutKicker}
            </p>
            <h2
              id="about-core-heading"
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#00AEEF] sm:text-3xl md:text-4xl lg:text-[2.35rem]"
            >
              {data.headlineLine1}
              <br />
              {data.headlineLine2}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#5a6d7d] sm:text-lg">
              {data.body}
            </p>
            <blockquote className="mt-8 border-l-4 border-[#d98a29] py-1 pl-5 text-base font-medium leading-relaxed text-[#1a1a2e] sm:text-lg">
              <span className="font-semibold">{data.visionLabel}</span>{' '}
              {data.visionText}
            </blockquote>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a2e] sm:text-sm">
              {data.coreValuesKicker}
            </p>
            <ul className="mt-5 flex flex-col gap-3" role="list">
              {data.values.map((item, index) => (
                <li
                  key={`core-value-${index}`}
                  className="flex items-center gap-4 rounded-lg bg-[#F8F9FF] px-4 py-3.5 sm:px-5"
                >
                  <CoreValueGlyph id={item.icon} />
                  <span className="text-sm font-bold uppercase tracking-wide text-[#1a1a2e] sm:text-base">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
