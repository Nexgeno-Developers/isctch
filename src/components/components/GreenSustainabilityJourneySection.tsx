import Image from 'next/image';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

type SectionData = NonNullable<DynamicPageData['greenSustainabilityJourneySection']>;

export interface GreenSustainabilityJourneySectionProps {
  data: SectionData;
}

export default function GreenSustainabilityJourneySection({ data }: GreenSustainabilityJourneySectionProps) {
  const bg = data.backgroundColor ?? '#f8f9fa';
  const accent = data.accentColor ?? '#00AEEF';

  return (
    <section className="py-8 lg:py-12" style={{ backgroundColor: bg }}>
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              <span className="block" style={{ color: accent }}>
                {data.headingLineBlue}
              </span>
              <span className="mt-1 block font-bold text-gray-900">{data.headingLineBlack}</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-900 md:mt-10 md:text-lg">
              {data.body}
            </p>
          </div>

          <div>
            <div className="relative mx-auto w-full overflow-hidden rounded-[40px] shadow-sm md:rounded-[48px] lg:rounded-[56px]">
              <div className="relative aspect-[4/3] w-full md:aspect-[16/11] lg:aspect-[5/4]">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
