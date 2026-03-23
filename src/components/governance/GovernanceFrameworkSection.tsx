import type { ReactNode } from 'react';
import Link from 'next/link';

type FrameworkCardProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
};

function FrameworkCard({ title, subtitle, icon }: FrameworkCardProps) {
  return (
    <div className="bg-[#EDF0F1] rounded-[18px] p-5 flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#009FE8] shrink-0">
        {icon}
      </div>
      <div className="pt-1">
        <p className="text-base md:text-lg font-bold text-gray-900">{title}</p>
        <p className="text-xs md:text-sm text-gray-700 mt-1 leading-snug">{subtitle}</p>
      </div>
    </div>
  );
}

function IconOutline({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function GovernanceFrameworkSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-[#009FE8] font-semibold text-sm md:text-base">
              Lamipak - Corporate Governance
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-[#009FE8] leading-tight">
              Governance &amp; Management
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed max-w-xl">
              Strong governance is the foundation of Lamipak's long-term value
              creation. It is built on transparency, accountability, and responsible
              decision-making across all global operations, through clear policies
              and ethical practices. Lamipak ensures sustainable growth while
              protecting the interests of stakeholders, employees, partners, and the
              environment.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#governance-framework"
                className="inline-flex items-center justify-center rounded-full bg-[#009FE8] text-white font-bold px-7 py-3 hover:bg-[#0077B6] transition-colors"
              >
                Explore Our Framework
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#009FE8] text-[#009FE8] font-bold px-7 py-3 hover:bg-[#009FE8] hover:text-white transition-colors"
              >
                Speak Up
              </Link>
            </div>
          </div>

          <div id="governance-framework" className="space-y-4">
            <FrameworkCard
              title="Our Governance Framework"
              subtitle="Transparency & accountability"
              icon={
                <IconOutline>
                  <path d="M3 7h18" />
                  <path d="M5 7v14h14V7" />
                  <path d="M9 11h6" />
                  <path d="M9 15h6" />
                </IconOutline>
              }
            />

            <FrameworkCard
              title="Business Integrity &amp; Ethical Conduct"
              subtitle="Zero-tolerance policy"
              icon={
                <IconOutline>
                  <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
                  <path d="M9 12l2 2 4-5" />
                </IconOutline>
              }
            />

            <FrameworkCard
              title="Governance, Risk &amp; Control"
              subtitle="Transparency &amp; accountability"
              icon={
                <IconOutline>
                  <path d="M12 2l9 4-9 4-9-4 9-4z" />
                  <path d="M3 10l9 4 9-4" />
                  <path d="M3 14l9 4 9-4" />
                </IconOutline>
              }
            />

            <FrameworkCard
              title="Responsible Supply Chain"
              subtitle="Global compliance"
              icon={
                <IconOutline>
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="6" cy="19" r="2" />
                  <circle cx="18" cy="19" r="2" />
                  <path d="M10 7l2 12" />
                  <path d="M14 7L12 19" />
                </IconOutline>
              }
            />

            <FrameworkCard
              title="Information Security"
              subtitle="Data protection &amp; it policy"
              icon={
                <IconOutline>
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </IconOutline>
              }
            />

            <FrameworkCard
              title="Speak-Up &amp; Whistleblowing"
              subtitle="Confidential reporting"
              icon={
                <IconOutline>
                  <path d="M12 16v-4" />
                  <path d="M10 10h4" />
                  <path d="M9.5 4h5l1 3-1 3h-5l-1-3 1-3z" />
                  <path d="M7 20h10" />
                </IconOutline>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

