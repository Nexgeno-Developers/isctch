import Link from 'next/link';
import type { WorkInSustainabilityData, SustainabilityWorkCard } from '@/fake-api/homepage';

interface WorkInSustainabilityClientProps {
  data: WorkInSustainabilityData;
}

export default function WorkInSustainabilityClient({ data }: WorkInSustainabilityClientProps) {
  const cardsPerView = 3;
  const visibleCards = data.cards.slice(0, cardsPerView);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Title */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-gray-900">Work in</span>{' '}
            <span className="text-[#009FE8]">Sustainability</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {visibleCards.map((card) => (
            <WorkCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Work Card Component
 */
function WorkCard({ card }: { card: SustainabilityWorkCard }) {
  return (
    <div className="bg-[#EDF0F1] rounded-[50px] px-6 py-[60px] md:px-8 md:py-[80px] h-full">
      {/* Icon */}
      <div className="mb-6">
        <div className={`w-16 h-16 ${card.iconShape === 'square' ? 'rounded-lg' : card.iconShape === 'circle' ? 'rounded-full' : 'rounded-t-lg rounded-b-sm'} bg-[#009FE8] flex items-center justify-center`}>
          {card.icon === 'A+' ? (
            <span className="text-white text-2xl font-bold">A+</span>
          ) : card.icon === 'star' ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ) : card.icon === 'checkmark' ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : null}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
        {card.description}
      </p>

      {/* CTA Link */}
      <Link
        href={card.link}
        className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-medium hover:text-[#0077B6] transition-colors group"
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
  );
}
