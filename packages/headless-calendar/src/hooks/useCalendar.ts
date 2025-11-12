import { CalendarOptions, CalendarInstance, TimeSlot } from '../types/calendar';
import { MonthData, WeekData, DayData } from '../types/views';
import { CalendarEvent } from '../types/events';
import { useEvents } from './useEvents';
import { useNavigation } from './useNavigation';
import { useDragDrop } from './useDragDrop';
import {
  getTimeSlots,
  getWeekDates,
  getMonthCalendarDates,
  getCalendarBounds
} from '../utils/calendar';
import {
  getEventsForDate,
  getEventsForDateRange
} from '../utils/events';
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
  formatDate
} from '../utils/date';
import {
  DEFAULT_START_HOUR,
  DEFAULT_END_HOUR,
  DEFAULT_TIME_SLOT_INTERVAL
} from '../constants/time';
import { DEFAULT_START_OF_WEEK } from '../constants/calendar';
import { formatDateInTimeZone, convertToTimeZone, formatLocalizedMonth, formatLocalizedDate, formatLocalizedWeekday, formatLocalizedTime, daysofWeek } from '../utils/timezone';
import { formatDateTime } from '../utils/date';
import { createMemo } from '../state';


export const useCalendar = (options: CalendarOptions = {}): CalendarInstance => {
  let d = new Date();
  if (options.defaultDate)
    d = new Date(options.defaultDate.getFullYear(), options.defaultDate.getMonth(), options.defaultDate.getHours(), 0, 0, 0);
  const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0);

  const {
    defaultView = 'month',
    defaultDate = utcDate,
    startOfWeek = DEFAULT_START_OF_WEEK,
    timeSlotInterval = DEFAULT_TIME_SLOT_INTERVAL,
    startHour = DEFAULT_START_HOUR,
    endHour = DEFAULT_END_HOUR,
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale = navigator.language,
    initialEvents,
    onEvent,
    onEventCreate,
    onEventUpdate,
    onEventDelete,
    onViewChange,
    onDateChange,
  } = options;

  // Use navigation hook
  const navigation = useNavigation({
    defaultView,
    defaultDate,
    onViewChange,
    onDateChange,
    timezone,
    locale
  });

  // Use events hook
  const eventsManager = useEvents({
    calendarTimezone: timezone,
    onEvent,
    onEventCreate,
    onEventUpdate,
    onEventDelete,
    initialEvents
  });

  // Use drag & drop hook
  const dragDrop = useDragDrop({
    onEventMove: eventsManager.moveEvent
  });

  // Computed values
  const timeSlots = createMemo((): TimeSlot[] => {
    return getTimeSlots(startHour, endHour, timeSlotInterval)
  },
    [startHour, endHour, timeSlotInterval],
    'time-slots');

  const visibleDates = createMemo((): Date[] => {
    switch (navigation.view) {
      case 'day':
        return [navigation.currentDate];
      case 'week':
        return getWeekDates(navigation.currentDate, startOfWeek);
      case 'month':
        return getMonthCalendarDates(navigation.currentDate, startOfWeek);
      default:
        return [];
    }
  },
    [navigation.currentDate, navigation.view, startOfWeek],
    'visible-dates');

  const visibleEvents = createMemo((): CalendarEvent[] => {
    if (visibleDates.length === 0) return [];

    const bounds = getCalendarBounds(navigation.view, navigation.currentDate, startOfWeek);
    const events = getEventsForDateRange(eventsManager.events, bounds.start, bounds.end);

    return events.map(event => ({
      ...event,
      start: convertToTimeZone(new Date(event.start), timezone, event.timezone ?? timezone),
      end: convertToTimeZone(new Date(event.end), timezone, event.timezone ?? timezone)
    }));
  },
    [eventsManager.events, visibleDates, navigation.view, navigation.currentDate, startOfWeek, timezone],
    'visible-events');

  const _getEventsForDateRange = (startDate: Date, endDate: Date): CalendarEvent[] => {
    return getEventsForDateRange(eventsManager.events, startDate, endDate);
  };

  const getEventsForSpecificDate = (date: Date): CalendarEvent[] => {
    return getEventsForDate(eventsManager.events, date);
  };

  // View-specific data
  const monthData = createMemo((): MonthData | null => {
    if (navigation.view !== 'month') return null;

    const dates = getMonthCalendarDates(navigation.currentDate, startOfWeek);

    const weeks: Date[][] = [];

    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }

    const response = {
      weeks,
      monthName: formatLocalizedMonth(navigation.currentDate, locale, timezone),
      isCurrentMonth: (date: Date) => isSameMonth(date, navigation.currentDate),
      isToday: (date: Date) => isSameDay(date, new Date())
    };

    return response;

  },
    [navigation.currentDate, navigation.view, startOfWeek, locale, timezone],
    'month-data');

  const weekData = createMemo((): WeekData | null => {
    if (navigation.view !== 'week') return null;

    const weekDates = getWeekDates(navigation.currentDate, startOfWeek);

    return {
      dates: weekDates,
      weekRange: `${formatLocalizedDate(weekDates[0], locale, timezone)} - ${formatLocalizedDate(weekDates[6], locale, timezone)}`,
      isToday: (date: Date) => isSameDay(date, new Date())
    };
  },
    [navigation.currentDate, navigation.view, startOfWeek, locale, timezone],
    'week-data');

  const dayData = createMemo((): DayData | null => {
    if (navigation.view !== 'day') return null;

    return {
      date: navigation.currentDate,
      dayName: formatLocalizedDate(navigation.currentDate, locale, timezone, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      isToday: isSameDay(navigation.currentDate, new Date())
    };
  },
    [navigation.currentDate, navigation.view, locale, timezone],
    'day-data');

  // Modify the utils section to include new localization helpers
  return {
    // State
    currentDate: navigation.currentDate,
    view: navigation.view,
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
    getEventsForDateRange: _getEventsForDateRange,
    getEventsForDate: getEventsForSpecificDate,

    // Computed values
    visibleDates,
    visibleEvents,
    timeSlots,

    // View-specific data
    monthData,
    weekData,
    dayData,

    // Utility functions (exposed for custom implementations)
    utils: {
      formatDate: (
        date: Date,
        format?: string
      ) => formatDate(date, { format: format ?? "yyyy-MM-dd", locale, timeZone: timezone }),
      formatDateTime: (
        date: Date,
        format?: string
      ) => formatDateTime(date, { format: format ?? "yyyy-MM-dd HH:mm:ss", locale, timeZone: timezone }),
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
      daysofWeek: (format = 'short') =>
        daysofWeek(startOfWeek, format, locale),
      formatDateInTimeZone: (date: Date, l = locale, tz = timezone, options?) =>
        formatDateInTimeZone(date, l, tz, options),
      convertToTimeZone: (date: Date, fromTz = timezone, toTz: string) => convertToTimeZone(date, fromTz, toTz),
      formatLocalizedDate: (date: Date, l = locale, tz = timezone, options?) =>
        formatLocalizedDate(date, l, tz, options),
      formatLocalizedMonth: (date: Date, l = locale, tz = timezone) =>
        formatLocalizedMonth(date, l, tz),
      formatLocalizedWeekday: (date: Date, l = locale, tz = timezone, format?) =>
        formatLocalizedWeekday(date, l, tz, format),
      formatLocalizedTime: (date: Date, l = locale, tz = timezone, hour12?) =>
        formatLocalizedTime(date, l, tz, hour12)
    }
  };
};