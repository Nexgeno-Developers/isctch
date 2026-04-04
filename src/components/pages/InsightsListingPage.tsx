import type { InsightsListingData } from '@/lib/api/insights_listing_layout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { InsightCard } from '@/components/insights/InsightCard';
import { InsightsListingWithFilters } from '@/components/insights/InsightsListingWithFilters';
import { InsightsPageHero } from '@/components/insights/InsightsPageHero';

function cardVariant(kind: InsightsListingData['kind']): 'articles' | 'webinar' | 'newsletter' {
  if (kind === 'webinars') return 'webinar';
  if (kind === 'newsletter') return 'newsletter';
  return 'articles';
}

export default function InsightsListingPage({ data }: { data: InsightsListingData }) {
  const variant = cardVariant(data.kind);
  const isArticles = data.kind === 'articles';

  return (
    <main className="min-h-screen bg-gray-50">
      <InsightsPageHero titleHtml={data.title} backgroundImage={data.heroBackgroundImage} />

      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Insights', href: '/insights' },
              { label: data.breadcrumbLabel },
            ]}
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {data.subtitle ? (
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm md:mb-12 md:text-base text-gray-600">
              {data.subtitle}
            </p>
          ) : null}

          {isArticles ? (
            <InsightsListingWithFilters
              items={data.items}
              variant={variant}
              filterSubcategories={data.filterSubcategories}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {data.items.map((item) => (
                <InsightCard key={item.id} item={item} variant={variant} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
