import type { DonateStatsData } from '@/lib/api/donate/types';

export default function DonationStatsStrip({ data }: { data: DonateStatsData }) {
  return (
    <section className="bg-[#099edf] px-4 py-7 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-center text-white md:grid-cols-4">
        {data.items.map((item) => (
          <div key={item.label}>
            <p className="text-3xl font-bold leading-none sm:text-4xl">{item.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 sm:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
