import Image from 'next/image';
import Link from 'next/link';

import type { NpdPageData } from '@/lib/api/npd_layout';

type Props = Pick<
  NpdPageData,
  | 'introHeadingBlack'
  | 'introHeadingBlue'
  | 'introBody'
  | 'introImage'
  | 'introImageAlt'
  | 'primaryCta'
  | 'secondaryCta'
>;

export default function NpdIntroSection({
  introHeadingBlack,
  introHeadingBlue,
  introBody,
  introImage,
  introImageAlt,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="bg-white py-14 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold leading-tight text-black md:text-4xl lg:text-[2.75rem] lg:leading-snug">
              <span className="text-black">{introHeadingBlack}</span>{' '}
              <span className="text-[#009FE8]">{introHeadingBlue}</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/70 md:text-lg">{introBody}</p>
            <div className="mt-10 flex max-w-md flex-col gap-4">
              <Link
                href={primaryCta.href}
                className="rounded-[14px] bg-[#009FE8] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#0088cc] md:text-base"
              >
                {primaryCta.text}
              </Link>
              <Link
                href={secondaryCta.href}
                className="rounded-[14px] bg-[#009FE8] px-8 py-4 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#0088cc] md:text-base"
              >
                {secondaryCta.text}
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] rounded-tr-[48px] bg-gray-200 lg:aspect-[5/4]">
              {introImage ? (
                <Image
                  src={introImage}
                  alt={introImageAlt || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
