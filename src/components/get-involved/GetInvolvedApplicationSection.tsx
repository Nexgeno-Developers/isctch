import Image from 'next/image';

import type { GetInvolvedApplicationData, GetInvolvedProgramData } from '@/lib/api/getInvolved/types';

function CheckIcon() {
  return (
    <svg
      className="mt-1 h-4 w-4 shrink-0 text-[#F28A11]"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.25 8.25 6.25 11.25 12.75 4.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  span = 'half',
}: {
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  span?: 'full' | 'half';
}) {
  const wrapperClass = span === 'full' ? 'md:col-span-2' : '';
  const labelClass = 'mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-[#9AA6B2]';
  const inputClass =
    'w-full rounded-[4px] border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#1F2A37] outline-none transition-colors placeholder:text-[#9AA6B2] focus:border-[#009FE3]';

  return (
    <div className={wrapperClass}>
      <label className={labelClass}>{label}</label>
      {type === 'textarea' ? (
        <textarea className={`${inputClass} min-h-[96px] resize-none`} placeholder={placeholder} />
      ) : (
        <input className={inputClass} type={type} placeholder={placeholder} />
      )}
    </div>
  );
}

export default function GetInvolvedApplicationSection({
  program,
  application,
}: {
  program: GetInvolvedProgramData;
  application: GetInvolvedApplicationData;
}) {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-7 bg-[#F28A11]" aria-hidden />
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#039FE8]">
              {program.kicker}
            </p>
          </div>

          <h2 className="mt-5 text-[40px] font-black leading-[0.98] tracking-tight text-[#1B2535] sm:text-[46px]">
            {program.title}
          </h2>

          <div className="mt-6 space-y-4 text-[18px] leading-9 text-[#5B6673]">
            {program.description.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>

          <div className="relative mt-8 aspect-[1.18] w-full overflow-hidden rounded-[16px] bg-slate-100 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.35)]">
            <Image
              src={program.image.src}
              alt={program.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 520px"
            />
          </div>

          <ul className="mt-7 space-y-4">
            {program.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-[15px] leading-7 text-[#556270]">
                <CheckIcon />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[18px] border border-[#EEF2F7] bg-white p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.28)] sm:p-8">
          <h3 className="text-[24px] font-black tracking-tight text-[#1B2535]">{application.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#8A97A5]">{application.subtitle}</p>

          <form className="mt-7 grid gap-4 md:grid-cols-2">
            {application.fields.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                span={field.span}
              />
            ))}

            <div className="md:col-span-2">
              <button
                type="button"
                className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-[6px] bg-[#F28A11] px-6 text-base font-black text-white transition-colors hover:bg-[#DE7F13]"
              >
                {application.submitLabel}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}
