import type { ProductDetailsSectionData } from '@/fake-api/page-builder';

export function ProductDetailsSection({ data }: { data: ProductDetailsSectionData }) {
  return (
    <section className="bg-gray-50 pt-10 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 items-start">
          <div className="rounded-[25px] overflow-hidden bg-white border border-gray-200">
            {data.image ? (
              <div className="relative w-full aspect-[16/11] bg-gray-100">
                <img src={data.image} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full aspect-[16/11] bg-gray-200" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-3xl md:text-4xl font-bold text-black">{data.title}</h2>
            {data.shortDescription && (
              <p className="mt-4 text-black/80 text-base md:text-lg leading-relaxed">
                {data.shortDescription}
              </p>
            )}

            {data.description && (
              <div className="mt-6 text-black/80 leading-relaxed text-base md:text-lg">
                {data.description}
              </div>
            )}

            {data.technicalSheetUrl && (
              <div className="mt-8">
                <a
                  href={data.technicalSheetUrl}
                  target={data.technicalSheetUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-[#009FE8] px-6 py-3 text-white font-bold uppercase tracking-wider hover:bg-[#0077B6] transition-colors"
                >
                  {data.technicalSheetText || 'Download Technical Sheet'}
                  <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

