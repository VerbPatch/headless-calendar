/**
 * @description The number of hours in a day.
 */
export const HOURS_IN_DAY = 24;
/**
 * @description The number of minutes in an hour.
 */
export const MINUTES_IN_HOUR = 60;
/**
 * @description The number of seconds in a minute.
 */
export const SECONDS_IN_MINUTE = 60;
/**
 * @description The number of milliseconds in a second.
 */
export const MILLISECONDS_IN_SECOND = 1000;
/**
 * @description The number of milliseconds in a minute.
 */
export const MILLISECONDS_IN_MINUTE = SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
/**
 * @description The number of milliseconds in an hour.
 */
export const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;
/**
 * @description The number of milliseconds in a day.
 */
export const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;

/**
 * @description The default interval for time slots in minutes.
 */
export const DEFAULT_TIME_SLOT_INTERVAL = 60; // minutes
/**
 * @description The default starting hour for time slots.
 */
export const DEFAULT_START_HOUR = 0;
/**
 * @description The default ending hour for time slots.
 */
export const DEFAULT_END_HOUR = 24;

/**
 * @description Standard 12-hour time format string.
 */
export const TIME_FORMAT_12H = 'h:mm A';
/**
 * @description Standard 24-hour time format string.
 */
export const TIME_FORMAT_24H = 'HH:mm';
/**
 * @description ISO date format string.
 */
export const DATE_FORMAT_ISO = 'YYYY-MM-DD';
/**
 * @description ISO datetime format string.
 */
export const DATETIME_FORMAT_ISO = 'YYYY-MM-DDTHH:mm:ss.SSSZ';