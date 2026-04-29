import Image from 'next/image';

import type { ContactGlobalPresenceData } from '@/lib/api/contact';

function GlobePresenceIcon() {
  return (
    <svg className="h-8 w-8 text-[#EF7D00]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.75 12h16.5M12 3.75c2.05 2.22 3.15 4.98 3.15 8.25S14.05 18.03 12 20.25M12 3.75C9.95 5.97 8.85 8.73 8.85 12s1.1 6.03 3.15 8.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ContactGlobalPresenceSection({
  data,
}: {
  data: ContactGlobalPresenceData;
}) {
  return (
    <section
      className="relative overflow-hidden bg-[#06121d] py-8 sm:py-16 lg:py-20"
      aria-labelledby="contact-global-presence-heading"
    >
      <Image
        src={data.image.src}
        alt={data.image.alt}
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-[550px] rounded-[14px] border border-white/70 bg-white/95 px-7 py-9 text-center shadow-[0_28px_80px_-36px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:px-10 sm:py-10">
          <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-[12px] bg-[#FFF1E3]">
            <GlobePresenceIcon />
          </div>
          <h2
            id="contact-global-presence-heading"
            className="mt-6 text-center text-3xl font-black tracking-tight text-[#1A1A2E] lg:text-[30px]"
          >
            {data.heading}
          </h2>
          <p className="mx-auto max-w-[450px] mt-5 text-[18px] leading-relaxed text-[#3E4850]">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
