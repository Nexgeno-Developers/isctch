import type { DynamicPageData } from '@/fake-api/dynamic-pages';

type SectionData = NonNullable<DynamicPageData['greenSustainabilityVisionSection']>;

const BRAND_BLUE = '#00A0E3';

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 16h22M16 5c3.5 4 3.5 18 0 22M16 5c-3.5 4-3.5 18 0 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSocial({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 22v-4c0-1.1.9-2 2-2h2m6 6v-4a4 4 0 0 0-4-4h-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="13" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M22 8l3 3-3 3M25 11h-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconProduct({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 12l8-4 8 4v10l-8 4-8-4V12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 12l8 4 8-4M16 16v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconBusiness({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 10l2-2 2 2M16 8v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 22l4-3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M9 25c2-2 5.5-3 7-3s5 1 7 3M11 13h10v6H11v-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  globe: IconGlobe,
  social: IconSocial,
  product: IconProduct,
  business: IconBusiness,
} as const;

export interface GreenSustainabilityVisionSectionProps {
  data: SectionData;
}

export default function GreenSustainabilityVisionSection({ data }: GreenSustainabilityVisionSectionProps) {
  return (
    <section className="bg-[#f5f6f8] py-14 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="mb-12 text-center md:mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
            <span style={{ color: BRAND_BLUE }}>{data.headingBrand}</span>{' '}
            <span className="font-bold">{data.headingRest}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-gray-800 md:text-base">
            {data.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {data.cards.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <article
                key={card.id}
                className="flex flex-col overflow-hidden rounded-[18px] bg-white shadow-md shadow-gray-200/80"
              >
                <div
                  className="flex items-center gap-3 px-4 py-4 sm:px-5"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
                    <Icon className="h-9 w-9" />
                  </span>
                  <h3 className="text-left text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
                    {card.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-4 py-5 sm:px-5">
                  {card.bullets.map((bullet, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-gray-800">
                      <span className="mr-1 font-medium text-gray-700">&gt;</span>
                      {bullet.parts.map((part, i) =>
                        part.bold ? (
                          <strong key={i} className="font-semibold text-gray-900">
                            {part.text}
                          </strong>
                        ) : (
                          <span key={i}>{part.text}</span>
                        ),
                      )}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-4xl text-center text-sm leading-relaxed text-gray-500 md:mt-14 md:text-base">
          {data.footerText}
        </p>
      </div>
    </section>
  );
}
