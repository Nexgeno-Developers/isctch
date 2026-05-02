import Image from 'next/image';
import Link from 'next/link';

import type { GetInvolvedEngageSectionData } from '@/lib/api/getInvolved/types';

function CtaChevron() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GetInvolvedEngageSection({ data }: { data: GetInvolvedEngageSectionData }) {
  const { title, subtitle, cards } = data;
  if (!cards.length) return null;

  return (
    <section
      className="w-full bg-[#E8F2FA] py-12 sm:py-16 lg:py-20"
      aria-labelledby="get-involved-engage-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="get-involved-engage-heading"
            className="text-3xl font-black tracking-tight text-[#1B2535] sm:text-4xl lg:text-[40px]"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5B6673] sm:text-lg">{subtitle}</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => {
            const step = String(index + 1).padStart(2, '0');
            return (
              <article
                key={`${card.title}-${index}`}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_26px_-16px_rgba(15,23,42,0.45)] ring-1 ring-[#E5ECF3]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-[#E8EEF5]">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                  <span
                    className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded bg-white text-sm font-black text-[#EF7D00] shadow-sm"
                    aria-hidden
                  >
                    {step}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-6 text-center">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#D6EDFA]">
                    <Image
                      src={card.icon.src}
                      alt={card.icon.alt || card.title}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                  <h3 className="mt-5 text-xl font-black leading-tight text-[#1B2535]">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5B6673] sm:text-[15px]">
                    {card.description}
                  </p>
                  <Link
                    href={card.cta.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-[#EF7D00] transition-colors hover:text-[#cf6800]"
                  >
                    {card.cta.label}
                    <CtaChevron />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
