'use client';

import { useState } from 'react';
import type { FAQItem } from '@/lib/api/home';

interface FAQItemClientProps {
  item: FAQItem;
}

export default function FAQItemClient({ item }: FAQItemClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasHtml = (text: string) => /<[^>]+>/.test(text);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full py-4 md:py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span
          className="text-base md:text-xl font-medium text-black pr-4 flex-1"
          dangerouslySetInnerHTML={{ __html: item.question }}
        />

        <div className="flex-shrink-0 lg:w-8 lg:h-8 w-6 h-6 rounded-full bg-[#009FE8] flex items-center justify-center transition-transform group-hover:scale-110">
          <svg
            className={`lg:w-5 lg:h-5 w-4 h-4 text-white transition-transform duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="pb-6 pl-0 lg:pr-12">
          {item.answer
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((paragraph, idx, arr) =>
              hasHtml(paragraph) ? (
                <p
                  key={`${item.id}-p-${idx}`}
                  className={`text-black lg:text-base text-sm leading-relaxed ${idx > 0 ? 'mt-4' : ''}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ) : (
                <p
                  key={`${item.id}-p-${idx}`}
                  className={`text-black lg:text-base text-sm leading-relaxed ${idx > 0 ? 'mt-4' : ''}`}
                >
                  {paragraph}
                </p>
              ),
            )}
        </div>
      )}
    </div>
  );
}
