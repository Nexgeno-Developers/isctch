import Image from 'next/image';

export interface LamiraMeetSectionData {
  titlePrefix?: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle: string;
  storyTitle: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

interface LamiraMeetSectionProps {
  data: LamiraMeetSectionData;
}

export default function LamiraMeetSection({ data }: LamiraMeetSectionProps) {
  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="mx-auto w-full container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 md:gap-12 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] leading-tight">
              {data.titlePrefix ? `${data.titlePrefix} ` : ''}
              <span className="text-[#00A0E3]">{data.titleHighlight}</span>
              {data.titleSuffix ? ` ${data.titleSuffix}` : ''}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#374151]">{data.subtitle}</p>

            <h3 className="mt-4 text-xl md:text-2xl font-bold text-[#111827]">{data.storyTitle}</h3>

            <div className="mt-4 space-y-4 text-sm md:text-base text-[#1f2937] leading-relaxed">
              {data.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] md:rounded-[34px]">
            <div className="relative w-full aspect-[5/4] md:aspect-[4/3]">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

