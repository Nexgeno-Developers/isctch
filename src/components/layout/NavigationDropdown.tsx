'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/api/header/types';

function isActivePath(pathname: string, href: string): boolean {
  if (href === '#' || href.startsWith('#')) return false;
  if (href === '/') return pathname === '/';
  try {
    const path = new URL(href, 'https://example.com').pathname;
    return pathname === path || pathname.startsWith(`${path}/`);
  } catch {
    return pathname === href;
  }
}

function navLinkClass(active: boolean): string {
  return `relative whitespace-nowrap border-b-2 pb-0.5 text-[13px] font-semibold uppercase tracking-wide xl:text-sm ${
    active
      ? 'border-[#009fe8] !text-[#475569]'
      : 'border-transparent !text-[#475569] hover:border-[#009fe8]/40 hover:text-[#009fe8]'
  }`;
}

interface NavigationDropdownProps {
  item: NavItem;
}

/**
 * Desktop: flat link, or parent + hover dropdown when `item.children` is set.
 * Data: `src/lib/api/header` → `HEADER_LAYOUT.navigation`.
 */
export default function NavigationDropdown({ item }: NavigationDropdownProps) {
  const pathname = usePathname();
  const selfActive = isActivePath(pathname, item.href);
  const childActive =
    item.children?.some((c) => isActivePath(pathname, c.href)) ?? false;
  const active = selfActive || childActive;

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={navLinkClass(active)}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={item.href}
        className={`${navLinkClass(active)} inline-flex items-center gap-1`}
      >
        <span>{item.label}</span>
        <svg
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="min-w-[220px] rounded-lg border border-gray-100 bg-white py-2 shadow-xl">
          {item.children.map((child) => {
            const cActive = isActivePath(pathname, child.href);
            return (
              <Link
                key={child.id}
                href={child.href}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  cActive
                    ? 'bg-[#009fe8]/10 text-[#009fe8]'
                    : 'text-[#3d5566] hover:bg-gray-50 hover:text-[#009fe8]'
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
