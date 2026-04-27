import Link from 'next/link';
import type { DonateBeyondSupportCard, DonateBeyondSupportData } from '@/lib/api/donate/types';
import Image from 'next/image';

import { getInvolvedPath } from '@/config/publicRoutes';

function CardIcon({ icon }: { icon: DonateBeyondSupportCard['icon'] }) {
  if (icon === 'advocacy') {
    return (
      <Image src="/advocate_icons.svg" alt="Dialog" width={70} height={70} />
    );
  }
  if (icon === 'partners') {
    return (
      <Image src="/partners_icons.svg" alt="Dialog" width={70} height={70} />
    );
  }
  return (
    <Image src="/globally_icons.svg" alt="Dialog" width={70} height={70} />
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
      ctaHref: getInvolvedPath(),
    },
    {
      icon: 'advocacy',
      title: 'Advocacy & Voice',
      description:
        'Champion our causes in your own community by sharing our mission and participating in digital campaigns.',
      ctaLabel: 'View Toolkit',
      ctaHref: getInvolvedPath(),
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
          <h2 className="text-center text-3xl font-black tracking-tight text-[#1A1A2E] lg:text-[36px]">{safeData.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#3E4850] lg:text-[18px]">{safeData.subheading}</p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {safeData.cards.map((card, idx) => (
            <article key={`${card.title}-${idx}`} className="rounded-2xl bg-[#ffffff] p-10 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.14)]">
               <CardIcon icon={card.icon} />
              <h3 className="mt-8 text-[24px] font-black leading-tight text-[#1A1A2E]">{card.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-[#3E4850]">{card.description}</p>
              <Link href={card.ctaHref} className="mt-6 inline-flex items-center text-base font-black text-[#00a3e8] hover:underline">
                {card.ctaLabel} <span className="ml-2" aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
