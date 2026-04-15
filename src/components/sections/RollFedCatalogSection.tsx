import Link from 'next/link';
import Image from 'next/image';
import VideoBanner from '@/components/home/VideoBanner';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';
import { RichText } from '@/components/common/RichText';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';

type RollFedCatalogProduct = {
  id: string;
  slug: string;
  title: string;
  sizes: string;
  image?: string;
};

type RollFedCatalogSectionPropsData = {
  eyebrow?: string;
  intro: string;
  videoUrl?: string;
  standardTitle: string;
  standardProducts: RollFedCatalogProduct[];
  premiumTitle: string;
  premiumProducts: RollFedCatalogProduct[];
};

function ProductCard({ product }: { product: RollFedCatalogProduct }) {
  const href = product.slug?.startsWith('/') ? product.slug : `/${product.slug}`;
  return (
    <Link
      // href={`/products/${product.slug}`}
      href={href}
      className="rounded-[50px] bg-[#EDF0F1] p-5 md:p-[20px] flex flex-col transition-all"
    >
      <div className="relative rounded-[50px] flex items-center justify-center">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={800}
            height={800}
            className="object-contain lg:w-[70%] w-[100%] mx-auto rounded-[50px]"
            priority={false}
          />
        ) : (
          <div className="" />
        )}
      </div>
      <h3 className="mt-6 text-lg font-bold text-black">{product.title}</h3>
      <p className="mt-1 text-sm text-black leading-relaxed mb-3 line-clamp-2">{product.sizes}</p>
    </Link>
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


      <h2 className="text-center text-[#009FE8] text-[20px] md:text-[24px] font-bold mb-4 md:mb-8">
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

export function RollFedCatalogSection({ data }: { data: RollFedCatalogSectionPropsData }) {
  const videoUrl = cleanVideoUrlFromApi(data.videoUrl);

  return (
    <>
      <section className="bg-gray-50 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <p className="text-[#009FE8] text-xs md:text-sm font-semibold text-center tracking-wider uppercase mb-5">
            {data.eyebrow}
          </p>
          <div className="text-center text-black text-sm md:text-base leading-relaxed mx-auto">
            <RichText html={data.intro} />
          </div>

          <ProductGrid title={data.standardTitle} products={data.standardProducts} />
          {data.premiumTitle && data.premiumProducts.length > 0 && (
            <ProductGrid title={data.premiumTitle} products={data.premiumProducts} />
          )}
        </div>
      </section>

      <div className="pb-10 md:pb-12 lg:pb-24 md:pt-8 pt-0 lg:mt-5 mt-0">
        {videoUrl ? (
          <VideoBanner
            prefetchedData={{
              title: '',
              preTitle: '',
              ctaText: '',
              ctaLink: '',
              videoUrl,
            }}
          />
        ) : null}
      </div>


      <CallToAction />
      <NewsletterSubscription />
    </>
  );
}

