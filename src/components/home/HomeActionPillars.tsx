import type { HomeActionPillarIconId, HomeActionPillarsData } from '@/lib/api/homepage';
import Image from 'next/image';

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
        <Image src="/dialog_icons.svg" alt="People" width={30} height={30} />
      );
    case 'meditation':
      return (
        <Image src="/peace_tols_icon.svg" alt="People" width={30} height={30} />
      );
    case 'graduation':
      return (
        <Image src="/leadership_icons.svg" alt="People" width={30} height={30} />
      );
    case 'megaphone':
      return (
        <Image src="/voice_icons.svg" alt="People" width={30} height={30} />
      );
    case 'book':
      return (
        <Image src="/education_icons.svg" alt="People" width={30} height={30} />
      );
    case 'scales-policy':
      return (
        <Image src="/plocy_icons.svg" alt="People" width={30} height={30} />
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
      className="bg-[#E8F7FD] py-8 lg:py-20"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em]  text-[#EF7D00] sm:text-sm">
          {data.kicker}
        </p>
        <h2
          id="action-pillars-heading"
          className="mt-3 text-center text-3xl font-black tracking-tight text-[#009fe3] lg:text-[36px]"
        >
          {data.title}
        </h2>

        <ul
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {data.pillars.map((pillar, index) => {
            const topBlue = index % 2 === 0;
            return (
              <li
                key={`pillar-${index}`}
                className={`flex flex-col bg-white px-10 py-10 rounded-[8px] ${
                  topBlue ? 'border-t-3 border-[#009FE3]' : 'border-t-3 border-[#EF7D00]'
                }`}
              >
                <div className="pt-0">
                  <PillarIcon
                    id={pillar.icon}
                    accent={topBlue ? 'orange' : 'cyan'}
                  />
                </div>
                <h3 className="mt-6 text-lg font-bold text-[#1A1A2E] lg:text-[20px]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3E4850] lg:text-base">
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
