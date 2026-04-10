import Image from 'next/image';

import type { PilotPlantEcosystemStep } from '@/lib/api/pilot_plant_layout';

type Props = {
  titleBlack: string;
  titleBlue: string;
  steps: PilotPlantEcosystemStep[];
};

export default function PilotPlantInnovationEcosystem({ titleBlack, titleBlue, steps }: Props) {
  return (
    <section className="bg-gray-50 lg:pb-24 pb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold leading-tight md:text-5xl lg:text-5xl">
          <span className="text-black">The Innovation</span>{' '}
          <span className="text-[#009FE8]">Ecosystem</span>
        </h2>
        <div className="lg:mt-12 mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <article
              key={step.id}
              className="flex flex-col overflow-hidden rounded-[50px] bg-white"
            >
              <div className="relative w-full shrink-0 overflow-hidden bg-gray-200">
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    height={1000}
                    width={1000}
                    className="object-cover rounded-tr-[50px] h-[200px] object-top"
                    sizes=""
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/50" aria-hidden />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <span className="text-5xl font-bold leading-none text-[#009FE8] md:text-4xl">{step.step}</span>
                  <span className="mt-3 max-w-[12rem] text-[11px] font-semibold uppercase leading-snug text-white md:text-xs">
                    {step.phase}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-8 pt-7 md:px-7 md:pb-9 md:pt-8">
                <h3 className="text-lg font-bold text-black md:text-xl">{step.title}</h3>
                <p className="lg:mt-3 mt-1 text-sm leading-relaxed text-gray-600 md:text-base">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
