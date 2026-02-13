import { describe, it, expect } from 'vitest';
import {
  isEventInDateRange,
  getEventsForDate,
  getEventsForDateRange,
  sortEventsByStartTime,
  getEventDuration,
  isAllDayEvent,
  isMultiDayEvent,
  getEventsAtTime,
  getOverlappingEvents,
  validateEvent,
  cloneEvent,
  generateId,
} from '../../src/utils/events';
import { CalendarEvent } from '../../src/types/events';

describe('Events Utilities', () => {
  const startOfWeek = 0;
  const event1: CalendarEvent = {
    id: '1',
    title: 'Event 1',
    start: new Date(2024, 0, 15, 10),
    end: new Date(2024, 0, 15, 11),
  };

  const event2: CalendarEvent = {
    id: '2',
    title: 'Event 2',
    start: new Date(2024, 0, 15, 10, 30),
    end: new Date(2024, 0, 15, 11, 30),
  };

  const allDayEvent: CalendarEvent = {
    id: '3',
    title: 'All Day',
    start: new Date(2024, 0, 15),
    end: new Date(2024, 0, 15),
    allDay: true,
  };

  const multiDayEvent: CalendarEvent = {
    id: '4',
    title: 'Multi Day',
    start: new Date(2024, 0, 15),
    end: new Date(2024, 0, 16),
  };

  const events = [event1, event2, allDayEvent, multiDayEvent];

  describe('Filtering and Finding', () => {
    it('should check if event is in range', () => {
      const start = new Date(2024, 0, 15, 0);
      const end = new Date(2024, 0, 15, 23);
      expect(isEventInDateRange(event1, start, end)).toBe(true);
      expect(isEventInDateRange(event1, new Date(2024, 0, 16), new Date(2024, 0, 17))).toBe(false);
    });

    it('should get events for date', () => {
      const result = getEventsForDate(events, new Date(2024, 0, 15), startOfWeek);
      expect(result).toHaveLength(4);
    });

    it('should get events for date range', () => {
      const result = getEventsForDateRange(
        events,
        new Date(2024, 0, 16),
        new Date(2024, 0, 17),
        startOfWeek,
      );
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('4');
    });

    it('should get events at specific time', () => {
      const result = getEventsAtTime(events, new Date(2024, 0, 15), 10, 0);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should find overlapping events', () => {
      const overlapping = getOverlappingEvents(events, event1);
      expect(overlapping).toContain(event2);
      expect(overlapping).not.toContain(event1);
    });
  });

  describe('Properties and Sorting', () => {
    it('should sort events by start time', () => {
      const sorted = sortEventsByStartTime([event2, event1]);
      expect(sorted[0]).toBe(event1);
      expect(sorted[1]).toBe(event2);
    });

    it('should calculate duration', () => {
      expect(getEventDuration(event1)).toBe(3600000);
    });

    it('should identify all-day and multi-day events', () => {
      expect(isAllDayEvent(allDayEvent)).toBe(true);
      expect(isAllDayEvent(event1)).toBe(false);
      expect(isMultiDayEvent(multiDayEvent)).toBe(true);
      expect(isMultiDayEvent(event1)).toBe(false);
    });
  });

  describe('Validation and Management', () => {
    it('should validate valid event', () => {
      expect(validateEvent(event1)).toHaveLength(0);
    });

    describe('Recurring Event Validation', () => {
      it('should validate basic recurring fields', () => {
        const invalid: any = {
          ...event1,
          recurring: { repeat: 'invalid', every: 0, count: -1 },
        };
        const errors = validateEvent(invalid);
        expect(errors).toContain('Invalid repeat type: invalid');
        expect(errors).toContain('Recurring "every" must be a positive integer');
        expect(errors).toContain('Recurring "count" must be a positive integer if specified');
      });

      it('should validate daily recurrence', () => {
        const invalid: any = {
          ...event1,
          recurring: { repeat: 'daily', every: 1, weekDays: [1] },
        };
        expect(validateEvent(invalid)).toContain(
          'Daily recurrence should not include weekDays, day, week, or month properties',
        );
      });

      it('should validate weekly recurrence', () => {
        const invalid: any = {
          ...event1,
          recurring: { repeat: 'weekly', every: 1, weekDays: [] },
        };
        expect(validateEvent(invalid)).toContain(
          'Weekly recurrence must specify weekDays array with at least one day',
        );

        const withExtra: any = {
          ...event1,
          recurring: { repeat: 'weekly', every: 1, weekDays: [1], month: 1 },
        };
        expect(validateEvent(withExtra)).toContain(
          'Weekly recurrence should not include day, week, or month properties',
        );
      });

      it('should validate monthly recurrence complex rules', () => {
        const invalid: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, week: 1 },
        };
        expect(validateEvent(invalid)).toContain(
          'Monthly recurrence with "week" must also specify "weekDays"',
        );

        const onlyWeekDays: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, weekDays: [1] },
        };
        expect(validateEvent(onlyWeekDays)).toContain(
          'Monthly recurrence with "weekDays" must also specify "week"',
        );

        const both: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, day: 1, week: 1, weekDays: [1] },
        };
        expect(validateEvent(both)).toContain(
          'Monthly recurrence cannot specify both "day" and "weekDays/week" properties',
        );

        const none: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1 },
        };
        expect(validateEvent(none)).toContain(
          'Monthly recurrence must specify either "day" or "weekDays" with "week"',
        );

        const invalidDay: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, day: 0 },
        };
        expect(validateEvent(invalidDay)).toContain(
          'Monthly "day" must be an integer between -31 and 31, excluding 0',
        );

        const invalidWeek: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, week: 5, weekDays: [1] },
        };
        expect(validateEvent(invalidWeek)).toContain(
          'Monthly "week" must be an integer: 1-4 for specific week, or -1 for last week',
        );

        const manyDays: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, week: 1, weekDays: [1, 2] },
        };
        expect(validateEvent(manyDays)).toContain(
          'Monthly recurrence with "week" should typically specify only one day in "weekDays"',
        );

        const emptyWeekDays: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, week: 1, weekDays: [] },
        };
        expect(validateEvent(emptyWeekDays)).toContain(
          'Monthly "weekDays" must be a non-empty array',
        );

        const invalidWeekDay: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, week: 1, weekDays: ['1'] },
        };
        expect(validateEvent(invalidWeekDay)).toContain(
          'Monthly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)',
        );

        const withMonth: any = {
          ...event1,
          recurring: { repeat: 'monthly', every: 1, day: 1, month: 1 },
        };
        expect(validateEvent(withMonth)).toContain(
          'Monthly recurrence should not include month property',
        );
      });

      it('should validate yearly recurrence complex rules', () => {
        const invalidMonth: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 12, day: 1 },
        };
        expect(validateEvent(invalidMonth)).toContain(
          'Yearly recurrence must specify "month" as integer between 0 (Jan) and 11 (Dec)',
        );

        const both: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, day: 1, week: 1, weekDays: [1] },
        };
        expect(validateEvent(both)).toContain(
          'Yearly recurrence cannot specify both "day" and "weekDays/week" properties',
        );

        const none: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0 },
        };
        expect(validateEvent(none)).toContain(
          'Yearly recurrence must specify either "day" or "weekDays" with "week"',
        );

        const onlyWeek: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, week: 1 },
        };
        expect(validateEvent(onlyWeek)).toContain(
          'Yearly recurrence with "week" must also specify "weekDays"',
        );

        const onlyWeekDays: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, weekDays: [1] },
        };
        expect(validateEvent(onlyWeekDays)).toContain(
          'Yearly recurrence with "weekDays" must also specify "week"',
        );

        const invalidDay: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, day: 40 },
        };
        expect(validateEvent(invalidDay)).toContain(
          'Yearly "day" must be an integer between -31 and 31, excluding 0',
        );

        const invalidWeek: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, week: 5, weekDays: [1] },
        };
        expect(validateEvent(invalidWeek)).toContain(
          'Yearly "week" must be an integer: 1-4 for specific week, or -1 for last week',
        );

        const invalidWeekDay: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, week: 1, weekDays: ['1'] },
        };
        expect(validateEvent(invalidWeekDay)).toContain(
          'Yearly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)',
        );

        const emptyWeekDays: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, week: 1, weekDays: [] },
        };
        expect(validateEvent(emptyWeekDays)).toContain(
          'Yearly "weekDays" must be a non-empty array',
        );

        const invalidYearlyDay: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, day: 0 },
        };
        expect(validateEvent(invalidYearlyDay)).toContain(
          'Yearly "day" must be an integer between -31 and 31, excluding 0',
        );

        const manyDays: any = {
          ...event1,
          recurring: { repeat: 'yearly', every: 1, month: 0, week: 1, weekDays: [1, 2] },
        };
        expect(validateEvent(manyDays)).toContain(
          'Yearly recurrence with "week" should typically specify only one day in "weekDays"',
        );
      });

      it('should validate recurring metadata', () => {
        const invalidEvery: any = {
          ...event1,
          recurring: { repeat: 'daily', every: 0 },
        };
        expect(validateEvent(invalidEvery)).toContain(
          'Recurring "every" must be a positive integer',
        );

        const invalidEnd: any = {
          ...event1,
          recurring: { repeat: 'daily', every: 1, end: 'invalid' },
        };
        expect(validateEvent(invalidEnd)).toContain(
          'Recurring "end" must be a valid date if specified',
        );

        const both: any = {
          ...event1,
          recurring: { repeat: 'daily', every: 1, count: 10, end: new Date() },
        };
        expect(validateEvent(both)).toContain(
          'Cannot specify both "count" and "end" for recurring events',
        );

        const earlyEnd: any = {
          ...event1,
          recurring: { repeat: 'daily', every: 1, end: new Date(2024, 0, 1) },
        };
        expect(validateEvent(earlyEnd)).toContain(
          'Recurring "end" must be after the event end date',
        );

        const noEventEnd: any = {
          title: 'T',
          start: new Date(),
          recurring: { repeat: 'daily', every: 1, end: new Date() },
        };
        expect(validateEvent(noEventEnd)).not.toContain(
          'Recurring "end" must be after the event end date',
        );
      });

      it('should validate weekday lists', () => {
        const dup: any = {
          ...event1,
          recurring: { repeat: 'weekly', every: 1, weekDays: [1, 1] },
        };
        expect(validateEvent(dup)).toContain('Weekly "weekDays" cannot contain duplicate days');

        const invalid: any = {
          ...event1,
          recurring: { repeat: 'weekly', every: 1, weekDays: [7] },
        };
        expect(validateEvent(invalid)).toContain(
          'Weekly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)',
        );
      });
    });

    it('should validate allDay event logic', () => {
      const invalid = {
        ...event1,
        allDay: true,
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 14),
      };
      expect(validateEvent(invalid)).toContain(
        'Event end date must be on or after start date for all-day events',
      );
    });

    it('should return errors for invalid event', () => {
      const invalid: any = { title: '', start: null, end: null };
      const errors = validateEvent(invalid);
      expect(errors).toContain('Event title is required');
      expect(errors).toContain('Event start time is required');
      expect(errors).toContain('Event end time is required');
    });

    it('should validate end after start', () => {
      const invalid = { ...event1, end: new Date(2024, 0, 15, 9) };
      expect(validateEvent(invalid)).toContain('Event end time must be after start time');
    });

    it('should clone event with new id', () => {
      const cloned = cloneEvent(event1);
      expect(cloned.title).toBe(event1.title);
      expect(cloned.id).not.toBe(event1.id);
    });

    it('should generate valid id', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });
});
