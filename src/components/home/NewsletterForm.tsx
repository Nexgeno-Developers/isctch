'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitForm } from '@/lib/forms/client';

interface NewsletterFormProps {
  placeholder: string;
  buttonText: string;
}

/**
 * Newsletter Form Component (Client Component)
 *
 * Renders the newsletter subscription form structure.
 */
export default function NewsletterForm({ placeholder, buttonText }: NewsletterFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await submitForm('subscription', { email: trimmedEmail });

    if (result.ok) {
      router.push('/thank-you?form=subscription');
      return;
    }

    setError(result.fieldErrors?.email || result.message);
    setIsSubmitting(false);
  };

  return (
    <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit} noValidate>
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center bg-white lg:rounded-[50px] rounded-[20px] overflow-hidden p-2 sm:p-[10px]">
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          required
          maxLength={50}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          disabled={isSubmitting}
          className="w-full min-w-0 flex-1 px-4 py-3 sm:py-2 bg-transparent text-black placeholder-gray-400 focus:outline-none border-none text-base disabled:opacity-70"
        />

        {/* Subscribe Button - Inside the form */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer w-full sm:w-auto shrink-0 px-4 py-3 sm:py-2 bg-[#009FE8] rounded-[50px] text-white text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-[#0077B6] transition-colors whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </button>
      </div>

      {error ? (
        <p className="mt-3 text-sm text-[#B42318]" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
