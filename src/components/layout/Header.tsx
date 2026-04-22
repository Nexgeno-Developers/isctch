'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HEADER_LAYOUT } from '@/lib/api/header';
import NavigationDropdown from './NavigationDropdown';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { logo, navigation, cta } = HEADER_LAYOUT;

  return (
    <header className="sticky top-0 z-50 w-full bg-white  py-3">
      <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <Link
          href={logo.href}
          className="relative z-10 flex min-w-0 shrink-0 items-center"
        >
          {logo.lockupImage ? (
            <Image
              src={logo.lockupImage}
              alt={logo.text || 'Logo'}
              width={360}
              height={96}
              className="h-12 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-14 lg:max-w-[320px]"
              priority
            />
          ) : logo.image ? (
            <Image
              src={logo.image}
              alt={logo.text || 'Logo'}
              width={280}
              height={96}
              className="w-[110px] object-contain object-left"
              priority
            />
          ) : null}
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
              className="hidden min-h-[44px] min-w-0 items-center justify-center rounded-[8px] bg-[#FF8918] px-5 py-2.1
               text-center text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#d96a18] 
               lg:flex xl:px-7"
            >
              {cta.text}
            </Link>
          ) : null}

          <div className="flex items-center lg:hidden">
            <MobileMenu navigation={navigation} cta={cta} />
          </div>
        </div>
      </div>
        
      </div>
    </header>
  );
}
