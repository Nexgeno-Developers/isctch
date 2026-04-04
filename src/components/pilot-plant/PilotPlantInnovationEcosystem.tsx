import Image from 'next/image';

import type { PilotPlantEcosystemStep } from '@/lib/api/pilot_plant_layout';

type Props = {
  titleBlack: string;
  titleBlue: string;
  steps: PilotPlantEcosystemStep[];
};

export default function PilotPlantInnovationEcosystem({ titleBlack, titleBlue, steps }: Props) {
  return (
    <section className="bg-[#F4F7F9] pb-16 pt-12 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          <span className="text-black">{titleBlack}</span>{' '}
          <span className="text-[#009FE8]">{titleBlue}</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <article
              key={step.id}
              className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_16px_48px_rgba(10,39,68,0.1)] ring-1 ring-black/[0.06]"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gray-200">
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/50" aria-hidden />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <span className="text-5xl font-bold leading-none text-[#009FE8] md:text-6xl">{step.step}</span>
                  <span className="mt-3 max-w-[12rem] text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-white md:text-xs">
                    {step.phase}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-8 pt-7 md:px-7 md:pb-9 md:pt-8">
                <h3 className="text-lg font-bold text-black md:text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
