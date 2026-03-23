import Image from 'next/image';
import type { ReactNode } from 'react';

export type GovernanceComplianceCardIconId =
  | 'supplier'
  | 'human_rights'
  | 'environment'
  | 'workplace';

export type GovernanceComplianceCardsSectionData = {
  layout: 'complianceCards';
  eyebrow: string;
  titleBlue: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  cards: Array<{
    id: string;
    title: string;
    description: string;
    iconId: GovernanceComplianceCardIconId;
  }>;
};

function IconOutline({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="text-[#009FE8] inline-flex items-center justify-center">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

function renderCardIcon(iconId: GovernanceComplianceCardIconId) {
  switch (iconId) {
    case 'supplier':
      return (
        <IconOutline>
          <path d="M12 2l9 4-9 4-9-4 9-4z" />
          <path d="M21 6v6c0 5-9 10-9 10S3 17 3 12V6" />
          <path d="M7 10h5" />
        </IconOutline>
      );
    case 'human_rights':
      return (
        <IconOutline>
          <circle cx="12" cy="7" r="3" />
          <path d="M6 20c1.5-3 4-5 6-5s4.5 2 6 5" />
          <path d="M8 20h8" />
        </IconOutline>
      );
    case 'environment':
      return (
        <IconOutline>
          <path d="M20 8l-6-6-6 6 6 6 6-6z" />
          <path d="M10 10l4 4" />
          <path d="M4 20c4 0 8-2 10-6" />
        </IconOutline>
      );
    case 'workplace':
      return (
        <IconOutline>
          <path d="M4 21V9l8-4 8 4v12H4z" />
          <path d="M9 13h6" />
          <path d="M12 10v6" />
        </IconOutline>
      );
    default:
      return null;
  }
}

export default function GovernanceComplianceCardsSection({
  data,
}: {
  data: GovernanceComplianceCardsSectionData;
}) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-[#009FE8] font-semibold text-sm md:text-base">
            {data.eyebrow}
          </div>

          <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-[#009FE8]">{data.titleBlue}</span>{' '}
            <span className="text-gray-900">{data.title}</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 items-start">
            <div>
              <Image
                src={data.imageSrc}
                alt={data.imageAlt}
                width={1600}
                height={900}
                className="w-full h-[240px] md:h-[320px] object-cover rounded-[16px]"
                priority
              />
            </div>

            <div className="space-y-4">
              {data.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#EEF2F3] rounded-[18px] px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {renderCardIcon(card.iconId)}
                    </div>

                    <div>
                      <p className="text-sm md:text-base font-bold text-gray-900">
                        {card.title}
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 mt-1 leading-snug">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

