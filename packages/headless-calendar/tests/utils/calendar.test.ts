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
  const baseDate = new Date(2024, 0, 15); 

  describe('Date Generation', () => {
    it('should generate week dates correctly', () => {
      const dates = getWeekDates(baseDate, 0); 
      expect(dates).toHaveLength(7);
      expect(dates[0].getDate()).toBe(14); 
      expect(dates[6].getDate()).toBe(20); 
    });

    it('should generate month calendar dates correctly', () => {
      const dates = getMonthCalendarDates(baseDate, 0);
      expect(dates.length).toBeGreaterThanOrEqual(35);
      expect(dates[0].getMonth()).toBe(11); 
      expect(dates[dates.length - 1].getMonth()).toBe(1);
    });

    it('should generate year calendar days correctly', () => {
      const dates = getYearCalendarDays(baseDate, 0);
      expect(dates.length).toBeGreaterThan(365);
    });
  });

  describe('Time Slots', () => {
    it('should generate time slots correctly', () => {
      const slots = getTimeSlots(9, 11, 30);
      expect(slots).toHaveLength(4); 
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
      const q = getQuarterDates(new Date(2024, 4, 15)); 
      expect(q.start.getMonth()).toBe(3); 
      expect(q.end.getMonth()).toBe(5);
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

      const monthBounds = getCalendarBounds('month', baseDate, 0);
      expect(monthBounds.start.getMonth()).toBe(11);
      expect(monthBounds.end.getMonth()).toBe(1);

      const yearBounds = getCalendarBounds('year', baseDate);
      expect(yearBounds.start.getMonth()).toBe(0);
      expect(yearBounds.end.getMonth()).toBe(11);
    });

    it('should get calendar bounds for custom views', () => {
      const dayCustom = getCalendarBounds('custom', baseDate, 0, { type: 'day', count: 3 });
      expect(dayCustom.start.getDate()).toBe(15);
      expect(dayCustom.end.getDate()).toBe(17);

      const weekCustom = getCalendarBounds('custom', baseDate, 0, { type: 'week', count: 2 });
      expect(weekCustom.start.getDate()).toBe(14); 
      expect(weekCustom.end.getDate()).toBe(27);

      const monthCustom = getCalendarBounds('custom', baseDate, 0, { type: 'month', count: 2 });
      expect(monthCustom.start.getMonth()).toBe(0); 
      expect(monthCustom.end.getMonth()).toBe(1); 
    });

    it('should validate custom view options', () => {
      expect(() => validateCustomView(null as any)).toThrow();
      expect(() => validateCustomView({ type: 'invalid' as any, count: 1 })).toThrow();
      expect(() => validateCustomView({ type: 'day', count: 1 })).not.toThrow();
    });

    it('should throw error for unknown view type', () => {
      expect(() => getCalendarBounds('invalid' as any, baseDate)).toThrow('Unknown view type: invalid');
    });
  });
});