import type { CustomBannerSectionData } from '@/fake-api/page-builder';

export function CustomBannerSection({ data }: { data: CustomBannerSectionData }) {
  return (
    <section className="bg-[#EEF2F3] py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 border border-black/5 text-[#009FE8] text-sm font-semibold tracking-wider uppercase">
            Banner
          </div>
          <p className="mt-6 text-black/90 text-lg md:text-xl leading-relaxed">{data.text}</p>
        </div>
      </div>
    </section>
  );
}

