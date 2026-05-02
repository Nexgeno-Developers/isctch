import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import SummitDetailRelatedEvents from '@/components/summits/SummitDetailRelatedEvents';
import { getCanonicalUrl } from '@/config/site';
import { SUMMITS_PAGE_SLUG, summitDetailPath } from '@/config/publicRoutes';
import { getSummitDetailPageData } from '@/lib/api/summits';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = `${SUMMITS_PAGE_SLUG}/${slug}`;
  const data = await getSummitDetailPageData(fullSlug);

  return {
    title: data.detail.title,
    description: data.detail.summary.slice(0, 160),
    alternates: { canonical: getCanonicalUrl(summitDetailPath(slug)) },
  };
}

export async function SummitDetailPageView({ slug }: { slug: string }) {
  const data = await getSummitDetailPageData(slug);

  return (
    <main className="bg-[#F8FAFC]">
      <section className="bg-[linear-gradient(125deg,_#F0FBFF_0%,_#FFF8F0_100%)] py-10 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-[#8b97a7]">
            <Link href="/" className="hover:underline">
              {data.hero.breadcrumbHomeLabel}
            </Link>{' '}
            / <span className="text-[#EF7D00]">{data.hero.breadcrumbCurrentLabel}</span>
          </p>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#009FE3]">
            {data.hero.kicker}
          </p>
          <h1 className="mt-6 text-[34px] font-black leading-tight tracking-tight lg:text-[52px]">
            <span className="text-[#009FE3]">{data.hero.titleBlue} </span>
            <span className="text-[#EF7D00]">{data.hero.titleOrange}</span>
          </h1>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start xl:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <div className="relative aspect-[16/8] overflow-hidden rounded-sm bg-[#E8EEF5]">
                <Image
                  src={data.detail.image.src}
                  alt={data.detail.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 70vw"
                  priority
                />
              </div>

              <div className="mt-7">
                <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#009FE3]">
                  {data.detail.location}
                </p>
                <h2 className="mt-4 text-2xl font-black leading-tight text-[#1A1A2E] lg:text-[36px]">
                  {data.detail.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#3E4850] lg:text-[18px]">{data.detail.summary}</p>
                <div className="space-y-4 mt-4 text-base leading-relaxed text-[#3E4850] lg:text-[18px]">
                  {data.detail.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              {data.detail.sidebarCards.map((card) => (
                <Link
                  key={`${card.title}-${card.image.src}`}
                  href={card.href}
                  className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-sm bg-white p-4 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.45)] ring-1 ring-[#EDF2F7] transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8EEF5]">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </span>
                  <span className="min-w-0 py-1">
                    <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-[#009FE3]">
                      {card.location}
                    </span>
                    <span className="mt-3 block text-base font-black text-[#1A1A2E]">{card.title}</span>
                  </span>
                </Link>
              ))}
            </aside>
          </div>

          <SummitDetailRelatedEvents cards={data.related.cards} />
        </div>
      </section>
    </main>
  );
}

export default async function SummitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <SummitDetailPageView slug={`${SUMMITS_PAGE_SLUG}/${slug}`} />;
}
