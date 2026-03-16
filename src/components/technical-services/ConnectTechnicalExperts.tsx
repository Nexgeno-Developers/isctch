'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ConnectTechnicalExpertsProps {
  heading: string;
  headingHighlight: string;
  formTitle: string;
  illustrationImage: string;
  illustrationAlt: string;
}

/**
 * Connect with Technical Experts Component (Client Component)
 * 
 * Displays a contact form section with illustration.
 */
export default function ConnectTechnicalExperts({
  heading,
  headingHighlight,
  formTitle,
  illustrationImage,
  illustrationAlt
}: ConnectTechnicalExpertsProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-gray-50 py-4 md:py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {heading.replace(headingHighlight, '').trim()}{' '}
            <span className="text-[#009FE8]">{headingHighlight}</span>
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[50px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Section - Contact Form */}
            <div className="p-8 md:p-10 lg:p-12">
              {/* Form Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {formTitle}
              </h3>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Row - First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>

                {/* Second Row - Phone Number & Email Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="emailAddress"
                      placeholder="Email Address"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center text-[#009FE8] text-base md:text-lg font-bold uppercase tracking-wider hover:text-[#0077B6] transition-colors group"
                >
                  SEND MESSAGE
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

            {/* Right Section - Illustration */}
            <div className="relative  rounded-[50px] lg:rounded-l-none">
              <div className="absolute inset-0 flex items-center rounded-[50px] justify-center p-8">
                <Image
                  src={illustrationImage}
                  alt={illustrationAlt}
                  width={600}
                  height={600}
                  className="object-contain rounded-[50px] w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
