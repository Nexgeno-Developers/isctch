import Link from 'next/link';
import type { CompanyNavigation as CompanyNavigationType } from '@/fake-api/company';
import Image from 'next/image';
interface CompanyNavigationProps {
  data: CompanyNavigationType;
  activePath?: string;
}

/**
 * Company Navigation Component (Server Component)
 * 
 * Displays circular icon cards with labels in a horizontal row.
 * Each card is clickable and links to a specific page.
 * Highlights the active item based on the current pathname.
 */
export default function CompanyNavigation({ data, activePath }: CompanyNavigationProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'info':
        return (
         <Image src="/about_us_icon.svg" alt="Info" width={80} height={80} />
         
        );
      case 'globe':
        return (
           <Image src="/vission_mission_icon.svg" alt="Info" width={80} height={80} />
        );
      case 'building':
        return (
          <Image src="/goverment_icon.svg" alt="Info" width={80} height={80} />
        );
      case 'document':
        return (
          <Image src="/media_kit_icon.svg" alt="Info" width={80} height={80} />
        );
      case 'heart':
        return (
          <Image src="/responsibility_icon.svg" alt="Info" width={80} height={80} />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {data.items.map((item) => {
            // Check if current path matches item href, or if on /about-us and item is "About us" (/our-company)
            const isActive = activePath === item.href || 
              (activePath === '/about-us' && item.href === '/our-company') ||
              (activePath === '/our-company' && item.href === '/our-company');
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center group transition-transform hover:scale-105"
              >
                {/* Circular Icon Container */}
                <div className={`w-20 h-20 md:w-[180px] md:h-[180px] rounded-full flex items-center justify-center mb-3 transition-colors ${
                  isActive
                    ? 'bg-[#009FE8]'
                    : 'bg-[#EDF0F1] '
                }`}>
                  <div className={isActive ? 'text-white' : 'text-[#009FE8]'}>
                    {getIcon(item.icon)}
                  </div>
                </div>
                
                {/* Label */}
                <span className={`text-sm md:text-[20px] font-medium text-center transition-colors ${
                  isActive ? 'text-[#009FE8] font-semibold' : 'text-gray-900'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
