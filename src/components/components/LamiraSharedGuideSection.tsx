import Image from 'next/image';
import { RichText } from '@/components/common/RichText';

export interface LamiraSharedGuideSectionData {
  image: string;
  imageAlt: string;
  heading: string;
  description: string;
}

interface LamiraSharedGuideSectionProps {
  data: LamiraSharedGuideSectionData;
}

export default function LamiraSharedGuideSection({
  data,
}: LamiraSharedGuideSectionProps) {
  return (
    <section className="bg-gray-50 py-10 md:py-12">
      <div className="mx-auto px-4 container">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 items-center">
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-gray-50">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.imageAlt}
                width={800}
                height={600}
                className="block w-full h-auto object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200" />
            )}
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight" dangerouslySetInnerHTML={{ __html: data.heading }} />
            <RichText
              as="div"
              html={data.description}
              className="mt-4 text-sm md:text-base text-black leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

