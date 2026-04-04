import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import type { InsightsHubData } from '@/lib/api/insights_layout';
import { InsightCard } from '@/components/insights/InsightCard';
import { InsightsPageHero } from '@/components/insights/InsightsPageHero';

function ViewAllButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="flex justify-center mt-10 md:mt-12">
      <Link
        href={href}
        className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-[#009FE8] px-8 py-3 text-sm md:text-base font-semibold text-[#009FE8] transition-colors hover:bg-[#009FE8] hover:text-white"
      >
        {label}
      </Link>
    </div>
  );
}

export default function InsightsHubPage({ data }: { data: InsightsHubData }) {
  return (
    <main className="min-h-screen bg-white">
      <InsightsPageHero titleHtml={data.title} backgroundImage={data.heroBackgroundImage} />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: 'Insights' }]} />
        </div>
      </section>

      {data.pageIntro ? (
        <section className="border-b border-gray-100 bg-white py-8 md:py-10">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{data.pageIntro}</p>
          </div>
        </section>
      ) : null}

      {/* Articles */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-center text-2xl md:text-3xl font-bold text-black"
            dangerouslySetInnerHTML={{ __html: data.articlesSectionTitle }}
          />
          {data.articlesSectionSubtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm md:text-base text-gray-600">
              {data.articlesSectionSubtitle}
            </p>
          ) : null}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {data.articles.map((item) => (
              <InsightCard key={item.id} item={item} variant="articles" />
            ))}
          </div>
          <ViewAllButton href={data.articlesViewAllHref} label="View all articles" />
        </div>
      </section>

      {/* Webinars */}
      <section className="bg-[#C5E3F4] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-center text-2xl md:text-3xl font-bold text-black"
            dangerouslySetInnerHTML={{ __html: data.webinarsSectionTitle }}
          />
          {data.webinarsSectionSubtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm md:text-base text-black/70">
              {data.webinarsSectionSubtitle}
            </p>
          ) : null}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {data.webinars.map((item) => (
              <InsightCard key={item.id} item={item} variant="webinar" />
            ))}
          </div>
          <ViewAllButton href={data.webinarsViewAllHref} label="View all webinars" />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-center text-2xl md:text-3xl font-bold text-black"
            dangerouslySetInnerHTML={{ __html: data.newsletterSectionTitle }}
          />
          {data.newsletterSectionSubtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm md:text-base text-gray-600">
              {data.newsletterSectionSubtitle}
            </p>
          ) : null}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {data.newsletter.map((item) => (
              <InsightCard key={item.id} item={item} variant="newsletter" />
            ))}
          </div>
          <ViewAllButton href={data.newsletterViewAllHref} label="View all newsletters" />
        </div>
      </section>
    </main>
  );
}
