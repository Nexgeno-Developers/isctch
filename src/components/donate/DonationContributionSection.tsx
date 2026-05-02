import type { DonateContributionData } from '@/lib/api/donate/types';

import DonationPaymentForm from '@/components/donate/DonationPaymentForm';

export default function DonationContributionSection({ data }: { data: DonateContributionData }) {
  return (
    <section className="bg-[#F8F9FA] py-10 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="lg:flex gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="mt-3 text-left text-3xl font-black tracking-tight text-[#1A1A2E] lg:text-[36px]">
              {data.heading}
            </h2>
            <p className="mt-7 text-base leading-relaxed text-[#3E4850] lg:text-[18px]">
              {data.paragraphOne}
            </p>
            <p className="mt-5 text-base leading-relaxed text-[#3E4850] lg:text-[18px]">
              {data.paragraphTwo}
            </p>
            <blockquote className="mt-8 border-l-4 border-[#EF7D00] bg-[#FFF8F0] px-5 py-5 lg:text-[24px] font-semibold leading-snug text-[#1f233b]">
              &ldquo;{data.quote}&rdquo;
            </blockquote>
          </div>

          <DonationPaymentForm data={data} />
        </div>
      </div>
    </section>
  );
}
