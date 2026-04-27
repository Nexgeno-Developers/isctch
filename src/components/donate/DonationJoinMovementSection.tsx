import Image from 'next/image';
import Link from 'next/link';

import { getInvolvedPath } from '@/config/publicRoutes';
import type { DonateJoinMovementData } from '@/lib/api/donate/types';

const FALLBACK_JOIN_MOVEMENT: DonateJoinMovementData = {
  heading: 'Together, we are the architects of a better world.',
  buttonLabel: 'Join the Movement',
  buttonHref: getInvolvedPath(),
  backgroundImage: {
    src: '/calltoaction_images.webp',
    alt: 'Earth from space with glowing horizon',
  },
};

export default function DonationJoinMovementSection({ data }: { data?: DonateJoinMovementData }) {
  const safeData = data ?? FALLBACK_JOIN_MOVEMENT;
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] w-full lg:h-[550px]">
        <Image
          src={safeData.backgroundImage.src}
          alt={safeData.backgroundImage.alt}
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
          <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {safeData.heading}
          </h2>
          <Link
            href={safeData.buttonHref}
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-[#009FE3] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#f3f7fb]"
          >
            {safeData.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
