import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs Component
 * 
 * Displays navigation breadcrumbs with home icon and separators.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm md:text-base" aria-label="Breadcrumb">
      {/* Home Icon */}
      <Link
        href="/"
        className="text-black hover:text-black transition-colors"
        aria-label="Home"
      >
        <svg
          className="lg:w-5 w-4 lg:h-5 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {/* Separator - Arrow */}
          <svg
            className="lg:w-4 w-3 lg:h-4 h-3 text-black"
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
          </svg>
          
          {/* Item */}
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-black hover:text-black transition-colors lg:text-sm text-xs"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-black lg:text-sm text-xs">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
