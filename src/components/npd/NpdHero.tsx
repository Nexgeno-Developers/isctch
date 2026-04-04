import type { NpdPageData } from '@/lib/api/npd_layout';

type Props = Pick<NpdPageData, 'heroBackgroundImage' | 'heroTitle'>;

export default function NpdHero({ heroBackgroundImage, heroTitle }: Props) {
  return (
    <section className="relative overflow-hidden pt-[140px] pb-20 md:pt-[200px] md:pb-28 lg:pt-[220px] lg:pb-32">
      <div className="absolute inset-0">
        {heroBackgroundImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroBackgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1a3a52]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/45" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h1 className="text-2xl font-bold uppercase leading-tight tracking-wide text-white md:text-4xl lg:text-5xl xl:text-6xl">
          {heroTitle}
        </h1>
      </div>
    </section>
  );
}
