import { convertToTimeZone } from './timezone';

/**
 * 
 * @param format - A date format string (e.g., "yyyy-MM-dd")
 * @returns Intl.DateTimeFormatOptions
 */
function parseDateFormat(format: string): Intl.DateTimeFormatOptions {
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

  if (/G{1,4}/.test(format)) {
    if (format.includes('GGGG')) options.era = 'long';
    else if (format.includes('GG')) options.era = 'short';
    else options.era = 'narrow';
  }

  return options;
}

/**
 * 
 * @param format - A date format string (e.g., "yyyy-MM-dd HH:mm:ss")
 * @returns Intl.DateTimeFormatOptions
 */
function parseDateTimeFormat(format: string): Intl.DateTimeFormatOptions {
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
 * 
 * @param date 
 * @param options - format: string; locale?: string; timeZone: string 
 * @returns formatted date string
 * @example
 * ```ts
 * formatDateTime(new Date(), { format: "yyyy-MM-dd", locale: "en-US", timeZone: "America/New_York" });
 * ```
 * // Output: "2023-10-05"
 */
export const formatDateTime = (
  date: Date,
  options?: { format?: string; locale?: string; timeZone?: string }
): string => {
  const format = options?.format ?? "yyyy-MM-ddTHH:mm:ss";
  const locale = options?.locale ?? Intl.DateTimeFormat().resolvedOptions().locale;
  const timeZone = options?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formatOptions = parseDateTimeFormat(format);
  const parts = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone }).formatToParts(date);
  const lookup: Record<string, string> = {};
  parts.forEach(p => {
    if (p.type !== "literal") lookup[p.type] = p.value;
  });

  const replacementMap: Record<string, string> = {
    // Year
    'yyyy': lookup.year ?? '',
    'yy': lookup.year ? lookup.year.slice(-2) : '',

    // Month
    'MMMM': lookup.month ?? '',
    'MMM': lookup.month ?? '',
    'MM': lookup.month ?? '',
    'M': lookup.month ? String(Number(lookup.month)) : '',

    // Day
    'dd': lookup.day ?? '',
    'd': lookup.day ? String(Number(lookup.day)) : '',

    // Hour (24h)
    'HH': lookup.hour ?? '',
    'H': lookup.hour ? String(Number(lookup.hour)) : '',

    // Hour (12h)
    'hh': lookup.hour ?? '',
    'h': lookup.hour ? String(Number(lookup.hour)) : '',
    'a': lookup.hour ? (Number(lookup.hour) >= 12 ? "PM" : "AM") : "",

    // Minute (Fixes the 'm' corruption issue!)
    'mm': lookup.minute ?? '',
    'm': lookup.minute ? String(Number(lookup.minute)) : '',

    // Second
    'ss': lookup.second ?? '',
    's': lookup.second ? String(Number(lookup.second)) : '',

    // Time Zone
    // Note: The z{1,4} regex is complex for this map, using a simpler 'z' approach for safety.
    'zzzz': lookup.timeZoneName ?? '',
    'zzz': lookup.timeZoneName ?? '',
    'zz': lookup.timeZoneName ?? '',
    'z': lookup.timeZoneName ?? '',

    // Weekday
    'EEE': lookup.weekday ?? '',
    'EE': lookup.weekday ?? '',
    'E': lookup.weekday ?? '',

    // Era
    'GGGG': lookup.era ?? '',
    'GGG': lookup.era ?? '',
    'G': lookup.era ?? '',
  };

  const tokenRegexPattern = Object.keys(replacementMap).sort((a, b) => b.length - a.length)
    .map(token => token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
    .join('|');

  const tokenRegex = new RegExp(`(${tokenRegexPattern})`, 'g');
  return format.replace(tokenRegex, (match) => {
    return replacementMap[match] ?? match;
  });
};

export const getDay = (date: Date, fromTimeZone: string, toTimeZone: string): Date => {
  const tzDate = convertToTimeZone(date, fromTimeZone, toTimeZone);
  return new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate());
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};
const dateEquals = (date1: Date, date2: Date): boolean => {
  return formatDate(date1) === formatDate(date2);
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dateEquals(date1, date2);
};

export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const startOfWeek1 = getStartOfWeek(date1);
  const startOfWeek2 = getStartOfWeek(date2);
  return dateEquals(startOfWeek1, startOfWeek2);
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  const startOfMonth1 = getStartOfMonth(date1);
  const startOfMonth2 = getStartOfMonth(date2);
  return dateEquals(startOfMonth1, startOfMonth2);
};

export const getStartOfWeek = (date: Date, startOfWeek = 0): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day - startOfWeek + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfWeek = (date: Date, startOfWeek = 0): Date => {
  const startWeek = getStartOfWeek(date, startOfWeek);
  return new Date(startWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
};

export const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getStartOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addWeeks = (date: Date, weeks: number): Date => {
  return addDays(date, weeks * 7);
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

export const subtractWeeks = (date: Date, weeks: number): Date => {
  return addWeeks(date, -weeks);
};

export const subtractMonths = (date: Date, months: number): Date => {
  return addMonths(date, -months);
};

export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isPast = (date: Date): boolean => {
  return date < new Date();
};

export const isFuture = (date: Date): boolean => {
  return date > new Date();
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

export const dateTimeInBetween = (between: Date, startDateTime: Date, endDateTime: Date): boolean => {
  const d = between.getTime();
  const start = startDateTime.getTime();
  const end = endDateTime.getTime();

  return d >= start && d <= end;
}