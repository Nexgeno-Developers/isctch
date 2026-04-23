import Link from 'next/link';
import type { DonateHeroData } from '@/lib/api/donate/types';

export default function DonationHero({ data }: { data: DonateHeroData }) {
  return (
    <section className="relative overflow-hidden lg:py-20 py-8 bg-[linear-gradient(125.74deg,_#F0FBFF_0%,_#FFF8F0_100%)]">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-[#8b97a7]">
          <Link href="/" className="hover:underline">
            {data.breadcrumbHomeLabel}
          </Link>{' '}
          / <span className="text-[#f28500]">{data.breadcrumbCurrentLabel}</span>
        </p>
        <p className="mt-2 inline-flex items-center rounded-full bg-[#fff2e3] px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f28500]">
          {data.kicker}
        </p>
        <h1 className="mt-8 text-[20px] font-bold leading-tight tracking-tight lg:text-[60px]">
          <span className="text-[#009FE3]">{data.titleBlue}</span>{' '}
          <span className="text-[#EF7D00]">{data.titleOrange}</span>
        </h1>
      </div>
    </section>
  );
}
