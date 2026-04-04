import Image from 'next/image';

import type { NpdEcosystemCard as NpdEcosystemCardType } from '@/lib/api/npd_layout';

import { NpdEcosystemIcon } from './NpdEcosystemIcons';

type Props = {
  card: NpdEcosystemCardType;
};

export default function NpdEcosystemCard({ card }: Props) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]">
      <div className="relative aspect-[16/11] w-full bg-gray-100">
        {card.image ? (
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
      </div>
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6 text-center md:px-6">
        <div className="mb-4 flex justify-center text-[#009FE8]">
          {card.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- CMS icons
            <img src={card.iconUrl} alt="" className="h-10 w-10 object-contain" aria-hidden />
          ) : (
            <NpdEcosystemIcon variant={card.iconVariant} />
          )}
        </div>
        <h3 className="text-lg font-bold text-[#0E233C] md:text-xl">{card.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-black/65 md:text-base">{card.description}</p>
      </div>
    </article>
  );
}
