import type { ComponentType } from 'react';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

type SectionData = NonNullable<DynamicPageData['carbonNetZeroPillarsSection']>;
type IconKey = SectionData['items'][number]['icon'];

function IconCarbonVerification({ color }: { color: string }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 18a7 7 0 0 1 12-5M22 14a7 7 0 1 1-12 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 16c1.2-3.2 4.2-5.5 7.5-5.5.8 0 1.6.1 2.4.3M18 20.8c-1.3.9-2.9 1.4-4.5 1.4-1.2 0-2.4-.3-3.4-.7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="14" y="15" textAnchor="middle" fill={color} fontSize="6" fontWeight="700">
        CO₂
      </text>
    </svg>
  );
}

function IconEfficiencyInnovation({ color }: { color: string }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="16" r="4" stroke={color} strokeWidth="1.5" />
      <circle cx="17" cy="12" r="3.5" stroke={color} strokeWidth="1.5" />
      <path
        d="m13 9 2-3.5 2 1M15 5.5v3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M18 20v-4l3 2-3 2v-2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconRenewableElectricity({ color }: { color: string }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M6 20h8V12L6 20Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 18h6l-1.5-6L16 18Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="21" cy="9" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M21 7v1M21 11v1M19 9h-1M23 9h1" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconSupplyChain({ color }: { color: string }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="7" stroke={color} strokeWidth="1.5" />
      <path d="M10 9h5l1 2h3v5h-9V9Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M7 18h2l1.5-2h6l2 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="19" r="1.2" fill={color} />
    </svg>
  );
}

function IconRdInnovation({ color }: { color: string }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 4v4M14 4a6 6 0 0 1 5.2 9l1.3 1.3a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.4 0L17.2 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="19" r="4" stroke={color} strokeWidth="1.5" />
      <path d="m14 17 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="11" r="2" stroke={color} strokeWidth="1.2" />
      <circle cx="17" cy="11" r="1.5" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

function IconCdpLeadership({ color }: { color: string }) {
  return (
    <svg className="h-12 w-12" viewBox="0 0 28 28" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 18c1-2.5 2.8-4 6-4s5 1.5 6 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="11" r="2.2" stroke={color} strokeWidth="1.5" />
      <circle cx="14" cy="9" r="2.2" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="11" r="2.2" stroke={color} strokeWidth="1.5" />
      <path
        d="M10 5.5h.5M13.5 4h1M17 5.5h.5M19.5 7l.5.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICON_MAP: Record<IconKey, ComponentType<{ color: string }>> = {
  carbon_verification: IconCarbonVerification,
  efficiency_innovation: IconEfficiencyInnovation,
  renewable_electricity: IconRenewableElectricity,
  supply_chain: IconSupplyChain,
  rd_innovation: IconRdInnovation,
  cdp_leadership: IconCdpLeadership,
};

export interface SustainabilityPillarsGridSectionProps {
  data: SectionData;
}

export default function SustainabilityPillarsGridSection({ data }: SustainabilityPillarsGridSectionProps) {
  const accent = data.accentColor ?? '#00AEEF';
  const cardBg = data.cardBackgroundColor ?? '#f2f4f6';
  const sectionBg = data.sectionBackgroundColor ?? '#ffffff';

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 md:mb-16 md:text-4xl lg:text-[2.5rem]">
          {data.headingPrefix}{' '}
          <span style={{ color: accent }}>{data.headingHighlight}</span> {data.headingSuffix}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {data.items.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <article
                key={item.id}
                className="rounded-[50px] p-6  md:p-8 bg-[#EDF0F1]"
              >
                <div className="mb-4">
                  <Icon color={accent} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 md:text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-[0.9375rem]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
