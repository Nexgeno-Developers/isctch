import Image from 'next/image';
import Link from 'next/link';

import type { DonateJoinMovementData } from '@/lib/api/donate/types';

const FALLBACK_JOIN_MOVEMENT: DonateJoinMovementData = {
  heading: 'Together, we are the architects of a better world.',
  buttonLabel: 'Join the Movement',
  buttonHref: '/#get-involved',
  backgroundImage: {
    src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1800&q=80',
    alt: 'Earth from space with glowing horizon',
  },
};

export default function DonationJoinMovementSection({ data }: { data?: DonateJoinMovementData }) {
  const safeData = data ?? FALLBACK_JOIN_MOVEMENT;
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] w-full sm:h-[460px]">
        <Image
          src={safeData.backgroundImage.src}
          alt={safeData.backgroundImage.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6">
          <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {safeData.heading}
          </h2>
          <Link
            href={safeData.buttonHref}
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-xl bg-white px-10 py-4 text-lg font-semibold text-[#00a3e8] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#f3f7fb]"
          >
            {safeData.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
