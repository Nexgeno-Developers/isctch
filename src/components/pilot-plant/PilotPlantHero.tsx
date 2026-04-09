import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';

type Props = Pick<PilotPlantPageData, 'heroBackgroundImage' | 'heroTitle'>;

export default function PilotPlantHero({ heroBackgroundImage, heroTitle }: Props) {
  return (
    <section className="relative lg:pt-[200px] pt-[120px] lg:pb-[80px] pb-[44px] overflow-hidden">
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
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <h1 className="text-[24px] md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white tracking-tight leading-tight">
          {heroTitle}
        </h1>
      </div>
    </section>
  );
}
