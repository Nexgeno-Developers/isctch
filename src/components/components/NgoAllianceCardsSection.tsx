import type { NgoAllianceCardsSectionData } from '@/lib/api/sustainability_layout_5';

export interface NgoAllianceCardsSectionProps {
  data: NgoAllianceCardsSectionData;
}

export default function NgoAllianceCardsSection({ data }: NgoAllianceCardsSectionProps) {
  return (
    <section className="py-14 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {data.cards.map((card) => (
            <div key={card.id} dangerouslySetInnerHTML={{ __html: card.html }} />
          ))}
        </div>
      </div>
    </section>
  );
}
