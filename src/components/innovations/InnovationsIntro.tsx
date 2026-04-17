import type { InnovationsPageData } from '@/lib/api/innovations_layout';
import Image from 'next/image';

type Props = Pick<
  InnovationsPageData,
  'introHeadingBlack' | 'introHeadingBlue' | 'introBody' | 'introImage' | 'introImageAlt'
>;

function needsSeparatorBetweenHeadings(black: string, blue: string): boolean {
  const b = black.trimEnd();
  const bl = blue.trimStart();
  if (!b || !bl) return false;
  if (b.endsWith(' ') || bl.startsWith(' ')) return false;
  return true;
}

export default function InnovationsIntro({
  introHeadingBlack,
  introHeadingBlue,
  introBody,
  introImage,
  introImageAlt,
}: Props) {
  const gap = needsSeparatorBetweenHeadings(introHeadingBlack, introHeadingBlue);
  const imageSrc = introImage?.trim() || '/driving_image_1.jpg';
  const imageAlt = introImageAlt?.trim() || 'Innovations Process Illustration';

  return (
    <section className="bg-gray-50 py-8 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <h2 className="text-[22px] md:text-4xl lg:text-5xl text-black font-bold mb-2 md:mb-6 lg:leading-[70px] leading-[30px]">
              <span className="text-black">{introHeadingBlack}</span>
              {gap ? ' ' : null}
              <span className="text-[#009FE8]">{introHeadingBlue}</span>
            </h2>
            <p className="lg:mt-8 mt-4 text-sm leading-relaxed text-black md:text-base">{introBody}</p>
          </div>
          <div>
            <div className="">
            <div
      className=""
      aria-hidden
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={1000}
        height={1000}
        className="rounded-[50px] w-full h-auto object-cover"
      />
    </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
