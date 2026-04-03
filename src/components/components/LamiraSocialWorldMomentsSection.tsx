import Image from 'next/image';
import { formatBoldText } from '@/lib/htmlText';

export interface LamiraSocialWorldMomentsSectionData {
  heading: string;
  items: Array<{
    id: string;
    image: string;
    imageAlt: string;
  }>;
}

interface LamiraSocialWorldMomentsSectionProps {
  data: LamiraSocialWorldMomentsSectionData;
}

export default function LamiraSocialWorldMomentsSection({
  data,
}: LamiraSocialWorldMomentsSectionProps) {
  return (
    <section className="bg-gray-50 py-10 md:py-12">
      <div className="mx-auto px-4 container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-black" dangerouslySetInnerHTML={{ __html: data.heading }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="rounded-[32px] overflow-hidden bg-gray-50"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

