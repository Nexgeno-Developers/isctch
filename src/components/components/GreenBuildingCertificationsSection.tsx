import Image from 'next/image';
import type { GreenBuildingCertificationsSectionData } from '@/lib/api/sustainability_layout_4';

type SectionData = GreenBuildingCertificationsSectionData;

function RibbonBadgeIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="11" fill={color} />
      <path
        d="M12 6a2.8 2.8 0 0 1 2.8 2.8c0 1-.5 1.9-1.3 2.4l1.4 4.3h-6l1.4-4.3A2.8 2.8 0 0 1 9.2 8.8 2.8 2.8 0 0 1 12 6Z"
        fill="white"
      />
      <path d="M9.5 16h5l-.6 2H10l-.5-2Z" fill="white" opacity="0.92" />
    </svg>
  );
}

export interface GreenBuildingCertificationsSectionProps {
  data: SectionData;
}

export default function GreenBuildingCertificationsSection({ data }: GreenBuildingCertificationsSectionProps) {
  const eyebrowColor = data.eyebrowColor ?? '#00AEEF';
  const headingGreen = data.headingGreenColor ?? '#0D9B4E';
  const pillColor = data.pillColor ?? '#009CFF';
  const iconColor = data.iconCircleColor ?? '#00AEEF';

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center md:mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] md:text-sm text-[#009FE8]"
          >
            {data.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            <span className='text-[#009FE8]'>{data.headingGreen}</span>{' '}
            <span className="text-black">{data.headingBlack}</span>
          </h2>
        </header>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {data.cards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-[50px] bg-white"
            >
              {/* Height auto: remove forced aspect ratio + use normal <img>. */}
              <div className="w-full overflow-hidden p-3 md:p-4">
                <div className="overflow-hidden rounded-[50px]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="block w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="space-y-4 px-5 pb-6 pt-1 md:px-7 md:pb-8">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                    <RibbonBadgeIcon className="h-11 w-11" color={iconColor} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-lg font-bold text-black md:text-xl">{card.factoryTitle}</h3>
                    <p className="text-sm text-gray-500 md:text-base">{card.location}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className="inline-flex rounded-full px-3.5 py-1 text-xs font-semibold text-white md:text-sm"
                    style={{ backgroundColor: pillColor }}
                  >
                    {card.certificationLabel}
                  </span>
                  <span className="text-sm font-medium text-gray-500 md:text-base">{card.year}</span>
                </div>

                <p className="text-sm leading-relaxed text-black md:text-base">{card.description}</p>

                {card.badgeImages && card.badgeImages.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-3 pt-5">
                    {card.badgeImages.map((badge) => (
                      <div
                        key={badge.src + badge.alt}
                        className="relative  shrink-0 overflow-hidden rounded-lg "
                      >
                        <Image
                          src={badge.src}
                          alt={badge.alt}
                          width={200}
                          height={200}
                          className="object-contain p-1 w-[100px]"
                          sizes="96px"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
