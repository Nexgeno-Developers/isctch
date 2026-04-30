import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SummitsConvocationsSection from '@/components/summits/SummitsConvocationsSection';
import SummitsLegacySection from '@/components/summits/SummitsLegacySection';
import { getCanonicalUrl } from '@/config/site';
import { SUMMITS_PAGE_SLUG, summitsPath } from '@/config/publicRoutes';

export const metadata: Metadata = {
  title: 'Summits',
  description:
    'Explore global summits and events convening leaders, activists, and communities for peace.',
  alternates: { canonical: getCanonicalUrl(summitsPath()) },
};

export function SummitsPageView() {
  return (
    <main>
      <section className="bg-[linear-gradient(125deg,_#F0FBFF_0%,_#FFF8F0_100%)] py-12 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-[#8b97a7]">
            <Link href="/" className="hover:underline">
              Home
            </Link>{' '}
            / <span className="text-[#EF7D00]">Global Summits & Events</span>
          </p>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#EF7D00]">
            Global Dialogue
          </p>
          <h1 className="mt-6 text-[34px] font-black leading-tight tracking-tight lg:text-[52px]">
            <span className="text-[#009FE3]">Convening the World </span>
            <span className="text-[#EF7D00]">for Peace</span>
          </h1>
        </div>
      </section>

      <SummitsLegacySection />
      <SummitsConvocationsSection />
    </main>
  );
}

export default function SummitsPage() {
  if (SUMMITS_PAGE_SLUG !== 'summits') {
    redirect(summitsPath());
  }
  return <SummitsPageView />;
}
