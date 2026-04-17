import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import type { InsightsHubData } from '@/lib/api/insights_layout';
import { InsightCard } from '@/components/insights/InsightCard';
import { InsightsPageHero } from '@/components/insights/InsightsPageHero';
import { plainTextFromMaybeHtml } from '@/lib/htmlText';

function ViewAllButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  if (!href) return null;
  return (
    <div className="flex justify-center mt-6 md:mt-12">
      <Link
        href={href}
        className="inline-flex min-w-[200px] capitalize items-center justify-center rounded-full border-2 border-[#009FE8] px-8 py-3 text-sm md:text-base font-semibold text-[#009FE8] transition-colors hover:bg-[#009FE8] hover:text-white"
      >
        {label}
      </Link>
    </div>
  );
}

export default function InsightsHubPage({ data }: { data: InsightsHubData }) {
  const breadcrumbLabel =
    data.breadcrumbLabel || plainTextFromMaybeHtml(data.title) || 'Insights';

  const fallbackSections = [
    {
      id: 'articles',
      title: data.articlesSectionTitle,
      subtitle: data.articlesSectionSubtitle,
      items: data.articles,
      viewAllHref: data.articlesViewAllHref,
      variant: 'articles' as const,
      viewAllLabel: 'View all articles',
    },
    {
      id: 'webinars',
      title: data.webinarsSectionTitle,
      subtitle: data.webinarsSectionSubtitle,
      items: data.webinars,
      viewAllHref: data.webinarsViewAllHref,
      variant: 'webinar' as const,
      viewAllLabel: 'View all webinars',
    },
    {
      id: 'newsletter',
      title: data.newsletterSectionTitle,
      subtitle: data.newsletterSectionSubtitle,
      items: data.newsletter,
      viewAllHref: data.newsletterViewAllHref,
      variant: 'newsletter' as const,
      viewAllLabel: 'View all newsletters',
    },
  ];

  const sections = (data.sections && data.sections.length ? data.sections : fallbackSections).filter(
    (section) => section.items && section.items.length > 0,
  );

  return (
    <main className="min-h-screen bg-white">
      <InsightsPageHero titleHtml={data.title} backgroundImage={data.heroBackgroundImage} />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: breadcrumbLabel }]} />
        </div>
      </section>

      {sections.map((section, index) => {
        const plainTitle = plainTextFromMaybeHtml(section.title);
        const viewAllLabel =
          section.viewAllLabel ||
          (plainTitle ? `View all ${plainTitle.toLowerCase()}` : 'View all');

        const sectionBg =
          section.variant === 'webinar' ? 'bg-[#C5E3F4]' : 'bg-gray-50';

        return (
          <section key={section.id} className={`${sectionBg} py-8 md:py-16`}>
            <div className="container mx-auto px-4">
              <h2
                className="text-center text-2xl md:text-5xl font-bold text-black"
                dangerouslySetInnerHTML={{ __html: section.title }}
              />
              {section.subtitle ? (
                <p className="mx-auto mt-3 max-w-2xl text-center text-sm md:text-base text-black/80">
                  {section.subtitle}
                </p>
              ) : null}
              <div className="mt-4 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 md:gap-8">
                {section.items.map((item) => (
                  <InsightCard key={item.id} item={item} variant={section.variant} />
                ))}
              </div>
              {section.viewAllHref ? (
                <ViewAllButton href={section.viewAllHref} label={viewAllLabel} />
              ) : null}
            </div>
          </section>
        );
      })}

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}
