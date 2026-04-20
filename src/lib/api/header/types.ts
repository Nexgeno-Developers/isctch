export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
};

/** Static header payload (replace with API fetch later if needed). */
export type HeaderData = {
  logo: {
    /** Image alt text (keep short when the mark is purely visual). */
    text?: string;
    image?: string;
    href: string;
    /** Optional full-width lockup under /public */
    lockupImage?: string;
  };
  navigation: NavItem[];
  cta?: { text: string; href: string };
};
