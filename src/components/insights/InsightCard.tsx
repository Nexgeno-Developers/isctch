import Image from 'next/image';
import Link from 'next/link';
import type { InsightItem } from '@/lib/api/insights_layout';

export type InsightCardVariant = 'articles' | 'webinar' | 'newsletter';

const shellByVariant: Record<InsightCardVariant, string> = {
  articles: 'bg-[#E5F2FA] border border-[#B7D7EA]/35',
  webinar: 'bg-white shadow-sm border border-black/5',
  newsletter: 'bg-[#E5F2FA] border border-[#B7D7EA]/35',
};

export function InsightCard({
  item,
  variant,
}: {
  item: InsightItem;
  variant: InsightCardVariant;
}) {
  const shell = shellByVariant[variant];

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[28px] ${shell} p-4 md:p-5 h-full`}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[20px] bg-gray-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#B7D7EA]/40 to-[#009FE8]/20" />
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3
          className="text-base md:text-lg font-bold text-[#009FE8] leading-snug"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
        <p
          className="mt-2 text-sm md:text-[15px] text-black leading-relaxed flex-1 line-clamp-4"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
        <div className="mt-4 pt-1">
          <Link
            href={item.href}
            className="text-sm font-bold text-black hover:text-[#009FE8] transition-colors inline-flex items-center gap-1"
          >
            Read more
            <span aria-hidden className="text-[#009FE8]">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
