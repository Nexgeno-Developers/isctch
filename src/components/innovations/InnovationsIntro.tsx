import type { InnovationsPageData } from '@/lib/api/innovations_layout';
import InnovationsProcessIllustration from '@/components/innovations/InnovationsProcessIllustration';

type Props = Pick<InnovationsPageData, 'introHeadingBlack' | 'introHeadingBlue' | 'introBody'>;

export default function InnovationsIntro({ introHeadingBlack, introHeadingBlue, introBody }: Props) {
  return (
    <section className="bg-white py-14 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-black md:text-4xl lg:text-[2.35rem] lg:leading-snug">
              <span className="text-black">{introHeadingBlack}</span>
              <span className="text-[#009FE8]">{introHeadingBlue}</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-gray-600 md:text-lg">{introBody}</p>
          </div>
          <div>
            <div className="rounded-[28px] bg-[#eef1f4] p-2 shadow-inner ring-1 ring-black/[0.04] md:p-3">
              <InnovationsProcessIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
