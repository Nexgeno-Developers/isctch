import Link from 'next/link';

import type { AboutCtaData } from '@/lib/api/about/types';

type Props = {
  data: AboutCtaData;
};

export default function MovementCtaSection({ data }: Props) {
  return (
    <section className="bg-[linear-gradient(107.53deg,_#006491_0%,_#009FE3_100%)] py-14 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mx-auto text-[34px] font-black leading-tight text-white lg:text-[36px]">
          {data.heading}
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href={data.donateHref}
            className="inline-flex min-h-[58px] w-full max-w-[220px] items-center justify-center rounded-[8px] bg-[#EF7D00] px-7 text-base font-black uppercase tracking-wide text-white transition-colors hover:bg-[#d96a18]"
          >
            {data.donateLabel}
          </Link>
          <Link
            href={data.volunteerHref}
            className="inline-flex min-h-[58px] w-full max-w-[260px] items-center justify-center rounded-[8px] bg-white px-7 text-base font-black uppercase tracking-wide text-[#009FE3] transition-colors hover:bg-[#F4F8FC]"
          >
            {data.volunteerLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
