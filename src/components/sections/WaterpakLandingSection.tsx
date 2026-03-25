import Link from 'next/link';
import type { WaterpakLandingSectionData } from '@/fake-api/page-builder';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import { Cal_Sans } from 'next/font/google';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';

export function WaterpakLandingSection({ data }: { data: WaterpakLandingSectionData }) {
  return (
    <>
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
          <div className="flex justify-center lg:justify-end">
            <img
              src={data.image}
              alt={data.title}
              className="w-[240px] sm:w-[280px] md:w-[320px] object-contain"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#009FE8] leading-tight">
              {data.title}
            </h2>

            <div className="space-y-4">
              {data.descriptionLines.map((line, idx) => (
                <p key={`${data.title}-p-${idx}`} className="text-sm md:text-base text-black/70 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-base md:text-lg font-bold text-[#009FE8]">{data.sizeFormatTitle}</h3>
              <p className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">{data.sizeFormatText}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg md:text-xl font-bold text-[#009FE8]">{data.availableInTitle}</h3>

          <div className="mt-4 flex flex-wrap gap-3">
            {data.availableIn.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F1FAFF] ring-1 ring-[#BFE5F7] text-[12px] md:text-sm font-semibold text-[#0A4A7A] transition-colors hover:bg-[#E6F6FF]"
              >
                {it.label}
              </Link>
            ))}
          </div>

          <p className="mt-4 text-sm md:text-base text-black/70 leading-relaxed">{data.availableInDescription}</p>
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

