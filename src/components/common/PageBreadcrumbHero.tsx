import Link from 'next/link';

type PageBreadcrumbHeroProps = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
  homeHref?: string;
};

export default function PageBreadcrumbHero({
  breadcrumbHomeLabel,
  breadcrumbCurrentLabel,
  kicker,
  titleBlue,
  titleOrange,
  homeHref = '/',
}: PageBreadcrumbHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(125.74deg,_#F0FBFF_0%,_#FFF8F0_100%)] py-8 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-[#8b97a7]">
          <Link href={homeHref} className="hover:underline">
            {breadcrumbHomeLabel}
          </Link>{' '}
          / <span className="text-[#f28500]">{breadcrumbCurrentLabel}</span>
        </p>
        <p className="mt-2 inline-flex items-center rounded-full bg-[#fff2e3] px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#f28500]">
          {kicker}
        </p>
        <h1 className="mt-8 text-[20px] font-bold leading-tight tracking-tight lg:text-[60px]">
          <span className="text-[#009FE3]">{titleBlue}</span>{' '}
          <span className="text-[#EF7D00]">{titleOrange}</span>
        </h1>
      </div>
    </section>
  );
}
