import Image from 'next/image';
import Link from 'next/link';
// import { formatBoldText } from '@/lib/htmlText';


import type {
  RAndDCentreLifecycleCard,
  RAndDCentrePageData,
  RAndDCentreStatCard,
  RAndDLaboratoryZoneItem,
} from '@/lib/api/r_and_d_centre_layout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { RichText } from '@/components/common/RichText';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import LatestNewsClient from '@/components/marketing/LatestNewsClient';
import { fetchInnovationsLayoutPage } from '@/lib/api/innovations_layout';

function LifecycleLineIcon({ variant }: { variant: number }) {
  const c = 'h-10 w-10 text-[#009FE8]';
  switch (variant % 6) {
    case 0:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth={1.6} strokeLinecap="round" d="M6 28h6v8H6zM14 22h6v14h-6zM22 16h6v20h-6zM30 10h4v26h-4" />
          <circle cx={31} cy={9} r={3.5} strokeWidth={1.6} />
          <path strokeWidth={1.6} d="M33.5 11.5l4 4" />
        </svg>
      );
    case 1:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" d="M6 28 L12 22 L18 24 L24 14 L30 10 L34 6" />
          <circle cx={12} cy={22} r={2} fill="currentColor" />
          <circle cx={24} cy={14} r={2} fill="currentColor" />
          <circle cx={30} cy={10} r={2} fill="currentColor" />
        </svg>
      );
    case 2:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <rect x={8} y={10} width={22} height={18} rx={2} strokeWidth={1.6} />
          <path strokeWidth={1.6} strokeLinecap="round" d="M14 16h12M14 20h8M14 24h10" />
          <circle cx={28} cy={12} r={5} strokeWidth={1.6} />
          <path strokeWidth={1.6} strokeLinecap="round" d="M30.5 14.5l3 3" />
        </svg>
      );
    case 3:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <path
            strokeWidth={1.6}
            strokeLinejoin="round"
            d="M20 5l11 4v9c0 7.5-11 15-11 15S9 25.5 9 18V9l11-4z"
          />
          <path strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" d="M16 18l3 3 6-7" />
        </svg>
      );
    case 4:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <ellipse cx={20} cy={16} rx={10} ry={11} strokeWidth={1.6} />
          <circle cx={20} cy={14} r={3} strokeWidth={1.6} />
          <path strokeWidth={1.6} strokeLinecap="round" d="M8 24c4 6 20 6 24 0" />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden>
          <circle cx={14} cy={14} r={5} strokeWidth={1.6} />
          <circle cx={26} cy={14} r={5} strokeWidth={1.6} />
          <circle cx={20} cy={24} r={5} strokeWidth={1.6} />
          <path strokeWidth={1.6} d="M17.5 17.5l5 3M22.5 17.5l-5 3M14 19l12 0" />
        </svg>
      );
  }
}

/** Shared grey line icon: clipboard, chart, and test tube */
function LaboratoryZoneIcon() {
  return (
    <svg
      className="h-[52px] w-[52px] shrink-0 text-[#B8BCC2]"
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <rect x="10" y="6" width="26" height="36" rx="2.5" strokeWidth={1.4} />
      <path strokeWidth={1.4} strokeLinecap="round" d="M17 6V4.5A3.5 3.5 0 0120.5 1h3A3.5 3.5 0 0127 4.5V6" />
      <path strokeWidth={1.3} strokeLinecap="round" d="M16 16h14M16 21h14M16 26h9" />
      <rect x="14" y="12" width="10" height="8" rx="1" strokeWidth={1.2} />
      <path strokeWidth={1.3} strokeLinecap="round" d="M16 14h6M16 16h4" />
      <path strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" d="M40 10v30" />
      <path
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M37 40h6M38 12h4a1.2 1.2 0 011.2 1.2v10a4 4 0 01-8 0v-10A1.2 1.2 0 0138 12z"
      />
    </svg>
  );
}

function LaboratoryZoneRow({ item }: { item: RAndDLaboratoryZoneItem }) {
  return (
    <div className="flex flex-col gap-5 border-b border-black/[0.08] lg:py-9 py-4 last:border-b-0 md:flex-row md:items-start md:gap-10 md:py-11">
      <div className="flex shrink-0 lg:justify-center justify-start md:w-[72px] md:justify-start md:pt-1">
        {item.iconUrl ? (
          <Image
            src={item.iconUrl}
            alt=""
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain opacity-90"
            aria-hidden
          />
        ) : (
          <LaboratoryZoneIcon />
        )}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <h3 className="text-base font-bold uppercase tracking-[0.06em] text-black md:text-lg" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
        <p className="mt-3 text-sm leading-relaxed text-black md:text-base" dangerouslySetInnerHTML={{ __html: item.description }}></p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={`${item.id}-${tag}`}
              className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-black"
              dangerouslySetInnerHTML={{ __html: tag }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LifecycleTestingCard({ card, index }: { card: RAndDCentreLifecycleCard; index: number }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[50px] bg-[#EDF0F1] p-6 md:p-8">
      
      <div className="mb-5 flex h-12 w-12 items-center justify-start">
        {card.iconUrl ? (
          <Image
            src={card.iconUrl}
            alt=""
            width={48}
            height={48}
            className="max-h-12 max-w-12 object-contain"
            aria-hidden
          />
        ) : (
          <LifecycleLineIcon variant={index} />
        )}
      </div>
      <h3 className="text-lg font-bold leading-snug text-[#0E233C] md:text-xl" dangerouslySetInnerHTML={{ __html: card.title }} />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-black md:text-base" dangerouslySetInnerHTML={{ __html: card.description }} />
      <div className="mt-6 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span
            key={`${card.id}-${tag}`}
            className="rounded-full  bg-[#CFD6D8] px-3 py-1.5 text-xs font-medium text-black"
            dangerouslySetInnerHTML={{ __html: tag }}
          ></span>
        ))}
      </div>
    </article>
  );
}

function StatIconFallback({ index }: { index: number }) {
  const className = 'h-8 w-8 text-[#009FE8]';
  if (index === 0) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3h6v3l-1 10a2 2 0 01-2 2h0a2 2 0 01-2-2L9 6V3zM10 3v3M14 3v3M8 21h8"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 21h16L12 3z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M8 13h8M8 17h6"
      />
    </svg>
  );
}

function StatCard({ card, index }: { card: RAndDCentreStatCard; index: number }) {
  return (
    <div className="flex items-start gap-5 rounded-[20px] bg-[#EDF0F1] px-6 py-6 md:px-8 md:py-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
        {card.iconUrl ? (
          <Image src={card.iconUrl} alt="" width={48} height={48} className="max-h-12 max-w-12 object-contain" aria-hidden />
        ) : (
          <StatIconFallback index={index} />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold text-[#0E233C] md:text-2xl">{card.value}</p>
        <p className="mt-1 text-sm leading-relaxed text-black/80 md:text-base">{card.label}</p>
      </div>
    </div>
  );
}

export default async function RAndDCentreLayoutPage({ data }: { data: RAndDCentrePageData }) {
  const innovationsData = await fetchInnovationsLayoutPage('innovations');
  const trendItems = innovationsData?.page.latestInsights || [];
  const pressItems = innovationsData?.page.latestNews || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-[110px] md:pt-[150px] pb-8 md:pt-[200px] md:pb-16 lg:pt-[220px] lg:pb-32">
        <div className="absolute inset-0">
          {data.heroBackgroundImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.heroBackgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a3a52]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 text-xs font-semibold uppercase text-white md:text-sm">
            {data.heroEyebrow}
          </p>
          <h1 className="text-[22px] font-bold uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-5xl xl:text-[3.25rem]">
            {data.heroTitle}
          </h1>
          <p className="mx-auto lg:mt-8 mt-4 max-w-3xl text-sm leading-relaxed text-white md:text-base lg:text-lg">
            {data.heroDescription}
          </p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: data.title }]} />
        </div>
      </section>

      {/* Intro + stats */}
      <section className="bg-gray-50 pt-8 md:pt-20 lg:pt-24">
        <div className="container mx-auto  px-4">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <div>
              <h2 className="text-[22px] font-bold leading-tight text-black md:text-4xl lg:text-[2.75rem] lg:leading-snug" dangerouslySetInnerHTML={{ __html: data.introHeading }} />
              <RichText
                as="div"
                html={data.introBodyHtml}
                className="lg:mt-6 mt-4 text-sm leading-relaxed text-black md:text-lg [&_p]:mb-4 [&_p:last-child]:mb-0"
              />
              <div className="lg:mt-10 mt-6 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href={data.primaryCta.href}
                  className="group inline-flex items-center text-sm font-semibold uppercase tracking-wide text-[#009FE8] transition hover:text-[#0077B6]"
                >
                  {data.primaryCta.text}
                  <span className="ml-2 inline-block transition group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </Link>
                <Link
                  href={data.secondaryCta.href}
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-wide text-black/70 transition hover:text-black"
                >
                  {data.secondaryCta.text}
                  <span className="ml-2 text-black/40" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              {data.stats.map((card, index) => (
                <StatCard key={card.id} card={card} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <LatestNewsClient trendItems={trendItems} pressItems={pressItems} />


      {/* End-to-end testing — full packaging lifecycle */}
      {/* <section className="bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="lg:mb-12 mb-4 text-center text-[22px] font-bold leading-tight md:mb-10 md:text-4xl lg:text-5xl text-black" dangerouslySetInnerHTML={{ __html: data.lifecycleSection.title }} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
            {data.lifecycleSection.cards.map((card, idx) => (
              <LifecycleTestingCard key={card.id} card={card} index={idx} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Specialized laboratory zones */}
      <section className="bg-gray-50 pb-8 md:pb-20 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:mb-14">
            <h2 className="text-[22px] font-bold  leading-tight tracking-tight text-black md:text-3xl lg:text-5xl lg:leading-snug" dangerouslySetInnerHTML={{ __html: data.laboratoryZonesSection.title }} />
            {data.laboratoryZonesSection.subtitle ? (
              <p className="lg:mt-4 mt-2 text-sm text-black md:text-base">
                {data.laboratoryZonesSection.subtitle}
              </p>
            ) : null}
          </div>
          <div className="border-t border-black/[0.08]">
            {data.laboratoryZonesSection.items.map((item) => (
              <LaboratoryZoneRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical consultation CTA */}
      <section className="relative overflow-hidden lg:py-20 py-8 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={data.bottomCtaSection.backgroundImage || '/technical_bg.jpg'}
            alt=""
            height={1500}
            width={1500}
            className="object-cover w-full h-full"
            sizes=""
            priority={false}
          />
          <div className="absolute inset-0 bg-[#0a1a2e]/40" aria-hidden />
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
            aria-hidden
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-bold uppercase leading-snug tracking-tight text-white md:text-3xl lg:text-[2rem]">
            {data.bottomCtaSection.title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/95 md:text-lg">
            {data.bottomCtaSection.description}
          </p>
          {data.bottomCtaSection.ctaText && data.bottomCtaSection.ctaHref ? (
            <Link
              href={data.bottomCtaSection.ctaHref}
              className="lg:mt-10 mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:text-white/85 md:text-base"
            >
              {data.bottomCtaSection.ctaText}  →
             
            </Link>
          ) : null}
        </div>
      </section>

     
      <div className="bg-gray-50 lg:pt-24 pt-12">
        <CallToAction />
        </div>
        
        <NewsletterSubscription />
    </main>
  );
}
