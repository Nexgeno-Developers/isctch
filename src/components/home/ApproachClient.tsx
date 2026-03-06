'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { ApproachData } from '@/fake-api/homepage';

interface ApproachClientProps {
  data: ApproachData;
}

export default function ApproachClient({ data }: ApproachClientProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const allQuestionsAnswered = Object.keys(answers).length === data.questions.length;

  return (
    <section className="bg-white">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative w-full overflow-hidden">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.imageAlt}
                width={1000}
                height={0}
                className="w-full h-auto object-cover"
                priority
              />
            ) : (
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image placeholder</span>
              </div>
            )}
          </div>

          {/* Right Side - Content */}
          <div className="pe-[200px] ps-[30px]">
            {/* Subtitle */}
            <div className="mb-2">
              <span className="text-sm text-gray-600 uppercase tracking-wider">
                Our Approach
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-900">{data.title}</span>
              <br />
              <span className="text-[#009FE8]">{data.titleHighlight}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-gray-700 mb-8 text-lg">
              {data.subtitle}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
              {data.questions.map((question, index) => {
                const isAnswered = Boolean(answers[question.id]);
                return (
                  <div key={question.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        isAnswered
                          ? 'bg-[#009FE8] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < data.questions.length - 1 && (
                      <div
                        className={`h-1 w-12 md:w-16 transition-all ${
                          isAnswered ? 'bg-[#009FE8]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Questions - Show All */}
            <div className="space-y-8">
              {data.questions.map((question) => (
                <div key={question.id}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {question.question}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {question.options.map((option) => {
                      const isSelected = answers[question.id] === option.value;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(question.id, option.value)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-[#009FE8] text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href={`${data.ctaLink}?${new URLSearchParams(answers).toString()}`}
                className={`inline-flex items-center text-[#009FE8] font-semibold text-lg transition-all ${
                  allQuestionsAnswered
                    ? 'opacity-100 hover:text-[#007bb5]'
                    : 'opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                {data.ctaText}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
