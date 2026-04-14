import Link from 'next/link';
import Image from 'next/image';
import { fetchHeaderData, fetchTopBarMenu } from '@/lib/api/header';
import MobileMenu from './MobileMenu';
import NavigationDropdown from './NavigationDropdown';

/**
 * Header Component
 * 
 * Server Component that fetches header data from API
 */
export default async function Header() {
  const [headerData, topBarMenu] = await Promise.all([fetchHeaderData(), fetchTopBarMenu()]);

  return (
    <header className="absolute w-full top-3 sm:top-5 md:top-[30px] z-50 left-0 right-0">
      <div className="container_width container mx-auto px-4 flex flex-col items-end">
        {/* Desktop submenu strip (top-right) */}
        <div className="hidden min-[1023px]:max-lg:flex xl:flex md:flex items-center justify-end gap-6 pr-1 mb-2 text-white">
          {(topBarMenu ?? []).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-[13px] font-semibold hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
        </div>

        <div className="flex items-center justify-between gap-3 h-14 sm:h-16 md:h-20 relative min-w-0 w-full">
          {/* Logo */}
          <Link href={headerData.logo.href} className="flex shrink-0 items-center">
            {headerData.logo.image ? (
              <div className="flex shrink-0 items-center gap-3">
                <Image
                  src={headerData.logo.image}
                  alt={headerData.logo.text || 'Logo'}
                  width={300}
                  height={300}
                  className="mt-4 h-auto w-[70px] shrink-0 object-left min-1023px]:mt-0 min-[1023px]:w-[120px] lg:max-xl:w-[100px] xl:w-[120px]"
                  priority
                />
                
              </div>
            ) : (
              <span className="text-white text-xl md:text-2xl font-bold">
                {headerData.logo.text}
              </span>
            )}
          </Link>

          {/* Desktop Navigation + CTA (Right side) */}
          <div className="ml-auto hidden min-w-0 min-[1023px]:flex min-[1023px]:items-center min-[1023px]:gap-4 lg:max-xl:gap-3 xl:gap-7">
            <nav className="flex min-w-0 items-center space-x-3 lg:max-xl:space-x-2 xl:space-x-[25px]">
              {headerData.navigation.map((item) => (
                <NavigationDropdown key={item.id} item={item} />
              ))}
            </nav>

            {headerData.cta && (
              <Link
                href={headerData.cta.href}
                className="shrink-0 rounded-full border border-[#00d4ff] px-4 py-1.5 text-sm font-medium tracking-wider text-white capitalize transition-all hover:bg-[#00d4ff] hover:text-[#0a1a3a] lg:max-xl:px-3 lg:max-xl:py-1 lg:max-xl:text-xs xl:px-6 xl:py-2 xl:text-[16px]"
              >
                {headerData.cta.text}
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="min-[1023px]:hidden">
            <MobileMenu navigation={headerData.navigation} cta={headerData.cta} />
          </div>
        </div>
      </div>
    </header>
  );
}
