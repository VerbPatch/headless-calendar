/**
 * Returns an array of localized day names for the week, starting from the specified `weekStart`.
 * @param {0 | 1 | 2 | 3 | 4 | 5 | 6} [weekStart=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @param {'long' | 'short' | 'narrow'} [format="short"] - The format of the weekday names ('short' for 'Mon', 'long' for 'Monday', 'narrow' for 'M').
 * @param {string} locale - The locale to use for formatting.
 * @returns {string[]} - An array of localized weekday names.
 * @example
 * ```ts
 * const days = daysofWeek(1, 'long', 'en-US'); // ["Monday", "Tuesday", ...]
 * ```
 */
export function daysofWeek(
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

/**
 * Formats a date into a string according to the specified locale and timezone.
 * @param {Date} date - The date to format.
 * @param {string} [locale='en-GB'] - The locale to use for formatting.
 * @param {string} [timeZone='UTC'] - The timezone to use for formatting.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Additional formatting options.
 * @returns {string} - The formatted date string.
 * @example
 * ```ts
 * const formatted = formatDateInTimeZone(new Date(), 'en-US', 'America/New_York', { month: 'long' });
 * ```
 */
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
 * @param {Date} date - The date to calculate the offset for.
 * @param {string} timeZone - The timezone to get the offset for.
 * @returns {number} - The timezone offset in minutes.
 * @example
 * ```ts
 * const offset = getTimeZoneOffset(new Date(), 'America/New_York'); // -240 or -300 depending on DST
 * ```
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
 * @param {Date} date - The date to convert.
 * @param {string} fromTimezone - The original timezone of the date.
 * @param {string} toTimezone - The target timezone.
 * @returns {Date} - The converted date object.
 * @see {@link getTimeZoneOffset}
 * @example
 * ```ts
 * const utcDate = new Date('2024-01-01T12:00:00Z');
 * const nyDate = convertToTimeZone(utcDate, 'UTC', 'America/New_York');
 * ```
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

/**
 * Formats a date into a localized date string.
 * @param {Date} date - The date to format.
 * @param {string} locale - The locale to use for formatting.
 * @param {string} timeZone - The timezone to use for formatting.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Additional formatting options.
 * @returns {string} - The localized date string.
 * @example
 * ```ts
 * const localizedDate = formatLocalizedDate(new Date(), 'de-DE', 'Europe/Berlin');
 * ```
 */
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

/**
 * Formats a date into a localized month string.
 * @param {Date} date - The date to format.
 * @param {string} locale - The locale to use for formatting.
 * @param {string} timeZone - The timezone to use for formatting.
 * @returns {string} - The localized month string.
 * @see {@link formatLocalizedDate}
 * @example
 * ```ts
 * const month = formatLocalizedMonth(new Date(), 'fr-FR', 'Europe/Paris'); // "janvier 2024"
 * ```
 */
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

/**
 * Formats a date into a localized weekday string.
 * @param {Date} date - The date to format.
 * @param {string} locale - The locale to use for formatting.
 * @param {string} timeZone - The timezone to use for formatting.
 * @param {'long' | 'short' | 'narrow'} [format='long'] - The format of the weekday (e.g., 'short', 'long', 'narrow').
 * @returns {string} - The localized weekday string.
 * @see {@link formatLocalizedDate}
 * @example
 * ```ts
 * const weekday = formatLocalizedWeekday(new Date(), 'es-ES', 'Europe/Madrid', 'long'); // "lunes"
 * ```
 */
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

/**
 * Formats a date into a localized time string.
 * @param {Date} date - The date to format.
 * @param {string} locale - The locale to use for formatting.
 * @param {string} timeZone - The timezone to use for formatting.
 * @param {boolean} [hour12=false] - Whether to use 12-hour format.
 * @returns {string} - The localized time string.
 * @see {@link formatLocalizedDate}
 * @example
 * ```ts
 * const time = formatLocalizedTime(new Date(), 'ja-JP', 'Asia/Tokyo', true);
 * ```
 */
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