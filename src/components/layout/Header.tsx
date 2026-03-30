import Link from 'next/link';
import Image from 'next/image';
import { fetchHeaderData } from '@/lib/api/header';
import MobileMenu from './MobileMenu';
import NavigationDropdown from './NavigationDropdown';

/**
 * Header Component
 * 
 * Server Component that fetches header data from API
 */
export default async function Header() {
  const headerData = await fetchHeaderData();

  return (
    <header className="absolute w-full top-3 sm:top-5 md:top-[30px] z-50 left-0 right-0">
      <div className="container mx-auto px-4 flex flex-col items-end">
        {/* Desktop submenu strip (top-right) */}
        <div className="hidden lg:flex items-center justify-end gap-6 pr-1 mb-2 text-white">
          {/* <Link
            href="/marketing-services"
            className="text-[12px] font-semibold hover:text-white transition-colors"
          >
            Press Releases
          </Link> */}
          {/* <Link
            href="/marketing-services"
            className="text-[12px] font-semibold hover:text-white transition-colors"
          >
            Events
          </Link> */}
          {/* <Link
            href="/"
            className="text-[13px] font-semibold text-white"
          >
            B2B Portal
          </Link>
          <Link
            href="/"
            className="text-[13px] font-semibold text-white"
          >
            Supplier Portal
          </Link> */}
          {/* <Link
            href="/career"
            className="text-[12px] font-semibold hover:text-white transition-colors"
          >
            Careers
          </Link> */}
        </div>

        <div className="flex items-center justify-between gap-3 h-14 sm:h-16 md:h-20 relative min-w-0 w-full">
          {/* Logo */}
          <Link href={headerData.logo.href} className="flex items-center min-w-0 shrink">
            {headerData.logo.image ? (
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src={headerData.logo.image}
                  alt={headerData.logo.text || 'Logo'}
                  width={300}
                  height={300}
                  className="lg:w-[120px] w-[70px] h-auto object-left lg:mt-0 mt-4"
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
          <div className="hidden md:flex items-center gap-6 lg:gap-12 ml-auto">
            <nav className="flex items-center space-x-[30px] lg:space-x-[40px]">
              {headerData.navigation.map((item) => (
                <NavigationDropdown key={item.id} item={item} />
              ))}
            </nav>

            {headerData.cta && (
              <Link
                href={headerData.cta.href}
                className="border border-[#00d4ff] text-white px-6 py-2 rounded-full hover:bg-[#00d4ff] hover:text-[#0a1a3a] transition-all font-medium text-[18px] uppercase tracking-wider"
              >
                {headerData.cta.text}
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu navigation={headerData.navigation} cta={headerData.cta} />
          </div>
        </div>
      </div>
    </header>
  );
}
