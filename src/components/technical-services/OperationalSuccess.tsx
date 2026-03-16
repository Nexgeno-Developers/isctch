import Image from 'next/image';
import type { TechnicalServiceData } from '@/fake-api/technical-services';

interface OperationalSuccessProps {
  data: TechnicalServiceData['operationalSuccess'];
}

/**
 * Operational Success Component (Server Component)
 * 
 * Displays a section with two cards showing Pilot Plan and R&D Center.
 * Each card features a product package image with themed background,
 * large semi-transparent text overlay, and a label with icon below.
 */
export default function OperationalSuccess({ data }: OperationalSuccessProps) {
  if (!data || !data.cards || data.cards.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            <span className="text-[#009FE8]">{data.headingHighlight}</span>{' '}
            {data.heading.replace(data.headingHighlight, '').trim()}
          </h2>
        </div>

        {/* Cards Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.cards.map((card) => (
            <div key={card.id} className="bg-white rounded-[50px] overflow-hidden p-[15px]">
              {/* Card Image Container */}
              <div className="relative w-full overflow-hidden">
                {/* Background Image */}
                <div className="relative w-full">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Large Semi-Transparent Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-6xl md:text-7xl lg:text-8xl font-bold opacity-30 select-none">
                      {card.overlayText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Label Below Card */}
              <div className="p-6 md:p-8 flex items-center justify-center gap-3">
                {/* Icon */}
                {card.icon === 'pilot-plan' ? (
                  <div className="relative">
                    {/* Building */}
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {/* Clipboard overlay */}
                    <svg
                      className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    {/* Pencil overlay */}
                    <svg
                      className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                ) : card.icon === 'rd-center' ? (
                  <div className="relative">
                    {/* Building */}
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {/* Gears overlay */}
                    <svg
                      className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                ) : null}
                
                {/* Title */}
                <span className="text-lg md:text-xl font-semibold text-gray-900">
                  {card.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
