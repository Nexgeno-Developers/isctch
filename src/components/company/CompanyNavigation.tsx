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
         <Image src="/about_us_icon.svg" alt="Info" className='lg:w-20 w-8 lg:h-20 h-8' width={80} height={80} />
         
        );
      case 'globe':
        return (
           <Image src="/vission_mission_icon.svg" alt="Info" className='lg:w-20 w-8 lg:h-20 h-8' width={80} height={80} />
        );
      case 'vision':
        return (
          <Image
            src="/hand-holding-heart 1.svg"
            alt="Vision & Mission"
            className="lg:w-20 w-8 lg:h-20 h-8"
            width={80}
            height={80}
          />
        );
      case 'building':
        return (
          <Image src="/goverment_icon.svg" alt="Info" className='lg:w-20 w-8 lg:h-20 h-8' width={80} height={80} />
        );
      case 'document':
        return (
          <Image src="/media_kit_icon.svg" alt="Info" className='lg:w-20 w-8 lg:h-20 h-8' width={80} height={80} />
        );
      case 'heart':
        return (
          <Image src="/responsibility_icon.svg" className='lg:w-20 w-8 lg:h-20 h-8' alt="Info" width={80} height={80} />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-6">
          {data.items.map((item) => {
            const normalizedActive = (activePath || '').replace(/\/+$/, '') || '/';
            const normalizedHref = (item.href || '').replace(/\/+$/, '') || '/';
            const isActive = normalizedActive === normalizedHref;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center group transition-transform hover:scale-105 min-w-0"
              >
                {/* Circular Icon Container */}
                <div className={`w-20 h-20 md:w-[180px] md:h-[180px] rounded-full flex items-center justify-center mb-2 md:mb-3 transition-colors ${
                  isActive
                    ? 'bg-[#009FE8]'
                    : 'bg-[#EDF0F1] '
                }`}>
                  <div className={`transition-all ${isActive ? 'brightness-0 invert-[1]' : ''}`}>
                    {getIcon(item.icon)}
                  </div>
                </div>
                
                {/* Label */}
                <span className={`text-[14px] md:text-[20px] font-medium text-center transition-colors leading-tight ${
                  isActive ? 'text-[#009FE8] font-semibold' : 'text-black'
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
