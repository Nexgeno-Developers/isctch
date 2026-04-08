import type { InsightsListingData } from '@/lib/api/insights_listing_layout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import { InsightCard } from '@/components/insights/InsightCard';
import { InsightsListingWithFilters } from '@/components/insights/InsightsListingWithFilters';
import { InsightsPageHero } from '@/components/insights/InsightsPageHero';
import Link from 'next/link';

function cardVariant(kind: InsightsListingData['kind']): 'articles' | 'webinar' | 'newsletter' {
  if (kind === 'webinars') return 'webinar';
  if (kind === 'newsletter') return 'newsletter';
  return 'articles';
}

export default function InsightsListingPage({ data }: { data: InsightsListingData }) {
  const variant = cardVariant(data.kind);
  const isArticles = data.kind === 'articles';
  const pagination = data.pagination;
  const currentPage = pagination?.currentPage ?? 1;
  const lastPage = pagination?.lastPage ?? 1;
  const basePath = data.paginationPath || '';
  const hasPaginationLinks = Boolean(pagination && basePath);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < lastPage ? currentPage + 1 : null;
  const pageHref = (page: number) => (page <= 1 ? basePath : `${basePath}?page=${page}`);

  return (
    <main className="min-h-screen bg-gray-50">
      <InsightsPageHero titleHtml={data.title} backgroundImage={data.heroBackgroundImage} />

      <section className="bg-gray-50">
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
          
          {isArticles ? (
            <InsightsListingWithFilters
              items={data.items}
              variant={variant}
              filterSubcategories={data.filterSubcategories}
              filterLinks={data.filterLinks}
              allFilterLabel={data.allFilterLabel}
              allFilterHref={data.allFilterHref}
              allFilterActive={data.allFilterActive}
            />
          ) : (
            data.items.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center text-gray-600 shadow-sm ring-1 ring-black/5">
                No items available for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                {data.items.map((item) => (
                  <InsightCard key={item.id} item={item} variant={variant} />
                ))}
              </div>
            )
          )}

          {hasPaginationLinks && (prevPage || nextPage) ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {prevPage ? (
                <Link
                  href={pageHref(prevPage)}
                  className="rounded-full border-2 border-[#009FE8] px-6 py-3 text-sm font-semibold text-[#009FE8] transition-colors hover:bg-[#009FE8]/10"
                >
                  View less
                </Link>
              ) : null}
              {nextPage ? (
                <Link
                  href={pageHref(nextPage)}
                  className="rounded-full bg-[#009FE8] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#007db5]"
                >
                  View more
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}
