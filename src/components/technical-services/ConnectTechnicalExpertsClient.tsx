'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { submitForm } from '@/lib/forms/client';

type FormState = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  message: string;
};

interface ConnectTechnicalExpertsClientProps {
  headingHtml?: string;
  formTitleHtml?: string;
  illustrationImage: string;
  illustrationAlt: string;
}

/**
 * Connect with Technical Experts Component (Client Component)
 *
 * Displays a contact form section with illustration.
 */
export default function ConnectTechnicalExpertsClient({
  headingHtml,
  formTitleHtml,
  illustrationImage,
  illustrationAlt,
}: ConnectTechnicalExpertsClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const result = await submitForm('message', {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      emailAddress: formData.emailAddress.trim(),
      message: formData.message.trim(),
    });

    if (result.ok) {
      router.push('/thank-you?form=message');
      return;
    }

    setError(result.message);
    if (result.fieldErrors) {
      const nextErrors: Partial<Record<keyof FormState, string>> = {};
      for (const [key, value] of Object.entries(result.fieldErrors)) {
        if (key in formData) {
          nextErrors[key as keyof FormState] = value;
        }
      }
      setFieldErrors(nextErrors);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
    setFieldErrors((prev) => {
      if (!prev[e.target.name as keyof FormState]) return prev;
      const next = { ...prev };
      delete next[e.target.name as keyof FormState];
      return next;
    });
  };

  return (
    <section className="bg-gray-50 py-4 md:py-8 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        {headingHtml ? (
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-[22px] md:text-4xl lg:text-5xl font-bold text-black"
              dangerouslySetInnerHTML={{ __html: headingHtml }}
            />
          </div>
        ) : null}

        {/* Main Card */}
        <div className="bg-white rounded-[50px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-0">
            {/* Left Section - Contact Form */}
            <div className="pt-8 pb-8 px-6 md:p-10 lg:p-12">
              {/* Form Title */}
              {formTitleHtml ? (
                <h3
                  className="text-[18px] md:text-3xl font-bold text-black lg:mb-8 mb-4"
                  dangerouslySetInnerHTML={{ __html: formTitleHtml }}
                />
              ) : null}

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
                      disabled={isSubmitting}
                      required
                      maxLength={50}
                      className="w-full lg:px-6 px-4 lg:py-4 py-3 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
                    />
                    {fieldErrors.firstName ? (
                      <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.firstName}</p>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      maxLength={50}
                      className="w-full lg:px-6 px-4 lg:py-4 py-3 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
                    />
                    {fieldErrors.lastName ? (
                      <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.lastName}</p>
                    ) : null}
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
                      disabled={isSubmitting}
                      maxLength={20}
                      className="w-full lg:px-6 px-4 lg:py-4 py-3 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
                    />
                    {fieldErrors.phoneNumber ? (
                      <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="emailAddress"
                      placeholder="Email Address"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      maxLength={50}
                      className="w-full lg:px-6 px-4 lg:py-4 py-3 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
                    />
                    {fieldErrors.emailAddress ? (
                      <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.emailAddress}</p>
                    ) : null}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={5}
                    maxLength={200}
                    className="w-full px-6 py-4 bg-gray-100 rounded-[25px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base resize-none disabled:opacity-70"
                  />
                  {fieldErrors.message ? (
                    <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.message}</p>
                  ) : null}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-bold uppercase tracking-wider hover:text-[#0077B6] transition-colors group disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
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

                {error ? (
                  <p className="text-sm text-[#B42318]" role="alert">
                    {error}
                  </p>
                ) : null}
              </form>
            </div>

            {/* Right Section - Illustration */}
            <div className="relative bg-[#009FE8] flex items-center justify-center p-8 lg:p-0">
              <Image
                src={illustrationImage}
                alt={illustrationAlt}
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
