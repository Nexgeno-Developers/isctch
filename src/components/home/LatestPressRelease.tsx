import Image from 'next/image';
import Link from 'next/link';
import { fetchHomepageData } from '@/lib/api/home';
import type { PressReleaseCard } from '@/lib/api/home';

/**
 * Latest Press Release Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the section with press release cards.
 */
export default async function LatestPressRelease() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;
  const data = homepageData.latestPressRelease;
  if (!data || !data.cards.length) return null;

  const cardsPerView = 3;
  const visibleCards = data.cards.slice(0, cardsPerView);

  return (
    <section className=" bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-4 md:mb-12">
          <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold">
            <span className="text-black">Latest</span>{' '}
            <span className="text-[#009FE8]">Press Release</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {visibleCards.map((card, index) => (
            <PressReleaseCard key={card.id} card={card} imagePosition={index % 2 === 1 ? 'top' : 'bottom'} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Press Release Card Component
 */
function PressReleaseCard({ card, imagePosition }: { card: PressReleaseCard; imagePosition: 'top' | 'bottom' }) {
  return (
    <div className="bg-[#EDF0F1] rounded-[50px] overflow-hidden duration-300 h-full flex flex-col">
      {/* Image - Top Section (for 2nd card) */}
      {imagePosition === 'top' && (
        <div className="relative aspect-[16/10] md:h-56 md:aspect-auto rounded-[50px] overflow-hidden">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="px-6 md:px-8 py-8 md:py-12 flex-1 flex flex-col">
        {/* Category */}
        <div className="mb-3">
          <span className="text-sm md:text-[14px] font-[400] text-[#000]">
            {card.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[18px] md:text-2xl font-semibold mb-4 flex-1 text-black line-clamp-3">
          {card.title}
        </h3>

        {/* CTA Link */}
        <Link
          href={card.link}
          className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-medium hover:opacity-80 transition-opacity group"
        >
          Learn More
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

      {/* Image - Bottom Section (for 1st and 3rd cards) */}
      {imagePosition === 'bottom' && (
        <div className="relative aspect-[16/10] md:h-56 md:aspect-auto rounded-[50px] overflow-hidden">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
    </div>
  );
}
