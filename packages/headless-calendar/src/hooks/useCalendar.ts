import { CalendarOptions, CalendarInstance, TimeSlot } from '../types/calendar';
import { CalendarEvent } from '../types/events';
import { useEvents } from './useEvents';
import { useNavigation } from './useNavigation';
import { useDragDrop } from './useDragDrop';
import { useViewsData } from './useViewsData';
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
  formatDateTime,
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
import { exportToICS as exportEventsToICS } from '../utils/ics';
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
  const normalizedDefaultDate = options.defaultDate
    ? new Date(
        options.defaultDate.getFullYear(),
        options.defaultDate.getMonth(),
        options.defaultDate.getDate(),
        0,
        0,
        0,
      )
    : new Date(new Date().setHours(0, 0, 0, 0));

  const {
    calendarId = 'default-calendar',
    defaultView = 'month',
    defaultDate = normalizedDefaultDate,
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
    calendarId,
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
    calendarId,
    calendarTimezone: timezone,
    onEvent,
    onEventCreate,
    onEventUpdate,
    onEventDelete,
    initialEvents,
  });

  // Use drag & drop hook
  const dragDrop = useDragDrop({
    calendarId,
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
    `${calendarId}-time-slots`,
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
    `${calendarId}-visible-dates`,
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
      const events = getEventsForDateRange(
        eventsManager.events,
        bounds.start,
        bounds.end,
        startOfWeek,
      );

      const filteredEvents = events.filter((event) => {
        if (
          navigation.view !== 'custom' ||
          !navigation.customViewOptions.includeSpecificDays?.length
        ) {
          return true;
        }

        const eventStart = new Date(event.start).getTime();
        const eventEnd = new Date(event.end).getTime();

        return visibleDates.some((date) => {
          const dStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
          const dEnd = dStart + 86399999; // + 23:59:59.999 in milliseconds
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
    `${calendarId}-visible-events`,
  );

  /**
   * A memoized map of visible events grouped by their date string key for O(1) lookups.
   * @type {Map<string, CalendarEvent[]>}
   */
  const visibleEventsByDate = createMemo(
    (): Map<string, CalendarEvent[]> => {
      const map = new Map<string, CalendarEvent[]>();
      for (const date of visibleDates) {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const endOfDay = startOfDay + 86399999; // + 23:59:59.999 in milliseconds

        const eventsForThisDay = visibleEvents.filter(
          (event) => event.start.getTime() <= endOfDay && event.end.getTime() >= startOfDay,
        );

        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        map.set(key, eventsForThisDay);
      }
      return map;
    },
    [visibleDates, visibleEvents],
    `${calendarId}-visible-events-by-date`,
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
    return getEventsForDateRange(eventsManager.events, startDate, endDate, startOfWeek);
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
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (visibleEventsByDate.has(key)) {
      return visibleEventsByDate.get(key)!;
    }
    return getEventsForDate(eventsManager.events, date, startOfWeek);
  };

  const { yearData, monthData, weekData, dayData } = useViewsData({
    calendarId,
    currentDate: navigation.currentDate,
    view: navigation.view,
    customViewOptions: navigation.customViewOptions,
    visibleDates,
    startOfWeek,
    locale,
    timezone,
  });

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

    // ICS
    importFromICS: eventsManager.importFromICS,
    exportToICS: (prodId?: string) => exportEventsToICS(eventsManager.events, prodId),
    downloadICS: (filename: string = 'calendar.ics', prodId?: string) => {
      const icsData = exportEventsToICS(eventsManager.events, prodId);
      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    },

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
        formatDate(date, format ?? 'yyyy-MM-dd', locale, timezone),
      /**
       * Formats a date and time object into a string based on the specified format.
       * @param {Date} date - The date object to format.
       * @param {string} [format="yyyy-MM-dd HH:mm:ss"] - The format string.
       * @returns {string} - The formatted date and time string.
       * @title Format Date and Time
       * @description Formats a date and time object into a string.
       */
      formatDateTime: (date: Date, format?: string): string =>
        formatDateTime(date, format ?? 'yyyy-MM-dd HH:mm:ss', locale, timezone),
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
