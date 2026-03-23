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

function renderCardIcon(iconId: GovernanceWhistleblowingCardsIconId) {
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
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {data.cards.map((card) => (
              <div
                key={card.id}
                className="bg-[#EEF2F3] rounded-[22px] px-8 py-10 text-center"
              >
                <div className="text-[#009FE8] flex justify-center">
                  {renderCardIcon(card.iconId)}
                </div>

                <div className="mt-6 text-gray-900 font-bold text-xl">
                  {card.title}
                </div>

                <p className="mt-3 text-xs md:text-sm text-gray-700 leading-snug max-w-[260px] mx-auto">
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

