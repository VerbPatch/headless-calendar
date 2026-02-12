import { describe, it, expect } from 'vitest';
import { expandRecurringEvent } from '../../src/utils/recurrence';
import { CalendarEvent } from '../../src/types/events';

describe('Recurrence Utilities', () => {
  const baseEvent: CalendarEvent = {
    id: '1',
    title: 'Test',
    start: new Date(2024, 0, 1, 10), // Jan 1, 2024
    end: new Date(2024, 0, 1, 11),
    recurring: 'never',
  };
  const startOfWeek = 0; // Sunday

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
    // Expand for 5 days
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
    // Jan 1 2024 is Monday.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'daily', every: 1, weekDays: [1, 3] }, // Mon, Wed
    };
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 7), // Mon-Sun
      startOfWeek,
    );
    // Mon 1, Wed 3. (Tue 2 skipped, Thu 4 skipped...)
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
    // Weekly on Mon, Wed, Fri. Count 2.
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
    // Should get Mon (1st), Wed (3rd). Fri (5th) skipped because count reached.
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
    // Jan 1, 2, 3
    expect(result).toHaveLength(3);
  });

  it('should expand weekly events', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'weekly', every: 1, weekDays: [1] },
    };
    // Jan 1 is Monday.
    // Jan 1, 8, 15, 22, 29
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
    // Jan 1 2024 is Monday.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'weekly', every: 1, weekDays: [1, 3] }, // Mon, Wed
    };
    // Week 1: Jan 1 (Mon), Jan 3 (Wed)
    // Week 2: Jan 8, Jan 10
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
    // Jan 1, Feb 1, Mar 1
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
    // Jan 15, Feb 15
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 1, 28),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(15);

    // Negative day (last day of month)
    const lastDayEvent: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, day: -1 },
    };
    const lastDayResult = expandRecurringEvent(
      lastDayEvent,
      new Date(2024, 0, 1),
      new Date(2024, 2, 1), // Extend to March 1st to ensure Feb 29 is caught
      startOfWeek,
    );
    // Jan 31, Feb 29
    expect(lastDayResult).toHaveLength(2);
    expect(lastDayResult[0].start.getDate()).toBe(31);
    expect(lastDayResult[1].start.getDate()).toBe(29);
  });

  it('should expand monthly by week', () => {
    // 2nd Friday
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, weekDays: [5], week: 2 },
    };
    // Jan 2024: Fri 5 (1st), Fri 12 (2nd)
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(1);
    expect(result[0].start.getDate()).toBe(12);

    // Last Friday (-1)
    const lastFriEvent: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, weekDays: [5], week: -1 },
    };
    // Jan 2024: Fri 26 is the last Friday
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
    // Monthly on 1st and 15th. Count 2.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, day: 1, count: 2 }, // Wait, day can only be one value.
      // Monthly doesn't support multiple 'day' values in our type yet?
      // Type says 'day?: number'. So only one day.
      // But we can use 'weekDays' with 'week' for multiple? No, 'week' is singular too.
      // So 'candidates' array for monthly usually has 1 element unless we have weekDays?
      // Ah, 'weekDays' logic iterates.
    };
    // Monthly on 1st Friday and 3rd Friday? No, 'week' is singular.
    // So 'monthly' usually generates 1 candidate per month.
    // EXCEPT if we had logic to support multiple days?
    // In recurrence.ts:
    // if (rule.day) ... candidates.push(target) -> 1 candidate.
    // if (rule.week && rule.weekDays) ... rule.weekDays.forEach ... -> Multiple candidates!

    // So: Monthly, Week 1, Mon & Wed. Count 3.
    const multiDayMonthly: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'monthly', every: 1, week: 1, weekDays: [1, 3] }, // 1st Mon and 1st Wed
      // Jan 2024: Mon 1 (1st), Wed 3 (1st)
      // Feb 2024: Mon 5 (1st), Wed 7 (1st)
    };
    // We want to stop after 3 occurrences.
    // Jan: Mon 1, Wed 3. (Count 2)
    // Feb: Mon 5. (Count 3) -> Break. Wed 7 Skipped.
    const result = expandRecurringEvent(
      { ...multiDayMonthly, recurring: { ...multiDayMonthly.recurring, count: 3 } },
      new Date(2024, 0, 1),
      new Date(2024, 2, 1),
      startOfWeek,
    );
    expect(result).toHaveLength(3);
    expect(result[0].start.getDate()).toBe(1); // Jan 1
    expect(result[1].start.getDate()).toBe(3); // Jan 3
    expect(result[2].start.getMonth()).toBe(1); // Feb
    expect(result[2].start.getDate()).toBe(5); // Feb 5
  });

  it('should respect end date limit within a week of candidates', () => {
    // Weekly on Mon, Wed, Fri.
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: {
        repeat: 'weekly',
        every: 1,
        weekDays: [1, 3, 5],
        end: new Date(2024, 0, 3, 23, 59),
      }, // Jan 3 is Wed
    };
    // Range covers the whole week
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2024, 0, 7),
      startOfWeek,
    );
    // Should get Mon (1st), Wed (3rd). Fri (5th) > Jan 3, so skipped.
    expect(result).toHaveLength(2);
    expect(result[0].start.getDate()).toBe(1);
    expect(result[1].start.getDate()).toBe(3);
  });

  it('should expand yearly events', () => {
    // Basic yearly (e.g. birthday on specific day)
    const event: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, month: 0, day: 1 }, // Jan 1st
    };
    // Jan 1 2024, Jan 1 2025
    const result = expandRecurringEvent(
      event,
      new Date(2024, 0, 1),
      new Date(2025, 11, 31),
      startOfWeek,
    );
    expect(result).toHaveLength(2);
    expect(result[1].start.getFullYear()).toBe(2025);

    // Yearly by week (e.g. 2nd Friday of March)
    // March 2024: Fri 1st is 1st, Fri 8th is 2nd.
    const yearlyWeekEvent: CalendarEvent = {
      ...baseEvent,
      recurring: { repeat: 'yearly', every: 1, month: 2, weekDays: [5], week: 2 }, // March, Friday, 2nd
    };
    const yearlyWeekResult = expandRecurringEvent(
      yearlyWeekEvent,
      new Date(2024, 0, 1),
      new Date(2024, 11, 31),
      startOfWeek,
    );
    expect(yearlyWeekResult).toHaveLength(1);
    expect(yearlyWeekResult[0].start.getMonth()).toBe(2); // March
    expect(yearlyWeekResult[0].start.getDate()).toBe(8); // Fri 8th (assuming 2024 calculation is correct: Mar 1 2024 is Friday)
    // Wait, Mar 1 2024 is Friday. So 1st Fri is Mar 1. 2nd Fri is Mar 8. Correct.
  });
});
