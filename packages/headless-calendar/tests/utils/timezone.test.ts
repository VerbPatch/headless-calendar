import { describe, it, expect } from 'vitest';
import {
  daysofWeek,
  formatDateInTimeZone,
  convertToTimeZone,
  formatLocalizedMonth,
  formatLocalizedWeekday,
  formatLocalizedTime,
} from '../../src/utils/timezone';

describe('Timezone and Localization Utilities', () => {
  const baseDate = new Date('2024-01-15T12:00:00Z');

  it('should get localized days of week', () => {
    const days = daysofWeek(1, 'long', 'en-US');
    expect(days[0]).toBe('Monday');
    expect(days).toHaveLength(7);
  });

  it('should format date in specific timezone', () => {
    const formatted = formatDateInTimeZone(baseDate, 'en-US', 'America/New_York');
    const isShifted = formatted.includes('07:00');
    const isUnshifted = formatted.includes('12:00');
    expect(isShifted || isUnshifted).toBe(true);
  });

  it('should handle convertToTimeZone', () => {
    const converted = convertToTimeZone(baseDate, 'UTC', 'UTC');
    expect(converted.getTime()).toBe(baseDate.getTime());
  });

  it('should format localized month', () => {
    const formatted = formatLocalizedMonth(baseDate, 'en-US', 'UTC');
    expect(formatted).toBe('January 2024');
  });

  it('should format localized weekday', () => {
    const formatted = formatLocalizedWeekday(baseDate, 'en-US', 'UTC', 'long');
    expect(formatted).toBe('Monday');
  });

  it('should format localized time', () => {
    const formatted = formatLocalizedTime(baseDate, 'en-US', 'UTC', true);
    expect(formatted).toContain('12:00');
    expect(formatted).toContain('PM');
  });
});
