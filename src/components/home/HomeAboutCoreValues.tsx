import type { HomeAboutCoreValuesData, HomeCoreValueIconId } from '@/lib/api/homepage/types';
import Image from 'next/image';

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
        <Image src="/true_icon.svg" alt="Hand heart" width={20} height={20} />
      );
    case 'leaf':
      return (
        <Image src="/selfless_icon.svg" alt="Hand heart" width={20} height={20} />
      );
    case 'handshake':
      return (
        <Image src="/respect_icon.svg" alt="Hand heart" width={20} height={20} />
      );
    case 'heart':
      return (
        <Image src="/forgive_icon.svg" alt="Hand heart" width={20} height={20} />
      );
    case 'scales':
      return (
        <Image src="/equality.svg" alt="Hand heart" width={20} height={20} />
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
      className="bg-white py-8 lg:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EF7D00] sm:text-sm">
              {data.aboutKicker}
            </p>
            <h2
              id="about-core-heading"
              className="mt-3 text-2xl font-black leading-tight tracking-tight text-[#009FE3]  lg:text-[36px]"
            >
              {data.headlineLine1}
              <br />
              {data.headlineLine2}
            </h2>
            <p className="mt-6 text-[18px] leading-relaxed text-[#3E4850]">
              {data.body}
            </p>
            <blockquote className="mt-8 border-l-4 border-[#EF7D00] py-3 pl-5 text-base font-medium leading-relaxed text-[#1A1A2E] lg:text-[20px]">
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
                  className="flex items-center gap-4 rounded-lg bg-[#F5F2FF] px-4 py-5 sm:px-5"
                >
                  <CoreValueGlyph id={item.icon} />
                  <span className="text-sm font-bold uppercase tracking-wide text-[#1A1A2E] sm:text-base">
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
