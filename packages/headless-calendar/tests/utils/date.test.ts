import { describe, it, expect } from 'vitest';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subtractDays,
  subtractWeeks,
  subtractMonths,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  getDaysInMonth,
  getDaysBetween,
  isToday,
  isPast,
  isFuture,
  isWeekend,
  dateTimeInBetween,
  getDay,
  parseDate,
  formatDate,
  formatDateTime,
} from '../../src/utils/date';

describe('Date Utilities', () => {
  const baseDate = new Date(2024, 0, 15); // Jan 15, 2024 (Monday)

  describe('Manipulation', () => {
    it('should add days correctly', () => {
      expect(addDays(baseDate, 5)).toEqual(new Date(2024, 0, 20));
      expect(addDays(baseDate, -5)).toEqual(new Date(2024, 0, 10));
      expect(addDays(new Date(2024, 0, 31), 1)).toEqual(new Date(2024, 1, 1));
    });

    it('should add weeks correctly', () => {
      expect(addWeeks(baseDate, 1)).toEqual(new Date(2024, 0, 22));
      expect(addWeeks(baseDate, -1)).toEqual(new Date(2024, 0, 8));
    });

    it('should add months correctly', () => {
      expect(addMonths(baseDate, 1)).toEqual(new Date(2024, 1, 15));
      expect(addMonths(new Date(2024, 0, 31), 1)).toEqual(new Date(2024, 1, 29)); // Leap year
      expect(addMonths(new Date(2023, 0, 31), 1)).toEqual(new Date(2023, 1, 28)); // Non-leap year
    });

    it('should add years correctly', () => {
      expect(addYears(baseDate, 1)).toEqual(new Date(2025, 0, 15));
      expect(addYears(new Date(2024, 1, 29), 1)).toEqual(new Date(2025, 1, 28));
    });

    it('should subtract correctly', () => {
      expect(subtractDays(baseDate, 5)).toEqual(new Date(2024, 0, 10));
      expect(subtractWeeks(baseDate, 1)).toEqual(new Date(2024, 0, 8));
      expect(subtractMonths(baseDate, 1)).toEqual(new Date(2023, 11, 15));
    });
  });

  describe('Comparisons', () => {
    it('should check same day correctly', () => {
      expect(isSameDay(new Date(2024, 0, 15, 10), new Date(2024, 0, 15, 20))).toBe(true);
      expect(isSameDay(new Date(2024, 0, 15), new Date(2024, 0, 16))).toBe(false);
    });

    it('should check same week correctly', () => {
      expect(isSameWeek(new Date(2024, 0, 14), new Date(2024, 0, 20), 0)).toBe(true); // Sun to Sat
      expect(isSameWeek(new Date(2024, 0, 14), new Date(2024, 0, 20), 1)).toBe(false); // Mon start
      expect(isSameWeek(new Date(2024, 0, 14), new Date(2024, 0, 21), 0)).toBe(false); // Different weeks
    });

    it('should check same month correctly', () => {
      expect(isSameMonth(new Date(2024, 0, 1), new Date(2024, 0, 31))).toBe(true);
      expect(isSameMonth(new Date(2024, 0, 1), new Date(2024, 1, 1))).toBe(false);
    });

    it('should check same year correctly', () => {
      expect(isSameYear(new Date(2024, 0, 1), new Date(2024, 11, 31))).toBe(true);
      expect(isSameYear(new Date(2024, 0, 1), new Date(2025, 0, 1))).toBe(false);
    });
  });

  describe('Start/End Boundries', () => {
    it('should get start and end of day', () => {
      const start = getStartOfDay(new Date(2024, 0, 15, 12, 30));
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);

      const end = getEndOfDay(new Date(2024, 0, 15, 12, 30));
      expect(end.getHours()).toBe(23);
      expect(end.getMilliseconds()).toBe(999);
    });

    it('should get start and end of week', () => {
      const sunStart = getStartOfWeek(baseDate, 0); // Jan 14
      expect(sunStart.getDate()).toBe(14);
      expect(sunStart.getDay()).toBe(0);

      const monStart = getStartOfWeek(baseDate, 1); // Jan 15
      expect(monStart.getDate()).toBe(15);
      expect(monStart.getDay()).toBe(1);

      const sunEnd = getEndOfWeek(baseDate, 0);
      expect(sunEnd.getDay()).toBe(6);
    });

    it('should get start and end of month', () => {
      expect(getStartOfMonth(baseDate).getDate()).toBe(1);
      expect(getEndOfMonth(baseDate).getDate()).toBe(31);
    });

    it('should get start and end of year', () => {
      expect(getStartOfYear(baseDate).getMonth()).toBe(0);
      expect(getEndOfYear(baseDate).getMonth()).toBe(11);
    });
  });

  describe('Information', () => {
    it('should get days in month', () => {
      expect(getDaysInMonth(new Date(2024, 1, 1))).toBe(29); // Feb 2024
      expect(getDaysInMonth(new Date(2023, 1, 1))).toBe(28); // Feb 2023
    });

    it('should calculate days between', () => {
      expect(getDaysBetween(new Date(2024, 0, 10), new Date(2024, 0, 15))).toBe(5);
    });

    it('should handle getDay and parseDate', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const day = getDay(date, 'UTC', 'UTC');
      expect(day.getHours()).toBe(0);
      expect(parseDate('2024-01-15')).toBeDefined();
    });

    it('should check today/past/future', () => {
      const now = new Date();
      expect(isToday(now)).toBe(true);
      expect(isPast(new Date(2000, 0, 1))).toBe(true);
      expect(isFuture(new Date(2100, 0, 1))).toBe(true);
    });

    it('should check weekend', () => {
      expect(isWeekend(new Date(2024, 0, 13))).toBe(true); // Sat
      expect(isWeekend(new Date(2024, 0, 14))).toBe(true); // Sun
      expect(isWeekend(new Date(2024, 0, 15))).toBe(false); // Mon
    });

    it('should check dateTimeInBetween', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 12);
      expect(dateTimeInBetween(new Date(2024, 0, 15, 11), start, end)).toBe(true);
      expect(dateTimeInBetween(new Date(2024, 0, 15, 9), start, end)).toBe(false);
    });
  });

  describe('Formatting', () => {
    it('should format dates correctly', () => {
      const date = new Date(2024, 0, 15, 14, 30);
      expect(formatDate(date, { format: 'yyyy-MM-dd' })).toBe('2024-01-15');
      expect(formatDateTime(date, { format: 'yyyy-MM-dd HH:mm' })).toBe('2024-01-15 14:30');
      expect(formatDate(date)).toBe('2024-01-15');
    });

    it('should handle various format tokens', () => {
      const date = new Date(2024, 0, 15, 9, 5, 2);
      // Weekdays
      expect(formatDate(date, { format: 'EEE' })).toBeDefined();
      expect(formatDate(date, { format: 'EE' })).toBeDefined();
      expect(formatDate(date, { format: 'E' })).toBeDefined();

      // Months
      expect(formatDate(date, { format: 'MMMM' })).toBeDefined();
      expect(formatDate(date, { format: 'MMM' })).toBeDefined();
      expect(formatDate(date, { format: 'MM' })).toBe('01');
      expect(formatDate(date, { format: 'M' })).toBe('1');

      // Years
      expect(formatDate(date, { format: 'yy' })).toBe('24');

      // Era
      expect(formatDate(date, { format: 'GGG' })).toBeDefined();
      expect(formatDate(date, { format: 'GG' })).toBeDefined();
      expect(formatDate(date, { format: 'G' })).toBeDefined();

      // Time (12h vs 24h)
      expect(formatDateTime(date, { format: 'hh:mm:ss' })).toBe('09:05:02');
      expect(formatDateTime(date, { format: 'h:m:s' })).toBe('9:5:2');
      expect(formatDateTime(date, { format: 'HH:mm:ss' })).toBe('09:05:02');
      expect(formatDateTime(date, { format: 'H:m:s' })).toBe('9:5:2');

      // Timezones
      expect(formatDateTime(date, { format: 'zzzz' })).toBeDefined();
      expect(formatDateTime(date, { format: 'zzz' })).toBeDefined();
      expect(formatDateTime(date, { format: 'zz' })).toBeDefined();
      expect(formatDateTime(date, { format: 'z' })).toBeDefined();
    });

    it('should handle escaped characters in format', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date, { format: '[Year:] yyyy' })).toBe('Year: 2024');
    });
  });
});