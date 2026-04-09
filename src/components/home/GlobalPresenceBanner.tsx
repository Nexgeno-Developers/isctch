import Image from 'next/image';

export default function GlobalPresenceBanner() {
  return (
    <section className="relative overflow-hidden lg:my-24 mb-12 bg-gray-50 py-6">
      <div className="absolute inset-0">
        <Image
          src="/global_bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        {/* <div className="absolute inset-0 bg-[#0E233C]/55" aria-hidden /> */}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 text-center md:py-16 lg:py-20">
        <h2 className="text-xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-5xl">
          HOW GLOBAL BEVERAGE BRANDS SCALE WITH ASEPTIC PRECISION
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-sm leading-relaxed text-white/90 md:text-base">
          With advanced manufacturing facilities in China and Indonesia, Lamipak delivers high-quality packaging products to customers
          across more than 80 countries. Our global operations combine precision engineering, scalable production, and carton packaging
          solutions to support brands and companies worldwide.
        </p>
      </div>
    </section>
  );
}

