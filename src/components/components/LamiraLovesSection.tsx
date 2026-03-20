import Image from 'next/image';

export interface LamiraLovesSectionData {
  headingPrefix?: string;
  headingHighlight: string;
  headingSuffix?: string;
  subtitle: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
}

interface LamiraLovesSectionProps {
  data: LamiraLovesSectionData;
}

export default function LamiraLovesSection({ data }: LamiraLovesSectionProps) {
  return (
    <section className="bg-[#f3f3f3] py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            {data.headingPrefix ? `${data.headingPrefix} ` : ''}
            <span className="text-[#00A0E3]">{data.headingHighlight}</span>{' '}
            {data.headingSuffix ? data.headingSuffix : ''}
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#374151]">{data.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-[32px] md:rounded-[34px] p-6 md:p-7"
            >
              <div className="relative overflow-hidden rounded-[28px] md:rounded-[30px]">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
              </div>

              <h3 className="mt-6 text-xl md:text-2xl font-bold text-[#00A0E3]">{item.title}</h3>
              <p className="mt-4 text-sm md:text-base text-[#1f2937] leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

