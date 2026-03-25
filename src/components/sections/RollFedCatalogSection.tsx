import type { RollFedCatalogProduct, RollFedCatalogSectionData } from '@/fake-api/page-builder';

function ProductCard({ product }: { product: RollFedCatalogProduct }) {
  return (
    <article className="rounded-[20px] bg-[#EEF2F3] p-5 md:p-6 min-h-[250px] flex flex-col">
      <div className="relative h-28 md:h-32 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.title} className="max-h-full w-auto object-contain" />
        ) : (
          <div className="h-20 w-14 rounded-md bg-[#0EA5E9]/25" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-black">{product.title}</h3>
      <p className="mt-2 text-sm text-black/70 leading-relaxed">{product.sizes}</p>
    </article>
  );
}

function ProductGrid({
  title,
  products,
}: {
  title: string;
  products: RollFedCatalogProduct[];
}) {
  return (
    <section className="mt-10 md:mt-12">
      <h2 className="text-center text-[#009FE8] text-sm md:text-base font-medium mb-6 md:mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function RollFedCatalogSection({ data }: { data: RollFedCatalogSectionData }) {
  return (
    <section className="bg-[#F5F6F7] py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-6xl">
        {data.eyebrow && (
          <p className="text-center text-[#009FE8] text-sm font-medium mb-3">
            {data.eyebrow}
          </p>
        )}
        <p className="text-center text-black/80 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
          {data.intro}
        </p>

        <ProductGrid title={data.standardTitle} products={data.standardProducts} />
        <ProductGrid title={data.premiumTitle} products={data.premiumProducts} />
      </div>
    </section>
  );
}

