import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { RichText } from '@/components/common/RichText';
import { buildApiMetadata } from '@/components/seo/buildApiMetadata';
import { fetchThankYouLayoutPage } from '@/lib/api/thank_you_layout';

const FALLBACK_TITLE = 'Thank You';
const FALLBACK_MESSAGE =
  'We have received your message and will be in touch shortly.';
const THANK_YOU_ILLUSTRATION = '/thank_you.png';

export async function generateMetadata(): Promise<Metadata> {
  const resolved = await fetchThankYouLayoutPage();
  if (!resolved) return { title: FALLBACK_TITLE, description: FALLBACK_TITLE };

  return buildApiMetadata({
    slug: resolved.slug,
    title: resolved.title,
    seo: resolved.seo as any,
  });
}

export default async function ThankYouPage() {
  const resolved = await fetchThankYouLayoutPage();
  const data = resolved?.page;

  const rawTitle = data?.title || FALLBACK_TITLE;
  const title =
    rawTitle.trim().toLowerCase() === 'thank you' ? `${rawTitle}!` : rawTitle;

  const messageHtml =
    data?.contentHtml || data?.shortDescription || FALLBACK_MESSAGE;

  const breadcrumbImage =
    typeof data?.heroBackgroundImage === 'string' && data.heroBackgroundImage.trim()
      ? data.heroBackgroundImage
      : '/about_banner.jpg';

  const sideImage =
    typeof data?.sideImage === 'string' && data.sideImage.trim()
      ? data.sideImage
      : THANK_YOU_ILLUSTRATION;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={breadcrumbImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0E233C]/50" />
        </div>

        <div className="relative container mx-auto px-4 pt-[130px] pb-12 md:pt-[160px] md:pb-16">
          <h1 className="text-center text-white text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-6xl">
            {/* Subtle offset shadow block (like the reference design) */}
            <div
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-[40px] bg-[#009FE8]/5 md:translate-x-4 md:translate-y-4"
              aria-hidden
            />

            <div className="relative rounded-[40px] bg-white px-8 py-10 md:px-14 md:py-14 shadow-[0_30px_80px_rgba(15,35,60,0.10)]">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                <div className="flex justify-center">
                  <Image
                    src={sideImage}
                    alt=""
                    width={820}
                    height={650}
                    priority
                    className="h-auto w-full max-w-[520px]"
                    sizes="(max-width: 768px) 90vw, 520px"
                  />
                </div>

                <div className="text-center md:text-left">
                  <div className="text-base md:text-lg text-[#233447]/75 leading-relaxed [&_p]:m-0 [&_p+_p]:mt-3 [&_a]:text-[#009FE8] [&_a]:font-semibold">
                    <RichText as="div" html={messageHtml} />
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-lg bg-[#009FE8] px-7 py-3 text-sm md:text-base font-semibold text-white transition-colors hover:bg-[#0077B6] md:px-8"
                    >
                      Go Back Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
