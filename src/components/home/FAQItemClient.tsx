'use client';

import { useState } from 'react';
import type { FAQItem } from '@/fake-api/homepage';

interface FAQItemClientProps {
  item: FAQItem;
}

export default function FAQItemClient({ item }: FAQItemClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        {/* Question Text */}
        <span className="text-lg md:text-xl font-medium text-gray-900 pr-4 flex-1">
          {item.question}
        </span>

        {/* Plus/Minus Icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#009FE8] flex items-center justify-center transition-transform group-hover:scale-110">
          <svg
            className={`w-5 h-5 text-white transition-transform duration-300 ${
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

      {/* Answer */}
      {isOpen && (
        <div className="pb-6 pl-0 pr-12">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}
