import type { GreenPhotovoltaicProjectBlock } from '@/fake-api/dynamic-pages';

function IconLightbulb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3a6 6 0 0 0-3 11.2V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4.8A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLightning({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGlobeSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 11V6a2 2 0 1 1 4 0v8m-7-3V8a2 2 0 1 1 4 0v3m-1 8-4-3-2-5 1-1 5 1 2 5h8a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand with two upward arrows (Kunshan summary tile) */
function IconHandArrows({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 6.5 10 4l2 2.5M14 6.5 16 4l2 2.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.5 10 8l2 2.5M14 10.5 16 8l2 2.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21h6l1-5.5V12a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.5L9 21Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HEADER_ICONS = {
  lightbulb: IconLightbulb,
  sun: IconSun,
} as const;

const SUMMARY_ICONS = {
  lightning: IconLightning,
  sun: IconSun,
  globe: IconGlobeSmall,
  hand: IconHand,
  hand_arrows: IconHandArrows,
} as const;

export interface GreenPhotovoltaicProjectSectionProps {
  data: GreenPhotovoltaicProjectBlock;
}

export default function GreenPhotovoltaicProjectSection({ data }: GreenPhotovoltaicProjectSectionProps) {
  const accent = data.accentColor ?? '#009CFF';
  const cardSurface = data.surfaceCardColor ?? '#EEF2F3';
  const LocationIcon = HEADER_ICONS[data.locationIcon ?? 'lightbulb'];

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-[36px] bg-white p-6 shadow-sm md:p-9 lg:p-11">
          <header className="mb-8 md:mb-10">
            <div className="mb-3 flex items-center gap-2.5" style={{ color: accent }}>
              <LocationIcon className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
              <span className="text-sm font-medium md:text-base">{data.locationLabel}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-[2.125rem] lg:leading-tight">
              {data.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-900 md:text-base">
              {data.description}
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
            {data.phases.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col rounded-[22px] p-5 md:p-7 lg:p-8"
                style={{ backgroundColor: cardSurface }}
              >
                <span
                  className="mb-6 inline-flex w-fit rounded-full px-3.5 py-1.5 text-xs font-semibold text-white md:text-sm"
                  style={{ backgroundColor: accent }}
                >
                  {phase.badge}
                </span>
                <div className="flex flex-1 flex-col gap-7">
                  {phase.metrics.map((m) => (
                    <div key={`${phase.id}-${m.label}`}>
                      <p className="text-xs font-medium text-gray-600 md:text-sm">{m.label}</p>
                      <p className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-[2rem]">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
                {phase.footerNote ? (
                  <p className="mt-8 text-xs text-gray-500 md:text-sm">{phase.footerNote}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4">
            {data.summaryMetrics.map((item) => {
              const Icon = SUMMARY_ICONS[item.icon];
              return (
                <div
                  key={item.id}
                  className="flex min-h-[4.5rem] items-center gap-3.5 rounded-[18px] p-4 md:p-5"
                  style={{ backgroundColor: cardSurface }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
                    style={{ color: accent }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-800 md:text-sm">{item.label}</p>
                    <p className="break-words text-base font-bold text-gray-900 md:text-lg">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
