const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  rsquo: '\u2019',
  lsquo: '\u2018',
  rdquo: '\u201D',
  ldquo: '\u201C',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
};

const BOLD_PATTERN = /\*([^*]+)\*/g;

const BLUE_HIGHLIGHT_CLASS = 'text-[#009FE8]';

function decodeHtmlEntity(entity: string): string {
  const named = NAMED_ENTITIES[entity];
  if (named !== undefined) return named;

  if (entity.startsWith('#x') || entity.startsWith('#X')) {
    const hex = entity.slice(2);
    const code = Number.parseInt(hex, 16);
    return Number.isFinite(code) ? String.fromCodePoint(code) : `&${entity};`;
  }

  if (entity.startsWith('#')) {
    const dec = entity.slice(1);
    const code = Number.parseInt(dec, 10);
    return Number.isFinite(code) ? String.fromCodePoint(code) : `&${entity};`;
  }

  return `&${entity};`;
}

export function decodeHtmlEntities(input: string): string {
  if (!input) return '';
  const decoded = input.replace(/&([a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g, (_m, ent) =>
    decodeHtmlEntity(ent),
  );
  return decoded.replace(/\u00A0/g, ' ');
}

export function normalizeText(input: string): string {
  return decodeHtmlEntities(input).replace(/\s+/g, ' ').trim();
}

export function formatBoldText(input: string): string {
  if (!input) return '';
  if (!BOLD_PATTERN.test(input)) {
    BOLD_PATTERN.lastIndex = 0;
    return input;
  }
  BOLD_PATTERN.lastIndex = 0;
  return input.replace(BOLD_PATTERN, `<span class="${BLUE_HIGHLIGHT_CLASS}">$1</span>`);
}

export function formatBoldTextArray(items: string[]): string[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => formatBoldText(item));
}

export function hasBoldPattern(input: string): boolean {
  if (!input) return false;
  const result = BOLD_PATTERN.test(input);
  BOLD_PATTERN.lastIndex = 0;
  return result;
}

export function stripAndFormatText(value?: string): string {
  if (!value) return '';
  const stripped = value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return formatBoldText(stripped);
}

/** Plain label for breadcrumbs (strips tags / entities, no rich formatting). */
export function plainTextFromMaybeHtml(input?: string | null): string {
  if (!input) return '';
  return normalizeText(input.replace(/<[^>]+>/g, ' '));
}
