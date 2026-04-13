import Breadcrumbs from '@/components/common/Breadcrumbs';
import { RichText } from '@/components/common/RichText';
import { InsightsPageHero } from '@/components/insights/InsightsPageHero';
import { RelatedArticleCard } from '@/components/insights/RelatedArticleCard';
import type { InsightsArticleDetailPageData } from '@/lib/api/insights_article_detail_layout';
import Image from 'next/image';
import Link from 'next/link';

function formatDateLabel(value?: string) {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

function primaryCategory(categories?: Array<{ label: string; href?: string }>) {
  return categories?.[0];
}

function titleFromSegment(segment: string) {
  return segment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function buildHeroTitleHtml(data: InsightsArticleDetailPageData): string {
  if (!data.titleAccent) return data.titleMain;
  return `${data.titleMain} <span class="text-[#9fdbff]">${data.titleAccent}</span>`;
}

export default function InsightsArticleDetailPage({ data }: { data: InsightsArticleDetailPageData }) {
  const heroTitleHtml = buildHeroTitleHtml(data);
  const publishedLabel = formatDateLabel(data.publishedAt);
  const primaryCat = primaryCategory(data.categories);
  const breadcrumbParentLabel = data.breadcrumbParentLabel || primaryCat?.label || 'Articles';
  const breadcrumbParentHref = data.breadcrumbParentHref || primaryCat?.href || '/insights/articles';
  const rootSegment = breadcrumbParentHref
    ? breadcrumbParentHref.replace(/^\/+|\/+$/g, '').split('/')[0]
    : 'insights';
  const breadcrumbRootLabel = titleFromSegment(rootSegment || 'insights');
  const breadcrumbRootHref = `/${rootSegment || 'insights'}`;

  return (
    <main className="min-h-screen bg-[#f5f7f8]">
      <InsightsPageHero
        titleHtml={heroTitleHtml}
        backgroundImage={data.heroImage}
        titleTag="div"
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: breadcrumbRootLabel, href: breadcrumbRootHref },
              { label: breadcrumbParentLabel, href: breadcrumbParentHref },
              { label: data.breadcrumbLabel },
            ]}
          />
        </div>
      </section>

<div className="bg-gray-50 lg:py-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <article className="lg:col-span-9">
            <div className="lg:rounded-[50px] rounded-[20px] bg-white p-5 md:p-8 lg:p-10">
              <header className="mb-8">
                <h1 className="text-[22px] font-bold leading-tight text-black md:text-3xl lg:text-4xl">
                  <span dangerouslySetInnerHTML={{ __html: data.titleMain }} />
                  {data.titleAccent ? (
                    <>
                      {' '}
                      <span className="text-[#009FE8]" dangerouslySetInnerHTML={{ __html: data.titleAccent }} />
                    </>
                  ) : null}
                </h1>
                {data.summary ? (
                  <p className="mt-4 text-sm leading-relaxed text-black md:text-[14px]">
                    {data.summary}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-black/60">
                  {data.authorAvatar ? (
                    <Image
                      src={data.authorAvatar}
                      alt={data.authorName || 'Author'}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#009FE8]/10 text-xs font-bold text-[#009FE8]">
                      {data.authorName ? data.authorName.slice(0, 1).toUpperCase() : 'L'}
                    </div>
                  )}
                  {data.authorName ? (
                    <span className="font-semibold text-black">{data.authorName}</span>
                  ) : null}
                  {publishedLabel ? (
                    <span className="text-black/40">•</span>
                  ) : null}
                  {publishedLabel ? <span>{publishedLabel}</span> : null}
                  {data.categories?.length ? (
                    <>
                      <span className="text-black/40">•</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {data.categories.map((cat) =>
                          cat.href ? (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="rounded-full border border-[#009FE8]/30 bg-[#009FE8]/10 px-3 py-1 text-xs font-semibold text-[#009FE8]"
                            >
                              {cat.label}
                            </Link>
                          ) : (
                            <span
                              key={cat.label}
                              className="rounded-full border border-[#009FE8]/30 bg-[#009FE8]/10 px-3 py-1 text-xs font-semibold text-[#009FE8]"
                            >
                              {cat.label}
                            </span>
                          ),
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              </header>

              {data.heroImage ? (
                <div className="relative mb-8 w-full overflow-hidden ">
                  {/* eslint-disable-next-line @next/next/no-img-element -- CMS URLs */}
                  <Image
                    src={data.heroImage}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-full w-full object-cover rounded-[50px]"
                  />
                </div>
              ) : null}

              <RichText
                html={data.bodyHtml}
                className="articals_detials prose prose-lg max-w-none text-black prose-headings:font-bold prose-headings:text-black prose-p:leading-relaxed prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3"
              />
            </div>
          </article>

          <aside className="lg:col-span-3">
            {data.rightSideBlocks?.length ? (
              <div className="sticky top-6 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-black/60">
                  Sponsored
                </h2>
                <div className="space-y-4">
                  {data.rightSideBlocks.map((block) => {
                    const card = (
                      <div className="overflow-hidden rounded-[40px] bg-white p-3 shadow-sm ring-1 ring-black/5">
                        {block.image ? (
                          <Image
                            src={block.image}
                            alt={block.imageAlt}
                            width={600}
                            height={800}
                            className="h-auto w-full rounded-[32px] object-cover"
                          />
                        ) : null}
                      </div>
                    );
                    return block.href ? (
                      <Link key={block.id} href={block.href} className="block">
                        {card}
                      </Link>
                    ) : (
                      <div key={block.id}>{card}</div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        {data.relatedPosts?.length ? (
          <section className="mt-4 lg:mt-16">
            <h2 className="text-[22px] font-bold text-black">Related posts</h2>
            <div className="lg:mt-6 mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.relatedPosts.map((item) => (
                <RelatedArticleCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
      </div>
    </main>
  );
}
