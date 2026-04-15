import Image from 'next/image';
import { fetchHomepageData } from '@/lib/api/home';

export default async function GlobalPresenceBanner() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;

  const banner = homepageData.globalPresenceBanner;
  const backgroundImage = banner?.backgroundImage || '/global_bg.png';
  const title = banner?.title || '';
  const description = banner?.description || '';

  if (!title && !description) return null;

  return (
    <section className="relative overflow-hidden bg-gray-50 py-6">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 text-center md:py-20 lg:py-[150px]">
        <h2 className="text-xl font-bold capitalize tracking-wide text-white md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mx-auto mt-5 max-w-4xl text-sm leading-relaxed text-white/90 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

