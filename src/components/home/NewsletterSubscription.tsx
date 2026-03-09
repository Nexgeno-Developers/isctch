import Image from 'next/image';
import { fetchHomepageData } from '@/lib/api';
import NewsletterForm from './NewsletterForm';

/**
 * Newsletter Subscription Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the newsletter subscription section.
 */
export default async function NewsletterSubscription() {
  const homepageData = await fetchHomepageData();
  const data = homepageData.newsletterSubscription;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={data.backgroundImage}
            alt="Aseptic engineering background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark Blue Overlay */}
          <div className="absolute inset-0 bg-[#0E233C] opacity-90" />
          {/* Blur Effect */}
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {data.headline}
          </h2>

          {/* Subtitle */}
          <p className="text-white text-base md:text-lg mb-8 md:mb-12">
            {data.subtitle}
          </p>

          {/* Newsletter Form */}
          <NewsletterForm 
            placeholder={data.placeholder}
            buttonText={data.buttonText}
          />
        </div>
      </div>
    </section>
  );
}
