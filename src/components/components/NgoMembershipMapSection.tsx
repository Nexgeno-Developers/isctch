import type { NgoMembershipMapSectionData } from '@/lib/api/sustainability_layout_5';
import Image from 'next/image';

type SectionData = NgoMembershipMapSectionData;

const FALLBACK_MAP = '/ngo_image.webp';

export interface NgoMembershipMapSectionProps {
  data: SectionData;
}

export default function NgoMembershipMapSection({ data }: NgoMembershipMapSectionProps) {
  const accent = data.accentColor ?? '#00AEEF';
  const mapSrc = data.mapImage?.trim() || FALLBACK_MAP;
  const mapAlt = data.mapImageAlt?.trim() || 'NGO membership map';

  return (
    <section className="py-14 md:pt-20 md:pb-12 bg-gray-50">
      <div className="container mx-auto px-4 ">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:mb-14 md:text-4xl lg:text-5xl">
          <span style={{ color: accent }}>{data.headingBlue}</span>{' '}
          <span className="text-black">{data.headingBlack}</span>
        </h2>

        <div>
          <Image
            src={mapSrc}
            alt={mapAlt}
            className="mx-auto h-full w-[50%] object-cover"
            width={1000}
            height={520}
          />
        </div>
      </div>
    </section>
  );
}
