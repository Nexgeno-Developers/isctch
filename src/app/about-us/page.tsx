import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import AboutCoreValuesSection from '@/components/about/AboutCoreValuesSection';
import AboutManagementTeamSection from '@/components/about/AboutManagementTeamSection';
import { ABOUT_US_PAGE_SLUG, aboutUsPath } from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';
import { getAboutPageData } from '@/lib/api/about';
import type { AboutValueCard } from '@/lib/api/about/types';

function ValueIcon({ icon }: { icon: AboutValueCard['icon'] }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF4EA] text-[#EF7D00]">
      {icon === 'flag' ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 21V4m0 0h10l-1.5 4L16 12H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
    </span>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData(ABOUT_US_PAGE_SLUG);
  return {
    title: data.hero.breadcrumbCurrentLabel,
    description: data.story.body[0]?.slice(0, 160),
    alternates: { canonical: getCanonicalUrl(aboutUsPath()) },
  };
}

export async function AboutPageView({ slug = ABOUT_US_PAGE_SLUG }: { slug?: string }) {
  const data = await getAboutPageData(slug);

  return (
    <main className="bg-[#F4F8FC]">
      <section className="bg-[linear-gradient(125deg,_#F0FBFF_0%,_#FFF8F0_100%)] py-10 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-[#8b97a7]">
            <Link href="/" className="hover:underline">
              {data.hero.breadcrumbHomeLabel}
            </Link>{' '}
            / <span className="text-[#EF7D00]">{data.hero.breadcrumbCurrentLabel}</span>
          </p>
          <h1 className="mt-8 text-[34px] font-black leading-tight tracking-tight lg:text-[44px]">
            <span className="text-[#009FE3]">{data.hero.titleBlue}</span>{' '}
            <span className="text-[#EF7D00]">{data.hero.titleOrange}</span>
          </h1>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[5/6] overflow-hidden rounded-md bg-[#E8EEF5] shadow-[0_22px_45px_-30px_rgba(15,23,42,0.55)]">
            <Image
              src={data.story.image.src}
              alt={data.story.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-[#EF7D00]" aria-hidden />
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#EF7D00]">
                {data.story.kicker}
              </p>
            </div>
            <h2 className="mt-6 text-2xl font-black text-[#3E4850] lg:text-[32px]">
              {data.story.heading}
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-8 text-[#3E4850]">
              {data.story.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EF7D00] py-12 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="mx-auto max-w-[860px] text-[30px] font-black leading-snug text-white lg:text-[42px]">
            &quot;{data.quote}&quot;
          </blockquote>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
          {data.valueCards.map((card) => (
            <article
              key={card.number}
              className="rounded-[8px] bg-white p-8 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)]"
            >
              <div className="flex items-start justify-between gap-5">
                <p className="text-[42px] font-light leading-none text-[#DFF4FD]">{card.number}</p>
                <ValueIcon icon={card.icon} />
              </div>
              <h3 className="mt-9 text-xl font-black text-[#1A1A2E]">{card.title}</h3>
              <p className="mt-5 text-sm leading-7 text-[#3E4850]">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <AboutCoreValuesSection data={data.coreValues} />

      <AboutManagementTeamSection team={data.managementTeam} cta={data.cta} />
    </main>
  );
}

export default function AboutPage() {
  if (ABOUT_US_PAGE_SLUG !== 'about-us') {
    redirect(aboutUsPath());
  }
  return <AboutPageView slug={ABOUT_US_PAGE_SLUG} />;
}
