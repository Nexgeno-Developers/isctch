import Image from 'next/image';
import { formatBoldText } from '@/lib/htmlText';

export type GovernanceCenterPanelDetailSectionData = {
  layout: 'centerPanel';
  subtitle?: string;
  eyebrow?: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  centerText: string;
  buttonText: string;
  buttonHref: string;
  paragraphs: string[];
};

export default function GovernanceDetailSection({
  data,
}: {
  data: GovernanceCenterPanelDetailSectionData;
}) {
  const subtitle = data.subtitle || data.eyebrow || '';
  return (
    <>
    <section className="bg-gray-50 py-8 md:pt-12">
      <div className="container mx-auto px-4">
        <div className="">
          {subtitle ? (
            <div className="text-[#009FE8] font-semibold text-sm md:text-base">
              {subtitle}
            </div>
          ) : null}

          <h2 className="mt-2 text-[24px] md:text-5xl font-bold text-black leading-tight" 
           dangerouslySetInnerHTML={{ __html: formatBoldText(data.title) }} />
          
        </div>
      </div>
    </section>

    <div className="">
            <Image
              src={data.imageSrc}
              alt={data.imageAlt}
              width={1600}
              height={800}
              className="w-full h-auto max-h-[320px] md:max-h-[420px] object-cover rounded-[2px]"
              priority
            />
          </div>
<section className="bg-gray-50 py-4 md:pb-12">
<div className="container mx-auto px-4">
  <div className="">
    

    <div className="mt-6 md:mt-8 bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] px-5 md:px-16 py-8 md:py-10">
      <p className="text-center text-black leading-relaxed max-w-4xl mx-auto text-[14px] md:text-base">
        {data.centerText}
      </p>

      <div className="mt-6 flex justify-center">
        <a
          href={data.buttonHref}
          className="inline-flex items-center justify-center bg-[#009FE8] text-white font-bold rounded-full px-8 md:px-12 py-2 md:py-4 hover:bg-[#0077B6] transition-colors text-sm md:text-base"
        >
          {data.buttonText}
        </a>
      </div>
    </div>

    <div className="mt-8 md:mt-10 text-black leading-relaxed text-[14px] md:text-base space-y-4">
      {data.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  </div>
</div>
</section>
</>
  );
}

