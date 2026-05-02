export type GetInvolvedHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type GetInvolvedProgramData = {
  kicker: string;
  title: string;
  description: string[];
  image: {
    src: string;
    alt: string;
  };
  benefits: string[];
};

export type GetInvolvedApplicationField = {
  name: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'country';
  span?: 'full' | 'half';
};

export type GetInvolvedApplicationData = {
  title: string;
  subtitle: string;
  fields: GetInvolvedApplicationField[];
  submitLabel: string;
};

export type GetInvolvedPageData = {
  hero: GetInvolvedHeroData;
  program: GetInvolvedProgramData;
  application: GetInvolvedApplicationData;
};
