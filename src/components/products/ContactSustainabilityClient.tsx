'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitForm } from '@/lib/forms/client';
import { formatBoldText } from '@/lib/htmlText';
import { RichText } from '@/components/common/RichText';

type ContactSustainabilityData = {
  contactTitle?: string;
  contactSubtitle?: string;
  contactCardTitle?: string;
  contactCardDescription?: string;
  contactCardUrl?: string;
};

interface ContactSustainabilityClientProps {
  data: ContactSustainabilityData;
}

/**
 * Contact & Sustainability Section Component (Client Component)
 *
 * Displays a two-panel section:
 * - Left: Contact Us form
 * - Right: Sustainability information
 */
export default function ContactSustainabilityClient({ data }: ContactSustainabilityClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  const hasLeft = Boolean(data.contactTitle || data.contactSubtitle);
  const hasRight = Boolean(
    data.contactCardTitle || data.contactCardDescription || data.contactCardUrl,
  );

  if (!hasLeft && !hasRight) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});

    const nameValue = formData.name.trim();
    const emailValue = formData.email.trim();
    const nameParts = nameValue.split(/\s+/).filter(Boolean);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ');

    const result = await submitForm('get_in_touch', {
      firstName,
      lastName,
      phoneNumber: '',
      emailAddress: emailValue,
      message: '',
    });

    if (result.ok) {
      router.push('/thank-you?form=get_in_touch');
      return;
    }

    if (result.fieldErrors) {
      const nextErrors: { name?: string; email?: string } = {};
      if (result.fieldErrors.firstName || result.fieldErrors.lastName || result.fieldErrors.name) {
        nextErrors.name =
          result.fieldErrors.firstName ||
          result.fieldErrors.lastName ||
          result.fieldErrors.name;
      }
      if (result.fieldErrors.emailAddress || result.fieldErrors.email) {
        nextErrors.email = result.fieldErrors.emailAddress || result.fieldErrors.email;
      }
      setFieldErrors(nextErrors);
    }

    setErrorMessage(result.message);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(null);
    setFieldErrors((prev) => {
      if (!prev[e.target.name as 'name' | 'email']) return prev;
      const next = { ...prev };
      delete next[e.target.name as 'name' | 'email'];
      return next;
    });
  };

  const gridClass = hasLeft && hasRight ? 'lg:grid-cols-2' : 'lg:grid-cols-1';

  return (
    <section className="bg-gray-50 pt-4 md:pt-8 lg:pt-8 pb-8">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 ${gridClass} gap-6 md:gap-8`}>
          {/* Left Panel - Contact Us Form */}
          {hasLeft ? (
            <div className="bg-[#EDF0F1] rounded-[50px] p-8 md:p-10 lg:p-12">
              {/* Heading */}
              {data.contactTitle ? (
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3"
                  dangerouslySetInnerHTML={{ __html: formatBoldText(data.contactTitle) }}
                />
              ) : null}

              {/* Subtitle */}
              {data.contactSubtitle ? (
                <RichText
                  as="div"
                  html={data.contactSubtitle}
                  className="text-base md:text-lg text-black mb-8"
                />
              ) : null}

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
                    maxLength={50}
                    disabled={isSubmitting}
                    className="w-full px-6 lg:py-4 py-3 bg-white rounded-[50px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
                  />
                  {fieldErrors.name ? (
                    <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.name}</p>
                  ) : null}
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
                    maxLength={50}
                    disabled={isSubmitting}
                    className="w-full px-6 lg:py-4 py-3 bg-white rounded-[50px] border-none focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
                  />
                  {fieldErrors.email ? (
                    <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.email}</p>
                  ) : null}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer inline-flex items-center text-[#009FE8] text-base md:text-lg font-bold uppercase tracking-wider hover:text-[#0077B6] transition-colors group disabled:cursor-not-allowed disabled:opacity-70"
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

                {errorMessage ? (
                  <p className="text-sm text-[#B42318]" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            </div>
          ) : null}

          {/* Right Panel - Sustainability Information */}
          {hasRight ? (
            <div className="bg-[#009FE8] rounded-[50px] p-8 md:p-10 lg:p-12">
              {/* Heading */}
              {data.contactCardTitle ? (
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
                  dangerouslySetInnerHTML={{ __html: formatBoldText(data.contactCardTitle) }}
                />
              ) : null}

              {/* Body Text */}
              {data.contactCardDescription ? (
                <RichText
                  as="div"
                  html={data.contactCardDescription}
                  className="text-sm md:text-lg text-white mb-6 leading-relaxed"
                />
              ) : null}

              {/* Learn More Link */}
              {data.contactCardUrl ? (
                <Link
                  href={data.contactCardUrl}
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
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
