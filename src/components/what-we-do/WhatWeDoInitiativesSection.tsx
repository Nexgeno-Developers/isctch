import Image from 'next/image';
import Link from 'next/link';
import type { WhatWeDoPeaceSummitsData } from '@/lib/api/whatWeDo/types';

type Props = {
  data: WhatWeDoPeaceSummitsData;
};

export default function WhatWeDoInitiativesSection({ data }: Props) {
  if (!data.summits.length) return null;

  return (
    <section className="w-full">
      {data.summits.map((item, index) => {
        const isEven = index % 2 === 0;
        const sectionBg = isEven ? 'bg-white' : 'bg-[#E8F2FA]';
        const textOrder = isEven ? 'md:order-2' : 'md:order-1';
        const imageOrder = isEven ? 'md:order-1' : 'md:order-2';

        return (
          <div key={`${item.title}-${index}`} className={`${sectionBg} py-8 lg:py-20`}>
            <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
              <div className={imageOrder}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className={textOrder}>
                <div className="flex items-center mb-4">
                 
                  <span className="flex items-center rounded-full bg-[#F7921E] px-5 py-2 text-[11px] font-bold text-white gap-3">
                     <Image src={item.icon.src} alt={item.icon.alt} width={25} height={25} className='brightness-0 invert' /> <span className='text-[14px]'>{item.location}</span>
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-black leading-tight tracking-tight text-[#1A1A2E]  lg:text-[36px]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[#3E4850] lg:text-[18px]">
                  {item.description}
                </p>
                <Link
                  href={item.cta.href}
                  className="mt-6 inline-flex items-center gap-2 text-[20px] font-semibold text-[#006491] transition-colors hover:text-[#005d90]"
                >
                  {item.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
