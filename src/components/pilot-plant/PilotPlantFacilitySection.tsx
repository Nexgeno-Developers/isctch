import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';

type Props = Pick<PilotPlantPageData, 'facilityTitleBlack' | 'facilityTitleBlue' | 'facilityDescription'>;

export default function PilotPlantFacilitySection({
  facilityTitleBlack,
  facilityTitleBlue,
  facilityDescription,
}: Props) {
  return (
    <section className="bg-white pb-6 pt-2 md:pb-10 md:pt-4">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          <span className="text-black">{facilityTitleBlack}</span>{' '}
          <span className="text-[#009FE8]">{facilityTitleBlue}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-black/80 md:text-lg">
          {facilityDescription}
        </p>
      </div>
    </section>
  );
}
