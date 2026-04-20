import Link from 'next/link';
import type { DonateHeroData } from '@/lib/api/donate/types';

export default function DonationHero({ data }: { data: DonateHeroData }) {
  return (
    <section className="bg-[#f6fafc] px-4 py-10 sm:px-6 md:px-8 lg:px-12 lg:py-14 xl:px-16">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs text-[#8b97a7]">
          <Link href="/" className="hover:underline">
            {data.breadcrumbHomeLabel}
          </Link>{' '}
          / <span className="text-[#f28500]">{data.breadcrumbCurrentLabel}</span>
        </p>
        <p className="mt-2 inline-flex items-center rounded-full bg-[#fff2e3] px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f28500]">
          {data.kicker}
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#1d2340] sm:text-5xl">
          <span className="text-[#009fe8]">{data.titleBlue}</span>{' '}
          <span className="text-[#f28500]">{data.titleOrange}</span>
        </h1>
      </div>
    </section>
  );
}
