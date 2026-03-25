'use client';

import Link from 'next/link';
import type { LamiStrawIconId, LamiStrawLandingSectionData } from '@/fake-api/page-builder';
import type { ReactElement } from 'react';

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-14 w-14 rounded-2xl bg-[#B7D7EA] flex items-center justify-center">
      {children}
    </div>
  );
}

function IconU() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M7 7V17C7 21 10 23 14 23C18 23 21 21 21 17V7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTelescope() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M8 20L20 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 8H20V16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </svg>
  );
}

function IconI() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M9 9L19 19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconFlow() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M9 9L19 19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 19H18V11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </svg>
  );
}

const iconById: Record<LamiStrawIconId, () => ReactElement> = {
  u: () => <IconU />,
  telescope: () => <IconTelescope />,
  i: () => <IconI />,
  flow: () => <IconFlow />,
};

function StrawCard({
  card,
}: {
  card: LamiStrawLandingSectionData['cards'][number];
}) {
  const Icon = iconById[card.iconId] ?? iconById.u;

  return (
    <div className="bg-[#EEF2F3] rounded-[22px] p-6 flex flex-col min-h-[210px]">
      <div className="flex items-start gap-4">
        <IconBase>
          {card.image ? (
            <img
              src={card.image}
              alt={card.imageAlt || card.title}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <Icon />
          )}
        </IconBase>
        <div className="flex-1">
          <h3 className="text-[#0A4A7A] text-lg md:text-xl font-bold leading-snug">
            {card.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm md:text-base text-black/70 leading-relaxed">
        {card.description}
      </p>

      {card.href && (
        <div className="mt-auto pt-5">
          <Link
            href={card.href}
            className="text-[#009FE8] text-xs md:text-sm font-medium inline-flex items-center hover:opacity-80 transition-opacity"
          >
            {card.readMoreLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

export function LamiStrawLandingSection({
  data,
}: {
  data: LamiStrawLandingSectionData;
}) {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#009FE8] text-xs md:text-sm font-semibold tracking-wider uppercase mb-5">
            {data.eyebrow}
          </p>
          <h1 className="text-[22px] md:text-4xl font-bold text-black leading-tight">
            {data.title}
          </h1>
          <div className="mt-5 text-sm md:text-base text-black/70 leading-relaxed space-y-4">
            {data.descriptionLines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {data.cards.map((card) => (
              <StrawCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

