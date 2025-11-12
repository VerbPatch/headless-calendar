import { CalendarEvent } from '../types/events';
import { getStartOfDay, getEndOfDay } from './date';

export const generateId = (): string => {
  return crypto.randomUUID();
};

export const isEventInDateRange = (event: CalendarEvent, startDate: Date, endDate: Date): boolean => {
  const eventStart = event.start;
  const eventEnd = event.end;
  return eventStart <= endDate && eventEnd >= startDate;
};

export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  const startOfDay = getStartOfDay(date);
  const endOfDay = getEndOfDay(date);

  return events.filter(event =>
    isEventInDateRange(event, startOfDay, endOfDay)
  );
};

export const getEventsForDateRange = (events: CalendarEvent[], startDate: Date, endDate: Date): CalendarEvent[] => {
  return events.filter(event =>
    isEventInDateRange(event, startDate, endDate)
  );
};

export const sortEventsByStartTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => {
    const startA = a.start;
    const startB = b.start;
    return startA.getTime() - startB.getTime();
  });
};

export const getEventDuration = (event: CalendarEvent): number => {
  const start = event.start;
  const end = event.end;
  return end.getTime() - start.getTime();
};

export const isAllDayEvent = (event: CalendarEvent): boolean => {
  return event.allDay === true;
};

export const isMultiDayEvent = (event: CalendarEvent): boolean => {
  const start = event.start;
  const end = event.end;
  return start.toDateString() !== end.toDateString();
};

export const getEventsAtTime = (events: CalendarEvent[], date: Date, hour: number, minute = 0): CalendarEvent[] => {
  return events.filter(event => {
    const eventStart = event.start;
    return eventStart.getDate() === date.getDate() &&
      eventStart.getMonth() === date.getMonth() &&
      eventStart.getFullYear() === date.getFullYear() &&
      eventStart.getHours() === hour &&
      eventStart.getMinutes() === minute;
  });
};

export const getOverlappingEvents = (events: CalendarEvent[], targetEvent: CalendarEvent): CalendarEvent[] => {
  const targetStart = targetEvent.start;
  const targetEnd = targetEvent.end;

  return events.filter(event => {
    if (event.id === targetEvent.id) return false;

    const eventStart = event.start;
    const eventEnd = event.end;

    return (eventStart < targetEnd && eventEnd > targetStart);
  });
};

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
      const startDate = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
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

    if (r.count !== undefined && (typeof r.count !== 'number' || r.count < 1 || !Number.isInteger(r.count))) {
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
        if (r.weekDays !== undefined || r.day !== undefined || r.week !== undefined || r.month !== undefined) {
          errors.push('Daily recurrence should not include weekDays, day, week, or month properties');
        }
        break;

      case 'weekly':
        if (!Array.isArray(r.weekDays) || r.weekDays.length === 0) {
          errors.push('Weekly recurrence must specify weekDays array with at least one day');
        } else {
          const invalidDays = r.weekDays.filter(day =>
            typeof day !== 'number' || !Number.isInteger(day) || day < 0 || day > 6
          );
          if (invalidDays.length > 0) {
            errors.push('Weekly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)');
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

      case 'monthly':
        const hasDay = r.day !== undefined;
        const hasWeekDays = r.weekDays !== undefined;
        const hasWeek = r.week !== undefined;

        if (hasDay && (hasWeekDays || hasWeek)) {
          errors.push('Monthly recurrence cannot specify both "day" and "weekDays/week" properties');
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

        if (r.day !== undefined && (typeof r.day !== 'number' || !Number.isInteger(r.day) || r.day === 0 || r.day < -31 || r.day > 31)) {
          errors.push('Monthly "day" must be an integer between -31 and 31, excluding 0');
        }

        if (r.week !== undefined && (typeof r.week !== 'number' || !Number.isInteger(r.week) || (r.week < -1 || r.week === 0 || r.week > 4))) {
          errors.push('Monthly "week" must be an integer: 1-4 for specific week, or -1 for last week');
        }

        if (r.weekDays !== undefined) {
          if (!Array.isArray(r.weekDays) || r.weekDays.length === 0) {
            errors.push('Monthly "weekDays" must be a non-empty array');
          } else {
            const invalidDays = r.weekDays.filter(day =>
              typeof day !== 'number' || !Number.isInteger(day) || day < 0 || day > 6
            );
            if (invalidDays.length > 0) {
              errors.push('Monthly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)');
            }

            if (r.weekDays.length > 1) {
              errors.push('Monthly recurrence with "week" should typically specify only one day in "weekDays"');
            }
          }
        }

        if (r.month !== undefined) {
          errors.push('Monthly recurrence should not include month property');
        }
        break;

      case 'yearly':
        if (r.month === undefined || typeof r.month !== 'number' || !Number.isInteger(r.month) || r.month < 0 || r.month > 11) {
          errors.push('Yearly recurrence must specify "month" as integer between 0 (Jan) and 11 (Dec)');
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

        if (r.day !== undefined && (typeof r.day !== 'number' || !Number.isInteger(r.day) || r.day === 0 || r.day < -31 || r.day > 31)) {
          errors.push('Yearly "day" must be an integer between -31 and 31, excluding 0');
        }

        if (r.week !== undefined && (typeof r.week !== 'number' || !Number.isInteger(r.week) || (r.week < -1 || r.week === 0 || r.week > 4))) {
          errors.push('Yearly "week" must be an integer: 1-4 for specific week, or -1 for last week');
        }

        if (r.weekDays !== undefined) {
          if (!Array.isArray(r.weekDays) || r.weekDays.length === 0) {
            errors.push('Yearly "weekDays" must be a non-empty array');
          } else {
            const invalidDays = r.weekDays.filter(day =>
              typeof day !== 'number' || !Number.isInteger(day) || day < 0 || day > 6
            );
            if (invalidDays.length > 0) {
              errors.push('Yearly "weekDays" must contain integers between 0 (Sunday) and 6 (Saturday)');
            }

            if (r.weekDays.length > 1) {
              errors.push('Yearly recurrence with "week" should typically specify only one day in "weekDays"');
            }
          }
        }
        break;
    }
  }

  return errors;
};

export const cloneEvent = (event: CalendarEvent): CalendarEvent => {
  return {
    ...event,
    id: generateId()
  };
};