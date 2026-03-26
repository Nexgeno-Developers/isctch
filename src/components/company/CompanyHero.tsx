import type { CompanyHero as CompanyHeroType } from '@/fake-api/company';

interface CompanyHeroProps {
  data: CompanyHeroType;
}

/**
 * Company Hero Component (Server Component)
 * 
 * Displays a hero section with background image and dark blue overlay,
 * featuring the title centered in white.
 */
export default function CompanyHero({ data }: CompanyHeroProps) {
  return (
    <section className="relative pt-[220px] pb-[150px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {data.backgroundImage ? (
          <img
            src={data.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        {/* Dark Blue Overlay */}
        <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
        {/* Blur Effect */}
        {/* <div className="absolute inset-0 backdrop-blur-sm" /> */}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white  tracking-tight">
              {data.title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
