import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import PageBreadcrumbHero from '@/components/common/PageBreadcrumbHero';
import { FooterSocialIcon } from '@/components/layout/FooterSocialIcon';
import {
  CONTACT_US_PAGE_SLUG,
  contactUsPath,
} from '@/config/publicRoutes';
import { getCanonicalUrl } from '@/config/site';
import { getContactPageData } from '@/lib/api/contact';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPageData(CONTACT_US_PAGE_SLUG);
  return {
    title: data.hero.breadcrumbCurrentLabel,
    description: data.secretariat.description.slice(0, 160),
    alternates: { canonical: getCanonicalUrl(contactUsPath()) },
  };
}

function ContactGlyph({ icon }: { icon: string }) {
  const className = 'h-5 w-5 text-[#009FE3]';

  if (icon === 'pin') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 21s6-5.35 6-11a6 6 0 1 0-12 0c0 5.65 6 11 6 11Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (icon === 'phone') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 3.75h8A1.25 1.25 0 0 1 17.25 5v14A1.25 1.25 0 0 1 16 20.25H8A1.25 1.25 0 0 1 6.75 19V5A1.25 1.25 0 0 1 8 3.75Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10.75 17.25h2.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5.25 7.25 6.75 5 6.75-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = 'text',
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email';
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#1B2535]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="mt-4 w-full border-0 border-b border-[#E6EDF3] bg-transparent px-0 pb-3 text-[14px] text-[#1B2535] outline-none transition-colors placeholder:text-[#CAD6E3] focus:border-[#009FE3]"
      />
    </div>
  );
}

export async function ContactPageView({ slug = CONTACT_US_PAGE_SLUG }: { slug?: string }) {
  const data = await getContactPageData(slug);

  return (
    <main className="bg-white">
      <PageBreadcrumbHero
        breadcrumbHomeLabel={data.hero.breadcrumbHomeLabel}
        breadcrumbCurrentLabel={data.hero.breadcrumbCurrentLabel}
        kicker={data.hero.kicker}
        titleBlue={data.hero.titleBlue}
        titleOrange={data.hero.titleOrange}
      />

      <section className="bg-[#F7F8FA] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)] lg:items-start xl:gap-16">
          <aside className="rounded-[6px] border border-[#CFE9F5] bg-[#EAF8FE] px-8 py-9 text-[#1B2535] shadow-[0_22px_50px_-36px_rgba(0,159,227,0.55)] sm:px-12 sm:py-12">
            <h2 className="max-w-[330px] text-[27px] font-black leading-tight tracking-normal">
              {data.secretariat.heading}
            </h2>
            <p className="mt-9 max-w-[410px] text-[15px] leading-8 text-[#33485B]">
              {data.secretariat.description}
            </p>

            <div className="mt-9 space-y-8">
              {data.secretariat.details.map((item) => (
                <div key={item.id} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-white shadow-sm">
                    <ContactGlyph icon={item.icon} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[13px] font-black text-[#1B2535]">
                      {item.title}
                    </p>
                    <div className="mt-1 text-[14px] leading-6 text-[#1B2535]">
                      {item.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-[#D8EEF7] pt-8">
              <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#1B2535]">
                {data.secretariat.socialHeading}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {data.secretariat.socialLinks.map((social) => (
                  <Link
                    key={social.id}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-[#009FE3] shadow-sm transition-colors hover:bg-[#009FE3] hover:text-white"
                  >
                    <FooterSocialIcon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <section className="rounded-[6px] border-t-[3px] border-[#EF7D00] bg-white px-8 py-10 shadow-[0_24px_70px_-42px_rgba(0,159,227,0.55)] sm:px-12 lg:px-14 lg:py-14">
            <h2 className="text-[22px] font-black tracking-normal text-[#1B2535]">
              {data.form.title}
            </h2>
            <p className="mt-2 text-[12px] leading-6 text-[#66788A]">
              {data.form.subtitle}
            </p>

            <form className="mt-9 grid gap-x-8 gap-y-7 md:grid-cols-2">
              {data.form.fields.map((field) => (
                <Field
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}

              <div>
                <label
                  htmlFor={data.form.enquiryName}
                  className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#1B2535]"
                >
                  {data.form.enquiryLabel}
                </label>
                <div className="relative mt-4">
                  <select
                    id={data.form.enquiryName}
                    name={data.form.enquiryName}
                    defaultValue={data.form.enquiryDefaultValue}
                    className="w-full appearance-none border-0 border-b border-[#E6EDF3] bg-transparent px-0 pb-3 pr-8 text-[14px] text-[#1B2535] outline-none transition-colors focus:border-[#009FE3]"
                  >
                    {data.form.enquiryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-0 top-1 h-5 w-5 text-[#7F8DA0]"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="m5.5 7.5 4.5 4.5 4.5-4.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#1B2535]"
                >
                  {data.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={data.form.messagePlaceholder}
                  rows={4}
                  className="mt-4 w-full resize-none border-0 border-b border-[#E6EDF3] bg-transparent px-0 pb-3 text-[14px] leading-7 text-[#1B2535] outline-none transition-colors placeholder:text-[#CAD6E3] focus:border-[#009FE3]"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  className="mt-2 inline-flex min-h-14 items-center justify-center rounded-[3px] bg-[#EF7D00] px-12 text-[14px] font-black tracking-[0.12em] text-white shadow-[0_16px_28px_-16px_rgba(239,125,0,0.85)] transition-colors hover:bg-[#D96F00]"
                >
                  {data.form.submitLabel}
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

export default function ContactUsPage() {
  if (CONTACT_US_PAGE_SLUG !== 'contact-us') {
    redirect(contactUsPath());
  }

  return <ContactPageView slug={CONTACT_US_PAGE_SLUG} />;
}
