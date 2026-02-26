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
  isSameDay,
} from './date';

const parseDay = (d: string | number): number => {
  if (typeof d === 'number') return d;
  const map: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const match = d.match(/[A-Z]{2}$/);
  return match ? map[match[0]] : 0;
};

const parseByDay = (val: string | number): { nth: number; day: number } => {
  if (typeof val === 'number') return { nth: 0, day: val };
  const map: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const match = val.match(/^(-?\d+)?([A-Z]{2})$/);
  if (!match) return { nth: 0, day: 0 };
  const nth = match[1] ? parseInt(match[1], 10) : 0;
  const dayStr = match[2];
  return { nth, day: map[dayStr] };
};

const MAX_OCCURRENCES = 3650;

const setTimeToEventStart = (date: Date, eventStart: Date): Date => {
  const target = new Date(date);
  target.setHours(
    eventStart.getHours(),
    eventStart.getMinutes(),
    eventStart.getSeconds(),
    eventStart.getMilliseconds(),
  );
  return target;
};

const getDailyCandidates = (current: Date, weekDays: number[], eventStart: Date): Date[] => {
  if (weekDays.length === 0 || weekDays.includes(current.getDay())) {
    return [setTimeToEventStart(current, eventStart)];
  }
  return [];
};

const getWeeklyCandidates = (
  current: Date,
  weekDays: number[],
  eventStart: Date,
  startOfWeek: number,
): Date[] => {
  if (weekDays.length === 0) {
    return [setTimeToEventStart(current, eventStart)];
  }

  const firstDayOfWeek = getStartOfWeek(current, startOfWeek);
  return weekDays
    .map((wd) => {
      const target = new Date(firstDayOfWeek);
      target.setDate(firstDayOfWeek.getDate() + ((wd - startOfWeek + 7) % 7));
      return setTimeToEventStart(target, eventStart);
    })
    .sort((a, b) => a.getTime() - b.getTime());
};

const getMonthlyCandidates = (
  current: Date,
  rule: CalendarEventOccurance,
  eventStart: Date,
  y: number,
  m: number,
): Date[] => {
  const candidates: Date[] = [];
  if (rule.day) {
    const days = Array.isArray(rule.day) ? rule.day : [rule.day];
    days.forEach((dVal) => {
      let d = dVal;
      if (d < 0) {
        d = new Date(y, m + 1, 0).getDate() + 1 + d;
      }
      const target = setTimeToEventStart(new Date(y, m, d), eventStart);
      if (target.getMonth() === m) {
        candidates.push(target);
      }
    });
  } else if (rule.weekDays && rule.weekDays.length > 0) {
    const rawRules: (string | number)[] = rule.weekDays;
    const processedRules = rawRules.map((r) => {
      const parsed = parseByDay(r);
      if (parsed.nth === 0 && rule.week) {
        parsed.nth = Array.isArray(rule.week) ? rule.week[0] : rule.week;
      }
      return parsed;
    });

    processedRules.forEach(({ nth, day }) => {
      const firstDayOfMonth = new Date(y, m, 1);
      const dayOffset = (day - firstDayOfMonth.getDay() + 7) % 7;
      const firstOccurrence = firstDayOfMonth.getDate() + dayOffset;

      if (nth !== 0) {
        let targetDate = firstOccurrence;
        if (nth > 0) {
          targetDate += (nth - 1) * 7;
        } else {
          const allOccurrences = [];
          let dateIter = firstOccurrence;
          const daysInMonth = new Date(y, m + 1, 0).getDate();
          while (dateIter <= daysInMonth) {
            allOccurrences.push(dateIter);
            dateIter += 7;
          }
          if (Math.abs(nth) <= allOccurrences.length) {
            targetDate = allOccurrences[allOccurrences.length + nth];
          } else {
            targetDate = -1;
          }
        }

        if (targetDate > 0) {
          const target = setTimeToEventStart(new Date(y, m, targetDate), eventStart);
          if (target.getMonth() === m) {
            candidates.push(target);
          }
        }
      } else {
        let dateIter = firstOccurrence;
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        while (dateIter <= daysInMonth) {
          const target = setTimeToEventStart(new Date(y, m, dateIter), eventStart);
          if (target.getMonth() === m) {
            candidates.push(target);
          }
          dateIter += 7;
        }
      }
    });
  } else {
    candidates.push(setTimeToEventStart(current, eventStart));
  }
  return candidates;
};

const getYearlyCandidates = (
  current: Date,
  rule: CalendarEventOccurance,
  eventStart: Date,
  startOfWeek: number,
): Date[] => {
  const candidates: Date[] = [];
  const year = current.getFullYear();

  if (rule.byYearDay) {
    rule.byYearDay.forEach((d: number) => {
      const target = setTimeToEventStart(new Date(year, 0, 1), eventStart);
      if (d > 0) {
        target.setDate(d);
      } else {
        const daysInYear =
          (new Date(year + 1, 0, 1).getTime() - new Date(year, 0, 1).getTime()) /
          (1000 * 60 * 60 * 24);
        target.setDate(daysInYear + d + 1);
      }
      if (target.getFullYear() === year) {
        candidates.push(target);
      }
    });
  } else if (rule.byWeekNo) {
    const week1Start = getStartOfWeek(new Date(year, 0, 4), startOfWeek || 1);
    rule.byWeekNo.forEach((wn: number) => {
      if (wn <= 0) return;
      const targetWeekStart = addWeeks(week1Start, wn - 1);
      const daysToFind =
        rule.weekDays && rule.weekDays.length > 0
          ? rule.weekDays.map(parseDay)
          : [eventStart.getDay()];

      daysToFind.forEach((wd) => {
        const target = getStartOfWeek(targetWeekStart, startOfWeek);
        const offset = (wd - startOfWeek + 7) % 7;
        target.setDate(target.getDate() + offset);
        const finalTarget = setTimeToEventStart(target, eventStart);
        if (finalTarget.getFullYear() === year) {
          candidates.push(finalTarget);
        }
      });
    });
  } else {
    let months: number[] = [];
    if (rule.month !== undefined) {
      months = Array.isArray(rule.month) ? rule.month : [rule.month as number];
    } else {
      months = [eventStart.getMonth()];
    }

    months.forEach((m) => {
      if (rule.day) {
        const days = Array.isArray(rule.day) ? rule.day : [rule.day as number];
        days.forEach((d) => {
          const t = setTimeToEventStart(new Date(year, m, d), eventStart);
          if (t.getMonth() === m) candidates.push(t);
        });
      } else if (rule.week && rule.weekDays && rule.weekDays.length > 0) {
        const weekDays = rule.weekDays.map(parseDay);
        weekDays.forEach((wd) => {
          const firstDayOfMonth = new Date(year, m, 1);
          const dayOffset = (wd - firstDayOfMonth.getDay() + 7) % 7;
          const firstOccurrence = firstDayOfMonth.getDate() + dayOffset;
          const weeks = Array.isArray(rule.week) ? rule.week : [rule.week as number];
          weeks.forEach((w) => {
            let targetDate = firstOccurrence;
            if (w > 0) {
              targetDate += (w - 1) * 7;
            } else {
              const allOccurrences = [];
              let dateIter = firstOccurrence;
              const daysInMonth = new Date(year, m + 1, 0).getDate();
              while (dateIter <= daysInMonth) {
                allOccurrences.push(dateIter);
                dateIter += 7;
              }
              if (w === -1) targetDate = allOccurrences[allOccurrences.length - 1];
            }
            const newTarget = setTimeToEventStart(new Date(year, m, targetDate), eventStart);
            if (newTarget.getMonth() === m) {
              candidates.push(newTarget);
            }
          });
        });
      } else {
        const t = setTimeToEventStart(new Date(year, m, eventStart.getDate()), eventStart);
        if (t.getMonth() === m) candidates.push(t);
      }
    });
  }
  return candidates;
};

/**
 * Expands a recurring event into multiple instances within a specific date range.
 * @param event - The recurring event to expand.
 * @param rangeStart - The start of the range to find instances for.
 * @param rangeEnd - The end of the range to find instances for.
 * @param startOfWeek - The day to start the week on.
 * @returns An array of CalendarEvent instances.
 * @group calendar-events
 * @title expandRecurringEvent
 * @description Expands a recurring event into multiple instances within a specific date range.
 */
export const expandRecurringEvent = (
  event: CalendarEvent,
  rangeStart: Date,
  rangeEnd: Date,
  startOfWeek: number,
): CalendarEvent[] => {
  const instances: CalendarEvent[] = [];
  const duration = event.end.getTime() - event.start.getTime();

  if (event.rdate && event.rdate.length > 0) {
    event.rdate.forEach((date) => {
      if (date >= rangeStart && date <= rangeEnd) {
        instances.push({
          ...event,
          id: `${event.id}_rdate_${date.getTime()}`,
          start: date,
          end: new Date(date.getTime() + duration),
          recurring: 'never',
        });
      }
    });
  }

  const rawRule = event.recurring as CalendarEventOccurance;
  if (!rawRule || event.recurring === 'never') return instances;

  const rule = {
    ...rawRule,
    month: rawRule.byMonth || rawRule.month,
    day: rawRule.byMonthDay || rawRule.day,
    weekDays: rawRule.byDay || rawRule.weekDays,
  } as CalendarEventOccurance;

  let current = new Date(event.start);
  let count = 0;

  if (current < rangeStart && !rule.count) {
    const timeDiff = rangeStart.getTime() - current.getTime();
    switch (rule.repeat) {
      case 'daily': {
        const daysToSkip = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * rule.every));
        if (daysToSkip > 0) current = addDays(current, daysToSkip * rule.every);
        break;
      }
      case 'weekly': {
        const weeksToSkip = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7 * rule.every));
        if (weeksToSkip > 0) current = addWeeks(current, weeksToSkip * rule.every);
        break;
      }
      case 'monthly': {
        const monthsToSkip =
          (rangeStart.getFullYear() - current.getFullYear()) * 12 +
          (rangeStart.getMonth() - current.getMonth());
        const skipIntervals = Math.floor(monthsToSkip / rule.every);
        if (skipIntervals > 0) current = addMonths(current, skipIntervals * rule.every);
        break;
      }
      case 'yearly': {
        const yearsToSkip = rangeStart.getFullYear() - current.getFullYear();
        const skipIntervals = Math.floor(yearsToSkip / rule.every);
        if (skipIntervals > 0) current = addYears(current, skipIntervals * rule.every);
        break;
      }
    }
  }

  while (count < (rule.count ?? MAX_OCCURRENCES)) {
    if (current > rangeEnd && !rule.count) break;

    if (rule.end && current > rule.end) break;

    let candidates: Date[] = [];
    const weekDays = rule.weekDays ? rule.weekDays.map(parseDay) : [];

    switch (rule.repeat) {
      case 'daily':
        candidates = getDailyCandidates(current, weekDays, event.start);
        break;
      case 'weekly':
        candidates = getWeeklyCandidates(current, weekDays, event.start, startOfWeek);
        break;
      case 'monthly':
        candidates = getMonthlyCandidates(
          current,
          rule,
          event.start,
          current.getFullYear(),
          current.getMonth(),
        );
        break;
      case 'yearly':
        candidates = getYearlyCandidates(current, rule, event.start, startOfWeek);
        break;
    }

    if (rule.bySetPos && rule.bySetPos.length > 0 && candidates.length > 0) {
      candidates.sort((a, b) => a.getTime() - b.getTime());
      candidates = rule.bySetPos
        .map((pos: number) => (pos > 0 ? candidates[pos - 1] : candidates[candidates.length + pos]))
        .filter(Boolean);
    }

    for (const date of candidates) {
      if (rule.count && count >= rule.count) break;
      if (rule.end && date > rule.end) break;
      count++;

      if (event.exdate?.some((ex) => isSameDay(ex, date))) continue;

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

    if (!rule.count && current > rangeEnd) break;

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
