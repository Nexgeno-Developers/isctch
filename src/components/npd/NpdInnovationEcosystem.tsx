import type { NpdPageData } from '@/lib/api/npd_layout';

import NpdEcosystemCard from './NpdEcosystemCard';

type Props = Pick<NpdPageData, 'ecosystemTitleBlack' | 'ecosystemTitleBlue' | 'ecosystemCards'>;

export default function NpdInnovationEcosystem({
  ecosystemTitleBlack,
  ecosystemTitleBlue,
  ecosystemCards,
}: Props) {
  return (
    <section className="bg-[#F8F9FA] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:mb-14 md:text-4xl lg:mb-16 lg:text-5xl">
          <span className="text-black">{ecosystemTitleBlack}</span>{' '}
          <span className="text-[#009FE8]">{ecosystemTitleBlue}</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ecosystemCards.map((card) => (
            <NpdEcosystemCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
