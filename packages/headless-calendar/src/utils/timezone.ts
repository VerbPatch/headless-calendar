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
 * @title daysofWeek
 * @description Returns an array of localized day names for the week, starting from the specified `weekStart`.
 */
export function daysofWeek(
  weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  format: 'long' | 'short' | 'narrow' = 'short',
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
 * @title formatDateInTimeZone
 * @description Formats a date into a string according to the specified locale and timezone.
 */
export const formatDateInTimeZone = (
  date: Date,
  locale = 'en-GB',
  timeZone = 'UTC',
  options: Intl.DateTimeFormatOptions = {},
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
 * @title getTimeZoneOffset
 * @description Returns the timezone offset in minutes for a given date and timezone.
 */
export function getTimeZoneOffset(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const lookup = (type: string) => parts.find((p) => p.type === type)!.value;

  return (
    Date.UTC(
      Number(lookup('year')),
      Number(lookup('month')) - 1,
      Number(lookup('day')),
      Number(lookup('hour')),
      Number(lookup('minute')),
      Number(lookup('second')),
      date.getMilliseconds(),
    ) - date.getTime()
  );
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
 * @title convertToTimeZone
 * @description Converts a Date from one timezone to another.
 */
export function convertToTimeZone(date: Date, fromTimezone: string, toTimezone: string): Date {
  if (fromTimezone === toTimezone) return new Date(date.getTime());

  const fromOffset = getTimeZoneOffset(date, fromTimezone);
  const toOffset = getTimeZoneOffset(date, toTimezone);

  return new Date(date.getTime() + (fromOffset - toOffset));
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
 * @title formatLocalizedDate
 * @description Formats a date into a localized date string.
 */
export const formatLocalizedDate = (
  date: Date,
  locale: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = {},
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
 * @title formatLocalizedMonth
 * @description Formats a date into a localized month string.
 */
export const formatLocalizedMonth = (date: Date, locale: string, timeZone: string): string => {
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
 * @title formatLocalizedWeekday
 * @description Formats a date into a localized weekday string.
 */
export const formatLocalizedWeekday = (
  date: Date,
  locale: string,
  timeZone: string,
  format: 'long' | 'short' | 'narrow' = 'long',
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
 * @title formatLocalizedTime
 * @description Formats a date into a localized time string.
 */
export const formatLocalizedTime = (
  date: Date,
  locale: string,
  timeZone: string,
  hour12 = false,
): string => {
  return formatLocalizedDate(date, locale, timeZone, {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  });
};
