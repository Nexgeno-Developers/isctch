import Image from 'next/image';
import Link from 'next/link';
import type { RelatedArticleItem } from '@/lib/api/insights_article_detail_layout';

export function RelatedArticleCard({ item }: { item: RelatedArticleItem }) {
  return (
    <article className="overflow-hidden rounded-[18px] bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[14px] rounded-b-md bg-gray-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="320px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#B7D7EA]/50 to-[#009FE8]/15" />
        )}
      </div>
      <div className="pt-3">
        {item.category ? (
          <p className="text-xs font-bold uppercase tracking-wide text-black">{item.category}</p>
        ) : null}
        <h3
          className="mt-1 text-sm font-bold leading-snug text-[#009FE8] line-clamp-2"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
        <p
          className="mt-2 text-xs leading-relaxed text-black/80 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: item.excerpt }}
        />
        <Link
          href={item.href}
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-black hover:text-[#009FE8] transition-colors"
        >
          Read more
          <span className="text-[#009FE8]" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
