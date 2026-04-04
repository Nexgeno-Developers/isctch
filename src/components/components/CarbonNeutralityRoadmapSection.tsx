import { RichText } from '@/components/common/RichText';
import type { CarbonNetZeroRoadmapSectionData } from '@/lib/api/sustainability_layout_6';

type SectionData = CarbonNetZeroRoadmapSectionData;

function IconTarget({ color }: { color: string }) {
  return (
    <svg className="h-8 w-8 md:h-9 md:w-9" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

function IconTrend({ color }: { color: string }) {
  return (
    <svg className="h-8 w-8 md:h-9 md:w-9" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16l5-6 4 4 6-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6h4v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLeaf({ color }: { color: string }) {
  return (
    <svg className="h-8 w-8 md:h-9 md:w-9" viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 20s-6-4.5-6-11a6.5 6.5 0 0 1 11-4.6C20 9.5 17 14 12 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  target: IconTarget,
  trend: IconTrend,
  leaf: IconLeaf,
} as const;

export interface CarbonNeutralityRoadmapSectionProps {
  data: SectionData;
}

export default function CarbonNeutralityRoadmapSection({ data }: CarbonNeutralityRoadmapSectionProps) {
  const accent = data.accentColor ?? '#00AEEF';
  const circleBg = data.iconCircleBackground ?? '#e8ecef';
  const lineColor = data.connectorLineColor ?? '#d1d5db';
  const sectionBg = data.sectionBackgroundColor ?? '#f5f6f8';
  const barBg = data.summaryBarBackground ?? accent;

  return (
    <section className="py-12 md:pt-24 md:pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-14 text-center text-3xl font-bold tracking-tight text-black md:mb-20 md:text-4xl lg:text-5xl" dangerouslySetInnerHTML={{ __html: data.heading }} />

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-10 z-0 hidden h-[2px] md:block lg:left-[12%] lg:right-[12%]"
            style={{ backgroundColor: lineColor }}
            aria-hidden
          />

          <div className="relative z-10 grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-10">
            {data.milestones.map((m) => {
              const iconKey = m.icon ?? 'target';
              const Icon = ICONS[iconKey];
              return (
                <div key={m.id} className="flex flex-col items-center text-center">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full md:h-[5.25rem] md:w-[5.25rem]"
                    style={{ backgroundColor: circleBg }}
                  >
                    {m.iconImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.iconImageUrl}
                        alt=""
                        className="h-8 w-8 object-contain md:h-9 md:w-9"
                      />
                    ) : (
                      <Icon color={accent} />
                    )}
                  </div>
                  <p className="mt-5 text-xl font-bold md:text-2xl" style={{ color: accent }}>
                    {m.year}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-black md:text-lg">{m.title}</h3>
                  {m.descriptionHtml ? (
                    <RichText
                      html={m.descriptionHtml}
                      className="mt-4 w-full max-w-[280px] text-left text-sm leading-snug text-black md:text-[0.9375rem]"
                    />
                  ) : (
                    <ul className="mt-4 max-w-[280px] space-y-2.5 text-left text-sm leading-snug text-black md:text-[0.9375rem]">
                      {(m.bullets ?? []).map((line, idx) => (
                        <li key={idx} className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="mx-auto mt-14 max-w-xl rounded-full px-2 py-4 text-center md:mt-12 md:px-4 md:py-5"
          style={{ backgroundColor: barBg }}
        >
          {data.summaryBarUrl?.trim() ? (
            <a
              href={data.summaryBarUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-white md:text-[22px]">
                {data.summaryBarText}
              </p>
            </a>
          ) : (
            <p className="text-sm font-bold uppercase tracking-wide text-white md:text-[22px]">
              {data.summaryBarText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
