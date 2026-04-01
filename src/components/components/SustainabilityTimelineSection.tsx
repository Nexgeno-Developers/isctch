import type { SustainabilityTimelineSectionData } from '@/lib/api/sustainability_layout_4';

type SectionData = SustainabilityTimelineSectionData;

function CheckCircleIcon() {
  return (
    <svg
      className="h-6 w-6 text-white md:h-7 md:w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export interface SustainabilityTimelineSectionProps {
  data: SectionData;
}

export default function SustainabilityTimelineSection({ data }: SustainabilityTimelineSectionProps) {
  const accent = data.accentColor ?? '#00AEEF';
  const bg = data.backgroundColor ?? '#f8f9fa';

  return (
    <section style={{ backgroundColor: bg }}>
      <div className="container mx-auto px-4 ">
        <header className="mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]">
            <span style={{ color: accent }}>{data.headingBlue}</span>{' '}
            <span className="text-black">{data.headingBlack}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-black md:text-lg">{data.subtitle}</p>
        </header>

        <ul className="list-none space-y-0 p-0">
          {data.items.map((item, index) => (
            <li key={item.id}>
              {index > 0 ? <div className="border-t border-gray-200/90" aria-hidden /> : null}
              <div className="flex gap-5 py-10 md:gap-8 md:py-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-14 md:w-14"
                  style={{ backgroundColor: accent }}
                >
                  <CheckCircleIcon />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-400 md:text-base">{item.year}</p>
                  <h3 className="mt-1 text-lg font-bold text-black md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
