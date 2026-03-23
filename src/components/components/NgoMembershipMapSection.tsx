import type { DynamicPageData } from '@/fake-api/dynamic-pages';

type SectionData = NonNullable<DynamicPageData['ngosMembershipMapSection']>;

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
          <span className="text-gray-900">{data.headingBlack}</span>
        </h2>

        <div
          className="relative mx-auto w-full max-w-5xl overflow-visible"
          style={{ aspectRatio: `${MAP_VIEW_W} / ${MAP_VIEW_H}` }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${MAP_VIEW_W} ${MAP_VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {WORLD_DOT_CENTERS.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={1.35} fill={dotColor} />
            ))}
          </svg>

          {data.markers.map((m) => {
            const sizeLg = m.size === 'lg';
            const leaderH = m.leaderHeightPx ?? 50;
            const bubbleClass = sizeLg
              ? 'min-h-[5.5rem] min-w-[5.5rem] max-w-[8.5rem] px-3 py-3 text-sm md:min-h-[6.5rem] md:min-w-[6.5rem] md:max-w-[9.5rem] md:px-4 md:text-base'
              : 'min-h-[4.75rem] min-w-[4.75rem] max-w-[7.5rem] px-2.5 py-2.5 text-[11px] md:min-h-[5.5rem] md:min-w-[5.5rem] md:max-w-[8rem] md:px-3 md:text-sm';

            return (
              <div
                key={m.id}
                className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center"
                style={{
                  top: `${m.topPercent}%`,
                  left: `${m.leftPercent}%`,
                }}
              >
                <div
                  className={`flex flex-col items-center justify-center rounded-full text-center font-bold leading-tight text-white shadow-md ${bubbleClass}`}
                  style={{ backgroundColor: accent }}
                >
                  {m.lines.map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))}
                </div>
                <div
                  className="w-0.5 shrink-0 rounded-full"
                  style={{
                    height: leaderH,
                    backgroundColor: leaderColor,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
