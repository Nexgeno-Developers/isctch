import type { ReactNode } from 'react';
import type {
  GovernanceFrameworkCardData,
  GovernanceFrameworkIconId,
} from '@/components/governance/GovernanceFrameworkSection';
import Image from 'next/image';
import { formatBoldText } from '@/lib/htmlText';
type FrameworkCardProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
};

function FrameworkCard({ title, subtitle, icon }: FrameworkCardProps) {
  return (
    <div className="bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] p-4 md:p-5 flex items-center gap-4">
      <div className="flex items-center justify-center text-[#009FE8] shrink-0">
        {icon}
      </div>
      <div className="pt-1">
        <p className="text-[14px] md:text-lg font-bold text-black leading-snug">{title}</p>
        <p className="text-[14px] md:text-sm text-black mt-1 leading-snug">
          {subtitle}
        </p>
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
      width="30"
      height="30"
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

export type GovernanceFrameworkSecondarySectionData = {
  eyebrow: string;
  title: string;
  description: string[];
  cards: GovernanceFrameworkCardData[];
};

const DEFAULT_DATA: GovernanceFrameworkSecondarySectionData = {
  eyebrow: 'Lamipak - Corporate Governance',
  title: 'Governance & Management',
  description: [
    "Strong governance is the foundation of Lamipak's long-term value creation. It is built on transparency, accountability, and responsible decision-making across all global operations, through clear policies and ethical practices. Lamipak ensures sustainable growth while protecting the interests of stakeholders, employees, partners, and the environment.",
    'We maintain a structured system of policies, procedures, and oversight mechanisms designed to ensure that our business is conducted ethically, responsibly, and in full compliance with applicable laws and regulations.',
    'Our governance framework integrates risk management, compliance oversight, and operational controls to ensure consistent standards across our manufacturing, supply chain, and commercial activities worldwide.',
  ],
  cards: [
    {
      id: 'framework',
      title: 'Our Governance Framework',
      subtitle: 'Transparency & accountability',
      iconId: 'framework',
    },
    {
      id: 'integrity',
      title: 'Business Integrity & Ethical Conduct',
      subtitle: 'Zero-tolerance policy',
      iconId: 'integrity',
    },
    {
      id: 'risk_control',
      title: 'Governance, Risk & Control',
      subtitle: 'Transparency & accountability',
      iconId: 'risk_control',
    },
    {
      id: 'supply_chain',
      title: 'Responsible Supply Chain',
      subtitle: 'Global compliance',
      iconId: 'supply_chain',
    },
    {
      id: 'security',
      title: 'Information Security',
      subtitle: 'Data protection & it policy',
      iconId: 'security',
    },
    {
      id: 'whistle',
      title: 'Speak-Up & Whistleblowing',
      subtitle: 'Confidential reporting',
      iconId: 'whistle',
    },
  ],
};

function renderIcon(iconId: GovernanceFrameworkIconId, iconUrl?: string) {
  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt=""
        width={30}
        height={30}
        className="w-[30px] h-[30px] object-contain"
      />
    );
  }
  switch (iconId) {
    case 'framework':
      return (
        <IconOutline>
          <path d="M3 7h18" />
          <path d="M5 7v14h14V7" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        </IconOutline>
      );
    case 'integrity':
      return (
        <IconOutline>
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          <path d="M9 12l2 2 4-5" />
        </IconOutline>
      );
    case 'risk_control':
      return (
        <IconOutline>
          <path d="M12 2l9 4-9 4-9-4 9-4z" />
          <path d="M3 10l9 4 9-4" />
          <path d="M3 14l9 4 9-4" />
        </IconOutline>
      );
    case 'supply_chain':
      return (
        <IconOutline>
          <circle cx="12" cy="5" r="2" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="18" cy="19" r="2" />
          <path d="M10 7l2 12" />
          <path d="M14 7L12 19" />
        </IconOutline>
      );
    case 'security':
      return (
        <IconOutline>
          <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </IconOutline>
      );
    case 'whistle':
      return (
        <IconOutline>
          <path d="M12 16v-4" />
          <path d="M10 10h4" />
          <path d="M9.5 4h5l1 3-1 3h-5l-1-3 1-3z" />
          <path d="M7 20h10" />
        </IconOutline>
      );
    default:
      return null;
  }
}

export default function GovernanceFrameworkSecondarySection({
  data,
}: {
  data?: GovernanceFrameworkSecondarySectionData;
}) {
  const resolved = data ?? DEFAULT_DATA;

  return (
    <section className="bg-gray-50 py-4 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-[#009FE8] font-semibold text-sm md:text-base">
           {resolved.eyebrow}
            </div>

            <h2 className="mt-3 text-[24px] md:text-5xl font-bold text-black leading-tight" dangerouslySetInnerHTML={{ __html: formatBoldText(resolved.title) }} />
            

            <div className="mt-4 md:mt-6 text-[14px] md:text-base text-black leading-relaxed space-y-4 md:space-y-5">
              {resolved.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {resolved.cards.map((card) => (
              <FrameworkCard
                key={card.id}
                title={card.title}
                subtitle={card.subtitle}
                icon={renderIcon(card.iconId, card.iconUrl)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

