import Image from 'next/image';
import Link from 'next/link';

import type { PilotPlantFeatureCard } from '@/lib/api/pilot_plant_layout';

function ArrowIcon() {
  return (
    <svg className="ml-1 inline h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PilotPlantFeatureCards({ cards }: { cards: PilotPlantFeatureCard[] }) {
  return (
    <section className="bg-gray-50 pb-12 md:pb-16 lg:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col overflow-hidden rounded-[50px] bg-white p-4"
            >
              <div className="relative w-full overflow-hidden  h-[250px] lg:h-[300px]">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    width={1000}
                    height={1000}
                    className="object-cover rounded-[50px] object-top h-full"
                    sizes=""
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
              </div>
              <div className="flex flex-1 flex-col px-3 pb-8 pt-6 md:px-3">
                <h3 className="text-lg font-bold text-[#009FE8] md:text-xl">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-black md:text-base line-clamp-3">
                  {card.description}
                </p>
                <Link
                  href={card.linkHref}
                  className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-wide text-[#009FE8] transition hover:text-[#0080c4]"
                >
                  {card.linkText}
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
