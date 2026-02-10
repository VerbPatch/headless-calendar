import { describe, it, expect } from 'vitest';
import {
  getWeekDates,
  getMonthCalendarDates,
  getYearCalendarDays,
  getTimeSlots,
  formatTimeSlotLabel,
  getWeeksInMonth,
  getQuarterDates,
  getYearRange,
  calculateWeekNumber,
  getCalendarBounds,
  validateCustomView,
} from '../../src/utils/calendar';

describe('Calendar Utilities', () => {
  const baseDate = new Date(2024, 0, 15); // Jan 15, 2024 (Monday)

  describe('Date Generation', () => {
    it('should generate week dates correctly', () => {
      const dates = getWeekDates(baseDate, 0); // Start Sunday
      expect(dates).toHaveLength(7);
      expect(dates[0].getDate()).toBe(14); // Jan 14
      expect(dates[6].getDate()).toBe(20); // Jan 20
    });

    it('should generate month calendar dates correctly', () => {
      const dates = getMonthCalendarDates(baseDate, 0);
      // Jan 2024 starts on Monday.
      // With Sun start, it should include Dec 31 (Sun).
      // Jan has 31 days. Feb 1 is Thu.
      // With Sun start, Jan view ends on Feb 3 (Sat).
      // Total: 1 (Dec) + 31 (Jan) + 3 (Feb) = 35 days (5 weeks)
      expect(dates.length).toBeGreaterThanOrEqual(35);
      expect(dates[0].getMonth()).toBe(11); // December
      expect(dates[dates.length - 1].getMonth()).toBe(1); // February
    });

    it('should generate year calendar days correctly', () => {
      const dates = getYearCalendarDays(baseDate, 0);
      expect(dates.length).toBeGreaterThan(365);
    });
  });

  describe('Time Slots', () => {
    it('should generate time slots correctly', () => {
      const slots = getTimeSlots(9, 11, 30);
      expect(slots).toHaveLength(4); // 9:00, 9:30, 10:00, 10:30
      expect(slots[0].time).toBe('09:00');
      expect(slots[3].time).toBe('10:30');
    });

    it('should format time slot labels correctly', () => {
      expect(formatTimeSlotLabel(9, 0)).toBe('9:00 AM');
      expect(formatTimeSlotLabel(14, 30)).toBe('2:30 PM');
      expect(formatTimeSlotLabel(0, 0)).toBe('12:00 AM');
      expect(formatTimeSlotLabel(12, 0)).toBe('12:00 PM');
      expect(formatTimeSlotLabel(14, 30, true)).toBe('14:30');
    });
  });

  describe('Calculations', () => {
    it('should get weeks in month', () => {
      const weeks = getWeeksInMonth(baseDate, 0);
      expect(weeks.length).toBeGreaterThanOrEqual(5);
      expect(weeks[0]).toHaveLength(7);
    });

    it('should get quarter dates', () => {
      const q = getQuarterDates(new Date(2024, 4, 15)); // May
      expect(q.start.getMonth()).toBe(3); // April
      expect(q.end.getMonth()).toBe(5); // June
    });

    it('should get year range', () => {
      const r = getYearRange(baseDate);
      expect(r.start.getMonth()).toBe(0);
      expect(r.end.getMonth()).toBe(11);
    });

    it('should calculate week number', () => {
      expect(calculateWeekNumber(new Date(2024, 0, 1))).toBe(1);
      expect(calculateWeekNumber(new Date(2024, 0, 15))).toBe(3);
    });
  });

  describe('Boundaries and Validation', () => {
    it('should get calendar bounds for standard views', () => {
      const dayBounds = getCalendarBounds('day', baseDate);
      expect(dayBounds.start.getDate()).toBe(15);
      expect(dayBounds.end.getHours()).toBe(23);

      const weekBounds = getCalendarBounds('week', baseDate, 0);
      expect(weekBounds.start.getDate()).toBe(14);
      expect(weekBounds.end.getDate()).toBe(20);
    });

    it('should get calendar bounds for custom views', () => {
      const customBounds = getCalendarBounds('custom', baseDate, 0, { unit: 'day', count: 3 });
      expect(customBounds.start.getDate()).toBe(15);
      expect(customBounds.end.getDate()).toBe(17);
    });

    it('should validate custom view options', () => {
      expect(() => validateCustomView(null as any)).toThrow();
      expect(() => validateCustomView({ unit: 'invalid' as any, count: 1 })).toThrow();
      expect(() => validateCustomView({ unit: 'day', count: 1 })).not.toThrow();
    });
  });
});
