interface NewsletterFormProps {
  placeholder: string;
  buttonText: string;
}

/**
 * Newsletter Form Component (Server Component)
 * 
 * Renders the newsletter subscription form structure.
 */
export default function NewsletterForm({ placeholder, buttonText }: NewsletterFormProps) {
  return (
    <form className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Email Input */}
        <input
          type="email"
          placeholder={placeholder}
          required
          className="flex-1 px-6 py-4 bg-white rounded-lg sm:rounded-l-lg sm:rounded-r-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009FE8] focus:ring-offset-2"
        />

        {/* Subscribe Button */}
        <button
          type="submit"
          className="px-8 py-4 bg-[#009FE8] text-white font-bold uppercase tracking-wider rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-[#0077B6] transition-colors whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
