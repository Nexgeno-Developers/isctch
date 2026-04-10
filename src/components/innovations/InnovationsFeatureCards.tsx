import Image from 'next/image';
import Link from 'next/link';

import type { InnovationsFeatureCard } from '@/lib/api/innovations_layout';

export default function InnovationsFeatureCards({ cards }: { cards: InnovationsFeatureCard[] }) {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col overflow-hidden rounded-[50px] bg-[#EDF0F1] p-4"
            >
              <div className="relative w-full overflow-hidden">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    height={1000}
                    width={1000}
                    className="object-cover rounded-[50px] h-[250px]"
                    sizes=""
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
              </div>
              <div className="flex flex-1 flex-col px-3 pb-4 pt-8 md:px-2 md:pb-4 md:pt-9">
                <h3 className="text-xl font-bold text-black md:text-2xl">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-black md:text-base">{card.description}</p>
                <ul className="mt-6 space-y-3">
                  {card.bullets.filter(Boolean).map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug text-black md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009FE8]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="lg:mt-10">
                  <Link
                    href={card.ctaHref}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#009FE8] px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#0088cc] md:text-base"
                  >
                    {card.ctaText}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
