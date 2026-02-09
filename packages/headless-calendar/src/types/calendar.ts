import { CalendarEvent, DraggedEvent } from './events';
import { ViewType, MonthData, WeekData, DayData, YearData, CustomViewOptions } from './views';

/**
 * Represents a single time slot in a day view.
 * @group calendar
 * @title TimeSlot
 * @description Represents a single time slot in a day view.
 */
export interface TimeSlot {
  /**
   * The hour of the time slot (0-23).
   */
  hour: number;
  /**
   * The minute of the time slot (0-59).
   */
  minute: number;
  /**
   * The time in "HH:mm" format.
   */
  time: string;
  /**
   * A formatted label for the time slot (e.g., "9:00 AM").
   */
  label: string;
}

/**
 * Represents the target of a drop operation.
 * @group calendar 
 * @title DropTarget
 * @description Represents the target of a drop operation.
 */
export interface DropTarget {
  /**
   * The date of the drop target.
   */
  date: Date;
  /**
   * The optional time of the drop target (e.g., "09:00").
   */
  time?: string;
}

/**
 * Configuration options for initializing a calendar instance.
 * @group calendar
 * @title CalendarOptions
 * @description Configuration options for initializing a calendar instance.
 */
export interface CalendarOptions {
  /**
   * The default view to display when the calendar is initialized.
   * @default 'month'
   */
  defaultView?: ViewType;
  /**
   * The default date to display when the calendar is initialized.
   * @default new Date()
   */
  defaultDate?: Date;
  /**
   * The day of the week to consider as the start of the week (0 for Sunday, 1 for Monday, etc.).
   * @default 0
   */
  startOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * The interval in minutes for time slots in day and week views.
   * @default 60
   */
  timeSlotInterval?: number; // minutes
  /**
   * The starting hour for time slots in day and week views.
   * @default 0
   */
  startHour?: number;
  /**
   * The ending hour for time slots in day and week views.
   * @default 24
   */
  endHour?: number;
  /**
   * An array of initial events to populate the calendar with.
   */
  initialEvents?: CalendarEvent[];
  /**
   * A callback function that is invoked whenever the events array changes.
   * @param {CalendarEvent[]} events - The updated array of events.
   * @event
   */
  onEvent?: (events: CalendarEvent[]) => void;
  /**
   * A callback function that is invoked when a new event is created.
   * @param {CalendarEvent} event - The newly created event.
   * @event
   */
  onEventCreate?: (event: CalendarEvent) => void;
  /**
   * A callback function that is invoked when an event is updated.
   * @param {CalendarEvent} event - The updated event.
   * @event
   */
  onEventUpdate?: (event: CalendarEvent) => void;
  /**
   * A callback function that is invoked when an event is deleted.
   * @param {CalendarEvent} event - The deleted event.
   * @event
   */
  onEventDelete?: (event: CalendarEvent) => void;
  /**
   * A callback function that is invoked when the calendar view changes.
   * @param {ViewType} view - The new calendar view.
   * @event
   */
  onViewChange?: (view: ViewType) => void;
  /**
   * A callback function that is invoked when the current date of the calendar changes.
   * @param {Date} date - The new date.
   * @event
   */
  onDateChange?: (date: Date) => void;
  /**
   * The timezone to use for calendar operations.
   * @default The user's local timezone.
   * @event
   */
  timezone?: string;
  /**
   * The locale to use for formatting dates and times.
   * @default The user's browser locale.
   */
  locale?: string;
  /**
   * Configuration options for the 'custom' view.
   */
  customViewOptions?: CustomViewOptions;
}

/** 
 * @group calendar
 * @title CalendarUtils
 * @description A collection of utility functions for date manipulation and formatting, bound to the calendar's locale and timezone.
*/
export interface CalendarUtils {
  /**
   * Formats a date object into a string based on the specified format, locale, and timezone.
   * @function
   * @param {Date} date - The date object to format.
   * @param {string} [format="yyyy-MM-dd"] - The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").
   * @returns {string} - The formatted date string.
   */
  formatDate: (date: Date, format?: string) => string;
  /**
   * Formats a date and time object into a string based on the specified format, locale, and timezone.
   * @function
   * @param {Date} date - The date object to format.
   * @param {string} [format="yyyy-MM-dd HH:mm:ss"] - The format string (e.g., "yyyy-MM-dd HH:mm:ss").
   * @returns {string} - The formatted date and time string.
   */
  formatDateTime: (date: Date, format?: string) => string;
  /**
   * Parses a date string into a Date object.
   * @function
   * @param {string} dateString - The date string to parse.
   * @returns {Date} - The parsed Date object.
   */
  parseDate: (dateString: string) => Date;
  /**
   * Checks if two dates are the same day.
   * @function
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {boolean} - True if the dates are the same day, false otherwise.
   */
  isSameDay: (date1: Date, date2: Date) => boolean;
  /**
   * Checks if two dates are in the same week.
   * @function
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @param {number} [startOfWeek] - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
   * @returns {boolean} - True if the dates are in the same week, false otherwise.
   */
  isSameWeek: (date1: Date, date2: Date, startOfWeek?: number) => boolean;
  /**
   * Checks if two dates are in the same month.
   * @function
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {boolean} - True if the dates are in the same month, false otherwise.
   */
  isSameMonth: (date1: Date, date2: Date) => boolean;
  /**
   * Adds a specified number of days to a date.
   * @function
   * @param {Date} date - The original date.
   * @param {number} days - The number of days to add (can be negative).
   * @returns {Date} - The new date.
   */
  addDays: (date: Date, days: number) => Date;
  /**
   * Adds a specified number of weeks to a date.
   * @function
   * @param {Date} date - The original date.
   * @param {number} weeks - The number of weeks to add (can be negative).
   * @returns {Date} - The new date.
   */
  addWeeks: (date: Date, weeks: number) => Date;
  /**
   * Adds a specified number of months to a date.
   * @function
   * @param {Date} date - The original date.
   * @param {number} months - The number of months to add (can be negative).
   * @returns {Date} - The new date.
   */
  addMonths: (date: Date, months: number) => Date;
  /**
   * Gets the start of the week for a given date.
   * @function
   * @param {Date} date - The date.
   * @param {number} startOfWeek - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
   * @returns {Date} - The start of the week.
   */
  getStartOfWeek: (date: Date, startOfWeek?: number) => Date;
  /**
   * Gets the end of the week for a given date.
   * @function
   * @param {Date} date - The date.
   * @param {number} startOfWeek - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
   * @returns {Date} - The end of the week.
   */
  getEndOfWeek: (date: Date, startOfWeek?: number) => Date;
  /**
   * Gets the start of the month for a given date.
   * @function
   * @param {Date} date - The date.
   * @returns {Date} - The start of the month.
   */
  getStartOfMonth: (date: Date) => Date;
  /**
   * Gets the end of the month for a given date.
   * @function
   * @param {Date} date - The date.
   * @returns {Date} - The end of the month.
   */
  getEndOfMonth: (date: Date) => Date;
  /**
   * Checks if a given date and time falls within a specified range.
   * @function
   * @param {Date} between - The date to check.
   * @param {Date} startDateTime - The start of the range.
   * @param {Date} endDateTime - The end of the range.
   * @returns {boolean} - True if the date is within the range, false otherwise.
   */
  dateTimeInBetween: (between: Date, startDateTime: Date, endDateTime: Date) => boolean;
  /**
   * Returns an array of localized day names for the week, starting from the specified `startOfWeek`.
   * @function
   * @param {'short' | 'long'} [format='short'] - The format of the weekday names ('short' for 'Mon', 'long' for 'Monday').
   * @returns {string[]} - An array of localized weekday names.
   */
  daysofWeek: (format?: "long" | "short" | "narrow", locale?: string) => string[];
  /**
   * Formats a date into a string according to the specified locale and timezone.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [locale] - The locale to use for formatting.
   * @param {string} [timeZone] - The timezone to use for formatting.
   * @param {Intl.DateTimeFormatOptions} [options] - Additional formatting options.
   * @returns {string} - The formatted date string.
   */
  formatDateInTimeZone: (date: Date, locale?: string, timeZone?: string, options?: Intl.DateTimeFormatOptions) => string;
  /**
   * Converts a date from one timezone to another.
   * @function
   * @param {Date} date - The date to convert.
   * @param {string} [fromTimeZone] - The original timezone of the date.
   * @param {string} toTimeZone - The target timezone.
   * @returns {Date} - The converted date object.
   */
  convertToTimeZone: (date: Date, fromTimeZone: string, toTimeZone: string) => Date;
  /**
   * Formats a date into a localized date string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [locale] - The locale to use for formatting.
   * @param {string} [timeZone] - The timezone to use for formatting.
   * @param {Intl.DateTimeFormatOptions} [options] - Additional formatting options.
   * @returns {string} - The localized date string.
   */
  formatLocalizedDate: (
    date: Date,
    locale?: string,
    timeZone?: string,
    options?: Intl.DateTimeFormatOptions
  ) => string;
  /**
   * Formats a date into a localized month string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [locale] - The locale to use for formatting.
   * @param {string} [timeZone] - The timezone to use for formatting.
   * @returns {string} - The localized month string.
   */
  formatLocalizedMonth: (
    date: Date,
    locale?: string,
    timeZone?: string
  ) => string;
  /**
   * Formats a date into a localized weekday string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [locale] - The locale to use for formatting.
   * @param {string} [timeZone] - The timezone to use for formatting.
   * @param {Intl.DateTimeFormatOptions['weekday']} [format] - The format of the weekday (e.g., 'short', 'long').
   * @returns {string} - The localized weekday string.
   */
  formatLocalizedWeekday: (
    date: Date,
    locale?: string,
    timeZone?: string,
    format?: 'long' | 'short' | 'narrow'
  ) => string;
  /**
   * Formats a date into a localized time string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [locale] - The locale to use for formatting.
   * @param {string} [timeZone] - The timezone to use for formatting.
   * @param {boolean} [hour12] - Whether to use 12-hour format.
   * @returns {string} - The localized time string.
   */
  formatLocalizedTime: (
    date: Date,
    locale?: string,
    timeZone?: string,
    hour12?: boolean
  ) => string;
}

/** 
 * @group calendar 
 * @title CalendarInstance
 * @description The main object returned by the `useCalendar` hook, providing access to the calendar's state, navigation functions, event management functions, and other utilities.
*/
export interface CalendarInstance {
  /**
   * The currently selected date in the calendar.
   * @type {Date}
   */
  currentDate: Date;
  /**
   * The current view of the calendar (e.g., 'year', 'month', 'week', 'day', 'custom').
   * @type {ViewType}
   * @see {@link ViewType}
   */
  view: ViewType;
  /**
   * Returns custom view option when view is 'custom'
   * @type {CustomViewOptions}
   * @see {@link CustomViewOptions}
   */
  customViewOptions?: CustomViewOptions;
  /**
   * An array of all events currently managed by the calendar.
   * @type {CalendarEvent[]}
   * @see {@link CalendarEvent}
   */
  events: CalendarEvent[];
  /**
   * The event currently being dragged, if any.
   * @type {DraggedEvent | null}
   * @see {@link DraggedEvent}
   */
  draggedEvent: DraggedEvent | null;
  /**
   * The timezone used for calendar operations.
   * @type {string | undefined}
   */
  timezone?: string;
  /**
   * The locale used for formatting dates and times.
   * @type {string | undefined}
   */
  locale?: string;
  /**
   * The interval in minutes for time slots in day/week views.
   * @type {number | undefined}
   */
  timeSlotInterval?: number;

  /**
   * Navigates the calendar to the next period (day, week, or month depending on the current view).
   * @function
   */
  goToNext: () => void;
  /**
   * Navigates the calendar to the previous period (day, week, or month depending on the current view).
   * @function
   */
  goToPrevious: () => void;
  /**
   * Navigates the calendar to today's date.
   * @function
   */
  goToToday: () => void;
  /**
   * Navigates the calendar to a specific date.
   * @function
   * @param {Date} date - The date to navigate to.
   */
  goToDate: (date: Date) => void;
  /**
   * Changes the current view of the calendar (e.g., 'month', 'week', 'day').
   * @function
   * @param {ViewType} view - The new view to set.
   * @see {@link ViewType}
   */
  changeView: (view: ViewType) => void;

  /**
   * Retrieves a specific event by its ID.
   * @function
   * @param {string} eventId - The ID of the event to retrieve.
   * @returns {CalendarEvent | undefined} - The event object if found, otherwise undefined.
   * @see {@link CalendarEvent}
   */
  getEvent: (eventId: string) => CalendarEvent | undefined;
  /**
   * Creates a new calendar event.
   * @function
   * @param {CalendarEvent} eventData - The data for the new event.
   * @returns {CalendarEvent} - The newly created event.
   * @see {@link CalendarEvent}
   */
  createEvent: (eventData: CalendarEvent) => CalendarEvent;
  /**
   * Updates an existing calendar event.
   * @function
   * @param {string} eventId - The ID of the event to update.
   * @param {CalendarEvent} updates - The partial event data to apply as updates.
   * @see {@link CalendarEvent}
   */
  updateEvent: (eventId: string, updates: CalendarEvent) => void;
  /**
   * Deletes a calendar event by its ID.
   * @function
   * @param {string} eventId - The ID of the event to delete.
   */
  deleteEvent: (eventId: string) => void;
  /**
   * Moves an event to a new start and optional end date.
   * @function
   * @param {string} eventId - The ID of the event to move.
   * @param {Date} newStart - The new start date for the event.
   * @param {Date} [newEnd] - The new end date for the event (optional, defaults to newStart if not provided).
   */
  moveEvent: (eventId: string, newStart: Date, newEnd?: Date) => void;
  /**
   * Clears all events from the calendar.
   * @function
   */
  clearAllEvents: () => void;
  /**
   * Duplicates an existing event.
   * @function
   * @param {string} eventId - The ID of the event to duplicate.
   * @returns {CalendarEvent | null} - The duplicated event object if successful, otherwise null.
   * @see {@link CalendarEvent}
   */
  duplicateEvent: (eventId: string) => CalendarEvent | null;

  /**
   * Initiates a drag operation for an event.
   * @function
   * @param {CalendarEvent} event - The event to drag.
   * @param {Record<string, any>} [dragData] - Additional data to associate with the drag operation.
   * @see {@link CalendarEvent}
   */
  startDrag: (event: CalendarEvent, dragData?: Record<string, any>) => void;
  /**
   * Ends the current drag operation.
   * @function
   */
  endDrag: () => void;
  /**
   * Handles the drop of a dragged event onto a target.
   * @function
   * @param {DropTarget} dropTarget - The target where the event was dropped.
   * @see {@link DropTarget}
   */
  handleDrop: (dropTarget: DropTarget) => void;

  /**
   * Retrieves events within a specified date range.
   * @function
   * @param {Date} startDate - The start date of the range.
   * @param {Date} endDate - The end date of the range.
   * @returns {CalendarEvent[]} - An array of events within the specified range.
   * @see {@link CalendarEvent}
   */
  getEventsForDateRange: (startDate: Date, endDate: Date) => CalendarEvent[];
  /**
   * Retrieves events for a specific date.
   * @function
   * @param {Date} date - The date to retrieve events for.
   * @returns {CalendarEvent[]} - An array of events on the specified date.
   * @see {@link CalendarEvent}
   */
  getEventsForDate: (date: Date) => CalendarEvent[];

  /**
   * An array of dates currently visible in the calendar, based on the current view.
   * @type {Date[]}
   */
  visibleDates: Date[];
  /**
   * An array of calendar events that are visible within the current date range.
   * @type {CalendarEvent[]}
   * @see {@link CalendarEvent}
   */
  visibleEvents: CalendarEvent[];
  /**
   * An array of time slots for the current day view, e.g., ['09:00', '10:00'].
   * @type {TimeSlot[]}
   * @see {@link TimeSlot}
   */
  timeSlots: TimeSlot[];

  /**
   * Provides data specific to the Year with all month, weeks, month name, and month data has utility functions to check if a date is in the current month or is today.
   * @type {YearData | null}
   * @see {@link YearData}
   */
  yearData: YearData | null;

  /**
   * Provides data specific to the month view, such as weeks, month name, and utility functions to check if a date is in the current month or is today.
   * @type {MonthData | null}
   * @see {@link MonthData}
   */
  monthData: MonthData | null;
  /**
   * Provides data specific to the week view, such as the dates in the week, the week's date range, and a utility function to check if a date is today.
   * @type {WeekData | null}
   * @see {@link WeekData}
   */
  weekData: WeekData | null;
  /**
   * Provides data specific to the day view, such as the current date, its localized day name, and a utility function to check if the date is today.
   * @type {DayData | null}
   * @see {@link DayData}
   */
  dayData: DayData | null;

  /**
   * A collection of utility functions for date manipulation and formatting.
   * @type {CalendarUtils}
   * @see {@link CalendarUtils}
   */
  utils: CalendarUtils;
}