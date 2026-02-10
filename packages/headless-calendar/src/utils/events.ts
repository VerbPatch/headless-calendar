import { CalendarEvent } from '../types/events';
import { getStartOfDay, getEndOfDay } from './date';

/**
 * Generates a unique ID for a calendar event.
 * @returns {string} - A unique UUID string.
 * @example
 * ```ts
 * const id = generateId(); // "123e4567-e89b-12d3-a456-426614174000"
 * ```
 * @group calendar-events
 * @title generateId
 * @description Generates a unique ID for a calendar event.
 */
export const generateId = (): string => {
  return crypto.randomUUID();
};

/**
 * Checks if a given event falls within a specified date range.
 * @param {CalendarEvent} event - The calendar event to check.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {boolean} - True if the event is within the range, false otherwise.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const event = { start: new Date('2024-01-15'), end: new Date('2024-01-16') };
 * const inRange = isEventInDateRange(event, new Date('2024-01-10'), new Date('2024-01-20')); // true
 * ```
 * @group calendar-events
 * @title isEventInDateRange
 * @description Checks if a given event falls within a specified date range.
 */
export const isEventInDateRange = (
  event: CalendarEvent,
  startDate: Date,
  endDate: Date,
): boolean => {
  const eventStart = event.start;
  const eventEnd = event.end;
  return eventStart <= endDate && eventEnd >= startDate;
};

/**
 * Retrieves all events that occur on a specific date.
 * @param {CalendarEvent[]} events - An array of calendar events.
 * @param {Date} date - The date to filter events by.
 * @returns {CalendarEvent[]} - An array of events occurring on the specified date.
 * @see {@link CalendarEvent}
 * @see {@link getStartOfDay}
 * @see {@link getEndOfDay}
 * @see {@link isEventInDateRange}
 * @example
 * ```ts
 * const events = [{ start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') }];
 * const eventsForDate = getEventsForDate(events, new Date('2024-01-15'));
 * ```
 * @group calendar-events
 * @title getEventsForDate
 * @description Retrieves all events that occur on a specific date.
 */
export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const startOfDay = getStartOfDay(date);
  const endOfDay = getEndOfDay(date);

  return events.filter((event) => isEventInDateRange(event, startOfDay, endOfDay));
};

/**
 * Retrieves all events that fall within a specified date range.
 * @param {CalendarEvent[]} events - An array of calendar events.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {CalendarEvent[]} - An array of events within the specified date range.
 * @see {@link CalendarEvent}
 * @see {@link isEventInDateRange}
 * @example
 * ```ts
 * const events = [{ start: new Date('2024-01-15'), end: new Date('2024-01-16') }];
 * const eventsInRange = getEventsForDateRange(events, new Date('2024-01-10'), new Date('2024-01-20'));
 * ```
 * @group calendar-events
 * @title getEventsForDateRange
 * @description Retrieves all events that fall within a specified date range.
 */
export const getEventsForDateRange = (
  events: CalendarEvent[],
  startDate: Date,
  endDate: Date,
): CalendarEvent[] => {
  return events.filter((event) => isEventInDateRange(event, startDate, endDate));
};

/**
 * Sorts an array of calendar events by their start time in ascending order.
 * @param {CalendarEvent[]} events - An array of calendar events.
 * @returns {CalendarEvent[]} - A new array of events sorted by start time.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const events = [
 *   { start: new Date('2024-01-15T14:00:00'), end: new Date('2024-01-15T15:00:00') },
 *   { start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') }
 * ];
 * const sortedEvents = sortEventsByStartTime(events);
 * ```
 * @group calendar-events
 * @title sortEventsByStartTime
 * @description Sorts an array of calendar events by their start time in ascending order.
 */
export const sortEventsByStartTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    const startA = a.start;
    const startB = b.start;
    return startA.getTime() - startB.getTime();
  });
};

/**
 * Calculates the duration of an event in milliseconds.
 * @param {CalendarEvent} event - The calendar event.
 * @returns {number} - The duration of the event in milliseconds.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const event = { start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') };
 * const duration = getEventDuration(event); // 3600000
 * ```
 * @group calendar-events
 * @title getEventDuration
 * @description Calculates the duration of an event in milliseconds.
 */
export const getEventDuration = (event: CalendarEvent): number => {
  const start = event.start;
  const end = event.end;
  return end.getTime() - start.getTime();
};

/**
 * Checks if an event is an all-day event.
 * @param {CalendarEvent} event - The calendar event.
 * @returns {boolean} - True if the event is an all-day event, false otherwise.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const event = { allDay: true, start: new Date(), end: new Date() };
 * const isAllDay = isAllDayEvent(event); // true
 * ```
 * @group calendar-events
 * @title isAllDayEvent
 * @description Checks if an event is an all-day event.
 */
export const isAllDayEvent = (event: CalendarEvent): boolean => {
  return event.allDay === true;
};

/**
 * Checks if an event spans multiple days.
 * @param {CalendarEvent} event - The calendar event.
 * @returns {boolean} - True if the event spans multiple days, false otherwise.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const event = { start: new Date('2024-01-15'), end: new Date('2024-01-16') };
 * const isMultiDay = isMultiDayEvent(event); // true
 * ```
 * @group calendar-events
 * @title isMultiDayEvent
 * @description Checks if an event spans multiple days.
 */
export const isMultiDayEvent = (event: CalendarEvent): boolean => {
  const start = event.start;
  const end = event.end;
  return start.toDateString() !== end.toDateString();
};

/**
 * Retrieves events that occur at a specific time on a given date.
 * @param {CalendarEvent[]} events - An array of calendar events.
 * @param {Date} date - The date to filter by.
 * @param {number} hour - The hour to filter by (0-23).
 * @param {number} [minute=0] - The minute to filter by (0-59).
 * @returns {CalendarEvent[]} - An array of events occurring at the specified time.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const events = [{ start: new Date('2024-01-15T10:30:00'), end: new Date('2024-01-15T11:30:00') }];
 * const eventsAtTime = getEventsAtTime(events, new Date('2024-01-15'), 10, 30);
 * ```
 * @group calendar-events
 * @title getEventsAtTime
 * @description Retrieves events that occur at a specific time on a given date.
 */
export const getEventsAtTime = (
  events: CalendarEvent[],
  date: Date,
  hour: number,
  minute = 0,
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = event.start;
    return (
      eventStart.getDate() === date.getDate() &&
      eventStart.getMonth() === date.getMonth() &&
      eventStart.getFullYear() === date.getFullYear() &&
      eventStart.getHours() === hour &&
      eventStart.getMinutes() === minute
    );
  });
};

/**
 * Finds all events that overlap with a target event.
 * @param {CalendarEvent[]} events - An array of calendar events.
 * @param {CalendarEvent} targetEvent - The event to check for overlaps against.
 * @returns {CalendarEvent[]} - An array of overlapping events.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const events = [
 *   { id: '1', start: new Date('2024-01-15T10:00:00'), end: new Date('2024-01-15T11:00:00') },
 *   { id: '2', start: new Date('2024-01-15T10:30:00'), end: new Date('2024-01-15T11:30:00') }
 * ];
 * const overlapping = getOverlappingEvents(events, events[0]); // [events[1]]
 * ```
 * @group calendar-events
 * @title getOverlappingEvents
 * @description Finds all events that overlap with a target event.
 */
export const getOverlappingEvents = (
  events: CalendarEvent[],
  targetEvent: CalendarEvent,
): CalendarEvent[] => {
  const targetStart = targetEvent.start;
  const targetEnd = targetEvent.end;

  return events.filter((event) => {
    if (event.id === targetEvent.id) return false;

    const eventStart = event.start;
    const eventEnd = event.end;

    return eventStart < targetEnd && eventEnd > targetStart;
  });
};

/**
 * Validates a calendar event object for required fields and logical consistency.
 * @param {CalendarEvent} event - The calendar event to validate.
 * @returns {string[]} - An array of error messages. If the array is empty, the event is valid.
 * @see {@link CalendarEvent}
 * @example
 * ```ts
 * const event = { title: '', start: new Date(), end: new Date('2000-01-01') };
 * const errors = validateEvent(event);
 * // errors will contain messages about missing title and invalid end date
 * ```
 * @group calendar-events
 * @title validateEvent
 * @description Validates a calendar event object for required fields and logical consistency.
 */
export const validateEvent = (event: CalendarEvent): string[] => {
  const errors: string[] = [];

  if (!event.title || event.title.trim() === '') {
    errors.push('Event title is required');
  }

  if (!event.start) {
    errors.push('Event start time is required');
  }

  if (!event.end) {
    errors.push('Event end time is required');
  }

  if (event.start && event.end) {
    if (event.allDay) {
      const startDate = new Date(
        event.start.getFullYear(),
        event.start.getMonth(),
        event.start.getDate(),
      );
      const endDate = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());

      if (startDate > endDate) {
        errors.push('Event end date must be on or after start date for all-day events');
      }
    } else {
      if (event.start >= event.end) {
        errors.push('Event end time must be after start time');
      }
    }
  }

  const r = event.recurring;
  if (r && r !== 'never') {
    if (!['daily', 'weekly', 'monthly', 'yearly'].includes(r.repeat)) {
      errors.push(`Invalid repeat type: ${r.repeat}`);
    }

    if (typeof r.every !== 'number' || r.every < 1 || !Number.isInteger(r.every)) {
      errors.push('Recurring "every" must be a positive integer');
    }

    if (
      r.count !== undefined &&
      (typeof r.count !== 'number' || r.count < 1 || !Number.isInteger(r.count))
    ) {
      errors.push('Recurring "count" must be a positive integer if specified');
    }

    if (r.end !== undefined && !(r.end instanceof Date && !isNaN(r.end.getTime()))) {
      errors.push('Recurring "end" must be a valid date if specified');
    }

    if (r.count !== undefined && r.end !== undefined) {
      errors.push('Cannot specify both "count" and "end" for recurring events');
    }

    if (r.end && event.end && r.end <= event.end) {
      errors.push('Recurring "end" must be after the event end date');
    }

    switch (r.repeat) {
      case 'daily':
        if (
          r.weekDays !== undefined ||
          r.day !== undefined ||
          r.week !== undefined ||
          r.month !== undefined
        ) {
          errors.push(
            'Daily recurrence should not include weekDays, day, week, or month properties',
          );
        }
        break;

      case 'weekly':
        if (!Array.isArray(r.weekDays) || r.weekDays.length === 0) {
          errors.push('Weekly recurrence must specify weekDays array with at least one day');
        } else {
          const invalidDays = r.weekDays.filter(
            (day) => typeof day !== 'number' || !Number.isInteger(day) || day < 0 || day > 6,
          );
          if (invalidDays.length > 0) {
            errors.push(
              'Weekly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)',
            );
          }

          const uniqueDays = new Set(r.weekDays);
          if (uniqueDays.size !== r.weekDays.length) {
            errors.push('Weekly "weekDays" cannot contain duplicate days');
          }
        }

        if (r.day !== undefined || r.week !== undefined || r.month !== undefined) {
          errors.push('Weekly recurrence should not include day, week, or month properties');
        }
        break;

      case 'monthly': {
        const hasDay = r.day !== undefined;
        const hasWeekDays = r.weekDays !== undefined;
        const hasWeek = r.week !== undefined;

        if (hasDay && (hasWeekDays || hasWeek)) {
          errors.push(
            'Monthly recurrence cannot specify both "day" and "weekDays/week" properties',
          );
        }

        if (!hasDay && !hasWeekDays) {
          errors.push('Monthly recurrence must specify either "day" or "weekDays" with "week"');
        }

        if (hasWeekDays && !hasWeek) {
          errors.push('Monthly recurrence with "weekDays" must also specify "week"');
        }

        if (!hasWeekDays && hasWeek) {
          errors.push('Monthly recurrence with "week" must also specify "weekDays"');
        }

        if (
          r.day !== undefined &&
          (typeof r.day !== 'number' ||
            !Number.isInteger(r.day) ||
            r.day === 0 ||
            r.day < -31 ||
            r.day > 31)
        ) {
          errors.push('Monthly "day" must be an integer between -31 and 31, excluding 0');
        }

        if (
          r.week !== undefined &&
          (typeof r.week !== 'number' ||
            !Number.isInteger(r.week) ||
            r.week < -1 ||
            r.week === 0 ||
            r.week > 4)
        ) {
          errors.push(
            'Monthly "week" must be an integer: 1-4 for specific week, or -1 for last week',
          );
        }

        if (r.weekDays !== undefined) {
          if (!Array.isArray(r.weekDays) || r.weekDays.length === 0) {
            errors.push('Monthly "weekDays" must be a non-empty array');
          } else {
            const invalidDays = r.weekDays.filter(
              (day) => typeof day !== 'number' || !Number.isInteger(day) || day < 0 || day > 6,
            );
            if (invalidDays.length > 0) {
              errors.push(
                'Monthly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)',
              );
            }

            if (r.weekDays.length > 1) {
              errors.push(
                'Monthly recurrence with "week" should typically specify only one day in "weekDays"',
              );
            }
          }
        }

        if (r.month !== undefined) {
          errors.push('Monthly recurrence should not include month property');
        }
        break;
      }
      case 'yearly': {
        if (
          r.month === undefined ||
          typeof r.month !== 'number' ||
          !Number.isInteger(r.month) ||
          r.month < 0 ||
          r.month > 11
        ) {
          errors.push(
            'Yearly recurrence must specify "month" as integer between 0 (Jan) and 11 (Dec)',
          );
        }

        const yearlyHasDay = r.day !== undefined;
        const yearlyHasWeekDays = r.weekDays !== undefined;
        const yearlyHasWeek = r.week !== undefined;

        if (yearlyHasDay && (yearlyHasWeekDays || yearlyHasWeek)) {
          errors.push('Yearly recurrence cannot specify both "day" and "weekDays/week" properties');
        }

        if (!yearlyHasDay && !yearlyHasWeekDays) {
          errors.push('Yearly recurrence must specify either "day" or "weekDays" with "week"');
        }

        if (yearlyHasWeekDays && !yearlyHasWeek) {
          errors.push('Yearly recurrence with "weekDays" must also specify "week"');
        }

        if (!yearlyHasWeekDays && yearlyHasWeek) {
          errors.push('Yearly recurrence with "week" must also specify "weekDays"');
        }

        if (
          r.day !== undefined &&
          (typeof r.day !== 'number' ||
            !Number.isInteger(r.day) ||
            r.day === 0 ||
            r.day < -31 ||
            r.day > 31)
        ) {
          errors.push('Yearly "day" must be an integer between -31 and 31, excluding 0');
        }

        if (
          r.week !== undefined &&
          (typeof r.week !== 'number' ||
            !Number.isInteger(r.week) ||
            r.week < -1 ||
            r.week === 0 ||
            r.week > 4)
        ) {
          errors.push(
            'Yearly "week" must be an integer: 1-4 for specific week, or -1 for last week',
          );
        }

        if (r.weekDays !== undefined) {
          if (!Array.isArray(r.weekDays) || r.weekDays.length === 0) {
            errors.push('Yearly "weekDays" must be a non-empty array');
          } else {
            const invalidDays = r.weekDays.filter(
              (day) => typeof day !== 'number' || !Number.isInteger(day) || day < 0 || day > 6,
            );
            if (invalidDays.length > 0) {
              errors.push(
                'Yearly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)',
              );
            }

            if (r.weekDays.length > 1) {
              errors.push(
                'Yearly recurrence with "week" should typically specify only one day in "weekDays"',
              );
            }
          }
        }
        break;
      }
    }
  }

  return errors;
};

/**
 * Creates a deep clone of a calendar event, assigning a new unique ID.
 * @param {CalendarEvent} event - The event to clone.
 * @returns {CalendarEvent} - A new event object with a unique ID and copied properties.
 * @see {@link CalendarEvent}
 * @see {@link generateId}
 * @example
 * ```ts
 * const event = { id: '1', title: 'Meeting', start: new Date(), end: new Date() };
 * const clonedEvent = cloneEvent(event);
 * // clonedEvent will have a new unique ID
 * ```
 * @group calendar-events
 * @title cloneEvent
 * @description Creates a deep clone of a calendar event, assigning a new unique ID.
 */
export const cloneEvent = (event: CalendarEvent): CalendarEvent => {
  return {
    ...event,
    id: generateId(),
  };
};
