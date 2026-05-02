import Image from 'next/image';

import DonationPaymentForm from '@/components/donate/DonationPaymentForm';
import type { DonateContributionData } from '@/lib/api/donate/types';
import type { HomeSupportMovementData } from '@/lib/api/homepage';

type Props = {
  data: HomeSupportMovementData;
  donationForm: DonateContributionData;
};

/**
 * #IamPEACE header + Support the Movement panel. Copy from `getHomePageData().supportMovement`;
 * payment form matches `/donate` via `donationForm` from `getDonatePageData().contribution`.
 */
export default function HomeSupportMovement({ data, donationForm }: Props) {
  const { header, panel } = data;

  return (
    <section id="donate" className="w-full" aria-labelledby="support-movement-heading">
      <div className="bg-[#FBECE5] lg:py-20 py-8">
       
        <div className="container mx-auto px-4 text-center">
          <p className="text-3xl font-black tracking-tight lg:text-[52px]">
            <span className="text-[#009FE3]">{header.titleCyan}</span>
            <span className="text-[#EF7D00]">{header.titleOrange}</span>
          </p>
          <p className="mt-2 text-base text-[#3E4850] lg:text-[24px]">{header.subline}</p>
          <div className="relative mx-auto mt-10 max-w-xl px-4">
           
           <Image src="/devider.svg" className="mx-auto w-[210px]" alt="Peace" width={100} height={100} />

          </div>
        </div>
      </div>

      <div className="bg-[#0a8cc9] lg:py-24 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex h-full flex-col justify-center">
            <h2
              id="support-movement-heading"
              className="mt-3 text-3xl font-black tracking-tight text-[#fff] lg:text-[36px]"
            >
              {panel.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white sm:text-[18px]">{panel.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                {panel.avatars.map((a, i) => (
                  <div
                    key={`${a.src}-${i}`}
                    className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#0a8cc9] ring-2 ring-white/30"
                  >
                    <Image src={a.src} alt={a.alt} fill className="object-cover" sizes="48px" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white sm:text-sm">
                {panel.donorsLine}
              </p>
            </div>
          </div>
          

          <DonationPaymentForm
            data={donationForm}
            formClassName="w-full rounded-2xl bg-white p-6 shadow-lg sm:p-8"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
