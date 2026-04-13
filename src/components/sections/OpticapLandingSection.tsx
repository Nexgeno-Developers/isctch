import Link from 'next/link';
import Image from 'next/image';
import type { OpticapLandingSectionData } from '@/lib/api/product_category_layout_5';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import VideoBanner from '@/components/home/VideoBanner';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';
import { RichText } from '@/components/common/RichText';
import { formatBoldText } from '@/lib/htmlText';


export function OpticapLandingSection({ data }: { data: OpticapLandingSectionData }) {
  const hasHtmlIntro = Boolean(data.descriptionHtml?.trim());
  const showSizeFormat = Boolean(data.sizeFormatText?.trim());

  return (
    <>
      <section className="bg-gray-50 pt-10 md:pt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
            <div className="flex justify-start lg:justify-center">
              <Image
                src={data.image}
                alt={data.title}
                width={800}
                height={800}
                className="w-full h-auto object-contain rounded-[50px]"
                priority={false}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-[22px] sm:text-4xl md:text-5xl font-bold text-black leading-tight"
                dangerouslySetInnerHTML={{ __html: formatBoldText(data.title) }} />

              {hasHtmlIntro ? (
                <RichText
                  as="div"
                  className="space-y-4 text-sm md:text-base text-black leading-relaxed [&_p]:mb-4 [&_strong]:font-bold"
                  html={data.descriptionHtml!}
                />
              ) : (
                <div className="space-y-4">
                  {data.descriptionLines.map((line, idx) => (
                    <p
                      key={`${data.title}-desc-${idx}`}
                      className="text-sm md:text-base text-black leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {showSizeFormat && (
                <div className="pt-2">
                  <h3 className="text-base md:text-lg font-bold text-black">{data.sizeFormatTitle}</h3>
                  <p className="mt-3 text-sm md:text-base text-black leading-relaxed">{data.sizeFormatText}</p>
                </div>
              )}

              <div className="pt-2">
                <h3 className="text-base md:text-lg font-bold text-black">{data.productFeaturesTitle}</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {data.productFeaturesPills.map((pill) => (
                    <Link
                      key={pill.id}
                      href={pill.href}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F1FAFF] ring-1 ring-[#BFE5F7] text-[12px] md:text-sm font-semibold text-[#0A4A7A] transition-colors hover:bg-[#E6F6FF]"
                    >
                      {pill.label}
                    </Link>
                  ))}
                </div>

                {data.productFeaturesDescriptionHtml?.trim() ? (
                  <RichText
                    as="div"
                    className="mt-4 text-sm md:text-base text-black leading-relaxed [&_p]:mb-3 [&_strong]:font-bold"
                    html={data.productFeaturesDescriptionHtml}
                  />
                ) : (
                  <p className="mt-4 text-sm md:text-base text-black leading-relaxed">
                    {data.productFeaturesDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          
        </div>

        {data.videoUrl || data.homeVideoBanner ? (
          <div className="mt-10 md:mt-18 w-full">
            {data.videoUrl ? (
              <VideoBanner videoUrl={data.videoUrl} />
            ) : data.homeVideoBanner ? (
              <VideoBanner prefetchedData={data.homeVideoBanner} />
            ) : null}
          </div>
        ) : null}

        <div className="lg:py-0 py-6">
          <ConnectTechnicalExperts />
        </div>
      </section>
      <CallToAction />
      <NewsletterSubscription />
    </>
  );
}
