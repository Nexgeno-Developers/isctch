export function isoDateFrom(value?: string | null): string | undefined {
  const raw = (value ?? '').trim();
  if (!raw) return undefined;
  const m = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  return m?.[1] ?? undefined;
}

export function isoTimeFrom(value?: string | null): string | undefined {
  const raw = (value ?? '').trim();
  if (!raw) return undefined;
  const m = raw.match(/T(\d{2}:\d{2})/);
  return m?.[1] ?? undefined;
}

export function formatCardTime(value?: string | null): string | undefined {
  const raw = (value ?? '').trim();
  if (!raw) return undefined;

  // If API already returns a human label (e.g. "10:00 AM"), keep it.
  if (/[ap]\.?m\.?/i.test(raw)) return raw.replace(/\s+/g, ' ').trim();

  const match = raw.match(/^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?$/);
  if (!match) return raw;

  const hours = Number(match[1]);
  const minutes = Number(match[2] ?? '00');
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return raw;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return raw;

  const suffix = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const mm = String(minutes).padStart(2, '0');
  return `${h12}:${mm} ${suffix}`;
}

export function formatCardDate(value?: string | null): string | undefined {
  const raw = (value ?? '').trim();
  if (!raw) return undefined;

  // Prefer stable parsing for YYYY-MM-DD to avoid timezone shifts.
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (Number.isFinite(year) && Number.isFinite(month) && Number.isFinite(day)) {
      const dt = new Date(Date.UTC(year, month - 1, day));
      if (!Number.isNaN(dt.getTime())) {
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        }).format(dt);
      }
    }
  }

  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return raw;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dt);
}

