import type { NpdPageData } from '@/lib/api/npd_layout';

import NpdEcosystemCard from './NpdEcosystemCard';

type Props = Pick<NpdPageData, 'ecosystemTitleBlack' | 'ecosystemTitleBlue' | 'ecosystemCards'>;

export default function NpdInnovationEcosystem({
  ecosystemTitleBlack,
  ecosystemTitleBlue,
  ecosystemCards,
}: Props) {
  return (
    <section className="bg-gray-50 pb-8 md:pb-20 lg:pb-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-[22px] font-bold md:mb-14 md:text-4xl lg:mb-10 lg:text-5xl">
          <span className="text-black">The Innovation</span>{' '}
          <span className="text-[#009FE8]">Ecosystem</span>
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
