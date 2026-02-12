import { CalendarEvent, CalendarEventOccurance } from '../types/events';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  getStartOfWeek,
  getStartOfDay,
  getStartOfMonth,
  getStartOfYear,
} from './date';

/**
 * Expands a recurring event into multiple instances within a specific date range.
 * @param event - The recurring event to expand.
 * @param rangeStart - The start of the range to find instances for.
 * @param rangeEnd - The end of the range to find instances for.
 * @returns An array of CalendarEvent instances.
 */
export const expandRecurringEvent = (
  event: CalendarEvent,
  rangeStart: Date,
  rangeEnd: Date,
  startOfWeek: number,
): CalendarEvent[] => {
  const rule = event.recurring as CalendarEventOccurance;
  if (!rule || event.recurring === 'never') return [];

  const instances: CalendarEvent[] = [];
  const duration = event.end.getTime() - event.start.getTime();
  let current = new Date(event.start);
  let count = 0;
  const MAX_OCCURRENCES = 3650; // Safety limit (e.g. 10 years of daily events)

  if (current > rangeEnd) return [];

  while (count < (rule.count ?? MAX_OCCURRENCES)) {
    if (!rule.count && current > rangeEnd) break;

    let candidates: Date[] = [];
    if (rule.repeat === 'daily') {
      if (!rule.weekDays || rule.weekDays.includes(current.getDay())) {
        candidates.push(new Date(current));
      }
    } else if (rule.repeat === 'weekly') {
      if (rule.weekDays && rule.weekDays.length > 0) {
        const d = new Date(current);
        const day = d.getDay();
        const diff = d.getDate() - day; // Align to Sunday, Need to chage to align with weekstartday
        const sunday = new Date(d.setDate(diff));

        rule.weekDays.forEach((wd) => {
          const target = new Date(sunday);
          target.setDate(sunday.getDate() + wd);
          target.setHours(
            event.start.getHours(),
            event.start.getMinutes(),
            event.start.getSeconds(),
            event.start.getMilliseconds(),
          );
          candidates.push(target);
        });
        candidates.sort((a, b) => a.getTime() - b.getTime());
      } else {
        candidates.push(new Date(current));
      }
    } else if (rule.repeat === 'monthly') {
      const y = current.getFullYear();
      const m = current.getMonth();

      if (rule.day) {
        let d = rule.day;
        if (d < 0) {
          d = new Date(y, m + 1, 0).getDate() + 1 + d;
        }
        const target = new Date(
          y,
          m,
          d,
          event.start.getHours(),
          event.start.getMinutes(),
          event.start.getSeconds(),
          event.start.getMilliseconds(),
        );
        if (target.getMonth() === m) {
          candidates.push(target);
        }
      } else if (rule.week && rule.weekDays && rule.weekDays.length > 0) {
        rule.weekDays.forEach((wd) => {
          let firstDayOfMonth = new Date(y, m, 1);
          let dayOffset = wd - firstDayOfMonth.getDay();
          if (dayOffset < 0) dayOffset += 7;
          let firstOccurrence = firstDayOfMonth.getDate() + dayOffset;

          let targetDate = firstOccurrence;
          if (rule.week! > 0) {
            targetDate += (rule.week! - 1) * 7;
          } else {
            const allOccurrences = [];
            let dateIter = firstOccurrence;
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            while (dateIter <= daysInMonth) {
              allOccurrences.push(dateIter);
              dateIter += 7;
            }
            if (rule.week! === -1) targetDate = allOccurrences[allOccurrences.length - 1];
          }

          const target = new Date(
            y,
            m,
            targetDate,
            event.start.getHours(),
            event.start.getMinutes(),
            event.start.getSeconds(),
            event.start.getMilliseconds(),
          );
          if (target.getMonth() === m) {
            candidates.push(target);
          }
        });
      } else {
        candidates.push(new Date(current));
      }
    } else if (rule.repeat === 'yearly') {
      let target = new Date(current);
      if (rule.month !== undefined) target.setMonth(rule.month);

      if (rule.day) {
        target.setDate(rule.day);
        candidates.push(target);
      } else if (rule.week && rule.weekDays && rule.weekDays.length > 0) {
        rule.weekDays.forEach((wd) => {
          const y = target.getFullYear();
          const m = target.getMonth();
          let firstDayOfMonth = new Date(y, m, 1);
          let dayOffset = wd - firstDayOfMonth.getDay();
          if (dayOffset < 0) dayOffset += 7;
          let firstOccurrence = firstDayOfMonth.getDate() + dayOffset;

          let targetDate = firstOccurrence;
          if (rule.week! > 0) {
            targetDate += (rule.week! - 1) * 7;
          } else {
            const allOccurrences = [];
            let dateIter = firstOccurrence;
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            while (dateIter <= daysInMonth) {
              allOccurrences.push(dateIter);
              dateIter += 7;
            }
            if (rule.week! === -1) targetDate = allOccurrences[allOccurrences.length - 1];
          }

          const newTarget = new Date(target);
          newTarget.setDate(targetDate);

          if (newTarget.getMonth() === m) {
            candidates.push(newTarget);
          }
        });
      } else {
        candidates.push(target);
      }
    }

    for (const date of candidates) {
      if (rule.count && count >= rule.count) break;
      if (rule.end && date > rule.end) break;

      count++;

      const instanceEnd = new Date(date.getTime() + duration);
      if (date <= rangeEnd && instanceEnd >= rangeStart) {
        instances.push({
          ...event,
          id: `${event.id}_recur_${date.getTime()}`,
          start: date,
          end: instanceEnd,
          recurring: 'never',
        });
      }
    }

    if (candidates.length > 0) {
      const last = candidates[candidates.length - 1];
      if (rule.end && last > rule.end) break;
    }

    switch (rule.repeat) {
      case 'daily':
        current = getStartOfDay(addDays(current, rule.every));
        break;
      case 'weekly':
        current = getStartOfWeek(addWeeks(current, rule.every), startOfWeek);
        break;
      case 'monthly':
        current = getStartOfMonth(addMonths(current, rule.every));
        break;
      case 'yearly':
        current = getStartOfYear(addYears(current, rule.every));
        break;
    }
  }

  return instances;
};
