import { convertToTimeZone } from './timezone';

const intlCache = new Map<string, Intl.DateTimeFormat>();

const getIntlFormatter = (locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
  const cacheKey = JSON.stringify({ locale, ...options });
  if (!intlCache.has(cacheKey)) {
    intlCache.set(cacheKey, new Intl.DateTimeFormat(locale, options));
  }
  return intlCache.get(cacheKey)!;
}

const toNumeric = (val: string | undefined) => {
  if (!val) return '';
  const num = parseInt(val, 10);
  return isNaN(num) ? val : String(num);
};

/**
 * Parses a date format string into `Intl.DateTimeFormatOptions`.
 * @param {string} format - A date format string (e.g., "yyyy-MM-dd").
 * @returns {Intl.DateTimeFormatOptions} - Options object for `Intl.DateTimeFormat`. 
 * @group dateTime-helper
 * @title parseDateFormat
 * @description Parses a date format string into `Intl.DateTimeFormatOptions`.
 */
const parseDateFormat = (format: string): Intl.DateTimeFormatOptions => {
  const options: Intl.DateTimeFormatOptions = {};

  if (/E{1,3}/.test(format)) {
    if (format.includes('EEE')) options.weekday = 'long';
    else if (format.includes('EE')) options.weekday = 'short';
    else options.weekday = 'narrow';
  }

  if (/d{1,2}/.test(format)) {
    options.day = format.includes('dd') ? '2-digit' : 'numeric';
  }

  if (/M{1,4}/.test(format)) {
    if (format.includes('MMMM')) options.month = 'long';
    else if (format.includes('MMM')) options.month = 'short';
    else if (format.includes('MM')) options.month = '2-digit';
    else options.month = 'numeric';
  }

  if (/y{2,4}/.test(format)) {
    options.year = format.includes('yy') && !format.includes('yyyy') ? '2-digit' : 'numeric';
  }

  if (/G{1,3}/.test(format)) {
    if (format.includes('GGG')) options.era = 'long';
    else if (format.includes('GG')) options.era = 'short';
    else options.era = 'narrow';
  }

  return options;
}

/**
 * Parses a date and time format string into `Intl.DateTimeFormatOptions`.
 * @param {string} format - A date format string (e.g., "yyyy-MM-dd HH:mm:ss").
 * @returns {Intl.DateTimeFormatOptions} - Options object for `Intl.DateTimeFormat`.
 * @see {@link Intl.DateTimeFormatOptions} 
 * @group dateTime-helper
 * @title parseDateTimeFormat
 * @description Parses a date and time format string into `Intl.DateTimeFormatOptions`.
 */
const parseDateTimeFormat = (format: string): Intl.DateTimeFormatOptions => {
  const options: Intl.DateTimeFormatOptions = parseDateFormat(format);

  if (/h{1,2}/.test(format)) {
    options.hour = format.includes('hh') ? '2-digit' : 'numeric';
    options.hour12 = true;
  } else if (/H{1,2}/.test(format)) {
    options.hour = format.includes('HH') ? '2-digit' : 'numeric';
    options.hour12 = false;
  }

  if (/m{1,2}/.test(format)) {
    options.minute = format.includes('mm') ? '2-digit' : 'numeric';
  }

  if (/s{1,2}/.test(format)) {
    options.second = format.includes('ss') ? '2-digit' : 'numeric';
  }

  if (/z{1,4}/.test(format)) {
    if (format.includes('zzzz')) options.timeZoneName = 'long';
    else if (format.includes('zzz')) options.timeZoneName = 'short';
    else if (format.includes('zz')) options.timeZoneName = 'shortOffset';
    else options.timeZoneName = 'short';
  }

  return options;
}

/**
 * Formats a date object into a string based on the specified format, locale, and timezone.
 * @param {Date} date - The date object to format.
 * @param {object} [options] - Formatting options.
 * @param {string} [options.format="yyyy-MM-dd"] - The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").
 * @param {string} [options.locale] - The locale to use for formatting.
 * @param {string} [options.timeZone] - The timezone to use for formatting.
 * @returns {string} - The formatted date string.
 * @see {@link formatDateTime}
 * @example
 * ```ts
 * const formattedDate = formatDate(new Date('2024-01-15'), { format: 'MM/dd/yyyy' }); // "01/15/2024"
 * ``` 
 * @group dateTime-helper
 * @title formatDate
 * @description Formats a date object into a string based on the specified format, locale, and timezone.
 */
export const formatDate = (
  date: Date,
  options?: { format?: string; locale?: string; timeZone?: string }
): string => {
  if (!options) {
    options = { format: "yyyy-MM-dd" };
  }
  return formatDateTime(date, options);
}

/**
 * Formats a date and time object into a string based on the specified format, locale, and timezone.
 * @param {Date} date - The date object to format.
 * @param {object} [options] - Formatting options.
 * @param {string} [options.format="yyyy-MM-ddTHH:mm:ss"] - The format string (e.g., "yyyy-MM-dd HH:mm:ss").
 * @param {string} [options.locale] - The locale to use for formatting.
 * @param {string} [options.timeZone] - The timezone to use for formatting.
 * @returns {string} - The formatted date and time string.
 * @example
 * ```ts
 * formatDateTime(new Date(), { 
 *  format: "yyyy-MM-dd HH:mm:ss",
 *  locale: "en-US", 
 *  timeZone: "America/New_York" 
 * });
 * ``` 
 * @group dateTime-helper
 * @title formatDateTime
 * @description Formats a date and time object into a string based on the specified format, locale, and timezone.
 */
export const formatDateTime = (
  date: Date,
  options?: { format?: string; locale?: string; timeZone?: string }
): string => {
  const format = options?.format ?? "yyyy-MM-ddTHH:mm:ss";
  const locale = options?.locale ?? Intl.DateTimeFormat().resolvedOptions().locale;
  const timeZone = options?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatOptions = parseDateTimeFormat(format);
  const formatter = getIntlFormatter(locale, { ...formatOptions, timeZone });
  const parts = formatter.formatToParts(date);

  const lookup: Record<string, string> = {};
  parts.forEach(p => {
    lookup[p.type] = p.value;
  });



  const replacementMap: Record<string, string> = {
    // Year
    'yyyy': lookup.year ?? '',
    'yy': lookup.year?.slice(-2) ?? '',

    // Month
    'MMMM': lookup.month ?? '',
    'MMM': lookup.month ?? '',
    'MM': lookup.month ?? '',
    'M': toNumeric(lookup.month),

    // Day
    'dd': lookup.day ?? '',
    'd': toNumeric(lookup.day),

    // Hour (24h)
    'HH': lookup.hour ?? '',
    'H': toNumeric(lookup.hour),

    // Hour (12h)
    'hh': lookup.hour ?? '',
    'h': toNumeric(lookup.hour),
    'a': lookup.dayPeriod ?? '',

    // Minute
    'mm': lookup.minute ?? '',
    'm': toNumeric(lookup.minute),

    // Second
    'ss': lookup.second ?? '',
    's': toNumeric(lookup.second),

    // Time Zone
    'zzzz': lookup.timeZoneName ?? '',
    'zzz': lookup.timeZoneName ?? '',
    'zz': lookup.timeZoneName ?? '',
    'z': lookup.timeZoneName ?? '',

    // Weekday
    'EEE': lookup.weekday ?? '',
    'EE': lookup.weekday ?? '',
    'E': lookup.weekday ?? '',

    // Era
    'GGG': lookup.era ?? '',
    'GG': lookup.era ?? '',
    'G': lookup.era ?? '',
  };

  const tokenRegexPattern = Object.keys(replacementMap)
    .sort((a, b) => b.length - a.length)
    .map(token => token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
    .join('|');

  return format.replace(new RegExp(`\\[([^\\]]+)\\]|(${tokenRegexPattern})`, 'g'), (match) => {
    return replacementMap[match] ?? match;
  });
};

/**
 * Returns a new Date object representing the start of the day (00:00:00) in the target timezone.
 * @param {Date} date - The original date.
 * @param {string} fromTimeZone - The timezone of the original date.
 * @param {string} toTimeZone - The target timezone.
 * @returns {Date} - A new Date object set to the start of the day in the target timezone.
 * @example
 * ```ts
 * const day = getDay(new Date(), 'America/New_York', 'UTC');
 * ``` 
 * @group dateTime-helper
 * @title getDay
 * @description Returns a new Date object representing the start of the day (00:00:00) in the target timezone.
 */
export const getDay = (date: Date, fromTimeZone: string, toTimeZone: string): Date => {
  const tzDate = convertToTimeZone(date, fromTimeZone, toTimeZone);
  return new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate());
};

/**
 * Parses a date string into a Date object.
 * @param {string} dateString - The date string to parse.
 * @returns {Date} - The parsed Date object.
 * @example
 * ```ts
 * const date = parseDate('2024-01-15T12:00:00.000Z');
 * ``` 
 * @group dateTime-helper
 * @title parseDate
 * @description Parses a date string into a Date object.
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Checks if two dates represent the same day, ignoring time.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} - True if the dates are the same day, false otherwise. 
 * @group dateTime-helper
 */
const dateEquals = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
}

/**
 * Checks if two dates are the same day.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} - True if the dates are the same day, false otherwise.
 * @example
 * ```ts
 * const result = isSameDay(new Date('2024-01-15'), new Date('2024-01-15')); // true
 * ``` 
 * @group dateTime-helper
 * @title isSameDay
 * @description Checks if two dates are the same day.
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dateEquals(date1, date2);
};

/**
 * Checks if two dates are in the same week.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {boolean} - True if the dates are in the same week, false otherwise.
 * @see {@link getStartOfWeek}
 * @example
 * ```ts
 * const result = isSameWeek(new Date('2024-01-15'), new Date('2024-01-17'), 1); // true
 * ``` 
 * @group dateTime-helper
 * @title isSameWeek
 * @description Checks if two dates are in the same week.
 */
export const isSameWeek = (date1: Date, date2: Date, startOfWeek: number = 0): boolean => {
  const startOfWeek1 = getStartOfWeek(date1, startOfWeek);
  const startOfWeek2 = getStartOfWeek(date2, startOfWeek);
  return dateEquals(startOfWeek1, startOfWeek2);
};

/**
 * Checks if two dates are in the same month.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} - True if the dates are in the same month, false otherwise.
 * @see {@link getStartOfMonth}
 * @example
 * ```ts
 * const result = isSameMonth(new Date('2024-01-15'), new Date('2024-01-25')); // true
 * ``` 
 * @group dateTime-helper
 * @title isSameMonth
 * @description Checks if two dates are in the same month.
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  const startOfMonth1 = getStartOfMonth(date1);
  const startOfMonth2 = getStartOfMonth(date2);
  return dateEquals(startOfMonth1, startOfMonth2);
};

/**
 * Checks if two dates are in the same year.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} - True if the dates are in the same year, false otherwise.
 * @see {@link getStartOfYear}
 * @example
 * ```ts
 * const result = isSameYear(new Date('2024-01-15'), new Date('2024-02-25')); // true
 * ``` 
 * @group dateTime-helper
 * @title isSameYear
 * @description Checks if two dates are in the same year.
 */
export const isSameYear = (date1: Date, date2: Date): boolean => {
  const startOfYear1 = getStartOfYear(date1);
  const startOfYear2 = getStartOfYear(date2);
  return dateEquals(startOfYear1, startOfYear2);
};

/**
 * Gets the start of the year for a given date.
 * @param {Date} date - The date.
 * @returns {Date} - The start of the year.
 * @example
 * ```ts
 * const start = getStartOfYear(new Date('2024-05-15')); // 2024-01-01
 * ``` 
 * @group dateTime-helper
 * @title getStartOfYear
 * @description Gets the start of the year for a given date.
 */
export const getStartOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 0, 1);
};

/**
 * Gets the end of the year for a given date.
 * @param {Date} date - The date.
 * @returns {Date} - The end of the year.
 * @example
 * ```ts
 * const end = getEndOfYear(new Date('2024-05-15')); // 2024-11-31
 * ``` 
 * @group dateTime-helper
 * @title getEndOfYear
 * @description Gets the end of the year for a given date.
 */
export const getEndOfYear = (date: Date): Date => {
  return new Date(date.getFullYear(), 11, 31);
};

/**
 * Gets the start of the week for a given date.
 * @param {Date} date - The date.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {Date} - The start of the week.
 * @example
 * ```ts
 * const start = getStartOfWeek(new Date('2024-01-15'), 1); // Monday, 2024-01-15
 * ``` 
 * @group dateTime-helper
 * @title getStartOfWeek
 * @description Gets the start of the week for a given date.
 */
export const getStartOfWeek = (date: Date, startOfWeek: number = 0): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day - startOfWeek + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Gets the end of the week for a given date.
 * @param {Date} date - The date.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {Date} - The end of the week.
 * @see {@link getStartOfWeek}
 * @example
 * ```ts
 * const end = getEndOfWeek(new Date('2024-01-15'), 1); // Sunday, 2024-01-21
 * ``` 
 * @group dateTime-helper
 * @title getEndOfWeek
 * @description Gets the end of the week for a given date.
 */
export const getEndOfWeek = (date: Date, startOfWeek: number = 0): Date => {
  const startWeek = getStartOfWeek(date, startOfWeek);
  return new Date(startWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
};

/**
 * Gets the start of the month for a given date.
 * @param {Date} date - The date.
 * @returns {Date} - The start of the month.
 * @example
 * ```ts
 * const start = getStartOfMonth(new Date('2024-01-15')); // 2024-01-01
 * ``` 
 * @group dateTime-helper
 * @title getStartOfMonth
 * @description Gets the start of the month for a given date.
 */
export const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Gets the end of the month for a given date.
 * @param {Date} date - The date.
 * @returns {Date} - The end of the month.
 * @example
 * ```ts
 * const end = getEndOfMonth(new Date('2024-01-15')); // 2024-01-31
 * ``` 
 * @group dateTime-helper
 * @title getEndOfMonth
 * @description Gets the end of the month for a given date.
 */
export const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Gets the start of the day for a given date (00:00:00).
 * @param {Date} date - The date.
 * @returns {Date} - The start of the day.
 * @example
 * ```ts
 * const start = getStartOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T00:00:00
 * ``` 
 * @group dateTime-helper
 * @title getStartOfDay
 * @description Gets the start of the day for a given date (00:00:00).
 */
export const getStartOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Gets the end of the day for a given date (23:59:59:999).
 * @param {Date} date - The date.
 * @returns {Date} - The end of the day.
 * @example
 * ```ts
 * const end = getEndOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T23:59:59.999
 * ``` 
 * @group dateTime-helper
 * @title getEndOfDay
 * @description Gets the end of the day for a given date (23:59:59:999).
 */
export const getEndOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * Gets the number of days in the month of a given date.
 * @param {Date} date - The date.
 * @returns {number} - The number of days in the month.
 * @example
 * ```ts
 * const days = getDaysInMonth(new Date('2024-01-15')); // 31
 * ``` 
 * @group dateTime-helper
 * @title getDaysInMonth
 * @description Gets the number of days in the month of a given date.
 */
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * Adds a specified number of days to a date.
 * @param {Date} date - The original date.
 * @param {number} days - The number of days to add (can be negative).
 * @returns {Date} - The new date.
 * @example
 * ```ts
 * const newDate = addDays(new Date('2024-01-15'), 5); // 2024-01-20
 * ``` 
 * @group dateTime-helper
 * @title addDays
 * @description Adds a specified number of days to a date.
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds a specified number of weeks to a date.
 * @param {Date} date - The original date.
 * @param {number} weeks - The number of weeks to add (can be negative).
 * @returns {Date} - The new date.
 * @see {@link addDays}
 * @example
 * ```ts
 * const newDate = addWeeks(new Date('2024-01-15'), 2); // 2024-01-29
 * ``` 
 * @group dateTime-helper
 * @title addWeeks
 * @description Adds a specified number of weeks to a date.
 */
export const addWeeks = (date: Date, weeks: number): Date => {
  return addDays(date, weeks * 7);
};

/**
 * Adds a specified number of months to a date.
 * @param {Date} date - The original date.
 * @param {number} months - The number of months to add (can be negative).
 * @returns {Date} - The new date.
 * @example
 * ```ts
 * const newDate = addMonths(new Date('2024-01-31'), 1); // 2024-02-29
 * ``` 
 * @group dateTime-helper
 * @title addMonths
 * @description Adds a specified number of months to a date, clamping to the last day if necessary.
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + months);

  if (result.getDate() !== day) {
    result.setDate(0);
  }

  return result;
};

/**
 * Adds a specified number of years to a date.
 * @param {Date} date - The original date.
 * @param {number} years - The number of years to add (can be negative).
 * @returns {Date} - The new date.
 * @example
 * ```ts
 * const newDate = addYears(new Date('2024-02-29'), 1); // 2025-02-28
 * ``` 
 * @group dateTime-helper
 * @title addYears
 * @description Adds a specified number of years to a date.
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  const day = result.getDate();
  result.setFullYear(result.getFullYear() + years);

  if (result.getDate() !== day) {
    result.setDate(0);
  }

  return result;
};

/**
 * Subtracts a specified number of days from a date.
 * @param {Date} date - The original date.
 * @param {number} days - The number of days to subtract.
 * @returns {Date} - The new date.
 * @see {@link addDays}
 * @example
 * ```ts
 * const newDate = subtractDays(new Date('2024-01-15'), 5); // 2024-01-10
 * ``` 
 * @group dateTime-helper
 * @title subtractDays
 * @description Subtracts a specified number of days from a date.
 */
export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

/**
 * Subtracts a specified number of weeks from a date.
 * @param {Date} date - The original date.
 * @param {number} weeks - The number of weeks to subtract.
 * @returns {Date} - The new date.
 * @see {@link addWeeks}
 * @example
 * ```ts
 * const newDate = subtractWeeks(new Date('2024-01-15'), 2); // 2024-01-01
 * ``` 
 * @group dateTime-helper
 * @title subtractWeeks
 * @description Subtracts a specified number of weeks from a date.
 */
export const subtractWeeks = (date: Date, weeks: number): Date => {
  return addWeeks(date, -weeks);
};

/**
 * Subtracts a specified number of months from a date.
 * @param {Date} date - The original date.
 * @param {number} months - The number of months to subtract.
 * @returns {Date} - The new date.
 * @see {@link addMonths}
 * @example
 * ```ts
 * const newDate = subtractMonths(new Date('2024-01-15'), 3); // 2023-10-15
 * ``` 
 * @group dateTime-helper
 * @title subtractMonths
 * @description Subtracts a specified number of months from a date.
 */
export const subtractMonths = (date: Date, months: number): Date => {
  return addMonths(date, -months);
};

/**
 * Calculates the number of full days between two dates.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {number} - The number of days between the two dates.
 * @example
 * ```ts
 * const days = getDaysBetween(new Date('2024-01-15'), new Date('2024-01-20')); // 5
 * ``` 
 * @group dateTime-helper
 * @title getDaysBetween
 * @description Calculates the number of full days between two dates.
 */
export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Checks if a given date is today.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is today, false otherwise.
 * @see {@link isSameDay}
 * @example
 * ```ts
 * const result = isToday(new Date()); // true
 * ``` 
 * @group dateTime-helper
 * @title isToday
 * @description Checks if a given date is today.
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Checks if a given date is in the past.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is in the past, false otherwise.
 * @example
 * ```ts
 * const result = isPast(new Date('2000-01-01')); // true
 * ``` 
 * @group dateTime-helper
 * @title isPast
 * @description Checks if a given date is in the past.
 */
export const isPast = (date: Date): boolean => {
  return date < new Date();
};

/**
 * Checks if a given date is in the future.
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is in the future, false otherwise.
 * @example
 * ```ts
 * const result = isFuture(new Date('2100-01-01')); // true
 * ``` 
 * @group dateTime-helper
 * @title isFuture
 * @description Checks if a given date is in the future.
 */
export const isFuture = (date: Date): boolean => {
  return date > new Date();
};

/**
 * Checks if a given date falls on a weekend (Saturday or Sunday).
 * @param {Date} date - The date to check.
 * @returns {boolean} - True if the date is a weekend, false otherwise.
 * @example
 * ```ts
 * const result = isWeekend(new Date('2024-01-20')); // true (Saturday)
 * ``` 
 * @group dateTime-helper
 * @title isWeekend
 * @description Checks if a given date falls on a weekend (Saturday or Sunday).
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

/**
 * Checks if a given date and time falls within a specified range (inclusive).
 * @param {Date} between - The date to check.
 * @param {Date} startDateTime - The start of the range.
 * @param {Date} endDateTime - The end of the range.
 * @returns {boolean} - True if the date is within the range, false otherwise.
 * @example
 * ```ts
 * const result = dateTimeInBetween(new Date('2024-01-15T12:00:00'), new Date('2024-01-15T10:00:00'), new Date('2024-01-15T14:00:00')); // true
 * ``` 
 * @group dateTime-helper
 * @title dateTimeInBetween
 * @description Checks if a given date and time falls within a specified range (inclusive).
 */
export const dateTimeInBetween = (between: Date, startDateTime: Date, endDateTime: Date): boolean => {
  const d = between.getTime();
  const start = startDateTime.getTime();
  const end = endDateTime.getTime();

  return d >= start && d <= end;
}