import { MonthData, WeekData, DayData, YearData, UseViewsDataOptions } from '../types/views';
import { isSameDay, isSameWeek, isSameMonth, isSameYear } from '../utils/date';
import { formatLocalizedMonth, formatLocalizedDate } from '../utils/timezone';
import { getMonthCalendarDates } from '../utils/calendar';
import { createMemo } from '../state';

export const useViewsData = (options: UseViewsDataOptions) => {
  const {
    calendarId,
    currentDate,
    view,
    customViewOptions,
    visibleDates,
    startOfWeek,
    locale,
    timezone,
  } = options;

  const yearData: YearData | null = createMemo(
    (): YearData | null => {
      if (view !== 'year') return null;

      const months: MonthData[] = [];

      for (let month = 0; month < 12; month++) {
        const monthFirstDay = new Date(currentDate.getFullYear(), month, 1);
        const dates = getMonthCalendarDates(monthFirstDay, startOfWeek);

        const weeks: Date[][] = [];

        for (let i = 0; i < dates.length; i += 7) {
          weeks.push(dates.slice(i, i + 7));
        }

        months.push({
          weeks,
          monthName: formatLocalizedMonth(monthFirstDay, locale, timezone),
          isCurrentMonth: (date: Date) => isSameMonth(date, monthFirstDay),
          isToday: (date: Date) => isSameDay(date, new Date()),
        });
      }
      return {
        months,
        isCurrentYear: (date: Date) => isSameYear(date, currentDate),
        year: formatLocalizedDate(currentDate, locale, timezone, {
          year: 'numeric',
        }),
      };
    },
    [currentDate, view, startOfWeek, locale, timezone],
    `${calendarId}-year-data`,
  );

  const monthData: MonthData | null = createMemo(
    (): MonthData | null => {
      if (view !== 'month' && (view !== 'custom' || customViewOptions.type !== 'month'))
        return null;

      const dates = visibleDates;
      const weeks: Date[][] = [];
      let currentWeek: Date[] = [];

      dates.forEach((date) => {
        if (currentWeek.length > 0) {
          const prevDate = currentWeek[currentWeek.length - 1];
          if (!isSameWeek(prevDate, date, startOfWeek)) {
            weeks.push(currentWeek);
            currentWeek = [];
          }
        }
        currentWeek.push(date);
      });

      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }

      const response = {
        weeks,
        monthName:
          customViewOptions && customViewOptions.count > 1 && customViewOptions.type === 'month'
            ? `${formatLocalizedMonth(dates[0], locale, timezone)} - ${formatLocalizedMonth(dates[dates.length - 1], locale, timezone)}`
            : formatLocalizedMonth(currentDate, locale, timezone),
        isCurrentMonth: (date: Date) => isSameMonth(date, currentDate),
        isToday: (date: Date) => isSameDay(date, new Date()),
      };

      return response;
    },
    [currentDate, view, visibleDates, startOfWeek, locale, timezone, customViewOptions],
    `${calendarId}-month-data`,
  );

  const weekData: WeekData | null = createMemo(
    (): WeekData | null => {
      if (view !== 'week' && (view !== 'custom' || customViewOptions.type !== 'week')) return null;

      const dates = visibleDates;

      return {
        dates: dates,
        weekRange:
          dates.length > 0
            ? `${formatLocalizedDate(dates[0], locale, timezone)} - ${formatLocalizedDate(dates[dates.length - 1], locale, timezone)}`
            : '',
        isToday: (date: Date) => isSameDay(date, new Date()),
      };
    },
    [currentDate, view, visibleDates, startOfWeek, locale, timezone, customViewOptions],
    `${calendarId}-week-data`,
  );

  const dayData: DayData | null = createMemo(
    (): DayData | null => {
      if (view !== 'day' && (view !== 'custom' || customViewOptions.type !== 'day')) return null;

      return {
        dates: visibleDates,
        dayName:
          visibleDates.length > 1
            ? `${formatLocalizedDate(visibleDates[0], locale, timezone)} - ${formatLocalizedDate(visibleDates[visibleDates.length - 1], locale, timezone)}`
            : formatLocalizedDate(currentDate, locale, timezone, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
        isToday: isSameDay(currentDate, new Date()),
      };
    },
    [currentDate, view, visibleDates, locale, timezone, customViewOptions],
    `${calendarId}-day-data`,
  );

  return { yearData, monthData, weekData, dayData };
};
