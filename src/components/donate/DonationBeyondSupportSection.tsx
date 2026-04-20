import Link from 'next/link';
import type { DonateBeyondSupportCard, DonateBeyondSupportData } from '@/lib/api/donate/types';

function CardIcon({ icon }: { icon: DonateBeyondSupportCard['icon'] }) {
  if (icon === 'advocacy') {
    return (
      <svg className="h-6 w-6 text-[#f28500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path d="M3 10v4" />
        <path d="M7 8v8" />
        <path d="M11 6v12" />
        <path d="M15 9l6-2v10l-6-2" />
      </svg>
    );
  }
  if (icon === 'partners') {
    return (
      <svg className="h-6 w-6 text-[#00a3e8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[#00a3e8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M8 12c0-2.2 1.8-4 4-4 1.4 0 2.6.7 3.3 1.8" />
      <path d="M5 20v-1a4 4 0 0 1 4-4h1" />
      <path d="M16.5 21l-1.5-1.5 1.5-1.5" />
      <path d="M19 18h-4" />
    </svg>
  );
}

const FALLBACK_BEYOND_SUPPORT: DonateBeyondSupportData = {
  heading: 'Beyond Financial Support',
  subheading:
    'There are countless ways to strengthen the fabric of global peace. Explore how you can contribute your time and voice.',
  cards: [
    {
      icon: 'volunteer',
      title: 'Volunteer Globally',
      description:
        'Join our field teams in humanitarian relief, educational initiatives, or community organizing projects.',
      ctaLabel: 'Learn More',
      ctaHref: '/#get-involved',
    },
    {
      icon: 'advocacy',
      title: 'Advocacy & Voice',
      description:
        'Champion our causes in your own community by sharing our mission and participating in digital campaigns.',
      ctaLabel: 'View Toolkit',
      ctaHref: '/#get-involved',
    },
    {
      icon: 'partners',
      title: 'Corporate Partners',
      description:
        'Align your organization with peace through strategic sponsorship, grants, and employee engagement.',
      ctaLabel: 'Partner with us',
      ctaHref: '/contact-us',
    },
  ],
};

export default function DonationBeyondSupportSection({ data }: { data?: DonateBeyondSupportData }) {
  const safeData = data ?? FALLBACK_BEYOND_SUPPORT;
  return (
    <section className="bg-[#FFF8F0] py-10 lg:py-20">
      <div className="mx-auto container px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#1f233b] sm:text-5xl">{safeData.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/70 lg::text-base">{safeData.subheading}</p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {safeData.cards.map((card, idx) => (
            <article key={`${card.title}-${idx}`} className="rounded-2xl border border-[#F1F5F9] bg-[#ffffff82] p-10 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.14)]">
              <div className={`mb-5 inline-flex rounded-2xl p-3 ${card.icon === 'advocacy' ? 'bg-[#fff2e3]' : 'bg-[#eaf7fd]'}`}>
                <CardIcon icon={card.icon} />
              </div>
              <h3 className="text-[24px] font-bold leading-tight text-black">{card.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-black">{card.description}</p>
              <Link href={card.ctaHref} className="mt-6 inline-flex items-center text-base font-semibold text-[#00a3e8] hover:underline">
                {card.ctaLabel} <span className="ml-2" aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
