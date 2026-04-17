import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function ChevronSeparator({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? 'h-3 w-3 shrink-0 text-black lg:h-4 lg:w-4'}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function HomeLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`shrink-0 text-black transition-colors hover:text-black ${className ?? ''}`}
      aria-label="Home"
    >
      <svg className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </Link>
  );
}

/**
 * Breadcrumbs — desktop: unchanged. Mobile: flex-wrap so crumbs stay on one line when they fit,
 * and wrap to the next line only when needed. Each chevron is grouped with its label.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="w-full" aria-label="Breadcrumb">
      {/* Mobile: natural line wrapping */}
      <div className="md:hidden flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-black">
        <HomeLink />
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span
              key={index}
              className="inline-flex min-w-0 max-w-full items-center gap-1.5"
            >
              <ChevronSeparator className="h-3 w-3 shrink-0 text-black" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="min-w-0 leading-snug break-words hover:text-black"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="min-w-0 leading-snug break-words"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Desktop / tablet */}
      <div className="hidden items-center gap-2 text-sm md:flex md:text-base">
        <HomeLink />
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            <ChevronSeparator />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-black transition-colors hover:text-black lg:text-sm text-xs"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black lg:text-sm text-xs capitalize">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
