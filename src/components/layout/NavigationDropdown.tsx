import Link from 'next/link';
import type { NavigationItem } from '@/lib/api/header';

interface NavigationDropdownProps {
  item: NavigationItem;
}

/**
 * Navigation Dropdown Component (Server Component)
 * 
 * Pure CSS hover-based dropdown - no client-side JavaScript needed.
 * Uses CSS :hover pseudo-class for interactivity.
 */
export default function NavigationDropdown({ item }: NavigationDropdownProps) {
  if (!item.children || item.children.length === 0) {
    return (
      <Link
        href={item.href}
        className="text-white hover:text-[#00d4ff] transition-colors font-[500] text-[16px] tracking-wider relative group"
      >
        {item.label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all group-hover:w-full" />
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        href={item.href}
        className="text-white hover:text-[#00d4ff] transition-colors font-medium text-[18px] tracking-wider flex items-center space-x-1 relative py-2"
      >
        <span>{item.label}</span>
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all group-hover:w-full" />
      </Link>

      {/* Invisible bridge to prevent gap */}
      <div className="absolute top-full left-0 w-full h-3 bg-transparent pointer-events-none group-hover:pointer-events-auto" />

      {/* Dropdown Menu - CSS hover based */}
      <div className="absolute top-full left-0 mt-0 pt-3 min-w-[260px] max-w-[min(100vw-2rem,320px)] bg-transparent z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
        {/* Arrow indicator */}
        {/* <div className="absolute top-0 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" /> */}
        
        {/* Dropdown content */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 py-2 mt-2">
          {item.children.map((child, index) => (
            <Link
              key={child.id}
              href={child.href}
              className="block px-5 py-3 text-black hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-150 group/item relative"
            >
              <span className="relative z-10 flex items-center">
                {child.label}
                {/* <svg
                  className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity transform group-hover/item:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg> */}
              </span>
              {index < item.children!.length - 1 && (
                <div className="absolute bottom-0 left-5 right-5 h-px bg-gray-100" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
