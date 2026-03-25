import Link from 'next/link';
import Image from 'next/image';
import type { SustainableSolutionsSectionData } from '@/fake-api/page-builder';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';

export function SustainableSolutionsSection({
  data,
}: {
  data: SustainableSolutionsSectionData;
}) {
  return (

    <>
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {data.intro && (
          <p className="text-center text-black text-sm md:text-base leading-relaxed mx-auto mb-10 md:mb-12">
            {data.intro}
          </p>
        )}

        <div className="space-y-12 md:space-y-16">
          {data.items.map((item, idx) => {
            const reverse = idx % 2 === 1;

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 md:gap-10 items-center ${
                  reverse ? 'lg:grid-cols-[45%_55%]' : ''
                }`}
              >
                <div className={reverse ? 'lg:order-2' : ''}>
                  <h3 className="text-[#009FE8] text-lg md:text-[32px] font-bold tracking-wide mb-4">
                    {item.title}
                  </h3>
                  <p className="text-black/70 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                  {item.href && (
                    <div className="mt-6">
                      <Link
                        href={item.href}
                        className="text-[#009FE8] text-sm font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-2"
                      >
                        Read more
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  )}
                </div>

                <div className={reverse ? 'lg:order-1' : ''}>
                  <div className="relative w-full">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-contain rounded-[50px]"
                        priority={false}
                      />
                    ) : (
                      <div className="h-64 bg-gray-100 rounded-[20px]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>


    <CallToAction />
    <NewsletterSubscription />
    </>
  );
}

