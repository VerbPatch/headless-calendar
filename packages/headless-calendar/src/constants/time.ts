/**
 * The number of hours in a day.
 *  @ignore
 */
export const HOURS_IN_DAY = 24;
/**
 * The number of minutes in an hour.
 * @ignore
 */
export const MINUTES_IN_HOUR = 60;
/**
 * The number of seconds in a minute.
 * @ignore
 */
export const SECONDS_IN_MINUTE = 60;
/**
 * The number of milliseconds in a second.
 * @ignore
 */
export const MILLISECONDS_IN_SECOND = 1000;
/**
 * The number of milliseconds in a minute.
 * @ignore
 */
export const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
/**
 * The number of milliseconds in an hour.
 * @ignore
 */
export const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
/**
 * The number of milliseconds in a day.
 * @ignore
 */
export const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;

/**
 * The default interval for time slots in minutes.
 * @ignore
 */
export const DEFAULT_TIME_SLOT_INTERVAL = 60; // minutes
/**
 * The default starting hour for time slots.
 * @ignore
 */
export const DEFAULT_START_HOUR = 0;
/**
 * The default ending hour for time slots.
 * @ignore
 */
export const DEFAULT_END_HOUR = 24;

/**
 * Standard 12-hour time format string.
 * @ignore
 */
export const TIME_FORMAT_12H = 'h:mm A';
/**
 * Standard 24-hour time format string.
 * @ignore
 */
export const TIME_FORMAT_24H = 'HH:mm';
/**
 * ISO date format string.
 * @ignore
 */
export const DATE_FORMAT_ISO = 'YYYY-MM-DD';
/**
 * ISO datetime format string.
 * @ignore
 */
export const DATETIME_FORMAT_ISO = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

/**
 * Maps weekDays to RFC 5545 day identifiers.
 */
export const dayMap: Record<number, string> = {
  0: 'SU',
  1: 'MO',
  2: 'TU',
  3: 'WE',
  4: 'TH',
  5: 'FR',
  6: 'SA',
};
