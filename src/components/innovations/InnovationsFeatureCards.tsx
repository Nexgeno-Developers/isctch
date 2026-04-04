import Image from 'next/image';
import Link from 'next/link';

import type { InnovationsFeatureCard } from '@/lib/api/innovations_layout';

export default function InnovationsFeatureCards({ cards }: { cards: InnovationsFeatureCard[] }) {
  return (
    <section className="bg-white pb-16 md:pb-24 lg:pb-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col overflow-hidden rounded-[26px] bg-[#F4F7F9] shadow-[0_16px_48px_rgba(10,39,68,0.08)] ring-1 ring-black/[0.05]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-200">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
              </div>
              <div className="flex flex-1 flex-col px-7 pb-9 pt-8 md:px-9 md:pb-10 md:pt-9">
                <h3 className="text-xl font-bold text-black md:text-2xl">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{card.description}</p>
                <ul className="mt-6 space-y-3">
                  {card.bullets.filter(Boolean).map((line, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug text-gray-700 md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009FE8]" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
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
