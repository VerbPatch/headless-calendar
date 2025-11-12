export function daysofWeek(
  /**
  * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  */
  weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  format: 'long' | 'short' | 'narrow' = "short",
  locale: string,

): string[] {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: format,
    timeZone: 'UTC',
  });

  // Start from Sunday (0) to Saturday (6)
  const baseDate = new Date(Date.UTC(2021, 7, weekStart + 1)); // arbitrary Sunday

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(baseDate);
    date.setUTCDate(baseDate.getUTCDate() + i);
    return formatter.format(date);
  });
}

export const formatDateInTimeZone = (
  date: Date,
  locale = 'en-GB',
  timeZone = 'UTC',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const fmt = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    ...options,
  });
  return fmt.format(date);
};
/**
 * Returns the timezone offset in minutes for a given date and timezone.
 */
export function getTimeZoneOffset(date: Date, timeZone: string): number {
  // Modern Intl API
  if (typeof Intl?.DateTimeFormat === "function") {
    const dtf = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" });
    const parts = dtf.formatToParts(date);
    const tzName = parts.find(p => p.type === "timeZoneName")?.value ?? "";

    // Match offsets like "+5", "+05:00", "-08", "-08:30"
    const match = tzName.match(/([+-])(\d{1,2})(?::?(\d{2}))?/);
    if (match) {
      const sign = match[1] === "+" ? 1 : -1;
      const hours = parseInt(match[2], 10);
      const minutes = parseInt(match[3] || "0", 10);
      return sign * (hours * 60 + minutes);
    }

    // Plain UTC/GMT
    if (tzName === "UTC" || tzName === "GMT") return 0;
  }

  // Fallback for older environments
  const utc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const local = new Date(date.toLocaleString("en-US", { timeZone }));
  return (local.getTime() - utc.getTime()) / 60000; // in minutes
}

/**
 * Converts a Date from one timezone to another.
 */
export function convertToTimeZone(date: Date, fromTimezone: string, toTimezone: string): Date {
  if (fromTimezone === toTimezone) return new Date(date.getTime());

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: fromTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const lookup = (type: string) => Number(parts.find(p => p.type === type)?.value || "0");

  const year = lookup("year");
  const month = lookup("month");
  const day = lookup("day");
  const hour = lookup("hour");
  const minute = lookup("minute");
  const second = lookup("second");

  const fromDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second, date.getMilliseconds()));

  const fromOffset = getTimeZoneOffset(fromDate, fromTimezone);
  const toOffset = getTimeZoneOffset(fromDate, toTimezone);
  const diffMs = (fromOffset - toOffset) * 60_000;
  return new Date(fromDate.getTime() + diffMs);
}

export const formatLocalizedDate = (
  date: Date,
  locale: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone,
  }).format(date);
};

export const formatLocalizedMonth = (
  date: Date,
  locale: string,
  timeZone: string
): string => {
  return formatLocalizedDate(date, locale, timeZone, {
    month: 'long',
    year: 'numeric',
  });
};

export const formatLocalizedWeekday = (
  date: Date,
  locale: string,
  timeZone: string,
  format: 'long' | 'short' | 'narrow' = 'long'
): string => {
  return formatLocalizedDate(date, locale, timeZone, {
    weekday: format,
  });
};

export const formatLocalizedTime = (
  date: Date,
  locale: string,
  timeZone: string,
  hour12 = false
): string => {
  return formatLocalizedDate(date, locale, timeZone, {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  });
};