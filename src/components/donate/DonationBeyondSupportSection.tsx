import Link from 'next/link';
import type { DonateBeyondSupportCard, DonateBeyondSupportData } from '@/lib/api/donate/types';

function CardIcon({ icon }: { icon: DonateBeyondSupportCard['icon'] }) {
  if (icon === 'advocacy') {
    return (
      <svg className="h-6 w-6 text-[#f28500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path d="M3 10v4" />
        <path d="M7 8v8" />
        <path d="M11 6v12" />
        <path d="M15 9l6-2v10l-6-2" />
      </svg>
    );
  }
  if (icon === 'partners') {
    return (
      <svg className="h-6 w-6 text-[#00a3e8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[#00a3e8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M8 12c0-2.2 1.8-4 4-4 1.4 0 2.6.7 3.3 1.8" />
      <path d="M5 20v-1a4 4 0 0 1 4-4h1" />
      <path d="M16.5 21l-1.5-1.5 1.5-1.5" />
      <path d="M19 18h-4" />
    </svg>
  );
}

export default function DonationBeyondSupportSection({ data }: { data: DonateBeyondSupportData }) {
  return (
    <section className="bg-[#f7f5f2] px-4 py-14 sm:px-6 md:px-8 lg:px-12 lg:py-16 xl:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[#1f233b] sm:text-5xl">{data.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#666d82] sm:text-lg">{data.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {data.cards.map((card, idx) => (
            <article key={`${card.title}-${idx}`} className="rounded-2xl border border-[#eef1f6] bg-white p-7 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.14)]">
              <div className={`mb-5 inline-flex rounded-2xl p-3 ${card.icon === 'advocacy' ? 'bg-[#fff2e3]' : 'bg-[#eaf7fd]'}`}>
                <CardIcon icon={card.icon} />
              </div>
              <h3 className="text-3xl font-bold leading-tight text-[#1f233b]">{card.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[#666d82]">{card.description}</p>
              <Link href={card.ctaHref} className="mt-6 inline-flex items-center text-xl font-semibold text-[#00a3e8] hover:underline">
                {card.ctaLabel} <span className="ml-2" aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
