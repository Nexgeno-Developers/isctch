import Link from 'next/link';
import Image from 'next/image';
import { formatBoldText } from '@/lib/htmlText';
import { fetchHomepageData } from '@/lib/api/home';
import type { CommercialServiceCard } from '@/lib/api/home';

/**
 * Commercial Services Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the commercial services section
 * with two service cards side-by-side.
 */
export default async function CommercialServices() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;
  const data = homepageData.commercialServices;

  return (
    <section className="bg-[#f8f8f8] pt-10 md:pt-16 lg:pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-12">
          <span className="text-[#009FE8]">Lamipak</span>{' '}
          <span className="text-black">Commercial Services</span>
        </h2>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {data.cards.map((card) => (
            <ServiceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Service Card Component
 */
function ServiceCard({ card }: { card: CommercialServiceCard }) {
  return (
    <div className="bg-[#009de61a] rounded-[25px]  overflow-hidden transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-[16/10] md:h-80 md:aspect-auto overflow-hidden rounded-t-[25px]">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Title with Icon */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[18px] md:text-2xl lg:text-3xl font-bold text-[#009FE8]">
            {card.title}
          </h3>
          {/* Icon: CMS SVG URL or built-in glyph */}
          <span className="text-[#009FE8] flex-shrink-0 ml-4 flex items-center justify-center">
            {card.iconUrl ? (
              <Image
                src={card.iconUrl}
                alt=""
                width={32}
                height={32}
                className="h-6 w-6 md:h-8 md:w-8 object-contain"
                unoptimized
              />
            ) : card.icon === 'gear' ? (
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.4-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
              </svg>
            ) : card.icon === 'megaphone' ? (
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            ) : null}
          </span>
        </div>

        {/* Description */}
        <p className="text-black text-[14px] md:text-base mb-6 leading-relaxed line-clamp-4">
          {card.description}
        </p>

        {/* CTA Link */}
        <Link
          href={card.ctaLink}
          className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-medium hover:text-[#0077B6] transition-colors group"
        >
          {card.ctaText}
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
