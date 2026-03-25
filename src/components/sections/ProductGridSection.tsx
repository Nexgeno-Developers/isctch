import Link from 'next/link';
import type { ProductGridSectionData, ProductGridSectionItem } from '@/fake-api/page-builder';
import type { PageBuilderContext } from '@/components/pageBuilder/PageBuilder';

function ProductCard({
  item,
  href,
}: {
  item: Extract<ProductGridSectionItem, { type: 'product' }>;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-[25px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {item.image ? (
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300" />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-black group-hover:text-[#009FE8] transition-colors">
          {item.title}
        </h3>
        <div className="mt-auto pt-5 flex items-center text-[#009FE8] font-medium text-sm">
          Learn More
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function ProductGridSection({
  data,
  pageContext,
}: {
  data: ProductGridSectionData;
  pageContext?: PageBuilderContext;
}) {
  if (!pageContext?.mainCategory || !pageContext.subCategory) return null;

  return (
    <section className="bg-gray-50 py-12 md:pt-24 md:pb-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {data.eyebrow && (
            <p className="text-sm md:text-base text-[#009FE8] uppercase tracking-wide mb-2">{data.eyebrow}</p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#009FE8]">{data.title}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {data.products.map((item) => {
            if (item.type === 'external') {
              return (
                <a
                  key={`${item.type}-${item.url}-${item.title}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-[25px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300" />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200" />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-black group-hover:text-[#009FE8] transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-auto pt-5 flex items-center text-[#009FE8] font-medium text-sm">
                      Visit
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            }

            const href = `/${pageContext.mainCategory}/${pageContext.subCategory}/${item.slug}`;
            return <ProductCard key={item.slug} item={item} href={href} />;
          })}
        </div>
      </div>
    </section>
  );
}

