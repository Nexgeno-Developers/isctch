import Link from 'next/link';
import Image from 'next/image';
import type { WaterpakLandingSectionData } from '@/fake-api/page-builder';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import { Cal_Sans } from 'next/font/google';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';

export function WaterpakLandingSection({ data }: { data: WaterpakLandingSectionData }) {
  return (
    <>
    <section className="bg-gray-50 py-10 md:pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
          <div className="flex justify-center lg:justify-end">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
              {data.title}
            </h2>

            <div className="space-y-4">
              {data.descriptionLines.map((line, idx) => (
                <p key={`${data.title}-p-${idx}`} className="text-sm md:text-base text-black leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <h3 className="text-base md:text-lg font-bold text-black">{data.sizeFormatTitle}</h3>
              <p className="mt-3 text-sm md:text-base text-black leading-relaxed">{data.sizeFormatText}</p>
            </div>

            <div className="mx-auto">
          <h3 className="text-base md:text-lg font-bold text-black pb-2">{data.availableInTitle}</h3>

          <div className="pt-2 flex flex-wrap gap-3 justify-start">
            {data.availableIn.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                className="capitalize inline-flex items-center px-3 py-1.5 rounded-full bg-[#F1FAFF] ring-1 ring-[#BFE5F7] text-[12px] md:text-sm font-semibold text-[#0A4A7A] transition-colors hover:bg-[#E6F6FF]"
              >
                {it.label}
              </Link>
            ))}
          </div>

          <p className="mt-4 text-sm md:text-base text-black leading-relaxed">{data.availableInDescription}</p>
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

