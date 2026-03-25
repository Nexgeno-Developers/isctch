import Link from 'next/link';
import type { SubCategoryGridSectionData } from '@/fake-api/page-builder';
import type { PageBuilderContext } from '@/components/pageBuilder/PageBuilder';

export function SubCategoryGridSection({
  data,
  pageContext,
}: {
  data: SubCategoryGridSectionData;
  pageContext?: PageBuilderContext;
}) {
  if (!pageContext?.mainCategory) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {data.eyebrow && (
            <p className="text-sm md:text-base text-[#009FE8] uppercase tracking-wide mb-2">{data.eyebrow}</p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#009FE8]">{data.title}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {data.items.map((item) => (
            <Link
              key={item.subCategory}
              href={`/${pageContext.mainCategory}/${item.subCategory}`}
              className="group bg-white rounded-[25px] overflow-hidden border border-gray-200 hover:border-[#009FE8]/50 transition-all duration-300"
            >
              <div className="relative w-full aspect-[16/10] bg-gray-100">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold text-black group-hover:text-[#009FE8] transition-colors">
                  {item.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-[#009FE8] font-medium text-sm">
                  Explore
                  <span aria-hidden className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

