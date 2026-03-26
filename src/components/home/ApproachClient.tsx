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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    
    // Move to next question if not the last one
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const allQuestionsAnswered = Object.keys(answers).length === data.questions.length;
  const currentQuestion = data.questions[currentQuestionIndex];

  return (
    <section className="bg-[#f8f8f8] overflow-x-hidden">
      <div className="container mx-auto px-4 lg:px-0 max-w-full">
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
          <div className="px-0 pb-8 md:px-4 lg:pe-[50px] lg:ps-5 lg:pb-0 min-w-0">
            {/* Subtitle */}
            <div className="mb-2">
              <span className="text-sm text-gray-600 uppercase tracking-wider">
                Our Approach
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-16">
              <span className="text-black">{data.title}</span> 
             
               <span className="text-[#009FE8]"> {data.titleHighlight}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-black mb-8 text-lg">
              {data.subtitle}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
              {data.questions.map((question, index) => {
                const isAnswered = Boolean(answers[question.id]);
                const isActive = index === currentQuestionIndex;
                const isCompleted = index < currentQuestionIndex;
                
                return (
                  <div key={question.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        isAnswered || isCompleted
                          ? 'bg-[#009FE8] text-white'
                          : isActive
                          ? 'bg-[#009FE8] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < data.questions.length - 1 && (
                      <div
                        className={`h-1 w-12 md:w-16 transition-all ${
                          isAnswered || isCompleted ? 'bg-[#009FE8]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current Question - Show Only One */}
            {currentQuestion && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Question {currentQuestionIndex + 1}: {currentQuestion.question}{' '}
                  <span className="text-sm font-thin">Question {currentQuestionIndex + 1} of {data.questions.length}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.value;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                        className={`cursor-pointer px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                          isSelected
                            ? 'bg-[#009FE8] text-white shadow-md'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-8">
              {/* <Link
                href={`${data.ctaLink}?${new URLSearchParams(answers).toString()}`}
                className={`inline-flex items-center text-[#009FE8] font-semibold text-lg transition-all ${
                  allQuestionsAnswered
                    ? 'opacity-100 hover:text-[#007bb5]'
                    : 'opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              > */}
                <Link
                href='/'
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
