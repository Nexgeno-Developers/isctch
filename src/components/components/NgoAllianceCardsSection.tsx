import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NgoAllianceCardsSectionData } from '@/lib/api/sustainability_layout_5';
import { RichText } from '@/components/common/RichText';

export interface NgoAllianceCardsSectionProps {
  data: NgoAllianceCardsSectionData;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function AllianceCardLink({
  href,
  accent,
  children,
}: {
  href: string;
  accent: string;
  children: ReactNode;
}) {
  const outline = { outlineColor: accent } as React.CSSProperties;
  const className =
    'group block h-full rounded-2xl bg-[#EDF0F1] p-5 md:p-6 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        style={outline}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={outline}>
      {children}
    </Link>
  );
}

export default function NgoAllianceCardsSection({ data }: NgoAllianceCardsSectionProps) {
  const accent = data.accentColor?.trim() || '#00AEEF';

  return (
    <section className="py-0 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className="flex gap-6 overflow-x-auto overscroll-x-contain pb-2 scrollbar-hide snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0 lg:snap-none [scroll-padding-inline-end:16px]"
          aria-label={data.heading ? undefined : 'Membership partners'}
        >
          {data.cards.map((card) => (
            <div
              key={card.id}
              className="w-[min(22rem,calc(100vw-2.5rem))] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:flex-1 lg:snap-none"
            > 
              <AllianceCardLink href={card.href} accent={accent}>
                {card.imageUrl ? (
                  <div className="relative mb-5 w-full overflow-hidden">
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt || ''}
                      width={200}
                      height={200}
                      className="w-[120px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes=""
                    />
                  </div>
                ) : null}
                {card.html ? (
                  <RichText
                    html={card.html}
                    className="text-sm text-gray-900 [&_p:last-child]:mb-0 [&_p]:mb-3 [&_strong]:font-semibold"
                  />
                ) : null}
              </AllianceCardLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
