import type { PilotPlantStat } from '@/lib/api/pilot_plant_layout';

export default function PilotPlantStatsBanner({ stats }: { stats: PilotPlantStat[] }) {
  return (
    <section className="bg-gray-50 pb-8 md:pb-24 lg:pb-28">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-[50px] bg-[#009FE8] px-6 py-10  md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold tabular-nums text-white md:text-4xl lg:text-[2.75rem]">
                  {stat.value}
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase leading-snug tracking-wider text-white/90 md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
