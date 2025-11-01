export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export function formatAccountDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
}

export function formatLastLogin(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', DATE_TIME_FORMAT_OPTIONS);
}

