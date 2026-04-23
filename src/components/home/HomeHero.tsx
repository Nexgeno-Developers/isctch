import Link from 'next/link';
import Image from 'next/image';
import type { HomeHeroData } from '@/lib/api/homepage/types';

type HomeHeroProps = {
  data: HomeHeroData;
};

export default function HomeHero({ data }: HomeHeroProps) {
  const { overline, headline, description, primaryCta, secondaryCta, image, statCard } = data;

  return (
    <section
      className="relative overflow-hidden lg:py-20 py-8 bg-[linear-gradient(125.74deg,_#F0FBFF_0%,_#FFF8F0_100%)]"
    >
      <div className="container mx-auto px-4 ">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-[14px] font-bold uppercase tracking-[0.2em] text-[#EF7D00]">
              {overline}
            </p>

            <h1
              id="hero-heading"
              className="text-3xl leading-tight tracking-tight text-[#1a1a2e] lg:text-[72px]"
            >
              <span className="font-bold text-[#009FE3]">{headline.accent}</span>{' '}
              <span className="text-[#1a1a2e]">{headline.lineMiddle}</span>{' '}
              <span className="text-[#EF7D00]">{headline.accentWord}</span>
            </h1>

            <p className="mt-6 text-[18px] leading-relaxed text-[#3E4850]">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-[54px] items-center justify-center rounded-[8px] bg-[#FF8918] px-7 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#d96a18]"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-[54px] items-center justify-center rounded-lg border-2 border-[#006491] bg-transparent px-7 text-center text-sm font-bold uppercase tracking-wide text-[#006491] transition-colors hover:bg-[#1a1a2e]/5"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[360px] sm:max-w-md lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div className="relative aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-white p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-4 ring-white">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 28rem"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-2 left-0 z-10 w-[min(100%,260px)] rounded-2xl border border-gray-100/80 bg-white p-4 shadow-lg sm:-bottom-3 sm:left-2 sm:p-5">
                <div className="flex items-start gap-3">
                 
                   <Image src="/active_icons.svg" alt="Star" width={44} height={44} />
                  
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#3E4850] sm:text-xs">
                      {statCard.label}
                    </p>
                    <p className="text-2xl font-bold text-[#006491] sm:text-3xl">{statCard.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
