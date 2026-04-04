import type { InnovationsPageData } from '@/lib/api/innovations_layout';

type Props = Pick<InnovationsPageData, 'heroTitle' | 'heroBackgroundImage'>;

function TechGridPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern id="innovations-tech-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.2" fill="white" />
          <path d="M4 4h40v40" stroke="white" strokeWidth="0.4" opacity="0.35" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#innovations-tech-grid)" />
    </svg>
  );
}

export default function InnovationsHero({ heroTitle, heroBackgroundImage }: Props) {
  return (
    <section className="relative overflow-hidden pt-[140px] pb-20 md:pt-[200px] md:pb-28 lg:pt-[210px] lg:pb-32">
      {/* deep blue base + gradient */}
      <div className="absolute inset-0 bg-[#031a2e]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#042a45] via-[#063252] to-[#021526]" />
      <TechGridPattern />

      {/* layered carton / product imagery */}
      {heroBackgroundImage ? (
        <>
          <div className="absolute -left-[8%] bottom-0 top-[18%] w-[55%] opacity-[0.18] md:opacity-[0.22]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroBackgroundImage}
              alt=""
              className="h-full w-full object-cover object-center blur-[1px]"
            />
          </div>
          <div className="absolute -right-[5%] bottom-0 top-[22%] w-[50%] opacity-[0.14] md:opacity-[0.18]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroBackgroundImage}
              alt=""
              className="h-full w-full scale-x-[-1] object-cover object-center blur-[1px]"
            />
          </div>
        </>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-t from-[#021526]/90 via-[#042a45]/55 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-xl font-bold uppercase leading-snug tracking-[0.06em] text-white drop-shadow-sm md:text-2xl md:leading-tight lg:text-3xl xl:text-4xl">
          {heroTitle}
        </h1>
      </div>
    </section>
  );
}
