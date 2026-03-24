import Link from 'next/link';
import { fetchHeaderData } from '@/lib/api';
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
    <header className="absolute w-full top-[30px] z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo */}
          <Link href={headerData.logo.href} className="flex items-center">
            {headerData.logo.image ? (
              <div className="flex items-center gap-3">
                <img
                  src={headerData.logo.image}
                  alt={headerData.logo.text || 'Logo'}
                  className="h-12 md:h-24 w-auto"
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
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
