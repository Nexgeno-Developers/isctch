import Breadcrumbs from '@/components/common/Breadcrumbs';
import { RichText } from '@/components/common/RichText';
import { InsightsPageHero } from '@/components/insights/InsightsPageHero';
import { RelatedArticleCard } from '@/components/insights/RelatedArticleCard';
import type { InsightsArticleDetailPageData } from '@/lib/api/insights_article_detail_layout';

function buildHeroTitleHtml(data: InsightsArticleDetailPageData): string {
  if (!data.titleAccent) return data.titleMain;
  return `${data.titleMain} <span class="text-[#9fdbff]">${data.titleAccent}</span>`;
}

export default function InsightsArticleDetailPage({ data }: { data: InsightsArticleDetailPageData }) {
  const heroTitleHtml = buildHeroTitleHtml(data);

  return (
    <main className="min-h-screen bg-[#f5f7f8]">
      <InsightsPageHero
        titleHtml={heroTitleHtml}
        backgroundImage={data.heroImage}
        titleTag="div"
      />

      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Insights', href: '/insights' },
              { label: 'Articles', href: '/insights/articles' },
              { label: data.breadcrumbLabel },
            ]}
          />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="lg:col-span-8">
            <div className="rounded-lg bg-white p-5 md:p-8 lg:p-10 shadow-sm ring-1 ring-black/5">
              <header className="mb-8">
                <h1 className="text-2xl font-bold leading-tight text-black md:text-3xl lg:text-[32px]">
                  <span dangerouslySetInnerHTML={{ __html: data.titleMain }} />
                  {data.titleAccent ? (
                    <>
                      {' '}
                      <span className="text-[#009FE8]" dangerouslySetInnerHTML={{ __html: data.titleAccent }} />
                    </>
                  ) : null}
                </h1>
              </header>

              {data.heroImage ? (
                <div className="relative mb-8 w-full overflow-hidden rounded-[20px] bg-gray-100 aspect-[21/9] md:aspect-[2/1]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- CMS URLs */}
                  <img
                    src={data.heroImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <RichText
                html={data.bodyHtml}
                className="prose prose-lg max-w-none text-gray-800 prose-headings:font-bold prose-headings:text-black prose-p:leading-relaxed prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3"
              />
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              <h2 className="text-lg font-bold text-black">Related articles</h2>
              <div className="space-y-4">
                {data.relatedArticles.map((item) => (
                  <RelatedArticleCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
