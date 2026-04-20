'use client';

import Link from 'next/link';
import { useState, useEffect, useId } from 'react';
import type { NavItem } from '@/lib/api/header/types';

interface MobileMenuClientProps {
  navigation: NavItem[];
  cta?: { text: string; href: string };
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();

  if (!item.children?.length) {
    return (
      <li>
        <Link
          href={item.href}
          className="flex min-h-[48px] items-center rounded-lg px-3 text-[15px] font-semibold uppercase tracking-wide text-[#3d5566] hover:bg-gray-100 hover:text-[#009fe8]"
          onClick={onClose}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80">
      <div className="flex min-h-[48px] items-stretch">
        <Link
          href={item.href}
          className="flex min-w-0 flex-1 items-center px-3 py-3 text-left text-[15px] font-semibold uppercase tracking-wide text-[#3d5566] hover:bg-gray-100"
          onClick={onClose}
        >
          {item.label}
        </Link>
        <button
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={isExpanded}
          aria-controls={`${panelId}-panel`}
          aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-11 shrink-0 items-center justify-center border-l border-gray-200 text-[#009fe8] hover:bg-gray-100"
        >
          <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
      <div
        id={`${panelId}-panel`}
        role="region"
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-0.5 border-t border-gray-200 px-2 py-2">
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.href}
                  className="block rounded-lg px-3 py-2 text-[14px] text-[#5a6d7d] hover:bg-white hover:text-[#009fe8]"
                  onClick={onClose}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/**
 * Mobile drawer + expandable sections for items with `children`.
 * Data from `src/lib/api/header` via `MobileMenu`.
 */
export default function MobileMenuClient({ navigation, cta }: MobileMenuClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-lg text-[#3d5566] hover:bg-gray-100 active:bg-gray-200 lg:hidden"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={`fixed inset-0 z-[55] bg-black/30 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
        onClick={close}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))',
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
        }}
        aria-hidden={!isOpen}
        aria-modal={isOpen}
        role="dialog"
        aria-label="Site navigation"
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#3d5566]">Menu</h2>
            <button
              type="button"
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#3d5566] hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <MobileNavItem key={item.id} item={item} onClose={close} />
              ))}
            </ul>
          </nav>

          {cta ? (
            <div className="shrink-0 border-t border-gray-100 p-4">
              <Link
                href={cta.href}
                onClick={close}
                className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-[#e87722] px-4 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-[#d96a18]"
              >
                {cta.text}
              </Link>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}
