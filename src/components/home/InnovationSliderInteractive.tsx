import Image from 'next/image';
import Link from 'next/link';
import type { InnovationCard } from '@/fake-api/homepage';

// Navigation component - Removed interactivity (server-side)
export function Navigation({ cards }: { cards: InnovationCard[] }) {
  // Navigation removed since slider functionality is disabled
  return null;
}

// Cards component - Display first 3 cards statically
export function Cards({ cards }: { cards: InnovationCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {cards.slice(0, 3).map((card) => (
        <InnovationCard key={card.id} card={card} />
      ))}
    </div>
  );
}

// Main component - Server-side wrapper
export default function InnovationSliderInteractive({ 
  cards, 
  children 
}: { 
  cards: InnovationCard[]; 
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

InnovationSliderInteractive.Navigation = Navigation;
InnovationSliderInteractive.Cards = Cards;

/**
 * Innovation Card Component
 */
function InnovationCard({ card }: { card: InnovationCard }) {
  const isHighlighted = card.isHighlighted || false;
  const cardBgClass = isHighlighted ? 'bg-[#009FE8]' : 'bg-[#EDF0F1]';
  const textColorClass = isHighlighted ? 'text-white' : 'text-gray-900';
  const linkColorClass = isHighlighted ? 'text-white' : 'text-[#009FE8]';

  return (
    <div className={`${cardBgClass} rounded-[50px] overflow-hidden transition-shadow duration-300 h-full flex flex-col p-[30px]`}>
      {/* Image - Position depends on card type */}
      {card.imagePosition === 'top' ? (
        <div className="relative h-48 md:h-56 overflow-hidden rounded-[50px]">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}

      {/* Content */}
      <div className={`pt-8 pb-0 flex-1 flex flex-col ${card.imagePosition === 'bottom' ? 'order-1' : ''}`}>
        {/* Time and Date */}
        <div className={`flex items-center gap-4 mb-4 ${textColorClass}`}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm md:text-base">{card.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm md:text-base">{card.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-xl md:text-[24px] font-semibold mb-4 flex-1 ${textColorClass}`}>
          {card.title}
        </h3>

        {/* CTA Link */}
        <Link
          href={card.link}
          className={`inline-flex items-center ${linkColorClass} text-base md:text-lg font-medium hover:opacity-80 transition-opacity group mt-auto`}
        >
          {card.ctaText}
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Image - Bottom position */}
      {card.imagePosition === 'bottom' ? (
        <div className="relative rounded-[50px] h-48 md:h-56 overflow-hidden order-2 mt-4">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
    </div>
  );
}
