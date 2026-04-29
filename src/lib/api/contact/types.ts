export type ContactHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type ContactDetailIcon = 'mail' | 'pin' | 'phone';

export type ContactDetailItem = {
  id: string;
  title: string;
  lines: string[];
  icon: ContactDetailIcon;
};

export type ContactSocialLink = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export type ContactSecretariatData = {
  heading: string;
  description: string;
  details: ContactDetailItem[];
  socialHeading: string;
  socialLinks: ContactSocialLink[];
};

export type ContactFormField = {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email';
};

export type ContactFormOption = {
  value: string;
  label: string;
};

export type ContactFormData = {
  title: string;
  subtitle: string;
  fields: ContactFormField[];
  enquiryLabel: string;
  enquiryName: string;
  enquiryDefaultValue: string;
  enquiryOptions: ContactFormOption[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
};

export type ContactPageData = {
  hero: ContactHeroData;
  secretariat: ContactSecretariatData;
  form: ContactFormData;
};
