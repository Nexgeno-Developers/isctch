import type { ReactNode } from 'react';

export type GovernanceWhistleblowingCardsIconId =
  | 'confidentiality'
  | 'non_retaliation'
  | 'fair_investigation';

export type GovernanceWhistleblowingCardsSectionData = {
  layout: 'whistleCards';
  cards: Array<{
    id: string;
    title: string;
    description: string;
    iconId: GovernanceWhistleblowingCardsIconId;
    iconUrl?: string;
  }>;
};

function IconOutline({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <svg
      width="34"
      height="34"
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

function renderCardIcon(iconId: GovernanceWhistleblowingCardsIconId, iconUrl?: string) {
  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt=""
        width={34}
        height={34}
        className="w-[50px] h-[50px] object-contain"
      />
    );
  }
  switch (iconId) {
    case 'confidentiality':
      return (
        <IconOutline>
          <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </IconOutline>
      );
    case 'non_retaliation':
      return (
        <IconOutline>
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          <path d="M9.5 14.5l5-5" />
          <path d="M14.5 14.5l-5-5" />
        </IconOutline>
      );
    case 'fair_investigation':
      return (
        <IconOutline>
          <circle cx="11" cy="11" r="7" />
          <path d="M16.5 16.5L22 22" />
          <path d="M8.8 10.3h4.4" />
          <path d="M8.8 13h3.2" />
        </IconOutline>
      );
    default:
      return null;
  }
}

export default function GovernanceWhistleblowingCardsSection({
  data,
}: {
  data: GovernanceWhistleblowingCardsSectionData;
}) {
  return (
    <section className="bg-gray-50 py-8 md:pb-12 pt-10 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {data.cards.map((card) => (
              <div
                key={card.id}
                className="bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] px-6 md:px-8 py-10 md:py-16 text-center"
              >
                <div className="text-[#009FE8] flex justify-center">
                  {renderCardIcon(card.iconId, card.iconUrl)}
                </div>

                <div className="mt-5 text-black font-bold text-[24px] md:text-[36px] leading-tight">
                  {card.title}
                </div>

                <p className="mt-3 text-[14px] md:text-base text-black leading-snug mx-auto">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

