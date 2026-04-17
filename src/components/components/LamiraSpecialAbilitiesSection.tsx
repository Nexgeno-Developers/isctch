import { formatBoldText } from '@/lib/htmlText';
import VideoModalClient from '@/components/common/VideoModalClient';

export interface LamiraSpecialAbilitiesSectionData {
  heading: string;
  headingSuffix: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  videoUrl: string;
  abilities: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

interface LamiraSpecialAbilitiesSectionProps {
  data: LamiraSpecialAbilitiesSectionData;
}

export default function LamiraSpecialAbilitiesSection({
  data,
}: LamiraSpecialAbilitiesSectionProps) {
  const abilities = data.abilities.slice(0, 2);
  const videoCardContent = abilities[0];

  return (
    <section className="bg-gray-50 pb-8 md:py-12">
      <div className="mx-auto px-4 container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-[22px] md:text-5xl font-bold text-black leading-tight" dangerouslySetInnerHTML={{ __html: data.heading }} />
          <p className="mt-3 text-sm md:text-base text-black">{data.subtitle}</p>
        </div>

        <div className="lg:mt-8 mt-4 grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] lg:gap-6 gap-4 items-start">
          {/* Hover swap: show content first, then image + play button */}
          <div className="group relative overflow-hidden rounded-[50px] bg-[#EDF0F1] h-[250px]">
            {/* Content layer */}
            <div className="absolute inset-0 p-6 md:p-7 transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
              <h3 className="text-base md:text-[20px] font-semibold text-black">
                {videoCardContent?.title}
              </h3>
              <p className="mt-3 text-xs md:text-base text-black leading-relaxed">
                {videoCardContent?.description}
              </p>
            </div>

            {/* Media layer */}
            <div className="rounded-[50px]  absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
              <div className="absolute inset-0 bg-black/15" />
              <VideoModalClient
                videoUrl={data.videoUrl}
                posterUrl={data.image}
                posterAlt={data.imageAlt}
                className="absolute inset-0"
              />
            </div>
          </div>

          {abilities.map((ability) => (
            <div
              key={ability.id}
              className="group relative overflow-hidden rounded-[50px] bg-[#EDF0F1] h-[250px]"
            >
              {/* Text layer */}
              <div className="p-6 md:p-7 transition-opacity duration-300 opacity-100 group-hover:opacity-0 relative z-10 group-hover:pointer-events-none">
                <h3 className="text-base md:text-[20px] font-semibold text-[#111827]">{ability.title}</h3>
                <p className="mt-3 text-xs md:text-base text-black leading-relaxed">
                  {ability.description}
                </p>
              </div>

              {/* Media layer */}
              <div className="rounded-[50px] absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                <div className="absolute inset-0 bg-black/15" />
                <VideoModalClient
                  videoUrl={data.videoUrl}
                  posterUrl={data.image}
                  posterAlt={data.imageAlt}
                  className="absolute inset-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

