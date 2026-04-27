import Image from 'next/image';
import Link from 'next/link';
import type { HomePeaceSummitsData } from '@/lib/api/homepage/types';

type Props = {
  data: HomePeaceSummitsData;
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
          <div key={`${item.title}-${index}`} className={`${sectionBg} py-8 lg:py-14`}>
            <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
              <div className={imageOrder}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
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
                <span className="inline-flex rounded-full bg-[#F7921E] px-3 py-1 text-[11px] font-bold text-white">
                  {item.location}
                </span>
                <h3 className="mt-5 text-3xl font-black tracking-tight text-[#0F2233] lg:text-[46px] lg:leading-[1.1]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[580px] text-base leading-8 text-[#4A5A68] lg:text-[34px] lg:leading-[1.55]">
                  {item.description}
                </p>
                <Link
                  href="/contact-us"
                  className="mt-6 inline-flex items-center gap-2 text-[20px] font-semibold text-[#0B77B8] transition-colors hover:text-[#005d90]"
                >
                  Connect with the Council
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
