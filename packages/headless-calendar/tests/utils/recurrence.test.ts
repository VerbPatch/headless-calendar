import { describe, it, expect } from 'vitest';
import { expandRecurringEvent } from '../../src/utils/recurrence';
import { CalendarEvent } from '../../src/types/events';

describe('Recurrence Utilities', () => {
  const baseEvent: CalendarEvent = {
    id: '1',
    title: 'Test',
    start: new Date(2024, 0, 1, 10),
    end: new Date(2024, 0, 1, 11),
    recurring: 'never',
  };
  const startOfWeek = 0;

  it('should return empty for non-recurring events', () => {
    const result = expandRecurringEvent(
      baseEvent,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(0);
  });

  it('should expand daily events', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1 },
    };

    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 5, 23, 59),
      startOfWeek,
    );
    expect(result).toHaveLength(5);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[4].start.getDate()).toBe(5);
  });

  it('should expand daily events with weekDays filter', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1, weekDays: [1, 3] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 7),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
  });

  it('should respect count limit', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1, count: 3 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 10),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
  });

  it('should respect count limit mid-week', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'weekly', every: 1, weekDays: [1, 3, 5], count: 2 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 7),
      startOfWeek,
    );

    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
  });

  it('should respect end date limit', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1, end: new Date(2024, 0, 3, 23, 59) },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 10),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
  });

  it('should expand weekly events', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'weekly', every: 1, weekDays: [1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(5);
    expect(result[1].start.getDate()).toBe(8);
  });

  it('should expand weekly with specific days', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'weekly', every: 1, weekDays: [1, 3] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 14),
      startOfWeek,
    );
    expect(result).toHaveLength(4);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
  });

  it('should expand monthly events', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 2, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
    expect(result[1].start.getMonth()).toBe(1);
  });

  it('should expand monthly by day', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, day: 15 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 1, 28),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(15);

    const lastDayEvent: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, day: -1 },
    };
    const lastDayResult = expandRecurringEvent(
      lastDayEvent,
      new Date(2024, 0, 1),
      new Date(2024, 2, 1),
      startOfWeek,
    );
    expect(lastDayResult).toHaveLength(2);
    expect(lastDayResult[0].start.getDate()).toBe(31);
    expect(lastDayResult[1].start.getDate()).toBe(29);
  });

  it('should expand monthly by week', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, weekDays: [5], week: 2 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(12);

    const lastFriEvent: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, weekDays: [5], week: -1 },
    };
    const lastFriResult = expandRecurringEvent(
      lastFriEvent,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(lastFriResult).toHaveLength(1);
    expect(lastFriResult[0].start.getDate()).toBe(26);
  });

  it('should respect count limit mid-month', () => {
    const multiDayMonthly: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, week: 1, weekDays: [1, 3] },
    };

    const result = expandRecurringEvent(
      { ...multiDayMonthly, recurring: { ...multiDayMonthly.recurring, count: 3 } },
      new Date(2024, 0, 1),
      new Date(2024, 2, 1),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
    expect(result[2].start.getMonth()).toBe(1);
    expect(result[2].start.getDate()).toBe(5);
  });

  it('should respect end date limit within a week of candidates', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: {
        repeat: 'weekly',
        every: 1,
        weekDays: [1, 3, 5],
        end: new Date(2024, 0, 3, 23, 59),
      },
    };

    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 7),
      startOfWeek,
    );

    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
  });

  it('should expand yearly events', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, month: 0, day: 1 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2025, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[1].start.getFullYear()).toBe(2025);

    const yearlyWeekEvent: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, month: 2, weekDays: [5], week: 2 },
    };
    const yearlyWeekResult = expandRecurringEvent(
      yearlyWeekEvent,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(yearlyWeekResult).toHaveLength(1);
    expect(yearlyWeekResult[0].start.getMonth()).toBe(2);
    expect(yearlyWeekResult[0].start.getDate()).toBe(8);
  });

  it('should exclude dates specified in exdate', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1, count: 5 },
      exdate: [new Date(2024, 0, 2, 10), new Date(2024, 0, 4, 10)],
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 10),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
    expect(result[2].start.getDate()).toBe(5);
  });

  it('should include dates specified in rdate', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1, count: 2 },
      rdate: [new Date(2024, 0, 5, 10)],
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 10),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
    expect(result.some((e) => e.start.getDate() === 5)).toBe(true);
    expect(result.some((e) => e.start.getDate() === 1)).toBe(true);
    expect(result.some((e) => e.start.getDate() === 2)).toBe(true);
  });

  it('should handle byDay string format (e.g. 1SU) in weekly recurrence (ignored/normalized)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'weekly', every: 1, weekDays: ['1SU'] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 10),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(7);
  });

  it('should expand monthly byDay string format (e.g. 1FR)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['1FR'] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(5);
  });

  it('should expand monthly byDay string format (e.g. FR - every Friday)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['FR'] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(4);
    expect(result[0].start.getDate()).toBe(5);
    expect(result[3].start.getDate()).toBe(26);
  });

  it('should support byMonth alias', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byMonth: [1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getMonth()).toBe(1);
  });

  it('should support byMonthDay alias', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byMonthDay: [10] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 1, 28),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(10);
  });

  it('should support bySetPos in monthly recurrence', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['MO', 'TU'], bySetPos: [1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(1);
  });

  it('should support bySetPos with negative value (last instance)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['FR'], bySetPos: [-1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(26);
  });

  it('should support byYearDay in yearly recurrence', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byYearDay: [10] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getMonth()).toBe(0);
    expect(result[0].start.getDate()).toBe(10);
  });

  it('should support byWeekNo in yearly recurrence', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byWeekNo: [2], byDay: ['MO'] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(8);
  });

  it('should ignore negative byWeekNo (not implemented)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byWeekNo: [-1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(0);
  });

  it('should handle invalid Nth weekday in monthly (e.g. 5th Friday)', () => {
    // Feb 2024 has 4 Fridays (2, 9, 16, 23). 5th Friday doesn't exist.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['5FR'] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 1, 1), // Feb 1
      new Date(2024, 1, 29),
      startOfWeek,
    );
    expect(result).toHaveLength(0);
  });

  it('should handle invalid byYearDay', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byYearDay: [400] }, // Invalid day
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    // Should be filtered out by date logic (year mismatch) or just fail to create valid date
    // new Date(2024, 0, 400) -> goes to 2025.
    // Logic checks if (target.getFullYear() === year). So it should return 0.
    expect(result).toHaveLength(0);
  });

  it('should handle bySetPos out of bounds', () => {
    // 4 Fridays in Jan 2024.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['FR'], bySetPos: [10, -10] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(0);
  });

  it('should expand yearly with defaults (no day/month specified)', () => {
    // Defaults to same month/day as start date.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2026, 0, 1, 23, 59), // Extend to end of day to include the 10am event
      startOfWeek,
    );
    // Jan 1 2024, Jan 1 2025, Jan 1 2026
    expect(result).toHaveLength(3);
    expect(result[1].start.getFullYear()).toBe(2025);
    expect(result[1].start.getMonth()).toBe(0);
    expect(result[1].start.getDate()).toBe(1);
  });

  it('should support byWeekNo without specific weekDays (defaults to start day)', () => {
    // Event starts on Monday Jan 1 2024.
    // byWeekNo: [2]. Week 2 of 2024.
    // Should find Monday of Week 2.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byWeekNo: [2] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    // Week 2 of 2024 starts Jan 8 (Monday).
    // Event start day is Monday.
    // So result should be Jan 8.
    expect(result[0].start.getDate()).toBe(8);
  });

  it('should skip monthly occurrences that do not exist (e.g. 31st in Feb)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      start: new Date(2024, 0, 31), // Jan 31
      recurring: { repeat: 'monthly', every: 1, day: 31 },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 2, 31), // End of March
      startOfWeek,
    );
    // Should include Jan 31, Skip Feb (no 31st), Include Mar 31.
    expect(result).toHaveLength(2);
    expect(result[0].start.getMonth()).toBe(0); // Jan
    expect(result[1].start.getMonth()).toBe(2); // Mar
  });

  it('should support negative byYearDay (e.g. -1 for Dec 31)', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, byYearDay: [-1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31, 23, 59),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getMonth()).toBe(11); // Dec
    expect(result[0].start.getDate()).toBe(31);
  });

  it('should support multiple bySetPos values', () => {
    // Every Friday in Jan 2024: 5, 12, 19, 26.
    // bySetPos: [1, -1] -> 1st (5) and last (26).
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, byDay: ['FR'], bySetPos: [1, -1] },
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(5);
    expect(result[1].start.getDate()).toBe(26);
  });
});
