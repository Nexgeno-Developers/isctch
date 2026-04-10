import Image from 'next/image';
import Link from 'next/link';

import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';

type Props = Pick<
  PilotPlantPageData,
  | 'introLabel'
  | 'introHeadingBlack'
  | 'introHeadingBlue'
  | 'introBody'
  | 'introImage'
  | 'introImageAlt'
  | 'introOverlayTitle'
  | 'introOverlaySubtitle'
  | 'primaryCta'
  | 'secondaryCta'
>;

export default function PilotPlantIntro({
  introLabel,
  introHeadingBlack,
  introHeadingBlue,
  introBody,
  introImage,
  introImageAlt,
  introOverlayTitle,
  introOverlaySubtitle,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="bg-gray-50 py-8 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase text-[#009FE8] md:text-sm">
              {introLabel}
            </p>
            <h2 className="mt-4 text-[22px] font-bold leading-tight text-black md:text-4xl lg:text-5xl lg:leading-snug">
              <span className="text-black">{introHeadingBlack}</span>{' '}
              <span className="text-[#009FE8]">{introHeadingBlue}</span>
            </h2>
            <p className="lg:mt-6 mt-2 text-sm leading-relaxed text-black md:text-lg">{introBody}</p>
            <div className="lg:mt-10 mt-6 flex max-w-xl flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-[50px] bg-[#0061A5] px-2 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white  transition hover:bg-[#081c33] md:text-base"
              >
                Explore Capabilities
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-[50px] bg-[#009FE8] px-2 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#0088cc] md:text-base"
              >
                Technical Specs
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative w-full overflow-hidden rounded-[50px] bg-gray-200 shadow-[0_20px_50px_rgba(10,39,68,0.12)] ">
              {introImage ? (
                <Image
                  src={introImage}
                  alt={introImageAlt || ''}
                  height={1000}
                  width={1000}
                  className="object-cover"
                  sizes=""
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-gray-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-2xl font-bold uppercase leading-tight tracking-wide text-white md:text-3xl lg:text-4xl">
                  {introOverlayTitle}
                </p>
                <p className="mt-2 text-sm font-medium text-white/95 md:text-base">{introOverlaySubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
