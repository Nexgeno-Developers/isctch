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
      className="relative overflow-hidden bg-gradient-to-r from-sky-50 via-white to-amber-50/50"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18 md:py-20 lg:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="order-2 max-w-xl lg:order-1">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#e87722] sm:text-sm">
              {overline}
            </p>

            <h1
              id="hero-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-[#1a1a2e] sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl"
            >
              <span className="text-[#009fe8]">{headline.accent}</span>{' '}
              <span className="text-[#1a1a2e]">{headline.lineMiddle}</span>{' '}
              <span className="text-[#e87722]">{headline.accentWord}</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#5a6d7d] sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#e87722] px-8 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-[#d96a18]"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#1a1a2e] bg-transparent px-8 text-center text-sm font-bold uppercase tracking-wide text-[#1a1a2e] transition-colors hover:bg-[#1a1a2e]/5"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[320px] sm:max-w-md lg:order-2 lg:mx-0 lg:max-w-none lg:justify-self-end">
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

              <div className="absolute -bottom-2 left-0 z-10 w-[min(100%,220px)] rounded-2xl border border-gray-100/80 bg-white p-4 shadow-lg sm:-bottom-3 sm:left-2 sm:p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#009fe8]/15 text-[#009fe8]"
                    aria-hidden
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5a6d7d] sm:text-xs">
                      {statCard.label}
                    </p>
                    <p className="text-2xl font-bold text-[#009fe8] sm:text-3xl">{statCard.value}</p>
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
