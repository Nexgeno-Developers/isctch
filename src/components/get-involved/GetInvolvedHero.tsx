import Link from 'next/link';

import type { GetInvolvedHeroData } from '@/lib/api/getInvolved/types';

export default function GetInvolvedHero({ data }: { data: GetInvolvedHeroData }) {
  return (
    <section className="border-y-2 border-y-[#009FE3] bg-[linear-gradient(120deg,_#F2FBFF_0%,_#FFF8F0_100%)] py-14 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-[#97A3AF]">
          <Link href="/" className="hover:underline">
            {data.breadcrumbHomeLabel}
          </Link>{' '}
          / <span className="text-[#F28A11]">{data.breadcrumbCurrentLabel}</span>
        </p>
        <p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#F28A11] sm:text-xs">
          {data.kicker}
        </p>
        <h1 className="mt-5 text-[38px] font-black leading-none tracking-tight sm:text-[48px] lg:text-[64px]">
          <span className="text-[#039FE8]">{data.titleBlue}</span>{' '}
          <span className="text-[#F28A11]">{data.titleOrange}</span>
        </h1>
      </div>
    </section>
  );
}
