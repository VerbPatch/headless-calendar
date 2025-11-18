import { TimeSlot } from '../types/calendar';
import { getStartOfWeek, addDays, getStartOfMonth, getEndOfMonth, getEndOfWeek } from './date';

/**
 * @description Generates an array of dates for the week containing the given date.
 * @param {Date} date - The date within the desired week.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {Date[]} - An array of 7 Date objects representing the week.
 * @see {@link getStartOfWeek}
 * @see {@link addDays}
 * @example
 * ```ts
 * const dates = getWeekDates(new Date('2024-01-15'));
 * // dates will be an array of 7 dates from 2024-01-14 to 2024-01-20 (assuming startOfWeek is 0)
 * ```
 */
export const getWeekDates = (date: Date, startOfWeek = 0): Date[] => {
  const start = getStartOfWeek(date, startOfWeek);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

/**
 * @description Generates an array of dates for the calendar month view, including days from the previous and next months to complete the weeks.
 * @param {Date} date - A date within the desired month.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {Date[]} - An array of Date objects representing all visible days in the month view.
 * @see {@link getStartOfMonth}
 * @see {@link getEndOfMonth}
 * @see {@link getStartOfWeek}
 * @see {@link getEndOfWeek}
 * @example
 * ```ts
 * const dates = getMonthCalendarDates(new Date('2024-01-15'));
 * // dates will be an array of dates for the month view of January 2024
 * ```
 */
export const getMonthCalendarDates = (date: Date, startOfWeek = 0): Date[] => {
  const startOfMonth = getSt   rtOfMonth(date);
  const endOfMonth = getEndOfMonth(date);

  const startDate = getStartOfWeek(startOfMonth, startOfWeek);
  const endDate = getEndOfWeek(endOfMonth, startOfWeek);

  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * @description Generates an array of time slots for a given range of hours and interval.
 * @param {number} [startHour=0] - The starting hour (0-23).
 * @param {number} [endHour=24] - The ending hour (0-24).
 * @param {number} [interval=60] - The interval in minutes between time slots.
 * @returns {TimeSlot[]} - An array of TimeSlot objects.
 * @see {@link TimeSlot}
 * @example
 * ```ts
 * const slots = getTimeSlots(9, 17, 30);
 * // slots will be an array of time slots from 9:00 to 16:30 with a 30-minute interval
 * ```
 */
export const getTimeSlots = (startHour = 0, endHour = 24, interval = 60): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      slots.push({
        hour,
        minute,
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        label: formatTimeSlotLabel(hour, minute)
      });
    }
  }

  return slots;
};

/**
 * @description Formats a given hour and minute into a time slot label.
 * @param {number} hour - The hour (0-23).
 * @param {number} minute - The minute (0-59).
 * @param {boolean} [use24Hour=false] - Whether to format in 24-hour format.
 * @returns {string} - The formatted time string (e.g., "09:00 AM", "14:30").
 * @example
 * ```ts
 * const label12 = formatTimeSlotLabel(14, 30); // "2:30 PM"
 * const label24 = formatTimeSlotLabel(14, 30, true); // "14:30"
 * ```
 */
export const formatTimeSlotLabel = (hour: number, minute: number, use24Hour = false): string => {
  if (use24Hour) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? 'AM' : 'PM';
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

/**
 * @description Divides the dates of a month into weeks.
 * @param {Date} date - A date within the desired month.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {Date[][]} - An array of arrays, where each inner array represents a week.
 * @see {@link getMonthCalendarDates}
 * @example
 * ```ts
 * const weeks = getWeeksInMonth(new Date('2024-01-15'));
 * // weeks will be a 2D array of dates for the month of January 2024
 * ```
 */
export const getWeeksInMonth = (date: Date, startOfWeek = 0): Date[][] => {
  const dates = getMonthCalendarDates(date, startOfWeek);
  const weeks: Date[][] = [];

  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return weeks;
};

/**
 * @description Calculates the start and end dates of the quarter for a given date.
 * @param {Date} date - The date within the desired quarter.
 * @returns {{ start: Date; end: Date }} - An object containing the start and end dates of the quarter.
 * @example
 * ```ts
 * const quarter = getQuarterDates(new Date('2024-05-15'));
 * // quarter will be { start: Date('2024-04-01'), end: Date('2024-06-30') }
 * ```
 */
export const getQuarterDates = (date: Date): { start: Date; end: Date } => {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3);

  const start = new Date(year, quarter * 3, 1);
  const end = new Date(year, quarter * 3 + 3, 0);

  return { start, end };
};

/**
 * @description Calculates the start and end dates of the year for a given date.
 * @param {Date} date - The date within the desired year.
 * @returns {{ start: Date; end: Date }} - An object containing the start and end dates of the year.
 * @example
 * ```ts
 * const year = getYearRange(new Date('2024-05-15'));
 * // year will be { start: Date('2024-01-01'), end: Date('2024-12-31') }
 * ```
 */
export const getYearRange = (date: Date): { start: Date; end: Date } => {
  const year = date.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  return { start, end };
};

/**
 * @description Calculates the week number of the year for a given date.
 * @param {Date} date - The date to calculate the week number for.
 * @returns {number} - The week number (1-52 or 53).
 * @example
 * ```ts
 * const weekNumber = calculateWeekNumber(new Date('2024-01-15')); // 3
 * ```
 */
export const calculateWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

/**
 * @description Determines the start and end date bounds for a given calendar view.
 * @param {'month' | 'week' | 'day'} view - The current calendar view.
 * @param {Date} date - The reference date for the view.
 * @param {number} [startOfWeek=0] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
 * @returns {{ start: Date; end: Date }} - An object containing the start and end dates of the visible calendar period.
 * @see {@link getStartOfWeek}
 * @see {@link getEndOfWeek}
 * @see {@link getMonthCalendarDates}
 * @example
 * ```ts
 * const bounds = getCalendarBounds('week', new Date('2024-01-15'));
 * // bounds will be { start: Date('2024-01-14'), end: Date('2024-01-20') } (assuming startOfWeek is 0)
 * ```
 */
export const getCalendarBounds = (view: 'month' | 'week' | 'day', date: Date, startOfWeek = 0): { start: Date; end: Date } => {
  switch (view) {
    case 'day':
      return {
        start: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
      };

    case 'week':
      const weekStart = getStartOfWeek(date, startOfWeek);
      const weekEnd = getEndOfWeek(date, startOfWeek);
      return { start: weekStart, end: weekEnd };

    case 'month':
      const monthDates = getMonthCalendarDates(date, startOfWeek);
      return {
        start: monthDates[0],
        end: monthDates[monthDates.length - 1]
      };

    default:
      throw new Error(`Unknown view type: ${view}`);
  }
};