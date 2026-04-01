import type { NgoMembershipMapSectionData } from '@/lib/api/sustainability_layout_5';
import Image from 'next/image';

type SectionData = NgoMembershipMapSectionData;

const MAP_VIEW_W = 1000;
const MAP_VIEW_H = 520;

/** Deterministic dotted “continents” for SSR-safe world map look */
function collectWorldDotCenters(): [number, number][] {
  const pts: [number, number][] = [];
  const grid = (x0: number, x1: number, y0: number, y1: number, step: number) => {
    for (let x = x0; x < x1; x += step) {
      for (let y = y0; y < y1; y += step) {
        pts.push([x + step * 0.2, y + step * 0.2]);
      }
    }
  };
  grid(145, 345, 92, 215, 9.2);
  grid(188, 292, 218, 318, 8.8);
  grid(308, 372, 252, 362, 7.8);
  grid(422, 538, 90, 202, 8);
  grid(468, 568, 198, 338, 8.8);
  grid(548, 835, 96, 242, 9.2);
  grid(618, 748, 240, 322, 8.8);
  grid(762, 902, 298, 382, 8.8);
  grid(822, 878, 352, 406, 6.4);
  return pts;
}

const WORLD_DOT_CENTERS = collectWorldDotCenters();

export interface NgoMembershipMapSectionProps {
  data: SectionData;
}

export default function NgoMembershipMapSection({ data }: NgoMembershipMapSectionProps) {
  const accent = data.accentColor ?? '#00AEEF';
  const leaderColor = data.leaderLineColor ?? '#7dd3fc';
  const dotColor = data.dotColor ?? '#D1D3D4';
  const sectionBg = data.sectionBackgroundColor ?? '#ffffff';

  return (
    <section className="py-14 md:pt-20 md:pb-12 bg-gray-50">
      <div className="container mx-auto px-4 ">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:mb-14 md:text-4xl lg:text-5xl">
          <span style={{ color: accent }}>{data.headingBlue}</span>{' '}
          <span className="text-black">{data.headingBlack}</span>
        </h2>

        <div className=''>
          <Image src="/ngo_image.webp" alt="NGO Membership Map" className='w-[50%] h-full object-cover mx-auto' width={1000} height={520} />

        </div>
      </div>
    </section>
  );
}
