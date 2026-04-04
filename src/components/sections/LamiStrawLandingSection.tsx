import Link from 'next/link';
import Image from 'next/image';
import type { LamiStrawIconId, LamiStrawLandingSectionData } from '@/lib/api/product_category_layout_3';
import type { ReactElement } from 'react';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';
import VideoBanner from '@/components/home/VideoBanner';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';
import { formatBoldText } from '@/lib/htmlText';

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:h-40 lg:w-40 rounded-[20px] p-[10px] bg-[#B7D7EA] flex items-center justify-center">
      {children}
    </div>
  );
}

function IconU() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M7 7V17C7 21 10 23 14 23C18 23 21 21 21 17V7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconTelescope() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M8 20L20 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 8H20V16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </svg>
  );
}

function IconI() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M9 9L19 19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconFlow() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M9 9L19 19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 19H18V11" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </svg>
  );
}

const iconById: Record<LamiStrawIconId, () => ReactElement> = {
  u: () => <IconU />,
  telescope: () => <IconTelescope />,
  i: () => <IconI />,
  flow: () => <IconFlow />,
};

function StrawCard({
  card,
}: {
  card: LamiStrawLandingSectionData['cards'][number];
}) {
  const Icon = iconById[card.iconId] ?? iconById.u;

  return (
    <div className="bg-[#EDF0F1] rounded-[50px] p-6 flex flex-col">
      <div className="lg:flex items-start gap-6">
        <IconBase>
          {card.image ? (
            <Image
              src={card.image}
              alt={card.imageAlt || card.title}
              width={300}
              height={300}
              className="h-full w-full object-contain p-[0px] rounded-[20px]"
              priority={false}
            />
          ) : (
            <Icon />
          )}
        </IconBase>
        <div className="flex-1">
          <h3 className="lg:mt-0 mt-5 text-black text-lg md:text-xl font-bold leading-snug">
            {card.title}
          </h3>

          <p className="lg:mt-4 mt-2 text-sm md:text-base text-black leading-relaxed">
            {card.description}
          </p>

          {card.href && (
            <div className="mt-4">
              <Link
                href={card.href}
                className="text-[#009FE8] text-xs md:text-sm font-semibold inline-flex items-center hover:opacity-80 transition-opacity"
              >
                {card.readMoreLabel}
              </Link>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export function LamiStrawLandingSection({
  data,
}: {
  data: LamiStrawLandingSectionData;
}) {
  const videoUrl = cleanVideoUrlFromApi(data.videoUrl);

  return (
    <>
    <section className="bg-gray-50 py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className=" mx-auto text-center">
          <p className="text-[#009FE8] text-xs md:text-sm font-semibold tracking-wider uppercase mb-5">
            {data.eyebrow}
          </p>
          <h1 className="text-[22px] md:text-4xl font-bold text-black leading-tight"
            dangerouslySetInnerHTML={{ __html: formatBoldText(data.title) }} />

            <div className="mt-5 text-sm md:text-base text-black leading-relaxed space-y-4">
              {data.descriptionLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mx-auto">
              {data.cards.map((card) => (
                <StrawCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pb-10 md:pb-24 pt-2 md:pt-4">
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

