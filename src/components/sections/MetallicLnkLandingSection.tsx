import Link from 'next/link';
import type { MetallicLnkLandingSectionData } from '@/fake-api/page-builder';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';


export function MetallicLnkLandingSection({ data }: { data: MetallicLnkLandingSectionData }) {
  return (
    <>
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
          <div className="flex justify-start lg:justify-center">
            <div className="p-2 rounded-lg bg-white shadow-sm border-2 border-[#009FE8]">
              <img
                src={data.image}
                alt={data.title}
                className="w-[240px] sm:w-[260px] md:w-[310px] h-auto object-contain"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#009FE8] leading-tight">
              {data.title}
            </h2>

            <div className="space-y-4">
              {data.descriptionLines.map((line, idx) => (
                <p key={`${data.title}-desc-${idx}`} className="text-sm md:text-base text-black/70 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-base md:text-lg font-bold text-[#009FE8]">{data.sizeFormatTitle}</h3>
              <p className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">{data.sizeFormatText}</p>
            </div>

            <div className="pt-2">
              <h3 className="text-base md:text-lg font-bold text-[#009FE8]">{data.productFeaturesTitle}</h3>

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

              <p className="mt-4 text-sm md:text-base text-black/70 leading-relaxed">{data.productFeaturesDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {data.connectSection && (
        <div className="mt-10">
          <ConnectTechnicalExperts
            heading={data.connectSection.heading}
            headingHighlight={data.connectSection.headingHighlight}
            formTitle={data.connectSection.formTitle}
            illustrationImage={data.connectSection.illustrationImage}
            illustrationAlt={data.connectSection.illustrationAlt}
          />
        </div>
      )}
    </section>

    
    <CallToAction />
    <NewsletterSubscription />
    </>
  );
}

