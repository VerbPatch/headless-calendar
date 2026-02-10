import { CalendarOptions, CalendarInstance, TimeSlot } from '../types/calendar';
import { MonthData, WeekData, DayData, YearData } from '../types/views';
import { CalendarEvent } from '../types/events';
import { useEvents } from './useEvents';
import { useNavigation } from './useNavigation';
import { useDragDrop } from './useDragDrop';
import {
  getTimeSlots,
  getWeekDates,
  getMonthCalendarDates,
  getCalendarBounds,
  getYearCalendarDays,
  validateCustomView,
} from '../utils/calendar';
import { getEventsForDate, getEventsForDateRange } from '../utils/events';
import {
  parseDate,
  isSameDay,
  isSameWeek,
  isSameMonth,
  addDays,
  addWeeks,
  addMonths,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  dateTimeInBetween,
  formatDate,
  isSameYear,
} from '../utils/date';
import {
  DEFAULT_START_HOUR,
  DEFAULT_END_HOUR,
  DEFAULT_TIME_SLOT_INTERVAL,
} from '../constants/time';
import { DEFAULT_START_OF_WEEK } from '../constants/calendar';
import {
  formatDateInTimeZone,
  convertToTimeZone,
  formatLocalizedMonth,
  formatLocalizedDate,
  formatLocalizedWeekday,
  formatLocalizedTime,
  daysofWeek,
} from '../utils/timezone';
import { formatDateTime } from '../utils/date';
import { createMemo } from '../state';

/**
 * The main hook for initializing and managing a calendar instance.
 * @param {CalendarOptions} options - Configuration options for the calendar.
 * @returns {CalendarInstance} - An object containing the calendar's state, navigation functions, event management functions, and other utilities.
 * @see {@link CalendarOptions}
 * @see {@link CalendarInstance}
 * @example
 * ```typescript
 * import { useCalendar } from '@verbpatch/headless-calendar';
 *
 * const MyCalendar = () => {
 *   const calendar = useCalendar({
 *     defaultView: 'week',
 *     // other options...
 *   });
 *
 *   return (
 *     <div>
 *       <h1>{calendar.utils.formatLocalizedMonth(calendar.currentDate)}</h1>
 *     </div>
 *   );
 * };
 * ```
 *
 * @group hooks
 * @title useCalendar
 * @description The main hook for initializing and managing a calendar instance.
 */
export const useCalendar = (options: CalendarOptions = {}): CalendarInstance => {
  let d = new Date();
  if (options.defaultDate)
    d = new Date(
      options.defaultDate.getFullYear(),
      options.defaultDate.getMonth(),
      options.defaultDate.getHours(),
      0,
      0,
      0,
    );
  const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0);

  const {
    defaultView = 'month',
    defaultDate = utcDate,
    startOfWeek = DEFAULT_START_OF_WEEK,
    timeSlotInterval = DEFAULT_TIME_SLOT_INTERVAL,
    startHour = DEFAULT_START_HOUR,
    endHour = DEFAULT_END_HOUR,
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale = Intl.DateTimeFormat().resolvedOptions().locale,
    initialEvents,
    onEvent,
    onEventCreate,
    onEventUpdate,
    onEventDelete,
    onViewChange,
    onDateChange,
    customViewOptions = { type: 'day', count: 1 },
  } = options;

  // Use navigation hook
  const navigation = useNavigation({
    defaultView,
    defaultDate,
    onViewChange,
    onDateChange,
    timezone,
    locale,
    customViewOptions,
  });

  // Use events hook
  const eventsManager = useEvents({
    calendarTimezone: timezone,
    onEvent,
    onEventCreate,
    onEventUpdate,
    onEventDelete,
    initialEvents,
  });

  // Use drag & drop hook
  const dragDrop = useDragDrop({
    onEventMove: eventsManager.moveEvent,
  });

  /**
   * A memoized array of time slots for the day view, generated based on the `startHour`, `endHour`, and `timeSlotInterval` options.
   * @type {TimeSlot[]}
   * @see {@link TimeSlot}
   * @title Time Slots
   * @description A memoized array of time slots for the day view.
   */
  const timeSlots: TimeSlot[] = createMemo(
    (): TimeSlot[] => {
      return getTimeSlots(startHour, endHour, timeSlotInterval);
    },
    [startHour, endHour, timeSlotInterval],
    'time-slots',
  );

  /**
   * A memoized array of dates currently visible in the calendar, depending on the current view.
   * @type {Date[]}
   * @title Visible Dates
   * @description A memoized array of dates currently visible in the calendar.
   */
  const visibleDates: Date[] = createMemo(
    (): Date[] => {
      let dates: Date[] = [];
      const currentCustomOptions = navigation.customViewOptions;
      switch (navigation.view) {
        case 'day':
          dates = [navigation.currentDate];
          break;
        case 'week':
          dates = getWeekDates(navigation.currentDate, startOfWeek);
          break;
        case 'month':
          dates = getMonthCalendarDates(navigation.currentDate, startOfWeek);
          break;
        case 'year':
          dates = getYearCalendarDays(navigation.currentDate, startOfWeek);
          break;
        case 'custom': {
          validateCustomView(currentCustomOptions);

          let current = navigation.currentDate;
          for (let i = 0; i < currentCustomOptions.count; i++) {
            switch (currentCustomOptions.type) {
              case 'day':
                dates.push(current);
                current = addDays(current, 1);
                break;
              case 'week': {
                const weekStart = addWeeks(navigation.currentDate, i);
                const weekDates = getWeekDates(weekStart, startOfWeek);
                dates.push(...weekDates);
                break;
              }
              case 'month': {
                const monthStart = addMonths(navigation.currentDate, i);
                const monthDates = getMonthCalendarDates(monthStart, startOfWeek);
                dates.push(...monthDates);
                break;
              }
            }
          }

          if (
            currentCustomOptions.includeSpecificDays?.length &&
            ['week', 'month'].includes(currentCustomOptions.type)
          ) {
            dates = dates.filter((date) =>
              currentCustomOptions.includeSpecificDays!.includes(date.getDay()),
            );
          }

          break;
        }
      }

      return dates;
    },
    [navigation.currentDate, navigation.view, startOfWeek, navigation.customViewOptions],
    'visible-dates',
  );

  /**
   * A memoized array of calendar events that are visible within the current date range of the calendar.
   * @type {CalendarEvent[]}
   * @see {@link CalendarEvent}
   * @title Visible Events
   * @description A memoized array of calendar events that are visible within the current date range.
   */
  const visibleEvents: CalendarEvent[] = createMemo(
    (): CalendarEvent[] => {
      if (visibleDates.length === 0) return [];

      const bounds = getCalendarBounds(
        navigation.view,
        navigation.currentDate,
        startOfWeek,
        navigation.customViewOptions,
      );
      const events = getEventsForDateRange(eventsManager.events, bounds.start, bounds.end);

      const filteredEvents = events.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return visibleDates.some((date) => {
          const dStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
          const dEnd = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            23,
            59,
            59,
            999,
          );
          return eventStart <= dEnd && eventEnd >= dStart;
        });
      });

      return filteredEvents.map((event) => ({
        ...event,
        start: convertToTimeZone(new Date(event.start), timezone, event.timezone ?? timezone),
        end: convertToTimeZone(new Date(event.end), timezone, event.timezone ?? timezone),
      }));
    },
    [
      eventsManager.events,
      visibleDates,
      navigation.view,
      navigation.currentDate,
      startOfWeek,
      timezone,
      navigation.customViewOptions,
    ],
    'visible-events',
  );

  /**
   * Retrieves events within a specified date range.
   * @param {Date} startDate - The start date of the range.
   * @param {Date} endDate - The end date of the range.
   * @returns {CalendarEvent[]} - An array of events within the specified range.
   * @see {@link CalendarEvent}
   * @title Get Events For Specific Date Range
   * @description Retrieves events within a specified date range.
   */
  const getEventsForSpecificDateRange = (startDate: Date, endDate: Date): CalendarEvent[] => {
    return getEventsForDateRange(eventsManager.events, startDate, endDate);
  };

  /**
   * Retrieves events for a specific date.
   * @param {Date} date - The date to retrieve events for.
   * @returns {CalendarEvent[]} - An array of events on the specified date.
   * @see {@link CalendarEvent}
   * @title Get Events For Specific Date
   * @description Retrieves events for a specific date.
   */
  const getEventsForSpecificDate = (date: Date): CalendarEvent[] => {
    return getEventsForDate(eventsManager.events, date);
  };

  /**
   * A memoized object providing data specific to the year view, such as months, weeks, month name, and utility functions.
   * @type {YearData | null}
   * @see {@link YearData}
   * @title Year Data
   * @description A memoized object providing data specific to the year view.
   */
  const yearData: YearData | null = createMemo(
    (): YearData | null => {
      if (navigation.view !== 'year') return null;

      const months: MonthData[] = [];

      for (let month = 0; month < 12; month++) {
        const monthFirstDay = new Date(navigation.currentDate.getFullYear(), month, 1);
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
        isCurrentYear: (date: Date) => isSameYear(date, navigation.currentDate),
        year: formatLocalizedDate(navigation.currentDate, locale, timezone, {
          year: 'numeric',
        }),
      };
    },
    [navigation.currentDate, navigation.view, startOfWeek, locale, timezone],
    'year-data',
  );

  /**
   * A memoized object providing data specific to the month view, such as weeks, month name, and utility functions.
   * @type {MonthData | null}
   * @see {@link MonthData}
   * @title Month Data
   * @description A memoized object providing data specific to the month view.
   */
  const monthData: MonthData | null = createMemo(
    (): MonthData | null => {
      const currentCustomOptions = navigation.customViewOptions;
      if (
        navigation.view !== 'month' &&
        (navigation.view !== 'custom' || currentCustomOptions.type !== 'month')
      )
        return null;

      // Use visibleDates which already handles the custom view logic
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
          currentCustomOptions &&
          currentCustomOptions.count > 1 &&
          currentCustomOptions.type === 'month'
            ? `${formatLocalizedMonth(dates[0], locale, timezone)} - ${formatLocalizedMonth(dates[dates.length - 1], locale, timezone)}`
            : formatLocalizedMonth(navigation.currentDate, locale, timezone),
        isCurrentMonth: (date: Date) => isSameMonth(date, navigation.currentDate),
        isToday: (date: Date) => isSameDay(date, new Date()),
      };

      return response;
    },
    [
      navigation.currentDate,
      navigation.view,
      visibleDates,
      startOfWeek,
      locale,
      timezone,
      navigation.customViewOptions,
    ],
    'month-data',
  );

  /**
   * A memoized object providing data specific to the week view, such as the dates in the week and the week's date range.
   * @type {WeekData | null}
   * @see {@link WeekData}
   * @title Week Data
   * @description A memoized object providing data specific to the week view.
   */
  const weekData: WeekData | null = createMemo(
    (): WeekData | null => {
      const currentCustomOptions = navigation.customViewOptions;
      if (
        navigation.view !== 'week' &&
        (navigation.view !== 'custom' || currentCustomOptions.type !== 'week')
      )
        return null;

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
    [
      navigation.currentDate,
      navigation.view,
      visibleDates,
      startOfWeek,
      locale,
      timezone,
      navigation.customViewOptions,
    ],
    'week-data',
  );

  /**
   * A memoized object providing data specific to the day view, such as the current date and its localized name.
   * @type {DayData | null}
   * @see {@link DayData}
   * @title Day Data
   * @description A memoized object providing data specific to the day view.
   */
  const dayData: DayData | null = createMemo(
    (): DayData | null => {
      const currentCustomOptions = navigation.customViewOptions;
      if (
        navigation.view !== 'day' &&
        (navigation.view !== 'custom' || currentCustomOptions.type !== 'day')
      )
        return null;

      return {
        dates: visibleDates,
        dayName:
          visibleDates.length > 1
            ? `${formatLocalizedDate(visibleDates[0], locale, timezone)} - ${formatLocalizedDate(visibleDates[visibleDates.length - 1], locale, timezone)}`
            : formatLocalizedDate(navigation.currentDate, locale, timezone, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
        isToday: isSameDay(navigation.currentDate, new Date()),
      };
    },
    [
      navigation.currentDate,
      navigation.view,
      visibleDates,
      locale,
      timezone,
      navigation.customViewOptions,
    ],
    'day-data',
  );

  // Modify the utils section to include new localization helpers
  return {
    currentDate: navigation.currentDate,
    view: navigation.view,
    customViewOptions: navigation.customViewOptions,
    events: eventsManager.events,
    draggedEvent: dragDrop.draggedEvent,
    timezone: options.timezone,
    locale: options.locale,
    timeSlotInterval: options.timeSlotInterval,

    // Navigation
    goToNext: navigation.goToNext,
    goToPrevious: navigation.goToPrevious,
    goToToday: navigation.goToToday,
    goToDate: navigation.goToDate,
    changeView: navigation.changeView,

    // Event management
    getEvent: eventsManager.getEvent,
    setEvents: eventsManager.setEvents,
    createEvent: eventsManager.createEvent,
    updateEvent: eventsManager.updateEvent,
    deleteEvent: eventsManager.deleteEvent,
    moveEvent: eventsManager.moveEvent,
    clearAllEvents: eventsManager.clearEvents,
    duplicateEvent: eventsManager.duplicateEvent,

    // Drag and drop
    startDrag: dragDrop.startDrag,
    endDrag: dragDrop.endDrag,
    handleDrop: dragDrop.handleDrop,

    // Data getters
    getEventsForDateRange: getEventsForSpecificDateRange,
    getEventsForDate: getEventsForSpecificDate,

    // Computed values
    visibleDates,
    visibleEvents,
    timeSlots,

    // View-specific data
    yearData,
    monthData,
    weekData,
    dayData,

    /**
     * A collection of utility functions for date manipulation and formatting, bound to the calendar's locale and timezone.
     * @title Calendar Utilities
     * @description A collection of utility functions for date manipulation and formatting.
     */
    utils: {
      /**
       * Formats a date object into a string based on the specified format.
       * @param {Date} date - The date object to format.
       * @param {string} [format="yyyy-MM-dd"] - The format string.
       * @returns {string} - The formatted date string.
       * @title Format Date
       * @description Formats a date object into a string.
       */
      formatDate: (date: Date, format?: string): string =>
        formatDate(date, { format: format ?? 'yyyy-MM-dd', locale, timeZone: timezone }),
      /**
       * Formats a date and time object into a string based on the specified format.
       * @param {Date} date - The date object to format.
       * @param {string} [format="yyyy-MM-dd HH:mm:ss"] - The format string.
       * @returns {string} - The formatted date and time string.
       * @title Format Date and Time
       * @description Formats a date and time object into a string.
       */
      formatDateTime: (date: Date, format?: string): string =>
        formatDateTime(date, {
          format: format ?? 'yyyy-MM-dd HH:mm:ss',
          locale,
          timeZone: timezone,
        }),
      parseDate,
      isSameDay,
      isSameWeek: (d1: Date, d2: Date) => isSameWeek(d1, d2, startOfWeek),
      isSameMonth,
      addDays,
      addWeeks,
      addMonths,
      getStartOfWeek,
      getEndOfWeek,
      getStartOfMonth,
      getEndOfMonth,
      dateTimeInBetween,
      /**
       * Returns an array of localized day names for the week.
       * @param {'long' | 'short' | 'narrow'} [format='short'] - The format of the weekday names.
       * @returns {string[]} - An array of localized weekday names.
       * @title Days of Week
       * @description Returns an array of localized day names for the week.
       */
      daysofWeek: (format: 'long' | 'short' | 'narrow' = 'short'): string[] =>
        daysofWeek(startOfWeek, format, locale),
      /**
       * Formats a date into a string according to the specified locale and timezone.
       * @param {Date} date - The date to format.
       * @param {string} [l=locale] - The locale to use.
       * @param {string} [tz=timezone] - The timezone to use.
       * @param {Intl.DateTimeFormatOptions} [options] - Additional formatting options.
       * @returns {string} - The formatted date string.
       * @title Format Date In Time Zone
       * @description Formats a date into a string according to the specified locale and timezone.
       */
      formatDateInTimeZone: (
        date: Date,
        l: string = locale,
        tz: string = timezone,
        options?: Intl.DateTimeFormatOptions,
      ): string => formatDateInTimeZone(date, l, tz, options),
      /**
       * Converts a date from one timezone to another.
       * @param {Date} date - The date to convert.
       * @param {string} [fromTz=timezone] - The original timezone.
       * @param {string} toTz - The target timezone.
       * @returns {Date} - The converted date object.
       * @title Convert To Time Zone
       * @description Converts a date from one timezone to another.
       */
      convertToTimeZone: (date: Date, fromTz: string = timezone, toTz: string): Date =>
        convertToTimeZone(date, fromTz, toTz),
      /**
       * Formats a date into a localized date string.
       * @param {Date} date - The date to format.
       * @param {string} [l=locale] - The locale to use.
       * @param {string} [tz=timezone] - The timezone to use.
       * @param {Intl.DateTimeFormatOptions} [options] - Additional formatting options.
       * @returns {string} - The localized date string.
       * @title Format Localized Date
       * @description Formats a date into a localized date string.
       */
      formatLocalizedDate: (
        date: Date,
        l: string = locale,
        tz: string = timezone,
        options?: Intl.DateTimeFormatOptions,
      ): string => formatLocalizedDate(date, l, tz, options),
      /**
       * Formats a date into a localized month string.
       * @param {Date} date - The date to format.
       * @param {string} [l=locale] - The locale to use.
       * @param {string} [tz=timezone] - The timezone to use.
       * @returns {string} - The localized month string.
       * @title Format Localized Month
       * @description Formats a date into a localized month string.
       */
      formatLocalizedMonth: (date: Date, l: string = locale, tz: string = timezone): string =>
        formatLocalizedMonth(date, l, tz),
      /**
       * Formats a date into a localized weekday string.
       * @param {Date} date - The date to format.
       * @param {string} [l=locale] - The locale to use.
       * @param {string} [tz=timezone] - The timezone to use.
       * @param {'long' | 'short' | 'narrow'} [format] - The format of the weekday.
       * @returns {string} - The localized weekday string.
       * @title Format Localized Weekday
       * @description Formats a date into a localized weekday string.
       */
      formatLocalizedWeekday: (
        date: Date,
        l: string = locale,
        tz: string = timezone,
        format?: 'long' | 'short' | 'narrow',
      ): string => formatLocalizedWeekday(date, l, tz, format),
      /**
       * Formats a date into a localized time string.
       * @param {Date} date - The date to format.
       * @param {string} [l=locale] - The locale to use.
       * @param {string} [tz=timezone] - The timezone to use.
       * @param {boolean} [hour12] - Whether to use 12-hour format.
       * @returns {string} - The localized time string.
       * @title Format Localized Time
       * @description Formats a date into a localized time string.
       */
      formatLocalizedTime: (
        date: Date,
        l: string = locale,
        tz: string = timezone,
        hour12?: boolean,
      ): string => formatLocalizedTime(date, l, tz, hour12),
    },
  };
};
