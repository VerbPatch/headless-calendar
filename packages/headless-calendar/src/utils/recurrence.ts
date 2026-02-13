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
  // Handle RDATEs first
  const instances: CalendarEvent[] = [];
  const duration = event.end.getTime() - event.start.getTime();

  if (event.rdate && event.rdate.length > 0) {
    event.rdate.forEach((date) => {
      if (date >= rangeStart && date <= rangeEnd) {
        const instanceEnd = new Date(date.getTime() + duration);
        instances.push({
          ...event,
          id: `${event.id}_rdate_${date.getTime()}`,
          start: date,
          end: instanceEnd,
          recurring: 'never',
        });
      }
    });
  }

  const rawRule = event.recurring as CalendarEventOccurance;
  if (!rawRule || event.recurring === 'never') return instances;

  // Normalize aliases and types
  const rule = {
    ...rawRule,
    month: rawRule.byMonth || rawRule.month,
    day: rawRule.byMonthDay || rawRule.day,
    weekDays: rawRule.byDay || rawRule.weekDays,
    byYearDay: rawRule.byYearDay,
    byWeekNo: rawRule.byWeekNo,
    bySetPos: rawRule.bySetPos,
  };

  let current = new Date(event.start);
  let count = 0;
  const MAX_OCCURRENCES = 3650; // Safety limit (e.g. 10 years of daily events)

  if (current > rangeEnd && !rule.count) return instances;

  while (count < (rule.count ?? MAX_OCCURRENCES)) {
    if (!rule.count && current > rangeEnd) break;

    let candidates: Date[] = [];
    // Normalize weekDays to numbers
    const weekDays = rule.weekDays ? rule.weekDays.map(parseDay) : [];

    if (rule.repeat === 'daily') {
      if (weekDays.length === 0 || weekDays.includes(current.getDay())) {
        const target = new Date(current);
        target.setHours(
          event.start.getHours(),
          event.start.getMinutes(),
          event.start.getSeconds(),
          event.start.getMilliseconds(),
        );
        candidates.push(target);
      }
    } else if (rule.repeat === 'weekly') {
      if (weekDays.length > 0) {
        const d = new Date(current);
        const day = d.getDay();
        const diff = d.getDate() - day; // Align to Sunday
        const sunday = new Date(d.setDate(diff));

        weekDays.forEach((wd) => {
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
        let days: number[] = [];
        if (Array.isArray(rule.day)) {
          days = rule.day;
        } else {
          days = [rule.day];
        }

        days.forEach((dVal) => {
          let d = dVal;
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
        });
      } else if (rule.weekDays && rule.weekDays.length > 0) {
        // rule.weekDays is already normalized above, but we need raw rules for "Nth" logic
        const rawRules: (string | number)[] = rule.weekDays;

        const processedRules = rawRules.map((r) => {
          const parsed = parseByDay(r);
          if (parsed.nth === 0 && rule.week) {
            parsed.nth = rule.week;
          }
          return parsed;
        });

        processedRules.forEach(({ nth, day }) => {
          const firstDayOfMonth = new Date(y, m, 1);
          let dayOffset = day - firstDayOfMonth.getDay();
          if (dayOffset < 0) dayOffset += 7;
          const firstOccurrence = firstDayOfMonth.getDate() + dayOffset;

          if (nth !== 0) {
            // Nth occurrence
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
                targetDate = -1; // Invalid, skips
              }
            }

            if (targetDate > 0) {
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
            }
          } else {
            // Every occurrence of this day in the month
            let dateIter = firstOccurrence;
            const daysInMonth = new Date(y, m + 1, 0).getDate();
            while (dateIter <= daysInMonth) {
              const target = new Date(
                y,
                m,
                dateIter,
                event.start.getHours(),
                event.start.getMinutes(),
                event.start.getSeconds(),
                event.start.getMilliseconds(),
              );
              if (target.getMonth() === m) {
                candidates.push(target);
              }
              dateIter += 7;
            }
          }
        });
      } else {
        candidates.push(new Date(current));
      }
    } else if (rule.repeat === 'yearly') {
      const year = current.getFullYear();

      if (rule.byYearDay) {
        rule.byYearDay.forEach((d) => {
          const target = new Date(
            year,
            0,
            1,
            event.start.getHours(),
            event.start.getMinutes(),
            event.start.getSeconds(),
            event.start.getMilliseconds(),
          );
          if (d > 0) {
            target.setDate(d);
          } else {
            // Negative: d=-1 is Dec 31
            // Simple logic:
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
        // Basic ISO week support (simplified)
        const week1Start = getStartOfWeek(new Date(year, 0, 4), startOfWeek || 1); // ISO approximation (Jan 4 is always in week 1)

        rule.byWeekNo.forEach((wn) => {
          let targetWeekStart = new Date(week1Start);
          if (wn > 0) {
            targetWeekStart = addWeeks(targetWeekStart, wn - 1);
          } else {
            // Negative week number logic (from end of year)
            // Skip for now or implement if easy.
            return;
          }

          // In this week, find days.
          // If byDay/weekDays is present, use them. Else use event.start.getDay().
          const daysToFind =
            rule.weekDays && rule.weekDays.length > 0
              ? rule.weekDays.map(parseDay)
              : [event.start.getDay()];

          daysToFind.forEach((wd) => {
            const target = getStartOfWeek(targetWeekStart, startOfWeek);
            // target is start of week. Find 'wd' in this week.
            //const diff = wd - target.getDay();
            // let finalDiff = diff;
            // if (diff < 0) finalDiff += 7;
            const offset = (wd - startOfWeek + 7) % 7;
            target.setDate(target.getDate() + offset);

            target.setHours(
              event.start.getHours(),
              event.start.getMinutes(),
              event.start.getSeconds(),
              event.start.getMilliseconds(),
            );

            if (target.getFullYear() === year) {
              candidates.push(target);
            }
          });
        });
      } else {
        // ... existing yearly logic ...
        let months: number[] = [];
        if (rule.month !== undefined) {
          months = Array.isArray(rule.month) ? rule.month : [rule.month as number];
        } else {
          months = [event.start.getMonth()];
        }

        months.forEach((m) => {
          const target = new Date(
            year,
            m,
            1,
            event.start.getHours(),
            event.start.getMinutes(),
            event.start.getSeconds(),
            event.start.getMilliseconds(),
          );

          if (rule.day) {
            const days = Array.isArray(rule.day) ? rule.day : [rule.day as number];
            days.forEach((d) => {
              const t = new Date(target);
              t.setDate(d);
              if (t.getMonth() === m) candidates.push(t);
            });
          } else if (rule.week && weekDays.length > 0) {
            weekDays.forEach((wd) => {
              const firstDayOfMonth = new Date(year, m, 1);
              let dayOffset = wd - firstDayOfMonth.getDay();
              if (dayOffset < 0) dayOffset += 7;
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

                const newTarget = new Date(target);
                newTarget.setDate(targetDate);

                if (newTarget.getMonth() === m) {
                  candidates.push(newTarget);
                }
              });
            });
          } else {
            const t = new Date(target);
            t.setDate(event.start.getDate());
            if (t.getMonth() === m) candidates.push(t);
          }
        });
      }
    }

    // Apply BYSETPOS
    if (rule.bySetPos && rule.bySetPos.length > 0 && candidates.length > 0) {
      candidates.sort((a, b) => a.getTime() - b.getTime());
      const filtered: Date[] = [];
      rule.bySetPos.forEach((pos) => {
        if (pos > 0) {
          if (pos <= candidates.length) filtered.push(candidates[pos - 1]);
        } else if (pos < 0) {
          const idx = candidates.length + pos;
          if (idx >= 0) filtered.push(candidates[idx]);
        }
      });
      candidates = filtered;
    }

    for (const date of candidates) {
      if (rule.count && count >= rule.count) break;
      if (rule.end && date > rule.end) break;

      count++;

      // check EXDATE
      if (event.exdate && event.exdate.some((ex) => isSameDay(ex, date))) {
        continue;
      }

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
