import type { DynamicPageData } from '@/fake-api/dynamic-pages';

type SectionData = NonNullable<DynamicPageData['ngosAllianceCardsSection']>;

export interface NgoAllianceCardsSectionProps {
  data: SectionData;
}

export default function NgoAllianceCardsSection({ data }: NgoAllianceCardsSectionProps) {
  const accent = data.accentColor ?? '#EDF0F1';
  const borderStrong = data.highlightBorderColor ?? accent;
  const cardBg = data.cardBackgroundColor ?? '#EDF0F1';
  const sectionBg = data.sectionBackgroundColor ?? '#ffffff';

  const labels = {
    organization: data.fieldLabels?.organization ?? 'ORGANIZATION',
    initiative: data.fieldLabels?.initiative ?? 'INITIATIVE',
    recyclingTarget: data.fieldLabels?.recyclingTarget ?? 'RECYCLING TARGET',
  };

  const labelClass =
    'text-[11px] font-bold uppercase tracking-[0.12em] md:text-xs';
  const titleLabelClass = `${labelClass} mb-3 md:mb-4`;

  return (
    <section className="py-14 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {data.cards.map((card) => {
            const highlighted = Boolean(card.highlighted);
            return (
              <article
                key={card.id}
                className="flex flex-col rounded-[30px] px-8 py-9 md:px-10 md:py-10"
                style={{
                  backgroundColor: cardBg,
                  borderColor: highlighted ? borderStrong : undefined,
                }}
              >
                <div>
                  <p className={titleLabelClass} style={{ color: accent }}>
                    {labels.organization}
                  </p>
                  <p className="text-base font-bold leading-snug text-gray-900 md:text-lg">
                    {card.organizationName}
                  </p>
                </div>

                <div className="mt-8 md:mt-10">
                  <p className={titleLabelClass} style={{ color: accent }}>
                    {labels.initiative}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-900 md:text-base">
                    {card.initiativeDescription}
                  </p>
                </div>

                <div className="mt-8 md:mt-10">
                  <p className={titleLabelClass} style={{ color: accent }}>
                    {labels.recyclingTarget}
                  </p>
                  <div className="space-y-2">
                    {card.recyclingTargets.map((line, idx) => (
                      <p
                        key={idx}
                        className="text-sm font-bold leading-relaxed text-gray-900 md:text-base"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
