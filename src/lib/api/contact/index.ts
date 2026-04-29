import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { CONTACT_US_PAGE_SLUG } from '@/config/publicRoutes';
import type {
  ContactDetailIcon,
  ContactFormField,
  ContactFormOption,
  ContactPageData,
} from './types';

const CONTACT_REVALIDATE_SECONDS = Number(
  process.env.CONTACT_PAGE_REVALIDATE_SECONDS ?? process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);
const COMPANY_API_DOMAIN = process.env.COMPANY_API_DOMAIN?.trim().replace(/\/+$/, '') || '';

const STATIC_CONTACT_PAGE: ContactPageData = {
  hero: {
    breadcrumbHomeLabel: 'Home',
    breadcrumbCurrentLabel: 'Contact Us',
    kicker: '',
    titleBlue: 'Let Us Walk',
    titleOrange: 'This Path Together',
  },
  globalPresence: {
    heading: 'Our Presence is Global',
    description:
      'With coordination hubs in over 45 countries, we are never too far away to help foster dialogue and build sustainable peace.',
    image: {
      src: '/contact_bg_image.webp',
      alt: 'Global network map showing connected regional hubs',
    },
  },
  secretariat: {
    heading: 'Reach Out to our Global Secretariat',
    description:
      'Whether you are looking to volunteer, partner with us on peace initiatives, or simply want to learn more about our global impact, we are here to listen and engage.',
    details: [
      {
        id: 'email',
        title: 'Email Us',
        lines: ['peace@iscth.org'],
        icon: 'mail',
      },
      {
        id: 'location',
        title: 'Our Location',
        lines: ['Peace House, 12 Diplomacy Way,', 'Geneva, Switzerland'],
        icon: 'pin',
      },
      {
        id: 'phone',
        title: 'Call Us',
        lines: ['+41 (0) 22 789 4560'],
        icon: 'phone',
      },
    ],
    socialHeading: 'Follow our journey',
    socialLinks: [
      { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: '#' },
      { id: 'facebook', label: 'Facebook', icon: 'facebook', href: '#' },
      { id: 'x', label: 'X', icon: 'x', href: '#' },
      { id: 'instagram', label: 'Instagram', icon: 'instagram', href: '#' },
    ],
  },
  form: {
    title: 'Send a Message',
    subtitle: 'Our diplomatic team typically responds within 48 hours.',
    fields: [
      { id: 'full-name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
      { id: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
      { id: 'country', label: 'Country', placeholder: 'United Kingdom', type: 'text' },
    ],
    enquiryLabel: 'Nature of Enquiry',
    enquiryName: 'enquiry',
    enquiryDefaultValue: 'general',
    enquiryOptions: [
      { value: 'general', label: 'General Enquiry' },
      { value: 'partnership', label: 'Partnership' },
      { value: 'volunteer', label: 'Volunteer' },
      { value: 'summits', label: 'Summits' },
    ],
    messageLabel: 'Your Message',
    messagePlaceholder: 'How can we help you promote peace?',
    submitLabel: 'Send Message',
  },
};

type MetaRecord = Record<string, string | undefined>;
type PageApiPayload = { data?: { meta?: MetaRecord | MetaRecord[] } };

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeMeta(data: PageApiPayload['data']): MetaRecord | undefined {
  const meta = data?.meta;
  if (!meta) return undefined;
  if (Array.isArray(meta)) {
    const out: MetaRecord = {};
    for (const row of meta) {
      if (!row || typeof row !== 'object') continue;
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === 'string') out[key] = value;
      }
    }
    return out;
  }
  return meta as MetaRecord;
}

function pick(meta: MetaRecord | undefined, keys: string[]): string {
  if (!meta) return '';
  for (const key of keys) {
    const value = meta[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function normalizeImageUrl(url: string, fallback: string): string {
  const u = url.trim();
  if (!u) return fallback;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (u.startsWith('public/')) return `/${u.replace(/^public\/+/, '')}`;
  if (!u.includes('/')) return `/${u}`;
  if (!COMPANY_API_DOMAIN) return `/${u.replace(/^\/+/, '')}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

function splitLines(raw: string, fallback: string[]): string[] {
  if (!raw) return fallback;
  const lines = raw
    .split(/\r?\n|\|/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length ? lines : fallback;
}

function normalizeIcon(raw: string, fallback: ContactDetailIcon): ContactDetailIcon {
  if (raw === 'mail' || raw === 'pin' || raw === 'phone') return raw;
  return fallback;
}

function fieldFromMeta(
  meta: MetaRecord | undefined,
  field: ContactFormField,
  keyPrefix: string,
): ContactFormField {
  return {
    ...field,
    label: pick(meta, [`${keyPrefix}_label`, `contact_form_${keyPrefix}_label`]) || field.label,
    placeholder:
      pick(meta, [`${keyPrefix}_placeholder`, `contact_form_${keyPrefix}_placeholder`]) ||
      field.placeholder,
  };
}

function parseOptions(raw: string, fallback: ContactFormOption[]): ContactFormOption[] {
  if (!raw) return fallback;
  const options = raw
    .split(/\r?\n|\|/)
    .map((option) => option.trim())
    .filter(Boolean)
    .map((option) => {
      const [valueRaw, labelRaw] = option.split(':');
      const label = (labelRaw || valueRaw || '').trim();
      const value = (labelRaw ? valueRaw : label)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return label && value ? { value, label } : null;
    })
    .filter((option): option is ContactFormOption => Boolean(option));
  return options.length ? options : fallback;
}

function contactFromMeta(meta: MetaRecord | undefined): ContactPageData | null {
  if (!meta) return null;

  const details = STATIC_CONTACT_PAGE.secretariat.details.map((item, index) => {
    const n = index + 1;
    const keyedId = item.id === 'location' ? 'address' : item.id;
    const linesRaw = pick(meta, [
      `contact_detail_${n}_lines`,
      `contact_${keyedId}_lines`,
      `contact_${keyedId}`,
    ]);

    return {
      ...item,
      title:
        pick(meta, [`contact_detail_${n}_title`, `contact_${keyedId}_title`]) ||
        item.title,
      lines: splitLines(linesRaw, item.lines),
      icon: normalizeIcon(
        pick(meta, [`contact_detail_${n}_icon`, `contact_${keyedId}_icon`]),
        item.icon,
      ),
    };
  });

  const socialLinks = STATIC_CONTACT_PAGE.secretariat.socialLinks.map((item, index) => {
    const n = index + 1;
    return {
      ...item,
      label: pick(meta, [`contact_social_${n}_label`, `contact_${item.id}_label`]) || item.label,
      icon: pick(meta, [`contact_social_${n}_icon`, `contact_${item.id}_icon`]) || item.icon,
      href: pick(meta, [`contact_social_${n}_href`, `contact_${item.id}_href`]) || item.href,
    };
  });

  const fields = [
    fieldFromMeta(meta, STATIC_CONTACT_PAGE.form.fields[0], 'full_name'),
    fieldFromMeta(meta, STATIC_CONTACT_PAGE.form.fields[1], 'email'),
    fieldFromMeta(meta, STATIC_CONTACT_PAGE.form.fields[2], 'country'),
  ];
  const enquiryOptions = parseOptions(
    pick(meta, ['contact_enquiry_options', 'contact_form_enquiry_options']),
    STATIC_CONTACT_PAGE.form.enquiryOptions,
  );
  const globalPresenceHeading =
    pick(meta, [
      'contact_global_presence_heading',
      'contact_presence_heading',
      'global_presence_heading',
    ]) || STATIC_CONTACT_PAGE.globalPresence.heading;
  const globalPresenceImage = pick(meta, [
    'contact_global_presence_image',
    'contact_presence_image',
    'global_presence_image',
    'contact_global_image',
  ]);

  return {
    hero: {
      breadcrumbHomeLabel:
        pick(meta, ['contact_breadcrumb_home', 'breadcrumb_home']) ||
        STATIC_CONTACT_PAGE.hero.breadcrumbHomeLabel,
      breadcrumbCurrentLabel:
        pick(meta, ['contact_breadcrumb_current', 'breadcrumb_current']) ||
        STATIC_CONTACT_PAGE.hero.breadcrumbCurrentLabel,
      kicker: pick(meta, ['contact_kicker', 'contact_hero_kicker']) || STATIC_CONTACT_PAGE.hero.kicker,
      titleBlue:
        pick(meta, ['contact_title_blue', 'contact_heading_blue', 'title_blue']) ||
        STATIC_CONTACT_PAGE.hero.titleBlue,
      titleOrange:
        pick(meta, ['contact_title_orange', 'contact_heading_orange', 'title_orange']) ||
        STATIC_CONTACT_PAGE.hero.titleOrange,
    },
    globalPresence: {
      heading: globalPresenceHeading,
      description:
        pick(meta, [
          'contact_global_presence_description',
          'contact_presence_description',
          'global_presence_description',
        ]) || STATIC_CONTACT_PAGE.globalPresence.description,
      image: {
        src: normalizeImageUrl(
          globalPresenceImage,
          STATIC_CONTACT_PAGE.globalPresence.image.src,
        ),
        alt:
          pick(meta, [
            'contact_global_presence_image_alt',
            'contact_presence_image_alt',
            'global_presence_image_alt',
          ]) ||
          STATIC_CONTACT_PAGE.globalPresence.image.alt,
      },
    },
    secretariat: {
      heading:
        pick(meta, ['contact_secretariat_heading', 'contact_info_heading']) ||
        STATIC_CONTACT_PAGE.secretariat.heading,
      description:
        pick(meta, ['contact_secretariat_description', 'contact_info_description']) ||
        STATIC_CONTACT_PAGE.secretariat.description,
      details,
      socialHeading:
        pick(meta, ['contact_social_heading', 'contact_follow_heading']) ||
        STATIC_CONTACT_PAGE.secretariat.socialHeading,
      socialLinks,
    },
    form: {
      title: pick(meta, ['contact_form_title']) || STATIC_CONTACT_PAGE.form.title,
      subtitle: pick(meta, ['contact_form_subtitle']) || STATIC_CONTACT_PAGE.form.subtitle,
      fields,
      enquiryLabel:
        pick(meta, ['contact_enquiry_label', 'contact_form_enquiry_label']) ||
        STATIC_CONTACT_PAGE.form.enquiryLabel,
      enquiryName: STATIC_CONTACT_PAGE.form.enquiryName,
      enquiryDefaultValue:
        pick(meta, ['contact_enquiry_default', 'contact_form_enquiry_default']) ||
        STATIC_CONTACT_PAGE.form.enquiryDefaultValue,
      enquiryOptions,
      messageLabel:
        pick(meta, ['contact_message_label', 'contact_form_message_label']) ||
        STATIC_CONTACT_PAGE.form.messageLabel,
      messagePlaceholder:
        pick(meta, ['contact_message_placeholder', 'contact_form_message_placeholder']) ||
        STATIC_CONTACT_PAGE.form.messagePlaceholder,
      submitLabel:
        pick(meta, ['contact_submit_label', 'contact_form_submit_label']) ||
        STATIC_CONTACT_PAGE.form.submitLabel,
    },
  };
}

async function fetchContactPayload(slug: string): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${slug}`);
  if (!url) return null;
  return fetchJsonCached<PageApiPayload>(url, {
    tags: ['contact-page', `page:${slug}`],
    init: { headers: { Accept: 'application/json' } },
  });
}

async function resolveContactPageData(slug: string): Promise<ContactPageData> {
  const payload = await fetchContactPayload(slug);
  const meta = normalizeMeta(payload?.data);
  const mapped = contactFromMeta(meta);
  if (!mapped) return STATIC_CONTACT_PAGE;

  return {
    hero: { ...STATIC_CONTACT_PAGE.hero, ...mapped.hero },
    globalPresence: {
      ...STATIC_CONTACT_PAGE.globalPresence,
      ...mapped.globalPresence,
      image: {
        ...STATIC_CONTACT_PAGE.globalPresence.image,
        ...mapped.globalPresence.image,
      },
    },
    secretariat: {
      ...STATIC_CONTACT_PAGE.secretariat,
      ...mapped.secretariat,
      details: mapped.secretariat.details.length
        ? mapped.secretariat.details
        : STATIC_CONTACT_PAGE.secretariat.details,
      socialLinks: mapped.secretariat.socialLinks.length
        ? mapped.secretariat.socialLinks
        : STATIC_CONTACT_PAGE.secretariat.socialLinks,
    },
    form: {
      ...STATIC_CONTACT_PAGE.form,
      ...mapped.form,
      fields: mapped.form.fields.length ? mapped.form.fields : STATIC_CONTACT_PAGE.form.fields,
      enquiryOptions: mapped.form.enquiryOptions.length
        ? mapped.form.enquiryOptions
        : STATIC_CONTACT_PAGE.form.enquiryOptions,
    },
  };
}

export async function getContactPageData(slug = CONTACT_US_PAGE_SLUG): Promise<ContactPageData> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const cached = unstable_cache(
    async () => resolveContactPageData(cleanSlug),
    ['contact-page-v2', cleanSlug, process.env.COMPANY_API_BASE_URL || 'static'],
    {
      revalidate: CONTACT_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, 'contact-page', `page:${cleanSlug}`],
    },
  );
  return cached();
}

export type {
  ContactDetailIcon,
  ContactDetailItem,
  ContactFormData,
  ContactFormField,
  ContactFormOption,
  ContactGlobalPresenceData,
  ContactHeroData,
  ContactPageData,
  ContactSecretariatData,
  ContactSocialLink,
} from './types';
