'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Merriweather } from 'next/font/google';
import { HEADER_LAYOUT } from '@/lib/api/header';
import NavigationDropdown from './NavigationDropdown';
import MobileMenu from './MobileMenu';

const taglineFont = Merriweather({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
});

export default function Header() {
  const { logo, navigation, cta } = HEADER_LAYOUT;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/90 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3 lg:px-6 lg:py-4">
        <Link
          href={logo.href}
          className="relative z-10 flex min-w-0 shrink-0 items-center gap-3 text-left"
        >
          {logo.lockupImage ? (
            <Image
              src={logo.lockupImage}
              alt={logo.text || 'iSCTH'}
              width={360}
              height={96}
              className="h-14 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-16 lg:max-w-[320px]"
              priority
            />
          ) : (
            <>
              {logo.image ? (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8f4fc] ring-2 ring-[#009fe8]/25 sm:h-14 sm:w-14">
                  <Image
                    src={logo.image}
                    alt=""
                    width={112}
                    height={112}
                    className="h-full w-full object-contain p-1"
                    priority
                    aria-hidden
                  />
                </div>
              ) : null}
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  {logo.acronym ? (
                    <span className="text-xl font-bold tracking-tight text-[#009fe8] sm:text-2xl">
                      {logo.acronym}
                    </span>
                  ) : null}
                  {logo.organizationName ? (
                    <span className="max-w-[14rem] text-[9px] font-semibold leading-snug text-[#009fe8] min-[400px]:max-w-[18rem] min-[400px]:text-[10px] sm:max-w-none sm:text-[11px] lg:text-xs">
                      {logo.organizationName}
                    </span>
                  ) : null}
                </div>
                {logo.tagline ? (
                  <p className={`mt-0.5 text-[11px] text-[#e87722] sm:text-xs ${taglineFont.className}`}>
                    {logo.tagline}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 xl:gap-9 lg:flex"
          aria-label="Primary"
        >
          {navigation.map((item) => (
            <NavigationDropdown key={item.id} item={item} />
          ))}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-3">
          {cta ? (
            <Link
              href={cta.href}
              className="hidden min-h-[44px] min-w-0 items-center justify-center rounded-md bg-[#e87722] px-5 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#d96a18] lg:flex xl:px-7 xl:text-[13px]"
            >
              {cta.text}
            </Link>
          ) : null}

          <div className="flex items-center lg:hidden">
            <MobileMenu navigation={navigation} cta={cta} />
          </div>
        </div>
      </div>
    </header>
  );
}
