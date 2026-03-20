import Link from 'next/link';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

type SectionData = NonNullable<DynamicPageData['certificationsCertificateTilesSection']>;

function CertificateIcon({ color }: { color: string }) {
  return (
    <svg
      className="mx-auto w-[min(42%,7.5rem)] max-w-[120px] md:max-w-[140px]"
      viewBox="0 0 80 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 10h40l12 12v54a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z"
        stroke={color}
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M54 10v12h12" stroke={color} strokeWidth="2.25" strokeLinejoin="round" />
      <path d="M22 30h36M22 42h28M22 54h32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <circle cx="58" cy="62" r="11" stroke={color} strokeWidth="2.25" />
      <path
        d="m52 72 4 8 4-8m-8-6 8 6"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path d="M46 68h6l-3 10-3-10Z" fill={color} opacity="0.35" />
      <path d="M64 68h6l-3 10-3-10Z" fill={color} opacity="0.35" />
    </svg>
  );
}

export interface CertificateTilesSectionProps {
  data: SectionData;
}

export default function CertificateTilesSection({ data }: CertificateTilesSectionProps) {
  const cardBg = data.cardBackgroundColor ?? '#f0f2f5';
  const linkColor = data.linkColor ?? '#0096FF';
  const iconColor = data.iconColor ?? '#8b9399';
  const sectionBg = data.sectionBackgroundColor ?? '#ffffff';

  return (
    <section className='bg-gray-50 py-8 md:py-12'>
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {data.items.map((item) => {
            const label = item.ctaLabel ?? 'VIEW CERTIFICATE';
            const inner = (
              <>
                <CertificateIcon color={iconColor} />
                <span
                  className="mt-5 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide md:mt-6 md:text-sm"
                  style={{ color: linkColor }}
                >
                  {label}
                  <span className="text-base font-normal leading-none md:text-lg" aria-hidden>
                    →
                  </span>
                </span>
              </>
            );

            const className =
              'flex aspect-square flex-col items-center justify-center rounded-[26px] p-5 shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:rounded-[30px] md:p-7';

            const style = { backgroundColor: cardBg };

            if (item.href.startsWith('http') || item.href.startsWith('//')) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={className}
                  style={style}
                >
                  {inner}
                </a>
              );
            }

            if (item.href === '#' || item.href === '') {
              return (
                <a key={item.id} href={item.href} className={className} style={style}>
                  {inner}
                </a>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                target={item.openInNewTab ? '_blank' : undefined}
                className={className}
                style={style}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
