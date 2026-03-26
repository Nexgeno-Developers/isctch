'use client';

import Link from 'next/link';
import { useState, useEffect, useId } from 'react';
import type { NavigationItem } from '@/fake-api/layout';

interface MobileMenuClientProps {
  navigation: NavigationItem[];
  cta?: { text: string; href: string };
}

interface MobileNavItemProps {
  item: NavigationItem;
  onClose: () => void;
}

function MobileNavItem({ item, onClose }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();

  if (!item.children || item.children.length === 0) {
    return (
      <li>
        <Link
          href={item.href}
          className="flex items-center min-h-[52px] px-4 -mx-1 rounded-2xl text-white/95 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors text-[15px] font-semibold tracking-wide"
          onClick={onClose}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06] overflow-hidden">
      <div className="flex items-stretch min-h-[52px]">
        <Link
          href={item.href}
          className="flex flex-1 items-center px-4 py-3 text-left text-white/95 hover:bg-white/[0.06] active:bg-white/[0.1] transition-colors text-[15px] font-semibold tracking-wide min-w-0"
          onClick={onClose}
        >
          {item.label}
        </Link>
        <button
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={isExpanded}
          aria-controls={`${panelId}-panel`}
          aria-label={isExpanded ? `Collapse ${item.label} submenu` : `Expand ${item.label} submenu`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-auto w-12 shrink-0 items-center justify-center text-[#00d4ff] hover:bg-white/[0.06] active:bg-white/[0.1] transition-colors border-l border-white/[0.08]"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#009FE8]/20 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
      <div
        id={`${panelId}-panel`}
        role="region"
        aria-labelledby={`${panelId}-trigger`}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-0.5 px-2 pb-3 pt-0 border-t border-white/[0.08]">
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.href}
                  className="block rounded-xl px-3 py-2.5 text-[14px] text-white/70 hover:text-[#00d4ff] hover:bg-white/[0.06] transition-colors"
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

export default function MobileMenuClient({ navigation, cta }: MobileMenuClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
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

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="md:hidden relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[55] md:hidden bg-[#0a1628]/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        onClick={handleClose}
      />

      {/* Panel: entire sheet slides off-screen when closed (background must move with it, not only inner content) */}
      <aside
        className={`fixed inset-y-0 right-0 z-[60] flex w-full max-w-[100vw] flex-col bg-gradient-to-b from-[#0c1f45] via-[#0a1a3a] to-[#081428] shadow-[-8px_0_40px_rgba(0,0,0,0.35)] md:hidden sm:max-w-[min(100%,22rem)] border-l border-white/[0.08] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
          isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
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
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-4 pt-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#009FE8]/90">Navigate</p>
              <h2 className="text-lg font-bold text-white tracking-tight">Menu</h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white hover:bg-white/[0.14] active:bg-white/[0.18] transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-[#009FE8]/40 to-transparent shrink-0" />

          {/* Nav */}
          <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4">
            <ul className="flex flex-col gap-2">
              {navigation.map((item) => (
                <MobileNavItem key={item.id} item={item} onClose={handleClose} />
              ))}
            </ul>
          </nav>

          {cta && (
            <div className="shrink-0 px-4 pb-1 pt-2">
              <Link
                href={cta.href}
                onClick={handleClose}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#009FE8] px-6 text-center text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#009FE8]/25 hover:bg-[#00b4f0] active:scale-[0.98] transition-all"
              >
                {cta.text}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
