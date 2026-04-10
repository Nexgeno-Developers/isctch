import type { PilotPlantPageData } from '@/lib/api/pilot_plant_layout';

type Props = Pick<PilotPlantPageData, 'facilityTitleBlack' | 'facilityTitleBlue' | 'facilityDescription'>;

export default function PilotPlantFacilitySection({
  facilityTitleBlack,
  facilityTitleBlue,
  facilityDescription,
}: Props) {
  return (
    <section className="bg-gray-50 pb-6 pt-2 md:pb-10 md:pt-4">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-2xl font-bold leading-tight lg:text-5xl">
          <span className="text-black">{facilityTitleBlack}</span>{' '}
          <span className="text-[#009FE8]">{facilityTitleBlue}</span>
        </h2>
        <p className="mx-auto lg:mt-6 mt-2 max-w-3xl text-sm leading-relaxed text-black md:text-base">
          {facilityDescription}
        </p>
      </div>
    </section>
  );
}
