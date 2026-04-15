import type { ReactNode } from 'react';
import { formatBoldText } from '@/lib/htmlText';
export type GovernanceSecurityTrustIconId =
  | 'confidentiality'
  | 'integrity'
  | 'availability';

export type GovernanceSecurityTrustCard = {
  id: string;
  title: string;
  description: string;
  iconId: GovernanceSecurityTrustIconId;
  iconUrl?: string;
};

export type GovernanceSecurityTrustSectionData = {
  layout: 'securityTrust';
  eyebrow: string;
  titleBlue: string;
  title: string;
  leftParagraphs: string[];
  cards: GovernanceSecurityTrustCard[];
  stats: Array<{
    id: string;
    value: string;
    label: string;
  }>;
};

function IconOutline({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <svg
      width="30"
      height="30"
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
  );
}

import Image from 'next/image';

function renderCardIcon(iconId: GovernanceSecurityTrustIconId, iconUrl?: string) {
  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt=""
        width={30}
        height={30}
        className="w-[30px] h-[30px] object-contain"
      />
    );
  }
  switch (iconId) {
    case 'confidentiality':
      return (
        <IconOutline>
          <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
          <path d="M9.5 10.5l1.5 1.5 3.5-3.5" />
        </IconOutline>
      );
    case 'integrity':
      return (
        <IconOutline>
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </IconOutline>
      );
    case 'availability':
      return (
        <IconOutline>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12h7" />
          <path d="M12 8.5v7" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
        </IconOutline>
      );
    default:
      return null;
  }
}

export default function GovernanceSecurityTrustSection({
  data,
}: {
  data: GovernanceSecurityTrustSectionData;
}) {
  return (
    <section className="bg-gray-50 py-4 md:py-12">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="text-[#009FE8] font-semibold text-sm md:text-base">
          {data.title}
          </div>

          <h2 className="mt-2 text-[24px] md:text-5xl font-bold leading-tight text-black"
          dangerouslySetInnerHTML={{ __html: formatBoldText(data.eyebrow) }} />
       

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 items-start">
            <div className="space-y-4 text-black">
              {data.leftParagraphs.map((p) => (
                <p key={p} className="text-[14px] md:text-base text-black leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-4">
              {data.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] p-4 md:p-5 flex items-center gap-4"
                >
                  <div className="flex items-center justify-center text-[#009FE8] shrink-0">
                    <div className="text-[#009FE8] mt-0.5">
                      {renderCardIcon(card.iconId, card.iconUrl)}
                    </div>
                    </div>

                    <div>
                      <p className="text-[14px] md:text-lg font-bold text-black leading-snug">
                        {card.title}
                      </p>
                      <p className="text-[14px] md:text-sm text-black mt-1 leading-snug">
                        {card.description}
                      </p>
                    </div>
                  
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] px-2 py-10 md:py-8 lg:py-16 text-center"
                >
                  <div className="text-black font-extrabold text-[28px] md:text-[32px] lg:text-[42px] leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-[14px] md:text-sm text-black leading-snug">
                    {stat.label}
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

