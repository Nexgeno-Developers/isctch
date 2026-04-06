import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';

type Props = Pick<PilotPlantPageData, 'heroBackgroundImage' | 'heroTitle'>;

export default function PilotPlantHero({ heroBackgroundImage, heroTitle }: Props) {
  return (
    <section className="relative lg:pt-[220px] pt-[120px] lg:pb-[150px] pb-[44px] overflow-hidden">
      <div className="absolute inset-0 bottom-[3px]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/38 to-black/48" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 text-center md:pb-20 lg:pb-24">
        <h1 className="text-xl font-bold uppercase leading-tight tracking-[0.08em] text-white md:text-3xl lg:text-4xl xl:text-5xl">
          {heroTitle}
        </h1>
      </div>
    </section>
  );
}
