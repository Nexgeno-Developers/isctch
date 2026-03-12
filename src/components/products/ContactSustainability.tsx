'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Contact & Sustainability Section Component (Client Component)
 * 
 * Displays a two-panel section:
 * - Left: Contact Us form
 * - Right: Sustainability information
 */
export default function ContactSustainability() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Panel - Contact Us Form */}
          <div className="bg-[#F5F5F5] rounded-[50px] p-8 md:p-10 lg:p-12">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Contact Us
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-700 mb-8">
              Get in touch with our packaging specialists.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white rounded-[25px] border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Business Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-white rounded-[25px] border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-bold uppercase tracking-wider hover:text-[#0077B6] transition-colors group"
              >
                SUBMIT
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 ml-2 transform group-hover:translate-x-1 transition-transform"
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
              </button>
            </form>
          </div>

          {/* Right Panel - Sustainability Information */}
          <div className="bg-[#009FE8] rounded-[50px] p-8 md:p-10 lg:p-12">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Sustainability Is Part of Us
            </h2>

            {/* Body Text */}
            <p className="text-base md:text-lg text-white mb-6 leading-relaxed">
              We are committed to delivering packaging solutions that are as good for the planet as they are for your products. CDP A-grade rated with LEED Platinum facilities.
            </p>

            {/* Certifications */}
            <div className="mb-8">
              <p className="text-sm md:text-base text-white font-medium">
                FSC | ISO 14001 | CDP A-Grade | LEED
              </p>
            </div>

            {/* Learn More Link */}
            <Link
              href="/sustainability"
              className="inline-flex items-center text-white text-base md:text-lg font-bold uppercase tracking-wider hover:opacity-80 transition-opacity group"
            >
              LEARN MORE
              <svg
                className="w-5 h-5 md:w-6 md:h-6 ml-2 transform group-hover:translate-x-1 transition-transform"
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
    </section>
  );
}
