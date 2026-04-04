import Link from 'next/link';
import Image from 'next/image';
import type { SustainableSolutionsSectionData } from '@/lib/api/product_category_layout_2';
import VideoBanner from '@/components/home/VideoBanner';
import { RichText } from '@/components/common/RichText';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';

export function SustainableSolutionsSection({
  data,
}: {
  data: SustainableSolutionsSectionData;
}) {
  const videoUrl = cleanVideoUrlFromApi(data.videoUrl);
  const intro = data.intro ?? '';
  const introHasHtml = /<[^>]+>/.test(intro);

  const introParagraphs = !introHasHtml
    ? intro
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];


  return (

    <>
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          {intro && (
            <>
              {introHasHtml ? (
                <RichText
                  as="div"
                  html={intro}
                  className="lg:text-center text-left text-black text-sm md:text-base leading-relaxed mx-auto mb-10 md:mb-12"
                />
              ) : (
                introParagraphs.map((text, idx) => (
                  <p
                    key={`sustain-intro-${idx}`}
                    className="lg:text-center text-left text-black text-sm md:text-base leading-relaxed mx-auto mb-10 md:mb-12"
                  >
                    {text}
                  </p>
                ))
              )}
            </>
          )}

          {data.items.length > 0 && (
            <div className="space-y-12 md:space-y-16">
              {data.items.map((item, idx) => {
                const reverse = idx % 2 === 1;

                return (
                  <div
                    key={item.id}
                    className={`grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 md:gap-10 items-center ${reverse ? 'lg:grid-cols-[45%_55%]' : ''
                      }`}
                  >
                    <div className={reverse ? 'lg:order-2' : ''}>
                      <h3 className="text-[#009FE8] text-lg md:text-[32px] font-bold tracking-wide lg:mb-4 mb-2">
                        {item.title}
                      </h3>
                      <RichText
                        as="div"
                        html={item.description}
                        className="text-black text-sm md:text-base leading-relaxed"
                      />
                      {item.href && (
                        <div className="lg:mt-6 mt-3">
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
          )}

        </div>
      </section>
<div className="pb-10 md:pb-24">
      {videoUrl ? (
        <VideoBanner
          prefetchedData={{
            title: '',
            preTitle: '',
            ctaText: '',
            ctaLink: '',
            videoUrl,
          }}
        />
      ) : null}
      </div>
    </>
  );
}

