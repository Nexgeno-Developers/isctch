import Image from 'next/image';
import Link from 'next/link';

import type { NpdPageData } from '@/lib/api/npd_layout';
import { formatBoldText } from '@/lib/htmlText';

type Props = Pick<
  NpdPageData,
  | 'heroTitle'
  | 'introBody'
  | 'introImage'
  | 'introImageAlt'
  | 'primaryCta'
  | 'secondaryCta'
>;

export default function NpdIntroSection({
  heroTitle,
  introBody,
  introImage,
  introImageAlt,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="bg-gray-50 py-8 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 lg:order-1">
            <h2
              className="text-[22px] font-bold leading-tight text-black md:text-4xl lg:text-5xl lg:leading-snug [&_span]:font-bold"
              dangerouslySetInnerHTML={{ __html: formatBoldText(heroTitle) }}
            />
            <p className="lg:mt-6 mt-4 text-sm leading-relaxed text-black md:text-base">{introBody}</p>
            <div className="lg:mt-10 mt-6 lg:flex flex lg:flex-col lg:flex-initial flex-wrap lg:gap-4 gap-3">
              <Link
                href={primaryCta.href}
                className="block rounded-[50px] bg-[#009FE8] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#0088cc] md:text-base"
              >
                Start your product journey
              </Link>
              <Link
                href={secondaryCta.href}
                className="block rounded-[50px] bg-[#009FE8] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#0088cc] md:text-base"
              >
                Book Innovation Consultation
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative w-full overflow-hidden rounded-[50px]">
              {introImage ? (
                <Image
                  src={introImage}
                  alt={introImageAlt || ''}
                  height={1000}
                  width={1000}
                  className="object-cover rounded-[50px]"
                  sizes=""
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
